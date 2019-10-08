const ifidRe = /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;

export function getCurrentStoryIfid(hash = location.hash) {
    const urlMatch = ifidRe.exec(hash);
    if (urlMatch) {
        return urlMatch[0];
    } else {
        return null;
    }
}