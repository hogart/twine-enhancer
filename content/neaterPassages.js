import { loadAndSubscribeToOptions } from '../syncOptions';

function makePassagesNeat(options) {
    document.documentElement.classList.toggle('neatPassages', options.neatPassages);
}

loadAndSubscribeToOptions(makePassagesNeat);
