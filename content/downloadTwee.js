import hyper from 'hyperhtml';
import { exportTwee } from 'aife-twee2/src/exportTwee';

import { getCurrentStoryIfid } from './story/getCurrentStoryIfid';
import { extractStory } from './story/extractStory';
import { loadOptions } from '../syncOptions';

export async function downloadTwee() {
    const ifId = getCurrentStoryIfid();
    if (ifId !== null) {
        const story = extractStory(ifId);
        const twee = exportTwee(story);
        const options = await loadOptions();

        const url = URL.createObjectURL(new Blob([twee], { type: 'text/plain' }));
        const title = `${story.title}.${options.tweeExtension}`;
        const link = hyper`<a href="${url}" download="${title}"></a>`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}