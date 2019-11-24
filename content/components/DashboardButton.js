import { L10nComponent } from '../../shared/L10nComponent';
import { Icon } from './Icon.js';

export class DashboardButton extends L10nComponent {
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