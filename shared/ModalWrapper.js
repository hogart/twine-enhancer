import { L10nComponent } from './L10nComponent';

export class ModalWrapper extends L10nComponent {
    propsToState(props) {
        const {slotted, ...otherProps} = props;
        this._slotted = slotted;
        return {
            hidden: true,
            ...otherProps,
        };
    }

    onclick() {
        this.hide();
    }

    show() {
        this.setState({hidden: false});
    }

    hide() {
        this.setState({hidden: true});
    }

    render() {
        return this.html`
            <div class="modal-dialog-transition" hidden="${this.state.hidden}">
                <div id="modal-overlay" class="fade-in-out-transition"></div>
                <div class="modal-dialog">
                    <header>
                        <h2 class="title"><span>${{html: this.state.title}}</span></h2>
                        <button class="close subtle" onclick="${this}"><i class="fa fa-times"></i></button>
                    </header>
                    <div class="content">
                        ${this._slotted.for({...this.state, parent: this})}
                    </div>
                </div>
            </div>`;
    }
}