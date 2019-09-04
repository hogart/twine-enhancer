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
        this.state.onSnippet(this.state.value, this.state.override);
    }

    cancel() {
        this._parent.hide();
        this.setState({value: ''});
    }

    oninput(e) {
        this.setState({value: e.currentTarget.value.trim()});
    }

    onchange(e) {
        const name = e.currentTarget.name;
        const value = e.currentTarget.checked;

        this.setState({
            override: {
                ...this.state.override,
                [name]: value,
            },
        });
    }

    render() {
        return this.html`
            <p>${{html: chrome.i18n.getMessage('experimentalWarning')}}</p>
            <p>${{html: chrome.i18n.getMessage('addSnippetDlgHelp')}}</p>
            <textarea oninput="${this}" class="code snippet"></textarea>
            
            <div>
                <label>
                    <input type="checkbox" checked="${this.state.override.title}" name="title" onchange="${this}"/>
                    ${chrome.i18n.getMessage('addSnippetOverrideTitle')}
                </label>
                <label>
                    <input type="checkbox" checked="${this.state.override.script}" name="script" onchange="${this}"/>
                    ${chrome.i18n.getMessage('addSnippetOverrideScript')}
                </label>
                <label>
                    <input type="checkbox" checked="${this.state.override.styleSheet}" name="styleSheet" onchange="${this}"/>
                    ${chrome.i18n.getMessage('addSnippetOverrideStyleSheet')}
                </label>
                <label>
                    <input type="checkbox" checked="${this.state.override.passages}" name="passages" onchange="${this}"/>
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