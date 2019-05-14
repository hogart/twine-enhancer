import { Component } from 'hyperhtml';
import { saveOptions } from '../../syncOptions.js';

export class Checkbox extends Component {
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
        const { enabled, name } = this.state;

        return this.html`
            <label>
                <input type="checkbox" name="${name}" checked="${enabled}" onchange="${this}"/>
                <span>${chrome.i18n.getMessage(name)}</span>
            </label>
        `;
    }
}