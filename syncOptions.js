'use strict';

const defaultOptions = {
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

function loadOptions(defaults = defaultOptions) {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(Object.keys(defaults), (items) => {
            resolve(Object.assign({}, defaults, items));
        });
    });
}

function saveOptions(values) {
    return new Promise((resolve) => {
        chrome.storage.sync.set(values, () => {
            resolve();
        });
    })
}

function clearOptions() {
    return new Promise((resolve) => {
        chrome.storage.sync.clear(() => {
            resolve();
        });
    })
}