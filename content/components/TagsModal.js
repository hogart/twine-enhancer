import { AbstractModal } from '../../shared/AbstractModal';
import { ModalButtons } from '../../shared/ModalButtons';
import { ColorInput } from './ColorInput';
import { collectTags, saveTags } from '../story/collectTags';
import { Datalist } from '../../shared/Datalist';
import { webColors } from '../../shared/webColors';

export class TagsModal extends AbstractModal {
    constructor(props) {
        super(props);
        this.onChange = this._onChange.bind(this);
        this.setState({
            tags: collectTags(),
        });
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
        saveTags(this.state.tags);
        this.state.onSubmit();
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

                ${Datalist.for({id: 'colors', values: webColors})}

                ${ModalButtons.for({ctx: this, disabled: false})}
            </div>
        `;
    }
}