import { Component } from 'hyperhtml';
import { loadOptions, saveOptions } from '../../syncOptions';

export class SnippetModal extends Component {
    constructor(props) {
        super();
        const {parent, ...otherProps} = props;
        this._parent = parent;

        this.setState({
            value: '',

            snippetOverrideTitle: false,
            snippetOverrideScript: false,
            snippetOverrideStyleSheet: false,
            snippetOverridePassages: false,

            ...otherProps,
        });

        this._loadOverrideOptions();
    }

    _loadOverrideOptions() {
        loadOptions().then((options) => {
            this.setState({
                snippetOverrideTitle: options.snippetOverrideTitle,
                snippetOverrideScript: options.snippetOverrideScript,
                snippetOverrideStyleSheet: options.snippetOverrideStyleSheet,
                snippetOverridePassages: options.snippetOverridePassages,
            });
        });

    }

    confirm() {
        const override = {
            title: this.state.snippetOverrideTitle,
            script: this.state.snippetOverrideScript,
            styleSheet: this.state.snippetOverrideStyleSheet,
            passages: this.state.snippetOverridePassages,
        };
        this.state.onSnippet(this.state.value, override);
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
            ...this.state.override,
            [name]: value,
        });

        saveOptions({
            [name]: value,
        });
    }

    render() {
        return this.html`
            <p>${{html: chrome.i18n.getMessage('experimentalWarning')}}</p>
            <p>${{html: chrome.i18n.getMessage('addSnippetDlgHelp')}}</p>
            <textarea oninput="${this}" class="code snippet"></textarea>
            
            <div>
                <label>
                    <input type="checkbox" checked="${this.state.snippetOverrideTitle}" name="snippetOverrideTitle" onchange="${this}"/>
                    ${chrome.i18n.getMessage('addSnippetOverrideTitle')}
                </label>
                <label>
                    <input type="checkbox" checked="${this.state.snippetOverrideScript}" name="snippetOverrideScript" onchange="${this}"/>
                    ${chrome.i18n.getMessage('addSnippetOverrideScript')}
                </label>
                <label>
                    <input type="checkbox" checked="${this.state.snippetOverrideStyleSheet}" name="snippetOverrideStyleSheet" onchange="${this}"/>
                    ${chrome.i18n.getMessage('addSnippetOverrideStyleSheet')}
                </label>
                <label>
                    <input type="checkbox" checked="${this.state.snippetOverridePassages}" name="snippetOverridePassages" onchange="${this}"/>
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