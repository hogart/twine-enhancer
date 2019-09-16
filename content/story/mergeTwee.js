import { getCurrentStoryIfid } from './getCurrentStoryIfid';
import { importTwee } from 'aife-twee2/src/importTwee';
import { extractStory } from './extractStory';
import { inferPassagePosition } from './inferPassagePosition.js';

/**
 * @param {string} content
 * @param {string} storyTitle
 * @return {string}
 */
function wrapInsertion(content, storyTitle = 'untitled_snippet') {
    return `
/*** imported from "${storyTitle}" ***/
${content}
/*** /imported from "${storyTitle}" ***/
`;
}

/**
 * @param {IPassage[]} passages
 * @param {string} title
 * @return {null|TFoundPassage}
 */
function findPassageByTitle(passages, title) {
    for (const [index, passage] of passages.entries()) {
        if (passage.title === title) {
            return [index, passage];
        }
    }

    return null;
}

/**
 * @param {string[]}tags1
 * @param {string[]} tags2
 * @return {string[]}
 */
function mergeTags(tags1, tags2) {
    const result = [...tags1];
    tags2.forEach((tag) => {
        if (!result.includes(tag)) {
            result.push(tag);
        }
    });

    return result;
}

/**
 * @param {IPassage} existingPassage
 * @param {IPassage} newPassage
 * @return {IPassage}
 */
function mergePassage(existingPassage, newPassage) {
    existingPassage.text += `\n${newPassage.text}`;
    existingPassage.tags = mergeTags(existingPassage.tags || [], newPassage.tags);

    return existingPassage;
}

/**
 * @param {IPassage[]} passages
 * @return {IPassagePosition}
 */
function getSafeCoords(passages) {
    const bottomestPassage = passages.reduce((acc, passage) => {
        if (passage.position.y > acc.position.y) {
            acc = passage;
        }
        return acc;
    }, passages[0]);

    return {
        x: bottomestPassage.position.x + bottomestPassage.position.width,
        y: bottomestPassage.position.y + bottomestPassage.position.height,
    };
}

/**
 * @param {IStory} story
 * @param {IStory} toMerge
 * @param {IMergeOverride} override
 * @return {IStory}
 */
function mergeStories(story, toMerge, override) {
    if (toMerge.title && override.title) {
        story.title = toMerge.title;
    }

    if (toMerge.script) {
        story.script = override.script ? toMerge.script : story.script + wrapInsertion(toMerge.script, toMerge.title);
    }

    if (toMerge.styleSheet) {
        story.styleSheet = override.styleSheet ? toMerge.styleSheet : story.styleSheet + wrapInsertion(toMerge.styleSheet, toMerge.title);
    }

    if (override.meta) {
        if (toMerge.zoom) {
            story.zoom = toMerge.zoom;
        }
        if (toMerge.tagColors) {
            story.tagColors = toMerge.tagColors;
        }
    } else {
        if (toMerge.tagColors) {
            Object.assign(story.tagColors, toMerge.tagColors);
        }
    }

    if (toMerge.passages.length > 0) {
        if (story.passages.length === 0) {
            story.passages = toMerge.passages;
        } else {
            for (const [index, passage] of toMerge.passages.entries()) {
                const existingPassage = findPassageByTitle(story.passages, passage.title);
                const offset = getSafeCoords(story.passages);
                if (existingPassage) {
                    const existingIndex = existingPassage[0];
                    if (override.passages) {
                        story.passages[existingIndex] = {
                            id: story.passages[existingIndex].id,
                            ...inferPassagePosition(passage, index, offset),
                        };
                    } else {
                        story.passages[existingIndex] = mergePassage(existingPassage[1], passage);
                    }
                } else {
                    story.passages.push(inferPassagePosition(passage, index, offset));
                }
            }
        }
    }

    return story;
}

/**
 * @param {string} str
 * @param {IMergeOverride} override
 * @return {IStory}
 */
export function mergeTwee(str, override) {
    const storyId = getCurrentStoryIfid();

    if (storyId !== null) {
        const toMerge = importTwee(str);
        const story = extractStory(storyId);

        return mergeStories({...story, id: storyId}, toMerge, override);
    }
}