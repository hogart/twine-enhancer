function parseHotKeyString(str) {
    const chunks = str.split(/[+ ]/);
    const hotKey = chunks.reduce((acc, current) => {
        const key = current.toLowerCase();
        if (key === 'ctrl') {
            acc.ctrlKey = true;
        } else if (key === 'alt') {
            acc.altKey = true;
        } else if (key === 'shift') {
            acc.shiftKey = true;
        } else if (key.length === 1) {
            acc.code = 'key' + key;
        } else {
            acc.code = key;
        }

        return acc;
    }, {});
    return hotKey;
}

function eventMatchesHotKey(event, hotKey) {
    return Object.keys(hotKey).reduce((acc, key) => {
        let compareTo = event[key];
        if (key === 'code') {
            compareTo = compareTo.toLowerCase();
        }
        return acc && (hotKey[key] === compareTo);
    }, true);
}

function listenForHotKey(hotKey, handler) {
    const parsedHotKey = parseHotKeyString(hotKey);
    window.addEventListener('keydown', (event) => {
        if (eventMatchesHotKey(event, parsedHotKey)) {
            handler(event);

            event.preventDefault();
            event.stopPropagation();
            return false;
        }
    }, false);
}

function listenForHotKeys(hotKeysConfig) {
    const { hotKeys, handlers } = Object.keys(hotKeysConfig).reduce(
        (acc, confKey) => {
            acc.hotKeys.push(parseHotKeyString(confKey));
            acc.handlers.push(hotKeysConfig[confKey]);

            return acc;
        },
        {
            hotKeys: [],
            handlers: [],
        }
    );

    window.addEventListener('keydown', (event) => {
        const handlerIndex = hotKeys.findIndex((hotKey) => eventMatchesHotKey(event, hotKey));
        if (handlerIndex !== -1) {
            handlers[handlerIndex](event);

            event.preventDefault();
            event.stopPropagation();
            return false;
        }
    }, false);
}