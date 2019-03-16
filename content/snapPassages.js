import { extractPassages } from './story/extractStory';
import { getCurrentStoryIfid } from './getCurrentStoryIfid';
import { writePassage } from './story/writeStory';

function snapCoord(coord) {
    return Math.round(coord / 25) * 25;
}

function snapPosition(position) {
    return {
        x: snapCoord(position.x),
        y: snapCoord(position.y),
    };
}

export function snapPassages() {
    const storyId = getCurrentStoryIfid();
    if (storyId !== null) {
        const passages = extractPassages(storyId);

        passages.forEach((passage) => {
            passage.position = snapPosition(passage.position);

            writePassage(passage, storyId);
        });
    }
}