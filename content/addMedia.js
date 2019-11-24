import hyper from 'hyperhtml';

import { Modal } from './components/Modal';
import { MediaModal } from './components/MediaModal';
import { mergeTwee } from './story/mergeTwee';
import { writeStory } from './story/writeStory';
import { createMediaSnippet } from './story/createMediaSnippet';

function createMediaModal(onMedia) {
    return new Modal({
        slotted: MediaModal,
        title: chrome.i18n.getMessage('addMediaDlgTitle'),
        onMedia,
    });
}

let modal;

async function onMedia(files) {
    const passages = [];
    for (const file of files) {
        const passage = await createMediaSnippet(file);
        passages.push(passage);
    }

    const merged = mergeTwee(passages.join('\n\n'), {passages: true});
    writeStory(merged);
    location.reload();
}

export function addMedia() {
    if (!modal) {
        modal = createMediaModal(onMedia);
    }

    const wrapper = document.createElement('div');
    hyper(wrapper)`${modal}`;
    document.body.appendChild(wrapper);

    modal.show();
}