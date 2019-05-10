import html from 'hyperhtml';
import { saveOptions } from '../../syncOptions.js';

export class Checkbox extends html.Component {
    constructor(props) {
        super();
        this.setState(props);
    }

    onchange(e) {
        saveOptions({
            [this.state.name]: e.currentTarget.checked,
        });
    }

    render() {
        const { enabled, label, name } = this.state;

        return this.html`
            <label>
                <input type="checkbox" name="${name}" checked="${enabled}" onchange="${this}"/>
                <span>${chrome.i18n.getMessage(label)}</span>
            </label>
        `;
    }
}