import { L10nComponent } from '../../shared/L10nComponent';

export class ColorInput extends L10nComponent {
    onchange(event) {
        this.state.onChange({
            [this.state.tag]: event.currentTarget.value.trim(),
        });
    }

    render() {
        const {tag, color} = this.state;
        const style = {
            backgroundColor: color || 'transparent',
            border: `1px dashed ${color ? 'transparent' : 'silver'}`,
        };

        return this.html`
            <label class="colorInput">
                <span class="tagName">${tag}</span>
                <span class="swatch" style="${style}"></span>
                <input type="text" value="${color}" onchange="${this}"/>
            </label>
        `;
    }
}