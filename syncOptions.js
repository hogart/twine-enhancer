export const defaultOptions = {
    shortcutButtons: true,
    editJs: true,
    editCss: true,
    proofRead: false,
    publish: true,
    export: true,
    snap: true,
    theme: false,
    run: false,
    debug: false,
    wideEditors: true,
    neatPassages: false,
};

export function loadOptions(defaults = defaultOptions) {
    return new Promise((resolve) => {
        chrome.storage.sync.get(Object.keys(defaults), (items) => {
            const options = Object.assign({}, defaults, items);
            resolve(options);
        });
    });
}

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