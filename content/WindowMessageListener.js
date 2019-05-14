export class WindowMessageListener {
    constructor(actionMap = {}) {
        this._actionMap = Object.create(null);
        this.add(actionMap);

        window.addEventListener(
            'message',
            (request) => {
                if (request.data && request.data.action) {
                    const action = this._actionMap[request.data.action];

                    if (typeof action === 'function') {
                        action(request.data);
                    }
                }
            }
        );
    }

    add(actionMap) {
        Object.assign(this._actionMap, actionMap);
    }
}