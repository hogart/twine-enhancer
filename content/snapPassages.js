import { extractPassages } from './extractStory';
import { getCurrentStoryIfid } from './getCurrentStoryIfid';

function snapCoord(coord) {
    return Math.round(coord / 25) * 25;
}

export function snapPassages() {
    const storyId = getCurrentStoryIfid();
    if (storyId !== null) {
        const passages = extractPassages(storyId);

        passages.forEach((passage) => {
            passage.left = snapCoord(passage.left);
            passage.top = snapCoord(passage.top);

            localStorage.setItem(`twine-passages-${passage.id}`, JSON.stringify(passage));
        });
    }
}