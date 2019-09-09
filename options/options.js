import hyper from 'hyperhtml';
import { defaultOptions, loadOptions } from '../syncOptions.js';
import { AllOptions } from './components/AllOptions.js';
import { subscribeToOptions } from '../syncOptions';

document.addEventListener('DOMContentLoaded', async () => {
    const options = await loadOptions(defaultOptions);
    const form = document.querySelector('.js-optionsForm');

    const allOptions = new AllOptions(options);
    hyper(form)`${allOptions}`;

    await subscribeToOptions(() => {
        allOptions.setState(options);
    }, options);
});