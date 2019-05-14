import { Component } from 'hyperhtml';
import { Checkbox } from './Checkbox.js';
import { Select } from './Select.js';

export class OtherOptions extends Component {
    constructor(props) {
        super();
        this.setState(props);
    }

    get extensionOptions() {
        return [
            {name: '*.twee', value: 'twee'},
            {name: '*.tw2', value: 'tw2'},
        ];
    }

    render() {
        return this.html`
            <legend>${chrome.i18n.getMessage('otherSettings')}</legend>
            
            ${Checkbox.for({ enabled: this.state.import, name: 'import' })}
            
            ${Select.for({values: this.extensionOptions, name: 'tweeExtension', value: this.state.tweeExtension})}
        `;
    }
}