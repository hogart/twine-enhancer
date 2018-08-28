'use strict';

function snapCoord(coord) {
    return Math.round(coord / 25) * 25
}

function snapPassages() {
    const urlMatch = ifidRe.exec(location.hash);
    if (urlMatch) {
        const storyId = urlMatch[0];

        const passages = extractPassages(storyId);

        passages.forEach((passage) => {
            passage.left = snapCoord(passage.left);
            passage.top = snapCoord(passage.top);

            localStorage.setItem(`twine-passages-${passage.id}`, JSON.stringify(passage))
        });
    }
}