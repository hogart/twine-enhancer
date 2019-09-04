import { getCurrentStoryIfid } from './story/getCurrentStoryIfid';
import { onHashMatch } from './onHashMatch.js';

export function detectStoryEditor(callback) {
    const storyId = getCurrentStoryIfid();
    if (storyId) {
        callback();
    }
    onHashMatch(getCurrentStoryIfid, callback);
}