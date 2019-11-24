import { L10nComponent } from '../../shared/L10nComponent';
import { saveOptions } from '../../syncOptions.js';

export class Shortcut extends L10nComponent {
    constructor(props) {
        super(props);

        const hkName = `${props.name}Hk`;
        this.setState({
            hkName,
        });
    }

    onchange(e) {
        saveOptions({
            [this.state.name]: e.currentTarget.checked,
        });
    }

    oninput(e) {
        saveOptions({
            [this.state.hkName]: e.currentTarget.value.trim(),
        });
    }

    render() {
        const {enabled, hotKey, name} = this.state;

        const noButtonClass = ['debug', 'run'].includes(name) ? ' noButton' : '';
        const trClass = `shortcutItem${noButtonClass}`;

        /* eslint-disable indent */
        return this.html`
            <tr class="${trClass}">
                <td>${this.$t(name)}</td>
                <td>
                    <input type="checkbox" name="${name}" checked="${enabled}" onchange="${this}"/>
                </td>
                <td>
                <input type="text" value="${hotKey}" oninput="${this}" class="hotKeyInput"/>
                </td>
            </tr>
        `;
        /* eslint-enable indent */
    }
}