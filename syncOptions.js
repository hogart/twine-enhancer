export const defaultOptions = {
    editJs: true,
    editJsHk: 'alt+j',
    editCss: true,
    editCssHk: 'alt+c',
    proofRead: false,
    proofReadHk: 'f4',
    publish: true,
    publishHk: 'ctrl+s',
    export: true,
    exportHk: 'ctrl+e',
    snap: true,
    snapHk: '',
    theme: false,
    themeHk: '',
    snippet: true,
    snippetHk: 'alt+s',
    run: false,
    runHk: 'shift+f10',
    debug: false,
    debugHk: 'shift+f9',

    wideEditors: true,
    neatPassages: false,

    import: true,
    tweeExtension: 'twee',
};

/**
 * @param {typeof defaultOptions} defaults
 * @return {Promise<typeof defaultOptions>}
 */
export function loadOptions(defaults = defaultOptions) {
    return new Promise((resolve) => {
        chrome.storage.sync.get(Object.keys(defaults), (items) => {
            const options = Object.assign({}, defaults, items);
            resolve(options);
        });
    });
}

/**
 * @param {typeof defaultOptions} values
 * @return {Promise<void>}
 */
export function saveOptions(values) {
    return new Promise((resolve) => {
        chrome.storage.sync.set(values, () => {
            resolve();
        });
    });
}

export function clearOptions() {
    return new Promise((resolve) => {
        chrome.storage.sync.clear(() => {
            resolve();
        });
    });
}

export function listenOptions(onChange) {
    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === 'sync') {
            onChange(changes);
        }
    });
}