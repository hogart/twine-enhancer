import { hyper } from 'hyperhtml';

import { importTwee } from 'aife-twee2/src/importTwee';
import { listenOptions, loadOptions } from '../syncOptions';
import { waitForElement } from './dom/waitForElement';
import { h } from './dom/h';
import { Modal } from './dom/Modal';
import { extractStoryMetaRaw } from './story/extractStory';
import { writeStory } from './story/writeStory';
import { readStoryUids } from './story/persistence';
import { inferPassagePosition } from './story/inferPassagePosition.js';
import { DashboardButton } from './components/DashboardButton.js';

function detectDublicates(name) {
    const ifids = readStoryUids();
    for (const ifid of ifids) {
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

async function onFileChange() {
    const text = await readFile(this);

    if (text !== null) {
        const importingStory = importTwee(text);
        const dublicateId = detectDublicates(importingStory.title);

        if (dublicateId !== null) {
            renameDublicate(dublicateId);
        }

        importingStory.passages.forEach(inferPassagePosition);

        writeStory(importingStory);
        location.reload();
    }
}

function createImportModal() {
    const fileInput = h('input', {type: 'file', accept: '.twee,.tw2'});
    const fileHint0 = h(`<p>${chrome.i18n.getMessage('experimentalWarning')}</p>`);
    const fileHint1 = h(
        `<p>${chrome.i18n.getMessage('importDlgHelp')}</p>`
    );
    const selectFileWrapper = h('div', {class: 'selectWrapper select'}, [fileInput, fileHint0, fileHint1]);


    fileInput.addEventListener('change', onFileChange);

    return new Modal(chrome.i18n.getMessage('importDlgTitle'), selectFileWrapper);
}

export function addButtons(actionListener) {
    return async function() {
        const [listControlsUl] = await waitForElement('nav.listControls ul');

        // check if we already created buttons
        if (listControlsUl.querySelector('._enhancer-button') !== null) {
            return;
        }

        const options = await loadOptions();

        const modal = createImportModal();

        const actionsMap = {
            import() {
                modal.show();
            },
        };

        actionListener.add(actionsMap);

        const button = new DashboardButton({
            text: chrome.i18n.getMessage('importBtn'),
            icon: 'file-text',
            active: options.import,
        });

        const wrapper = document.createElement('li');
        listControlsUl.insertBefore(wrapper, listControlsUl.querySelector('li:nth-child(3)'));

        hyper(wrapper)`${button}`;

        listenOptions((changes) => {
            for (const key of Object.keys(changes)) {
                options[key] = changes[key].newValue;
            }

            button.setState({ active: options.import });
        });
    };
}