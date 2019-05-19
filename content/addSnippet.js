import { mergeTwee } from './story/mergeTwee';
import { writeStory } from './story/writeStory';
import { Modal } from './components/Modal';
import { SnippetModal } from './components/SnippetModal';
import hyper from 'hyperhtml';

function createSnippetModal(onSnippet) {
    return new Modal({
        slotted: SnippetModal,
        title: chrome.i18n.getMessage('addSnippetDlgTitle'),
        onSnippet,
    });
}

let modal;

function onSnippet(snippet) {
    if (snippet !== '') {
        const merged = mergeTwee(snippet, {});
        writeStory(merged);
        location.reload();
    } else {
        modal.hide();
    }
}

export function addSnippet() {
    if (!modal) {
        modal = createSnippetModal(onSnippet);
    }

    const wrapper = document.createElement('div');
    hyper(wrapper)`${modal}`;
    document.body.appendChild(wrapper);

    modal.show();
}