import html from 'hyperhtml';
import { Icon } from './Icon.js';
import { listenForHotKey } from '../dom/listenForHotkeys.js';

export class Button extends html.Component {
    constructor(buttonConf) {
        super();
        this.setState(buttonConf);

        this._unbindHotkey = null;
    }

    ondisconnected() {
        if (this._unbindHotkey) {
            this._unbindHotkey();
        }
    }

    onclick() {
        const message = { action: this.state.name };
        window.postMessage(message, '*');
    }

    render() {
        if (this.state.hotkey) {
            if (this._unbindHotkey) {
                this._unbindHotkey();
            }

            this._unbindHotkey = listenForHotKey(this.state.hotkey, () => this.onclick());
        }

        const {title, icon, active} = this.state;

        if (title && icon && active) {
            return this.html`
                <button title="${chrome.i18n.getMessage(title)}" onclick="${this}">
                    ${Icon(icon)}
                </button>
            `;
        } else {
            return this.html``;
        }
    }
}