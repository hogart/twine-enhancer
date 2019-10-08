export function inferPassagePosition(passage, index, offset = {x: 0, y: 0}) {
    const pos = passage.position;
    if (!pos || (pos.x === undefined && pos.y === undefined)) {
        Object.assign(passage, {
            position: {
                x: index * 25,
                y: offset.y + index * 125,
            },
        });
    }

    return passage;
}