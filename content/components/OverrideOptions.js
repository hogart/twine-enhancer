import { loadOptions, saveOptions } from '../../syncOptions';
import { upperFirst } from '../../shared/upperFirst';
import { L10nComponent } from '../../shared/L10nComponent';

export class OverrideOptions extends L10nComponent {
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
                    ${this.$t('overrideTitle')}
                </label>
                <label class="overrideOption">
                    <input type="checkbox" checked="${this.state.overrideMeta}" name="overrideMeta" onchange="${this}"/>
                    ${this.$t('overrideMeta')}
                </label>
                <label class="overrideOption">
                    <input type="checkbox" checked="${this.state.overrideScript}" name="overrideScript" onchange="${this}"/>
                    ${this.$t('overrideScript')}
                </label>
                <label class="overrideOption">
                    <input type="checkbox" checked="${this.state.overrideStyleSheet}" name="overrideStyleSheet" onchange="${this}"/>
                    ${this.$t('overrideStyleSheet')}
                </label>
                <label class="overrideOption">
                    <input type="checkbox" checked="${this.state.overridePassages}" name="overridePassages" onchange="${this}"/>
                    ${this.$t('overridePassages')}
                </label>
            </div>
        `;
    }
}