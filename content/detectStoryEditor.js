import { getCurrentStoryIfid } from './story/getCurrentStoryIfid';

function runIfStory(callback) {
    const storyId = getCurrentStoryIfid();
    if (storyId !== null) {
        callback(storyId);
    }
}

export function detectStoryEditor(callback) {
    runIfStory(callback);

    function onHashChange() {
        runIfStory(callback);
    }

    window.addEventListener('hashchange', onHashChange, false);
}