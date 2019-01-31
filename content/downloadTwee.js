import { getCurrentStoryIfid } from './getCurrentStoryIfid';
import { extractStory } from './extractStory';
import { exportTwee } from 'aife-twee2/src/exportTwee';
import { h } from './h';

export function downloadTwee() {
    const ifId = getCurrentStoryIfid();
    if (ifId !== null) {
        const story = extractStory(ifId);
        const twee = exportTwee(story);

        const url = URL.createObjectURL(new Blob([twee], { type: 'text/plain' }));

        const link = h('a', {href: url, download: `${story.title}.twee`});

        link.click();
    }
}