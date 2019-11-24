import { readFileAsync } from '../../shared/readFileAsync';

/**
 * @param {File} image
 * @return {string}
 */
export async function createMediaSnippet(image) {
    const content = await readFileAsync(image, 'readAsDataURL');

    let type = 'image';
    if (image.type.startsWith('video/')) {
        type = 'video';
    } else if (image.type.startsWith('audio/')) {
        type = 'audio';
    } else if (image.name.endsWith('.vtt')) {
        type = 'vtt';
    }

    return `::${image.name} [Twine.${type}]
${content}`;
}