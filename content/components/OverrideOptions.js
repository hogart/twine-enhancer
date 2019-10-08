import { Component } from 'hyperhtml';
import { loadOptions, saveOptions } from '../../syncOptions';

function upperFirst(str) {
    return str.slice(0, 1).toLocaleUpperCase() + str.slice(1);
}

export class OverrideOptions extends Component {
    get _fieldNames()  {
        return ['overrideTitle', 'overrideMeta', 'overrideScript', 'overrideStyleSheet', 'overridePassages'];
    }

    constructor(props) {
        super();
        this._prefix = props.prefix;
        this.onInput = props.onInput;
        this.cls = [`overrideOptions-${props.prefix}`, props.cls].join(' ');

        this._loadOverrideOptions();
    }

    _loadOverrideOptions() {
        loadOptions().then((options) => {
            const state = this._fieldNames.reduce((state, field) => {
                state[field] = options[`${this._prefix}${upperFirst(field)}`];
                return state;
            }, {});

            this.setState(state);
        });
    }

    async onchange(e) {
        const field = e.currentTarget.name;
        const value = e.currentTarget.checked;

        await saveOptions({
            [`${this._prefix}${upperFirst(field)}`]: value,
        });

        this.setState({
            [field]: value,
        });

        this.onInput(this.state);
    }

    render() {
        return this.html`                
            <div class="${this.cls}">
                <label class="overrideOption">
                    <input type="checkbox" checked="${this.state.overrideTitle}" name="overrideTitle" onchange="${this}"/>
                    ${chrome.i18n.getMessage('overrideTitle')}
                </label>
                <label class="overrideOption">
                    <input type="checkbox" checked="${this.state.overrideMeta}" name="overrideMeta" onchange="${this}"/>
                    ${chrome.i18n.getMessage('overrideMeta')}
                </label>
                <label class="overrideOption">
                    <input type="checkbox" checked="${this.state.overrideScript}" name="overrideScript" onchange="${this}"/>
                    ${chrome.i18n.getMessage('overrideScript')}
                </label>
                <label class="overrideOption">
                    <input type="checkbox" checked="${this.state.overrideStyleSheet}" name="overrideStyleSheet" onchange="${this}"/>
                    ${chrome.i18n.getMessage('overrideStyleSheet')}
                </label>
                <label class="overrideOption">
                    <input type="checkbox" checked="${this.state.overridePassages}" name="overridePassages" onchange="${this}"/>
                    ${chrome.i18n.getMessage('overridePassages')}
                </label>
            </div>
        `;
    }
}