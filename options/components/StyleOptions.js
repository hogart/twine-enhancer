import { Component } from 'hyperhtml';
import { Checkbox } from './Checkbox.js';

export class StyleOptions extends Component {
    constructor(props) {
        super();
        this.setState(props);
    }

    get styleFields() {
        return ['wideEditors', 'neatPassages'];
    }

    render() {
        return this.html`
            <fieldset>
                <legend>${chrome.i18n.getMessage('styleChanges')}</legend>
                
                ${this.styleFields.map((name) => Checkbox.for({enabled: this.state[name], name}))}
            </fieldset>
        `;
    }
}