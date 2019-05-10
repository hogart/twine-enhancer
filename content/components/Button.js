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
        const {title, icon, active} = this.state;
        const hidden = !(title && icon && active);
        const titleAttr = title ? chrome.i18n.getMessage(title) : '';

        return this.html`
            <button hidden="${hidden}" title="${titleAttr}" onclick="${this}">
                ${Icon(icon)}
            </button>
        `;
    }
}