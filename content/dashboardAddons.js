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
import { readFileAsync } from './utils/readFileAsync.js';

/**
 * @param {string} name
 * @return {null|IStory}
 */
function detectDuplicates(name) {
    const uids = readStoryUids();
    for (const uid of uids) {
        const story = extractStoryMetaRaw(uid);
        if (story.name === name) {
            return story;
        }
    }

    return null;
}

/**
 * @param {FileList} files
 * @return {Promise<string>|Promise<null>}
 */
function readText(files) {
    if (files.length) {
        return readFileAsync(files[0]);
    } else {
        return Promise.resolve(null);
    }
}

/**
 * @param {IStory} story
 */
function renameDuplicate(story) {
    const meta = extractStoryMetaRaw(story.ifid);
    meta.name = `${meta.name}.${new Date()}.bak`;
    localStorage.setItem(`twine-stories-${story.ifid}`, JSON.stringify(meta));
}

/**
 * @param {FileList} files
 * @param {boolean} makeBackup
 * @return {Promise<void>}
 */
async function onFileChange(files, makeBackup) {
    const text = await readText(files);

    if (text !== null) {
        const importingStory = importTwee(text);
        const duplicateStory = detectDuplicates(importingStory.title);

        if (duplicateStory !== null) {
            if (makeBackup) {
                renameDuplicate(duplicateStory);
            } else {
                importingStory.id = duplicateStory.id;
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