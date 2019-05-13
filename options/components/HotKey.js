import html from 'hyperhtml';
import { saveOptions } from '../../syncOptions.js';

export class HotKey extends html.Component {
    constructor(props) {
        super();
        this.setState(props);
    }

    oninput(e) {
        saveOptions({
            [this.state.name]: e.currentTarget.value.trim(),
        });
    }

    render() {
        const { label, hotKey, name } = this.state;
        const labelKey = label || `${name}Label`;

        return this.html`
            <div class="settingsItem">
                <label>
                    <input type="text" value="${hotKey}" oninput="${this}" class="hotKeyInput"/>
                    <span>${chrome.i18n.getMessage(labelKey)}</span>
                </label>
            </div>
        `;
    }
}