/**
 * @param {File} file
 * @param {'readAsText' | 'readAsDataURL'} readAs
 * @return {Promise<string>}
 */
export function readFileAsync(file, readAs = 'readAsText') {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader[readAs](file);
    });
}