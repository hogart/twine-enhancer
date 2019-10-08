import { Component } from 'hyperhtml';
import { saveOptions } from '../../syncOptions.js';

class Option extends Component {
    constructor(props) {
        super();
        this.setState(props);
    }

    render() {
        const {value, name, parentVal } = this.state;
        return this.html`
            <option value="${value}" selected="${parentVal === value}">${name}</option>
        `;
    }
}

export class Select extends Component {
    constructor(props) {
        super();
        this.setState(props);
    }

    onchange(e) {
        saveOptions({
            [this.state.name]: e.currentTarget.value,
        });
    }

    render() {
        const { value, name, values } = this.state;

        return this.html`
            <label>
                <select name="${name}" onchange="${this}">
                    ${values.map((nameVal) => Option.for({parentVal: value, ...nameVal}))}
                </select>
                <span>${chrome.i18n.getMessage(name)}</span>
            </label>
        `;
    }
}