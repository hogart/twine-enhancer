import { Component } from 'hyperhtml';
import { Shortcut } from './Shortcut.js';

export class ShortcutsOptions extends Component {
    constructor(props) {
        super();
        this.setState(props);
    }

    // fields with visible buttons and optional shortcuts
    get shortcutFields() {
        return ['editJs', 'editCss', 'proofRead', 'publish', 'export', 'snap', 'theme', 'snippet', 'run', 'debug', 'openOptions'];
    }

    render() {
        return this.html`
            <fieldset>
                <legend>${chrome.i18n.getMessage('enableShortcuts')}</legend>
                <table class="shortcutGrid">
                    <thead>
                        <tr>
                            <th>Action name</th>
                            <th>Show button?</th>
                            <th>Shortcut <abbr title="Clear text to disable shortcut">*</abbr></th>
                        </tr>
                    </thead>
    
                    ${this.shortcutFields.map((name) => Shortcut.for({ enabled: this.state[name], name, hotKey: this.state[`${name}Hk`] }))}
                </table>
            </fieldset>
        `;
    }
}