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

        return this.html`
            <div>
                <label>
                    <input type="checkbox" name="${name}" checked="${enabled}" onchange="${this}"/>
                    <span>${chrome.i18n.getMessage(label)}</span>
                </label>
                <input type="text" value="${hotKey}" oninput="${this}"/>
            </div>
        `;
    }
}