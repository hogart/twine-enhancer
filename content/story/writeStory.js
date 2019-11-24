import uuid from 'tiny-uuid';
import {
    readPassagesUids,
    readStoryUids,
    writeJson,
    writePassageUids,
    writeStoryUids,
} from './persistence';

export function writePassage(passage, storyId) {
    const id = passage.id || uuid();

    writeJson(`twine-passages-${id}`, {
        height: passage.position.height || 100,
        id,
        left: passage.position.x,
        name: passage.title,
        selected: false,
        story: storyId,
        tags: passage.tags,
        text: passage.text,
        top: passage.position.y,
        width: passage.position.width || 100,
    });

    return [id, passage.starting];
}

/**
 * @param {IStory} story
 */
export function writeStory(story) {
    if (story.ifid === undefined) {
        story.ifid = uuid().toUpperCase();
    }

    if (story.id === undefined) {
        story.id = uuid();
    }


    const { startPassage, addedPids } = story.passages.reduce((acc, /** {IPassage} */ passage) => {
        const [pid, starting] = writePassage(passage, story.id);
        acc.addedPids.push(pid);
        if (starting) {
            acc.startPassage = pid;
        }

        return acc;
    }, { startPassage: null, addedPids: [] });

    const existingPassages = readPassagesUids();
    const passageUidsSet = new Set([...existingPassages, ...addedPids]);
    writePassageUids(Array.from(passageUidsSet));


    writeJson(`twine-stories-${story.id}`, {
        id: story.id,
        ifid: story.ifid,
        lastUpdate: new Date(),
        name: story.title,
        script: story.script,
        snapToGrid: true,
        startPassage,
        storyFormat: story.format,
        storyFormatVersion: story.formatVer,
        stylesheet: story.styleSheet,
        tagColors: story.tagColors,
        zoom: story.zoom,
    });

    const existingStories = readStoryUids();
    const storyUidsSet = new Set([...existingStories, story.id]);
    writeStoryUids(Array.from(storyUidsSet));
}
