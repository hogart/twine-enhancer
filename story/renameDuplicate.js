import { extractStoryMetaRaw } from '../content/story/extractStory.js';

/**
 * @param {IStory} story
 */
export function renameDuplicate(story) {
    const meta = extractStoryMetaRaw(story.id);
    const date = new Date().toLocaleString();
    meta.name = `${meta.name}.${date}.bak`;
    localStorage.setItem(`twine-stories-${story.id}`, JSON.stringify(meta));
}