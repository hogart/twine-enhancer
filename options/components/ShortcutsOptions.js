import { Component } from 'hyperhtml';
import { Shortcut } from './Shortcut.js';
import { HotKey } from './HotKey.js';

export class ShortcutsOptions extends Component {
    constructor(props) {
        super();
        this.setState(props);
    }

    // fields with visible buttons and optional shortcuts
    get shortcutFields() {
        return ['editJs', 'editCss', 'proofRead', 'publish', 'export', 'snap', 'theme', 'snippet'];
    }

    // fields with hotkeys only
    get hotkeyFields() {
        return ['run', 'debug'];
    }

    render() {
        return this.html`
            <legend>${chrome.i18n.getMessage('enableShortcuts')}</legend>
            
            ${this.shortcutFields.map((name) => Shortcut.for({ enabled: this.state[name], name, hotKey: this.state[`${name}Hk`] }))}
            
            ${this.hotkeyFields.map((name) => HotKey.for({ name, hotKey: this.state[`${name}Hk`] }))}
        `;
    }
}