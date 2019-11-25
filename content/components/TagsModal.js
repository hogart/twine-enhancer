import { AbstractModal } from '../../shared/AbstractModal';
import { ModalButtons } from '../../shared/ModalButtons';
import { ColorInput } from './ColorInput';

export class TagsModal extends AbstractModal {
    constructor(props) {
        super(props);
        this.onChange = this._onChange.bind(this);
    }

    propsToState(props) {
        return super.propsToState(props);
    }

    _onChange(tagColor) {
        this.setState({
            tags: {
                ...this.state.tags,
                ...tagColor,
            },
        });
    }

    confirm() {
        this.state.onSubmit(this.state.tags);
    }

    render() {
        const wrapperClass = [
            'tagsDlg',
        ].filter(str => !!str).join(' ');
        const {tags} = this.state;

        return this.html`
            <div class="${wrapperClass}">
                <p>${{html: this.$t('tagsDlgHelp')}}</p>

                <div class="colors">
                    ${Object.keys(tags).map((tag) => ColorInput.for({tag, color: tags[tag], onChange: this.onChange}))}
                </div>

                ${ModalButtons.for({ctx: this, disabled: false})}
            </div>
        `;
    }
}