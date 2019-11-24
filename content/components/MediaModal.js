import { Component } from 'hyperhtml';

export class MediaModal extends Component {
    constructor(props) {
        super();
        const {parent, onMedia} = props;
        this._parent = parent;
        this.setState({
            files: [],
            onMedia,
        });
    }

    onchange(event) {
        const files = event.currentTarget.files;
        this.setState({files});
    }

    cancel() {
        this._hide();
    }

    _hide() {
        this._parent.hide();
    }

    confirm() {
        this.state.onMedia(this.state.files);
    }

    render() {
        const {files} = this.state;
        const hasFiles = files.length !== 0;

        const wrapperClass = [
            'mediaDlg',
        ].filter(str => !!str).join(' ');

        return this.html`
            <div class="${wrapperClass}">
                <p>${{html: chrome.i18n.getMessage('experimentalWarning')}}</p>
                <p>${{html: chrome.i18n.getMessage('addMediaWarning')}}</p>
                <p>${{html: chrome.i18n.getMessage('addMediaDlgHelp')}}</p>
                
                <label class="block mb-1">
                    <span>Choose as many files as you want</span>
                    <input type="file" accept="image/*,audio/*,video/*,.vtt" multiple name="file" onchange="${this}"/>
                </label>
                
                <div class="buttons">
                    <button onclick="${this}" data-call="cancel">${chrome.i18n.getMessage('cancel')}</button>
                    <button onclick="${this}" data-call="confirm" disabled="${!hasFiles}" class="primary">${chrome.i18n.getMessage('confirm')}</button>
                </div>
            </div>
        `;
    }
}