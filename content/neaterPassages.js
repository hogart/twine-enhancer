'use strict';

loadOptions().then((options) => {
    document.documentElement.classList.toggle('neatPassages', options.neatPassages);
});

