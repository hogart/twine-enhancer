import { Component } from 'hyperhtml';
import {homepage_url} from '../../manifest.json';

export class ImportModal extends Component {
    constructor(props) {
        super();
        const {parent, ...otherProps} = props;
        this._parent = parent;
        this.setState({
            error: '',
            makeBackup: true,
            files: [],
            ...otherProps,
        });
    }

    async onchange(e) {
        this.setState({files: e.currentTarget.files, error: ''});
    }

    onMakeBackup() {
        this.setState({
            makeBackup: !this.state.makeBackup,
        });
    }

    async confirm() {
        try {
            await this.state.onFileChange(this.state.files, this.state.makeBackup);
            this._hide();
            location.reload();
        } catch (e) {
            this.setState({error: e.message});
        }
    }

    cancel() {
        this._hide();
    }

    _hide() {
        this._parent.hide();
    }

    render() {
        const {files, error} = this.state;
        const wrapperClass = `importDlg${error ? ' error' : ''}`;

        return this.html`
            <div class="${wrapperClass}">
                <p>${{html: chrome.i18n.getMessage('experimentalWarning')}}</p>
                <p>${{html: chrome.i18n.getMessage('importDlgHelp')}}</p>
                
                <p class="importDlg-error">${{html: chrome.i18n.getMessage('importDlgError', {homepage_url})}}</p>
                <pre class="importDlg-error">${error}</pre>
                
                <label class="block mb-1">
                    <input type="file" accept=".twee,.tw2" onchange="${this}"/>
                </label>

                <div class="buttons">
                    <button onclick="${this}" data-call="cancel">${chrome.i18n.getMessage('cancel')}</button>
                    <button onclick="${this}" data-call="confirm" disabled="${files.length === 0}" class="primary">${chrome.i18n.getMessage('confirm')}</button>
                </div>
            </div>
        `;
    }
}