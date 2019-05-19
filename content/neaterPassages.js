import { onOptions } from '../syncOptions';

function makePassagesNeat(options) {
    document.documentElement.classList.toggle('neatPassages', options.neatPassages);
}

onOptions(makePassagesNeat);
