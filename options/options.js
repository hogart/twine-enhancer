import { clearOptions, defaultOptions, loadOptions, saveOptions } from '../syncOptions.js';
import { domI18n } from '../domI18n.js';

const form = document.querySelector('.js-optionsForm');
const fields = Array.from(form.querySelectorAll('input[type="checkbox"], select'));
const saveStatus = form.querySelector('.js-saveStatus');

domI18n(form);

form.addEventListener('change', (event) => {
    const legend = event.target.closest('legend');
    if (legend) {
        const fieldset = legend.closest('fieldset');
        fieldset.disabled = !event.target.checked;
    }
});

function inputType(element) {
    const tagName = element.tagName.toLowerCase();
    if (tagName === 'input') {
        return element.type;
    } else {
        return tagName;
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const newOptions = {};
    fields.forEach((field) => {
        const type = inputType(field);
        if (type === 'checkbox') {
            newOptions[field.name] = field.checked;
        } else if (type === 'select') {
            newOptions[field.name] = field.value;
        }
    });

    saveOptions(newOptions).then(() => {
        saveStatus.classList.add('show');
        setTimeout(() => {
            saveStatus.classList.remove('show');
        }, 2000);
    });
}, false);

form.addEventListener('reset', async (event) => {
    event.preventDefault();

    await clearOptions();
    window.location.reload();
});

document.addEventListener('DOMContentLoaded', async () => {
    const values = await loadOptions(defaultOptions);
    Object.keys(values).forEach((key) => {
        const val = values[key];
        const input = form.querySelector(`[name=${key}]`);
        if (input === null) {
            return;
        }
        const type = inputType(input);
        if (type === 'checkbox') {
            input.checked = val;
        } else if (type === 'select') {
            input.value = val;
        }
    });
});