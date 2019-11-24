import { L10nComponent } from '../../shared/L10nComponent';
import { Button } from './Button.js';

export class ToolbarButtons extends L10nComponent {
    propsToState(props) {
        return {
            buttons: props,
        };
    }

    render() {
        return this.html`
            <div class="toolbarButtons">
                ${this.state.buttons.mapRenderable(button => new Button(button))}
            </div>
        `;
    }
}