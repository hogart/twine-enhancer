import { readJson, readPassagesUids } from './persistence';

export function extractStoryMetaRaw(storyId) {
    return readJson(`twine-stories-${storyId}`);
}

/**
 * @param {string} storyId
 * @return {object}
 */
export function extractStoryMeta(storyId) {
    const rawMeta = extractStoryMetaRaw(storyId);
    return {
        title: rawMeta.name,
        ifid: rawMeta.ifid,
        lastEdit: rawMeta.lastUpdate,
        styleSheet: rawMeta.stylesheet,
        script: rawMeta.script,
        format: rawMeta.storyFormat,
        formatVer: rawMeta.storyFormatVersion,
        tagColors: rawMeta.tagColors,

        startPassage: rawMeta.startPassage,
    };
}

/**
 * @param {string} storyId
 * @param {string} [startPassage]
 * @return {object[]}
 */
export function extractPassages(storyId, startPassage = null) {
    return readPassagesUids()
        .reduce(
            (acc, pid, index) => {
                const rawPassage = readJson(`twine-passages-${pid}`);
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
