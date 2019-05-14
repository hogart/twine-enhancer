import { Component } from 'hyperhtml';
import { Icon } from './Icon.js';

export class DashboardButton extends Component {
    constructor(buttonConf) {
        super();
        this.setState(buttonConf);
    }

    onclick() {
        const message = { action: this.state.name };
        window.postMessage(message, '*');
    }

    render() {
        const { icon, text, active } = this.state;

        return this.html`
            <button hidden="${!active}" class="block _enhancer-button" onclick="${this}">
                ${Icon(icon)}
                ${text}
            </button>
        `;
    }
}