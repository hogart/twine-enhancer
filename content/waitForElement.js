export function waitForElement(selector, parent = document) {
    return new Promise((resolve) => {
        function getElem() {
            const elem = parent.querySelectorAll(selector);
            if (elem.length) {
                resolve(elem);
            } else {
                setTimeout(getElem);
            }
        }

        getElem();
    });
}