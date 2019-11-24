import { L10nComponent } from '../../shared/L10nComponent';
import { saveOptions } from '../../syncOptions.js';

export class Checkbox extends L10nComponent {
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
                <span>${this.$t(name)}</span>
            </label>
        `;
    }
}