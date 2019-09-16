import { Component } from 'hyperhtml';
import { OverrideOptions } from './OverrideOptions.js';

export class SnippetModal extends Component {
    constructor(props) {
        super();
        const {parent, ...otherProps} = props;
        this._parent = parent;

        this.setState({
            value: '',
            override: {},
            ...otherProps,
        });

        this.onOverride = (override) => {
            this.setState({override});
        };
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

    render() {
        const overrideProps = {prefix: 'snippet', onInput: this.onOverride, cls: 'snippet'};
        return this.html`
            <p>${{html: chrome.i18n.getMessage('experimentalWarning')}}</p>
            <p>${{html: chrome.i18n.getMessage('addSnippetDlgHelp')}}</p>
            <textarea oninput="${this}" class="code snippet"></textarea>
            
            <div>
                ${OverrideOptions.for(overrideProps)}
            </div>

            <div class="buttons">
                <button onclick="${this}" data-call="cancel">${chrome.i18n.getMessage('cancel')}</button>
                <button onclick="${this}" data-call="confirm" disabled="${this.state.value === ''}" class="primary">${chrome.i18n.getMessage('confirm')}</button>
            </div>
        `;
    }
}