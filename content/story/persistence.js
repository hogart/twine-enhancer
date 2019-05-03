export function readJson(key) {
    const str = localStorage.getItem(key);
    if (!str) {
        throw new Error(`No such item "${key}" in localStorage`);
    }

    try {
        return JSON.parse(str);
    } catch (e) {
        throw new Error(`Item "${key}" is not valid JSON`);
    }
}

export function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}


function readUids(isStory) {
    const val = localStorage.getItem(`twine-${isStory ? 'stories' : 'passages'}`);
    if (val === null || val === '') {
        return [];
    } else {
        return val.split(',');
    }
}

function writeUids(isStory, uids) {
    localStorage.setItem(`twine-${isStory ? 'stories' : 'passages'}`, uids.join(','));
}

export function readPassagesUids() {
    return readUids(false);
}

export function writePassageUids(uids) {
    writeUids(false, uids);
}

export function readStoryUids() {
    return readUids(true);
}

export function writeStoryUids(uids) {
    writeUids(true, uids);
}