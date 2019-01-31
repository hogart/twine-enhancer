import { loadOptions } from '../syncOptions';

loadOptions().then((options) => {
    document.documentElement.classList.toggle('wideEditors', options.wideEditors);
});

