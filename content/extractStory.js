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

/**
 * @param {string} storyId
 * @return {object}
 */
function extractStoryMeta(storyId) {
    const rawMeta = readJsonFromLocalStorage(`twine-stories-${storyId}`);
    return {
        title: rawMeta.name,
        ifid: rawMeta.ifid,
        lastEdit: rawMeta.lastUpdate,
        styleSheet: rawMeta.stylesheet,
        script: rawMeta.script,
        format: rawMeta.storyFormat,

        startPassage: rawMeta.startPassage,
    };
}

/**
 * @param {string} storyId
 * @param {string} [startPassage]
 * @return {object[]}
 */
export function extractPassages(storyId, startPassage = null) {
    return localStorage.getItem('twine-passages').split(',') // TODO: change to .reduce
        .reduce(
            (acc, pid, index) => {
                const rawPassage = readJsonFromLocalStorage(`twine-passages-${pid}`);
                if (rawPassage.story === storyId) {
                    const starting = startPassage === null ? false : startPassage === rawPassage.id;
                    acc.push({
                        title: rawPassage.name,
                        text: rawPassage.text,
                        pid: index,
                        tags: rawPassage.tags,
                        starting,
                        selected: rawPassage.selected,
                        position: {
                            x: rawPassage.left,
                            y: rawPassage.top,
                        },
                    });
                }

                return acc;
            },
            []
        );
}

/**
 * @param {string} storyId
 * @return {object}
 */
export function extractStory(storyId) {
    const { startPassage, ...meta} = extractStoryMeta(storyId);

    return {
        ...meta,
        passages: extractPassages(storyId, startPassage),
    };
}