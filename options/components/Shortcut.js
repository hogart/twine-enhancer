import html from 'hyperhtml';
import { saveOptions } from '../../syncOptions.js';

export class Shortcut extends html.Component {
    constructor(props) {
        super();
        this.setState(props);
    }

    onchange(e) {
        saveOptions({
            [this.state.name]: e.currentTarget.checked,
        });
    }

    oninput(e) {
        saveOptions({
            [this.state.name]: e.currentTarget.value,
        });
    }

    render() {
        const {enabled, label, hotKey, name} = this.state;
        const labelKey = label || `${name}Label`;

        return this.html`
            <div class="settingsItem">
                <label>
                    <input type="checkbox" name="${name}" checked="${enabled}" onchange="${this}"/>
                    <span>${chrome.i18n.getMessage(labelKey)}</span>
                </label>
                <input type="text" value="${hotKey}" oninput="${this}" class="hotKeyInput"/>
            </div>
        `;
    }
}