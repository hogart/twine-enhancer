'use strict';

function readJsonFromLocalStorage(key) {
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

function extractStoryMeta(storyId) {
    return readJsonFromLocalStorage(`twine-stories-${storyId}`);
}

function extractPassages(storyId) {
    return localStorage.getItem('twine-passages').split(',')
        .map((pid) => readJsonFromLocalStorage(`twine-passages-${pid}`))
        .filter((passage) => passage.story === storyId);
}

function extractStory(storyId) {
    return {
        ...extractStory(storyId),
        passages: extractStory(storyId),
    };
}