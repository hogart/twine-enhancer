import { L10nComponent } from '../../shared/L10nComponent';
import { ShortcutsOptions } from './ShortcutsOptions.js';
import { StyleOptions } from './StyleOptions.js';
import { OtherOptions } from './OtherOptions.js';
import { clearOptions } from '../../syncOptions.js';

export class AllOptions extends L10nComponent {
    async onclick(e) {
        e.preventDefault();

        await clearOptions();
    }

    render() {
        return this.html`
            ${ShortcutsOptions.for(this.state)}
            
            ${StyleOptions.for(this.state)}
            
            ${OtherOptions.for(this.state)}
            
            <button onclick="${this}">${this.$t('resetSettings')}</button>
        `;
    }
}