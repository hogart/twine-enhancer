import { importTwee } from 'aife-twee2/src/importTwee';
import { loadOptions } from '../syncOptions';
import { waitForElement } from './waitForElement';
import { h } from './dom/h';
import { createIcon } from './dom/createIcon';
import { Modal } from './dom/Modal';
import { extractStoryMetaRaw } from './story/extractStory';
import { writeStory } from './story/writeStory';
import { readStoryUids } from './story/persistence';

function createDashboardButton({text, icon}, onClick) {
    const iconEl = createIcon(icon);
    const button = h('button', {class: 'block _enhancer-button'}, [iconEl, text]);
    const li = h('li', null, [button]);

    button.addEventListener('click', onClick);

    return li;
}

function detectDublicates(name) {
    const ifids = readStoryUids();
    for (const ifid of ifids.values()) {
        const story = extractStoryMetaRaw(ifid);
        if (story.name === name) {
            return story.id;
        }
    }

    return null;
}

function readFile(input) {
    if (input.files.length) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsText(input.files[0]);
        });
    } else {
        return Promise.resolve(null);
    }
}

function renameDublicate(ifid) {
    const meta = extractStoryMetaRaw(ifid);
    meta.name = `${meta.name}.${new Date()}.bak`;
    localStorage.setItem(`twine-stories-${ifid}`, JSON.stringify(meta));
}

function createImportModal() {
    const fileInput = h('input', {type: 'file', accept: '.twee,.tw2'});
    const fileHint0 = h('<p><strong style="color: red;">Experimental feature!</strong> Make backup before proceeed.');
    const fileHint1 = h(
        'p',
        {},
        ['If there\'s already a story with the same name, it will be renamed as backup. Importing takes some time; page will automatically reload after.']
    );
    const selectFileWrapper = h('div', {class: 'selectWrapper select'}, [fileInput, fileHint0, fileHint1]);


    fileInput.addEventListener('change', async () => {
        const text = await readFile(fileInput);

        if (text !== null) {
            const importingStory = importTwee(text);
            const dublicateId = detectDublicates(importingStory.title);

            if (dublicateId !== null) {
                renameDublicate(dublicateId);
            }

            writeStory(importingStory);
            location.reload();
        }
    });

    const modal = new Modal(chrome.i18n.getMessage('importDlgTitle'), selectFileWrapper);
    return modal;
}

export async function addButtons() {
    const options = await loadOptions();
    if (options.export) {
        const listControlsUl = await waitForElement('nav.listControls ul');

        // check if we already created buttons
        if (listControlsUl[0].querySelector('._enhancer-button') !== null) {
            return;
        }

        const modal = createImportModal();

        const button = createDashboardButton({
            text: chrome.i18n.getMessage('importBtn'),
            icon: 'file-text',
        }, () => modal.show());

        listControlsUl[0].insertBefore(button, listControlsUl[0].querySelector('li:nth-child(3)'));
    }

}