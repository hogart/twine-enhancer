'use strict';

loadOptions().then((options) => {
    document.documentElement.classList.toggle('wideEditors', options.wideEditors);
});

