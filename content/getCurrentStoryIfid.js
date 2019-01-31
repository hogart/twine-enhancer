import { ifidRe } from './detectStoryEditor';

export function getCurrentStoryIfid() {
    const urlMatch = ifidRe.exec(location.hash);
    if (urlMatch) {
        return urlMatch[0];
    } else {
        return null;
    }
}