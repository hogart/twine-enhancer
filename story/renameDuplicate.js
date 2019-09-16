import { extractStoryMetaRaw } from '../content/story/extractStory.js';

/**
 * @param {IStory} story
 */
export function renameDuplicate(story) {
    const meta = extractStoryMetaRaw(story.ifid);
    meta.name = `${meta.name}.${new Date()}.bak`;
    localStorage.setItem(`twine-stories-${story.ifid}`, JSON.stringify(meta));
}