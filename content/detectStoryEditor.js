import { getCurrentStoryIfid } from './story/getCurrentStoryIfid';
import { onHashMatch } from './utils/onHashMatch.js';

export function detectStoryEditor(callback) {
    const storyId = getCurrentStoryIfid();
    if (storyId) {
        callback();
    }
    onHashMatch(getCurrentStoryIfid, callback);
}