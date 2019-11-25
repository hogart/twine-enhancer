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
    media: true,
    mediaHk: 'alt+m',
    tags: true,
    tagsHk: 'alt+t',
    run: false,
    runHk: 'shift+f10',
    debug: false,
    debugHk: 'shift+f9',
    openOptions: true,
    openOptionsHk: '',

    wideEditors: true,
    neatPassages: false,

    import: true,
    tweeExtension: 'twee',

    snippetOverrideTitle: false,
    snippetOverrideMeta: false,
    snippetOverrideScript: false,
    snippetOverrideStyleSheet: false,
    snippetOverridePassages: false,

    storyOverrideTitle: false,
    storyOverrideMeta: false,
    storyOverrideScript: false,
    storyOverrideStyleSheet: false,
    storyOverridePassages: false,
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

/**
 * Listens to sync storage events
 * @param {function} onChange
 */
export function listenOptions(onChange) {
    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === 'sync') {
            onChange(changes);
        }
    });
}

export function hasOwnProp(obj, key) {
    return Object.hasOwnProperty.call(obj, key);
}

/**
 * @param {typeof defaultOptions} options
 * @param {function} handler
 * @return {function}
 */
function onChangeListenerFactory(options, handler) {
    return function onChange(changes) {
        for (const [key, changeObject] of Object.entries(changes)) {
            if (hasOwnProp(changeObject, 'newValue')) {
                options[key] = changeObject.newValue;
            } else {
                options[key] = defaultOptions[key];
            }
        }

        handler(options);
    };
}

/**
 * Calls `listener` every time storage is changed
 * @param {function} listener
 * @param {typeof defaultOptions} options
 */
export function subscribeToOptions(listener, options) {
    const onChange = onChangeListenerFactory(options, listener);

    listenOptions(onChange);
}

/**
 * Loads options and calls `listener`, and calls it every time storage is changed
 * @param {function} listener
 * @return {Promise<void>}
 */
export async function loadAndSubscribeToOptions(listener) {
    const options = await loadOptions();
    listener(options);

    const onChange = onChangeListenerFactory(options, listener);
    listenOptions(onChange);
}