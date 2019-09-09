import { loadAndSubscribeToOptions } from '../syncOptions';

function makeEditorsBigger(options) {
    document.documentElement.classList.toggle('wideEditors', options.wideEditors);
}

loadAndSubscribeToOptions(makeEditorsBigger);