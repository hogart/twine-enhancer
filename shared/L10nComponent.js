import { Component } from 'hyperhtml';

export class L10nComponent extends Component{
    constructor(props) {
        super();
        if (props) {
            this.setState(this.propsToState(props));
        }
    }

    propsToState(props) {
        return props;
    }

    /**
     * @param {string} key
     * @param {any?} substitutions
     * @return {string}
     */
    $t(key, substitutions) {
        return chrome.i18n.getMessage(key, substitutions);
    }
}