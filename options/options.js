import hyper from 'hyperhtml';
import { defaultOptions, listenOptions, loadOptions } from '../syncOptions.js';
import { AllOptions } from './components/AllOptions.js';

document.addEventListener('DOMContentLoaded', async () => {
    const options = await loadOptions(defaultOptions);
    const form = document.querySelector('.js-optionsForm');

    const allOptions = new AllOptions(options);
    hyper(form)`${allOptions}`;

    listenOptions((changes) => {
        for (const key of Object.keys(changes)) {
            options[key] = changes[key].newValue;
        }

        allOptions.setState(options);
    });
});