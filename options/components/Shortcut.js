import html from 'hyperhtml';
import { saveOptions } from '../../syncOptions.js';

export class Shortcut extends html.Component {
    constructor(props) {
        super();
        const hkName = `${props.name}Hk`;
        this.setState({
            hkName,
            ...props,
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
                <td>${chrome.i18n.getMessage(name)}</td>
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