import { getCurrentStoryIfid } from './getCurrentStoryIfid';
import { importTwee } from 'aife-twee2/src/importTwee';
import { extractStory } from './extractStory';

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
 * @param {IPassage}newPassage
 * @return {IPassage}
 */
function mergePassage(existingPassage, newPassage) {
    existingPassage.text += `\n${newPassage.text}`;
    existingPassage.tags = mergeTags(existingPassage.tags || [], newPassage.tags);

    return existingPassage;
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

    if (toMerge.passages.length > 0) {
        if (story.passages.length === 0) {
            story.passages = toMerge.passages;
        } else {
            for (const [index, passage] of toMerge.passages.entries()) {
                const existingPassage = findPassageByTitle(story.passages, passage.title);
                if (existingPassage) {
                    if (override.passages) {
                        story.passages[existingPassage[0]] = passage;
                    } else {
                        story.passages[existingPassage[0]] = mergePassage(existingPassage[1], passage);
                    }
                } else {
                    if (!passage.position) {
                        Object.assign(passage, {
                            position: {
                                x: index * 25,
                                y: index * 125,
                            },
                        });
                    }
                    story.passages.push(passage);
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