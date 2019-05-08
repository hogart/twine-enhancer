export function triggerEvent(element, type = 'click') {
    const event = new MouseEvent(type, {
        view: window,
        bubbles: true,
        cancelable: true,
    });

    element.dispatchEvent(event);
}