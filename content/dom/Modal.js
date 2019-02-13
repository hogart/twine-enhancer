import modalTemplate from './modal.html';
import { parseHtml } from './parseHtml';

export class Modal {
    constructor(title, content) {
        this._el = parseHtml(modalTemplate);
        this._el.querySelector('h2.title span').appendChild(parseHtml(title));

        const contentContainer = this._el.querySelector('.content');
        contentContainer.insertBefore(parseHtml(content), contentContainer.firstElementChild);

        this._el.querySelector('header button.close').addEventListener('click', () => this.hide());
    }

    show() {
        document.body.appendChild(this._el);
    }

    hide() {
        this._el = document.body.removeChild(this._el);
    }
}