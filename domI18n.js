/**
 * @param {Element} root
 */
export function domI18n(root) {
    root.querySelectorAll('[data-i18n]').forEach((element) => {
        const key = element.dataset.i18n;
        const msg = chrome.i18n.getMessage(key);
        element.innerHTML = msg;
    });
}