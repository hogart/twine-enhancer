let domParser;
export function parseHtml(str) {
    domParser = domParser || new DOMParser();

    if (typeof str === 'string') {
        return domParser.parseFromString(str, 'text/html').body.firstChild;
    } else if (str instanceof Node) {
        return str;
    }
}