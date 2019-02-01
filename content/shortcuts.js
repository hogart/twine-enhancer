import { loadOptions } from '../syncOptions';
import { waitForElement } from './waitForElement';
import { h } from './h';
import { toggleTheme } from './toggleTheme';
import { snapPassages } from './snapPassages';
import { listenForHotKey } from './listenForHotkeys';

import { downloadTwee } from './downloadTwee';

function triggerEvent(element, type = 'click') {
    const event = new MouseEvent(type, {
        view: window,
        bubbles: true,
        cancelable: true,
    });

    element.dispatchEvent(event);
}

function button({icon, title}, action) {
    return h('button', {title, data: {action}}, `<i class="fa fa-${icon}"></i>`);
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
    export: {
        icon: 'file-code-o',
        title: 'Export as *.twee',
        hotkey: 'ctrl+e',
        action() {
            downloadTwee();
        },
    },
    snap: {
        icon: 'sitemap',
        title: 'Snap all passages (reloads page)',
        action() {
            snapPassages();
            window.location.reload();
        },
    },
    theme: {
        icon: 'moon-o',
        title: 'Toggle dark/light theme',
        action: toggleTheme,
    },
    run: {
        hotkey: 'shift+f10',
        buttonIndex: 10,
    },
    debug: {
        hotkey: 'shift+f9',
        buttonIndex: 9,
    },
};

function getMenu(toolbar) {
    const menuButton = toolbar.querySelector('.storyName');
    triggerEvent(menuButton);
    triggerEvent(menuButton);

    return document.querySelector('.drop-content div .menu:first-child');
}

function getMenuButtons(menu, toolbar) {
    return [
        ...menu.querySelectorAll('li button'),
        ...toolbar.closest('.toolbar').querySelectorAll('.right > button'),
    ];
}

function createContainer() {
    return h('div', {class: 'toolbarButtons'});
}

function attachToDom(menu, toolbar, options, buttonsContainer) {
    const menuButtons = getMenuButtons(menu, toolbar[0]);

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
                const handler = btnConfToHandler(menuButtons, conf);
                handler();
            });
        }
    });

    buttonsContainer.addEventListener('click', (event) => {
        const button = event.target.closest('button[data-action]');
        const action = button.dataset.action;
        const conf = buttonsMap[action];
        const handler = btnConfToHandler(menuButtons, conf);
        handler();
    });

    toolbar[0].appendChild(buttonsContainer);
}

function btnConfToHandler(buttons, conf) {
    let handler;
    if (Number.isInteger(conf.buttonIndex)) {
        handler = () => triggerEvent(buttons[conf.buttonIndex]);
    } else if (typeof conf.action === 'function') {
        handler = conf.action;
    }

    return handler;
}

export async function attachShortcutToolbar() {
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

    attachToDom(menu, toolbar, options, buttonsContainer);
}




