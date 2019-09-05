/**
 * @param {string} selector
 * @param {HTMLElement|Node} [parent=document]
 * @return {Promise<HTMLElement[]>}
 */
export function waitForElement(selector, parent = document) {
    return new Promise((resolve) => {
        const elem = parent.querySelectorAll(selector);
        if (elem.length) {
            resolve(elem);
            return;
        }

        const observer = new MutationObserver(callback);

        function callback(mutationsList) {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    const elem = parent.querySelectorAll(selector);
                    if (elem.length) {
                        observer.disconnect();
                        resolve(elem);
                    }
                }
            }
        }

        observer.observe(parent, {childList: true, subtree: true});
    });
}