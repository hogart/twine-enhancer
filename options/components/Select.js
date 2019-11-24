import { L10nComponent } from '../../shared/L10nComponent';
import { saveOptions } from '../../syncOptions.js';

class Option extends L10nComponent {
    render() {
        const {value, name, parentVal } = this.state;
        return this.html`
            <option value="${value}" selected="${parentVal === value}">${name}</option>
        `;
    }
}

export class Select extends L10nComponent {
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
                <span>${this.$t(name)}</span>
            </label>
        `;
    }
}