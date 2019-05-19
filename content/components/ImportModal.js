import { Component } from 'hyperhtml';

export class ImportModal extends Component {
    constructor(props) {
        super();
        const {parent, ...otherProps} = props;
        this._parent = parent;
        this.setState(otherProps);
    }

    onchange(e) {
        this.state.onFileChange(e.currentTarget);
    }

    cancel() {
        this._parent.hide();
    }

    render() {
        return this.html`
            <p>${{html: chrome.i18n.getMessage('experimentalWarning')}}</p>
            <p>${{html: chrome.i18n.getMessage('importDlgHelp')}}</p>
            <input type="file" accept=".twee,.tw2" onchange="${this}"/>
            <div class="buttons">
                <button onclick="${this}" data-call="cancel">${chrome.i18n.getMessage('cancel')}</button>
            </div>
        `;
    }
}