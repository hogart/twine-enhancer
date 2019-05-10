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
        return this._list.filter((button) => button.title && button.icon).map(iterator);
    }
}

export const buttonsMap = [
    {
        name: 'editJs',
        icon: 'terminal',
        title: 'editJs',
        hotkey: 'alt+j',
    },
    {
        name: 'editCss',
        icon: 'css3',
        title: 'editCss',
        hotkey: 'alt+c',
    },
    {
        name: 'proofRead',
        icon: 'book',
        title: 'proofRead',
        hotkey: 'f4',
    },
    {
        name: 'publish',
        icon: 'download',
        title: 'download',
        hotkey: 'ctrl+s',
    },
    {
        name: 'export',
        icon: 'file-code-o',
        title: 'exportAsTwee',
        hotkey: 'ctrl+e',
    },
    {
        name: 'snap',
        icon: 'sitemap',
        title: 'snapPassages',
    },
    {
        name: 'theme',
        icon: 'moon-o',
        title: 'toggleDarkLightTheme',
    },
    {
        name: 'snippet',
        icon: 'puzzle-piece',
        title: 'insertSnippet',
        hotkey: 'alt+a',
    },
    {
        name: 'run',
        hotkey: 'shift+f10',
    },
    {
        name: 'debug',
        hotkey: 'shift+f9',
    },
];