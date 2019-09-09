import { Component } from 'hyperhtml';
import { ShortcutsOptions } from './ShortcutsOptions.js';
import { StyleOptions } from './StyleOptions.js';
import { OtherOptions } from './OtherOptions.js';
import { clearOptions } from '../../syncOptions.js';

export class AllOptions extends Component {
    constructor(props) {
        super();
        this.setState(props);
    }

    async onclick(e) {
        e.preventDefault();

        await clearOptions();
    }

    render() {
        return this.html`
            ${ShortcutsOptions.for(this.state)}
            
            ${StyleOptions.for(this.state)}
            
            ${OtherOptions.for(this.state)}
            
            <button onclick="${this}">${chrome.i18n.getMessage('resetSettings')}</button>
        `;
    }
}