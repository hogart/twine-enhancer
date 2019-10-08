export class ButtonsConfig {
    /**
     * @param {Array<IButtonConfig>} buttonsMap
     * @param {typeof defaultOptions} options
     */
    constructor(buttonsMap, options) {
        this._list = [];
        this._byName = Object.create(null);

        for (const button of buttonsMap) {
            button.active = options[button.name];
            this._list.push(button);
            this._byName[button.name] = button;
        }
    }

    update(newOptions) {
        for (const button of this._list) {
            button.active = newOptions[button.name];
        }
    }

    list() {
        let counter = 0;
        const _list = this._list;
        return {
            *next() {
                yield _list[counter];
                counter++;
            },
        };
    }

    get(name) {
        const button = this._byName[name];
        if (button) {
            return button;
        } else {
            throw new Error(`No such button in config: "${name}"`);
        }
    }

    map(iterator) {
        return this._list.map(iterator);
    }

    mapRenderable(iterator) {
        return this._list.filter((button) => !!button.icon).map(iterator);
    }

    /**
     * @param {Array<IButtonConfig>} buttonsMap
     * @param {typeof defaultOptions} options
     * @returns ButtonsConfig
     */
    static getInstance(buttonsMap, options) {
        if (this._instance) {
            this._instance.update(options);
        } else {
            this._instance = new this(buttonsMap, options);
        }

        return this._instance;
    }
}