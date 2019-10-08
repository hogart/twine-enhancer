import { readStoryUids } from './persistence.js';
import { extractStoryMeta } from './extractStory.js';

/**
 * @param {IStory} storyToImport
 * @return {null|IStory}
 */
export function detectDuplicates(storyToImport) {
    const uids = readStoryUids();
    for (const uid of uids) {
        const story = extractStoryMeta(uid);
        if (story.title === storyToImport.title) {
            return story;
        }
    }

    return null;
}