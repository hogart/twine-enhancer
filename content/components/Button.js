import html from 'hyperhtml';
import { Icon } from './Icon.js';

export class Button extends html.Component {
    constructor(buttonConf) {
        super();
        this.setState(buttonConf);
    }

    onclick() {
        const message = { action: this.state.name };
        window.postMessage(message, '*');
    }

    render() {
        const {icon, active} = this.state;
        const titleAttr = chrome.i18n.getMessage(name);

        return this.html`
            <button hidden="${!active}" title="${titleAttr}" onclick="${this}">
                ${Icon(icon)}
            </button>
        `;
    }
}