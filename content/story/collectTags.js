import { writeStory } from './writeStory';
import { getCurrentStoryIfid } from './getCurrentStoryIfid';
import { extractStory } from './extractStory';

export function collectTags() {
    const storyId = getCurrentStoryIfid();
    if (storyId) {
        const story = extractStory(storyId);
        const uncoloredTags = story.passages.reduce((acc, passage) => {
            passage.tags.forEach((tag) => {
                if (!(tag in story.tagColors)) {
                    acc[tag] = '';
                }
            });

            return acc;
        }, {});

        return Object.assign(uncoloredTags, story.tagColors);
    }

    return {};
}

export function saveTags(tags) {
    const storyId = getCurrentStoryIfid();
    if (storyId) {
        const story = extractStory(storyId);

        const tagColors = {};
        for (const [tag, color] of Object.entries(tags)) {
            if (color !== '') {
                tagColors[tag] = color;
            }
        }

        story.tagColors = tagColors;
        writeStory(story);
    }
}