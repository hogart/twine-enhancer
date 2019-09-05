const listenersMap = new WeakMap();

export function onHashMatch(reOrMatcher, listener) {
    const callbacks = listenersMap.get(reOrMatcher);
    if (callbacks) {
        if (callbacks.includes(listener)) {
            return;
        } else {
            callbacks.push(listener);
            listenersMap.set(reOrMatcher, callbacks);
        }
    } else {
        listenersMap.set(reOrMatcher, [listener]);
    }

    window.addEventListener('hashchange', () => {
        if (typeof reOrMatcher === 'function') {
            const res = reOrMatcher(location.hash);
            if (res) {
                listener(res);
            }
        } else {
            const match = location.hash.match(reOrMatcher);
            if (match !== null) {
                listener(match);
            }
        }
    });
}