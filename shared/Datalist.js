import { L10nComponent } from './L10nComponent';

class Option extends L10nComponent {
    render() {
        const {value} = this.state;
        return this.html`
            <option value="${value}"/>
        `;
    }
}

export class Datalist extends L10nComponent {
    render() {
        const {id, values} = this.state;
        return this.html`
            <datalist id="${id}">
                ${values.map((value) => Option.for({value}))}
            </datalist>
        `;
    }
}