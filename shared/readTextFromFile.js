import { readFileAsync } from './readFileAsync.js';

/**
 * @param {FileList} files
 * @return {Promise<string>|Promise<null>}
 */
export function readTextFromFile(files) {
    if (files.length) {
        return readFileAsync(files[0]);
    } else {
        return Promise.resolve(null);
    }
}