import { Component } from 'hyperhtml';

export class SnippetModal extends Component {
    constructor(props) {
        super();
        const {parent, ...otherProps} = props;
        this._parent = parent;
        this.setState({
            value: '',
            override: {
                title: false,
                script: false,
                styleSheet: false,
                passages: false,
            },

            ...otherProps,
        });
    }

    confirm() {
        this.state.onSnippet(this.state.value);
    }

    cancel() {
        this._parent.hide();
        this.setState({value: ''});
    }

    oninput(e) {
        this.setState({value: e.currentTarget.value.trim()});
    }

    render() {
        return this.html`
            <p>${{html: chrome.i18n.getMessage('experimentalWarning')}}</p>
            <p>${{html: chrome.i18n.getMessage('addSnippetDlgHelp')}}</p>
            <textarea oninput="${this}" class="code snippet"></textarea>
            
            <div>
                <label>
                    <input type="checkbox" checked="${this.state.override.title}"/>
                    ${chrome.i18n.getMessage('addSnippetOverrideTitle')}
                </label>
                <label>
                    <input type="checkbox" checked="${this.state.override.script}"/>
                    ${chrome.i18n.getMessage('addSnippetOverrideScript')}
                </label>
                <label>
                    <input type="checkbox" checked="${this.state.override.styleSheet}"/>
                    ${chrome.i18n.getMessage('addSnippetOverrideStyleSheet')}
                </label>
                <label>
                    <input type="checkbox" checked="${this.state.override.passages}"/>
                    ${chrome.i18n.getMessage('addSnippetOverridePassages')}
                </label>
            </div>

            <div class="buttons">
                <button onclick="${this}" data-call="cancel">${chrome.i18n.getMessage('cancel')}</button>
                <button onclick="${this}" data-call="confirm" disabled="${this.state.value === ''}" class="primary">${chrome.i18n.getMessage('confirm')}</button>
            </div>
        `;
    }
}