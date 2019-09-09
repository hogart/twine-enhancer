import hyper from 'hyperhtml';
import { importTwee } from 'aife-twee2/src/importTwee';

import { loadOptions, subscribeToOptions } from '../syncOptions';
import { waitForElement } from './utils/waitForElement';
import { extractStoryMetaRaw } from './story/extractStory';
import { writeStory } from './story/writeStory';
import { readStoryUids } from './story/persistence';
import { inferPassagePosition } from './story/inferPassagePosition.js';

import { DashboardButton } from './components/DashboardButton.js';
import { Modal } from './components/Modal';
import { ImportModal } from './components/ImportModal';

function detectDuplicates(name) {
    const uids = readStoryUids();
    for (const uid of uids) {
        const story = extractStoryMetaRaw(uid);
        if (story.name === name) {
            return story.id;
        }
    }

    return null;
}

function readFile(files) {
    if (files.length) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsText(files[0]);
        });
    } else {
        return Promise.resolve(null);
    }
}

function renameDuplicate(ifid) {
    const meta = extractStoryMetaRaw(ifid);
    meta.name = `${meta.name}.${new Date()}.bak`;
    localStorage.setItem(`twine-stories-${ifid}`, JSON.stringify(meta));
}

async function onFileChange(files, makeBackup) {
    const text = await readFile(files);

    if (text !== null) {
        const importingStory = importTwee(text);
        const duplicateId = detectDuplicates(importingStory.title);

        if (duplicateId !== null) {
            if (makeBackup) {
                renameDuplicate(duplicateId);
            } else {
                importingStory.id = duplicateId;
            }
        }

        importingStory.passages.forEach(inferPassagePosition);

        writeStory(importingStory);
    }
}

function createImportModal() {
    return new Modal({
        slotted: ImportModal,
        title: chrome.i18n.getMessage('importDlgTitle'),
        onFileChange,
    });
}

/**
 * @param {WindowMessageListener} actionListener
 * @return {Function}
 */
export function addButtons(actionListener) {
    let block = false; // waitForElement uses setTimeout inside, so it's possible to run several instances of async function in parallel
    return async function() {
        if (block) {
            return;
        } else {
            block = true;
        }
        const [listControlsUl] = await waitForElement('nav.listControls ul');

        // check if we already created buttons
        if (listControlsUl.querySelector('._enhancer-button') !== null) {
            return;
        }

        const options = await loadOptions();

        const modal = createImportModal();
        const modalWrapper = document.createElement('div');
        hyper(modalWrapper)`${modal}`;
        document.body.appendChild(modalWrapper);

        const actionsMap = {
            import() {
                modal.show();
            },
        };

        actionListener.add(actionsMap);

        const button = new DashboardButton({
            name: 'import',
            text: chrome.i18n.getMessage('importBtn'),
            icon: 'file-text',
            active: options.import,
        });

        const wrapper = document.createElement('li');
        listControlsUl.insertBefore(wrapper, listControlsUl.querySelector('li:nth-child(3)'));

        hyper(wrapper)`${button}`;

        await subscribeToOptions(() => {
            button.setState({ active: options.import });
        }, options);

        block = false; // eslint-disable-line require-atomic-updates
    };
}