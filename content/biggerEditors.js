import { onOptions } from '../syncOptions';

function makeEditorsBigger(options) {
    document.documentElement.classList.toggle('wideEditors', options.wideEditors);
}

onOptions(makeEditorsBigger);