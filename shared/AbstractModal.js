import { L10nComponent } from './L10nComponent';

export class AbstractModal extends L10nComponent {
    constructor(props) {
        super(props);
    }

    propsToState(props) {
        const {parent, ...otherProps} = props;

        this._parent = parent;

        return super.propsToState(otherProps);
    }

    cancel() {
        this._hide();
    }

    _hide() {
        this._parent.hide();
    }
}