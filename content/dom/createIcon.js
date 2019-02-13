import { h } from './h';

export function createIcon(icon) {
    return h('i', { class: `fa fa-${icon}` });
}