import { AbstractModal } from '../../shared/AbstractModal';
import { ModalButtons } from '../../shared/ModalButtons';

export class MediaModal extends AbstractModal {
    propsToState(props) {
        const {onMedia} = super.propsToState(props);
        return {
            files: [],
            onMedia,
        };
    }

    onchange(event) {
        const files = event.currentTarget.files;
        this.setState({files});
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
                <p>${{html: this.$t('experimentalWarning')}}</p>
                <p>${{html: this.$t('addMediaWarning')}}</p>
                <p>${{html: this.$t('addMediaDlgHelp')}}</p>
                
                <label class="block mb-1">
                    <span>Choose as many files as you want</span>
                    <input type="file" accept="image/*,audio/*,video/*,.vtt" multiple name="file" onchange="${this}"/>
                </label>
                
                ${ModalButtons.for({ctx: this, disabled: !hasFiles})}
            </div>
        `;
    }
}