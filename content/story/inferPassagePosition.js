export function inferPassagePosition(passage, index) {
    if (!passage.position) {
        Object.assign(passage, {
            position: {
                x: index * 25,
                y: index * 125,
            },
        });
    }

    return passage;
}