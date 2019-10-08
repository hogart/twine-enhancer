import html from 'hyperhtml';

export function Icon(iconName) {
    const cls = `fa fa-${iconName}`;
    return html`
        <i class="${cls}"></i>
    `;
}