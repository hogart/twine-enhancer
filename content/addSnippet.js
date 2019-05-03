import { mergeTwee } from './story/mergeTwee';
import { writeStory } from './story/writeStory';
import { h } from './dom/h';
import { Modal } from './dom/Modal';

function createSnippetModal(onConfirm) {
    const snippetInput = h('textarea', {style: 'width: 100%; font-face: monospace;'});
    const snippetHint0 = h(`<p>${chrome.i18n.getMessage('experimentalWarning')}</p>`);
    const snippetHint1 = h(
        `<p>${chrome.i18n.getMessage('addSnippetDlgHelp')}</p>`
    );
    const confirmButton = h(`<button type="submit">${chrome.i18n.getMessage('confirm')}</button>`);
    const snippetWrapper = h('form', {class: 'snippetWrapper'}, [snippetHint0, snippetInput, snippetHint1, confirmButton]);

    snippetInput.addEventListener('change', (event) => {
        event.preventDefault();

        onConfirm(snippetInput.value.trim());

        return false;
    });

    return new Modal(chrome.i18n.getMessage('addSnippetDlgTitle'), snippetWrapper);
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

    modal.show();
}