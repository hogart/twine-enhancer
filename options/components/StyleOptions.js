import { L10nComponent } from '../../shared/L10nComponent';
import { Checkbox } from './Checkbox.js';

export class StyleOptions extends L10nComponent {
    get styleFields() {
        return ['wideEditors', 'neatPassages'];
    }

    render() {
        return this.html`
            <fieldset>
                <legend>${this.$t('styleChanges')}</legend>
                
                ${this.styleFields.map((name) => Checkbox.for({enabled: this.state[name], name}))}
            </fieldset>
        `;
    }
}