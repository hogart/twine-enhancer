import { AbstractModal } from '../../shared/AbstractModal';
import { OverrideOptions } from './OverrideOptions.js';
import { ModalButtons } from '../../shared/ModalButtons';

export class SnippetModal extends AbstractModal {
    constructor(props) {
        super(props);

        this.onOverride = (override) => {
            this.setState({override});
        };
    }

    propsToState(props) {
        const otherProps = super.propsToState(props);

        return {
            value: '',
            override: {},
            ...otherProps,
        };
    }

    confirm() {
        this.state.onSnippet(this.state.value, this.state.override);
    }

    cancel() {
        super.cancel();
        this.setState({value: ''});
    }

    oninput(e) {
        this.setState({value: e.currentTarget.value.trim()});
    }

    render() {
        const overrideProps = {prefix: 'snippet', onInput: this.onOverride, cls: 'snippet'};

        return this.html`
            <div class="snippetDlg">
                <p>${{html: this.$t('experimentalWarning')}}</p>
                <p>${{html: this.$t('addSnippetDlgHelp')}}</p>
                <textarea oninput="${this}" class="code snippet"></textarea>
                
                <div>
                    ${OverrideOptions.for(overrideProps)}
                </div>
    
                ${ModalButtons.for({ctx: this, disabled: this.state.value === ''})}           
            </div>
        `;
    }
}