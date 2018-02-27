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
    return h('button', {title, data: {action}}, `<i class="fa fa-${icon}"></i>`);
}

function h(tagName, attrs = null, children = null) {
    const el = document.createElement(tagName);
    if (attrs) {
        Object.keys(attrs).forEach((attrName) => {
            if (attrName === 'tagName' || attrName === 'children') {
                return;
            }

            if (attrName === 'data') {
                Object.keys(attrs[attrName]).forEach((datasetName) => {
                    el.dataset[datasetName] = attrs[attrName][datasetName];
                })
            } else {
                el.setAttribute(attrName, attrs[attrName]);
            }
        })
    }

    if (children) {
        if (typeof children === 'string') {
            el.innerHTML = children;
        } else {
            children.forEach((child) => {
                let childEl = child instanceof HTMLElement ? child : h(child.tagName, child, child.children);
                el.appendChild(childEl);
            })
        }
    }

    return el;
}

const buttonsMap = {
    editJs: {
        icon: 'terminal',
        title: 'Edit Story JavaScript',
        hotkey: 'alt+j',
        buttonIndex: 0,
    },
    editCss: {
        icon: 'css3',
        title: 'Edit Story StyleSheet',
        hotkey: 'alt+c',
        buttonIndex: 1,
    },
    proofRead: {
        icon: 'book',
        title: 'View Proofing Copy',
        hotkey: 'f4',
        buttonIndex: 7,
    },
    publish: {
        icon: 'download',
        title: 'Publish to File',
        hotkey: 'ctrl+s',
        buttonIndex: 8,
    },
    snap: {
        icon: 'sitemap',
        title: 'Snap all passages (reloads page)',
        action() {
            snapPassages();
            window.location.reload();
        }
    },
    theme: {
        icon: 'moon-o',
        title: 'Toggle dark/light theme',
        action: toggleTheme,
    },
    run: {
        hotkey: 'shift+f10',
        action() {
            console.log('run');
        },
    },
    debug: {
        hotkey: 'shift+f9',
        action() {
            console.log('debug');
        }
    }
};

function getMenu(toolbar) {
    const menuButton = toolbar.querySelector('.storyName');
    triggerEvent(menuButton);
    triggerEvent(menuButton);

    return document.querySelector('.drop-content div .menu:first-child');
}

function getMenuButtons(menu) {
    return menu.querySelectorAll('li button');
}

function createContainer() {
    return h('div', {class: 'toolbarButtons'});
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

    function btnConfToHandler(buttons, conf) {
        let handler;
        if (Number.isInteger(conf.buttonIndex)) {
            handler = () => triggerEvent(buttons[conf.buttonIndex])
        } else if (typeof conf.action === 'function') {
            handler = conf.action;
        }

        return handler;
    }

    function attachToDom(menu) {
        const buttons = getMenuButtons(menu);

        Object.keys(buttonsMap).forEach((btnName) => {
            if (!options[btnName]) {
                return;
            }

            const conf = buttonsMap[btnName];

            if (conf.icon && conf.title) {
                buttonsContainer.appendChild(button(conf, btnName));
            }

            if (conf.hotkey) {
                listenForHotKey(conf.hotkey, () => {
                    const handler = btnConfToHandler(buttons, conf);
                    handler();
                });
            }
        });

        buttonsContainer.addEventListener('click', (event) => {
            const button = event.target.closest('button[data-action]');
            const action = button.dataset.action;
            const conf = buttonsMap[action];
            const handler = btnConfToHandler(buttons, conf);
            handler();
        });

        toolbar[0].appendChild(buttonsContainer);
    }
});




