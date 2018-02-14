'use strict';

function triggerEvent(element, type = 'click') {
    const event = new MouseEvent(type, {
        view: window,
        bubbles: true,
        cancelable: true
    });

    element.dispatchEvent(event);
}

function button({icon, title}, action) {
    return `<button title="${title}" data-action="${action}"><i class="fa fa-${icon}"></i></button>`;
}

const buttonsMap = {
    editJs: {icon: 'terminal', title: 'Edit Story JavaScript'},
    editCss: {icon: 'css3', title: 'Edit Story StyleSheet'},
    proofRead: {icon: 'book', title: 'View Proofing Copy'},
    publish: {icon: 'download', title: 'Publish to File'},
    snap: {icon: 'sitemap', title: 'Snap all passages (reloads page)'},
    theme: {icon: 'moon-o', title: 'Toggle dark/light theme'},
};

function getMenu(toolbar) {
    const menuButton = toolbar.querySelector('.storyName');
    triggerEvent(menuButton);
    triggerEvent(menuButton);

    return document.querySelector('.drop-content div .menu:first-child');
}

function getMenuButtons(menu) {
    const [editJsBtn, editCssBtn, ...rest] = menu.querySelectorAll('li button');
    const proofBtn = rest[rest.length - 2];
    const publishBtn = rest[rest.length - 1];

    return {
        editJsBtn,
        editCssBtn,
        proofBtn,
        publishBtn,
    }
}

function createContainer(enabledButtons) {
    const buttonsContainer = document.createElement('div');

    buttonsContainer.innerHTML = Object.keys(buttonsMap).map((key) => {
        if (enabledButtons[key]) {
            return button(buttonsMap[key], key);
        } else {
            return '';
        }
    }).join('');

    buttonsContainer.className = 'toolbarButtons';

    return buttonsContainer;
}

function waitForElement(selector, parent = document) {
    return new Promise((resolve, reject) => {
        function getElem() {
            const elem = parent.querySelectorAll(selector);
            if (elem.length) {
                resolve(elem);
            } else {
                setTimeout(getElem)
            }
        }

        getElem();
    });
}

detectStoryEditor(async () => {
    const options = await loadOptions();

    if (!options.shortcutButtons) {
        return;
    }

    const buttonsContainer = createContainer(options);
    const toolbar = await waitForElement('.toolbar.main .left');

    if (toolbar[0].querySelector('.toolbarButtons')) {
        return;
    }

    const menu = getMenu(toolbar[0]);

    attachToDom(menu);

    function attachToDom(menu) {
        const {editJsBtn, editCssBtn, proofBtn, publishBtn} = getMenuButtons(menu);

        const actions = {
            editJs() {
                triggerEvent(editJsBtn);
            },
            editCss() {
                triggerEvent(editCssBtn);
            },
            proofRead() {
                triggerEvent(proofBtn);
            },
            publish() {
                triggerEvent(publishBtn);
            },
            snap() {
                snapPassages();
                window.location.reload();
            },
            theme() {
                toggleTheme();
            },
        };

        buttonsContainer.addEventListener('click', (event) => {
            const button = event.target.closest('button[data-action]');
            if (actions[button.dataset.action]) {
                actions[button.dataset.action]();
            }
        });

        toolbar[0].appendChild(buttonsContainer);
    }
});




