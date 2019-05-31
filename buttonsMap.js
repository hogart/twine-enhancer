export class ButtonsConfig {
    /**
     * @param {Array<IButtonConfig>} list
     * @param {object} options
     */
    constructor(list, options) {
        this._list = [];
        this._byName = Object.create(null);

        for (const button of list) {
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
}

export const buttonsMap = [
    {
        name: 'editJs',
        icon: 'terminal',
    },
    {
        name: 'editCss',
        icon: 'css3',
    },
    {
        name: 'proofRead',
        icon: 'book',
    },
    {
        name: 'publish',
        icon: 'download',
    },
    {
        name: 'export',
        icon: 'file-code-o',
    },
    {
        name: 'snap',
        icon: 'sitemap',
    },
    {
        name: 'theme',
        icon: 'moon-o',
    },
    {
        name: 'snippet',
        icon: 'puzzle-piece',
    },
    {
        name: 'openOptions',
        icon: 'cog',
    },
    {
        name: 'run',
    },
    {
        name: 'debug',
    },
];