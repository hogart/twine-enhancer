'use strict';

const form = document.querySelector('.js-optionsForm');
const fields = Array.from(form.querySelectorAll('input[type="checkbox"]'));
const saveStatus = form.querySelector('.js-saveStatus');

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
    saveOptions(newOptions).then(() => {
        saveStatus.classList.add('show');
        setTimeout(() => {
            saveStatus.classList.remove('show');
        }, 2000);
    });
}, false);

form.addEventListener('reset', (event) => {
    event.preventDefault();

    clearOptions().then(() => window.location.reload());
});

document.addEventListener('DOMContentLoaded', async () => {
    const values = await loadOptions(defaultOptions);
    Object.keys(values).forEach((key) => {
        const val = values[key];
        form.querySelector(`[name=${key}]`).checked = val;
    })
});