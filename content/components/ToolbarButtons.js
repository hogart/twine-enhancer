import { Component } from 'hyperhtml';
import { Button } from './Button.js';

export class ToolbarButtons extends Component {
    constructor(buttons) {
        super();
        this.state = {buttons};
    }

    render() {
        return this.html`
            <div class="toolbarButtons">
                ${this.state.buttons.mapRenderable(button => new Button(button))}
            </div>
        `;
    }
}