import { L10nComponent } from './L10nComponent';

export class ModalButtons extends L10nComponent {
    render() {
        const {disabled, ctx} = this.state;

        return this.html`
            <div class="buttons">
                <button onclick="${ctx}" data-call="cancel">${this.$t('cancel')}</button>
                <button onclick="${ctx}" data-call="confirm" disabled="${disabled}" class="primary">${this.$t('confirm')}</button>
            </div>
        `;
    }
}