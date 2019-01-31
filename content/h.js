/**
 * @param {string} tagName
 * @param {object} [attrs=null]
 * @param {string|Array<object|HTMLElement>} children
 * @return {HTMLElement}
 */
export function h(tagName, attrs = null, children = null) {
    const el = document.createElement(tagName);
    if (attrs) {
        Object.keys(attrs).forEach((attrName) => {
            if (attrName === 'tagName' || attrName === 'children') {
                return;
            }

            if (attrName === 'data') {
                Object.keys(attrs[attrName]).forEach((datasetName) => {
                    el.dataset[datasetName] = attrs[attrName][datasetName];
                });
            } else {
                el.setAttribute(attrName, attrs[attrName]);
            }
        });
    }

    if (children) {
        if (typeof children === 'string') {
            el.innerHTML = children;
        } else {
            children.forEach((child) => {
                const childEl = child instanceof HTMLElement ? child : h(child.tagName, child, child.children);
                el.appendChild(childEl);
            });
        }
    }

    return el;
}