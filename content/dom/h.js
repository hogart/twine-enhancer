import { parseHtml } from './parseHtml';

/**
 * @param {string} tagName
 * @param {object} [attrs=null]
 * @param {string|Array<object|HTMLElement>} children
 * @return {HTMLElement}
 */
export function h(tagName, attrs = null, children = null) {
    if (tagName.match(/[^a-z]/i) !== null) {
        return parseHtml(tagName);
    }

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
                let childEl;
                if (child instanceof HTMLElement) {
                    childEl = child;
                } else if (typeof child === 'string') {
                    childEl = document.createTextNode(child);
                } else {
                    childEl = h(child.tagName, child, child.children);
                }

                el.appendChild(childEl);
            });
        }
    }

    return el;
}