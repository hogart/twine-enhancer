import { L10nComponent } from '../../shared/L10nComponent';
import { Icon } from './Icon.js';

export class Button extends L10nComponent {
    onclick() {
        const message = { action: this.state.name };
        window.postMessage(message, '*');
    }

    render() {
        const {icon, active, name} = this.state;
        const titleAttr = this.$t(name);
        const clsName = `action-${name}`;
        return this.html`
            <button hidden="${!active}" class="${clsName}" title="${titleAttr}" onclick="${this}">
                ${Icon(icon)}
            </button>
        `;
    }
}