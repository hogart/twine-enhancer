import { L10nComponent } from '../../shared/L10nComponent';
import { Checkbox } from './Checkbox.js';
import { Select } from './Select.js';

export class OtherOptions extends L10nComponent {
    get extensionOptions() {
        return [
            {name: '*.twee', value: 'twee'},
            {name: '*.tw2', value: 'tw2'},
        ];
    }

    render() {
        return this.html`
            <fieldset>
                <legend>${this.$t('otherSettings')}</legend>
                
                ${Checkbox.for({ enabled: this.state.import, name: 'import' })}
                
                ${Select.for({values: this.extensionOptions, name: 'tweeExtension', value: this.state.tweeExtension})}
            </fieldset>
        `;
    }
}