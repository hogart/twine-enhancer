'use strict';

const defaultOptions = {
    shortcutButtons: true,
    editJs: true,
    editCss: true,
    proofRead: false,
    publish: true,
    snap: true,
    theme: false,
    wideEditors: true,
    neatPassages: false,
};

const form = document.querySelector('.js-optionsForm');
const fields = Array.from(form.querySelectorAll('input[type="checkbox"]'));

form.addEventListener('change', (event) => {
    const legend = event.target.closest('legend');
    if (legend) {
        const fieldset = legend.closest('fieldset');
        fieldset.disabled = !event.target.checked;
    };
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const newOptions = {};
    fields.forEach((field) => newOptions[field.name] = field.checked);
    saveOptions(newOptions);
}, false);

document.addEventListener('DOMContentLoaded', async () => {
    const values = await loadOptions(defaultOptions);
    Object.keys(values).forEach((key) => {
        const val = values[key];
        form.querySelector(`[name=${key}]`).checked = val;
    })
});