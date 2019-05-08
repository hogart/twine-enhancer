import html from 'hyperhtml';

import { loadOptions } from '../syncOptions';
import { waitForElement } from './dom/waitForElement';
import { toggleTheme } from './toggleTheme';
import { snapPassages } from './snapPassages';
import { listenForHotKey } from './dom/listenForHotkeys';

import { downloadTwee } from './downloadTwee';
import { addSnippet } from './addSnippet';
import { triggerEvent } from './dom/triggerEvent.js';

function Icon(iconName) {
    const cls = `fa fa-${iconName}`;
    return html`
        <i class=${cls}></i>
    `;
}

function Button({icon, title, name}) {
    return html`
        <button title=${title} data-action=${name}>
            ${Icon(icon)}
        </button>
    `;
}

const buttonsMap = [
    {
        name: 'editJs',
        icon: 'terminal',
        title: chrome.i18n.getMessage('editJs'),
        hotkey: 'alt+j',
        buttonIndex: 0,
    },
    {
        name: 'editCss',
        icon: 'css3',
        title: chrome.i18n.getMessage('editCss'),
        hotkey: 'alt+c',
        buttonIndex: 1,
    },
    {
        name: 'proofRead',
        icon: 'book',
        title: chrome.i18n.getMessage('proofRead'),
        hotkey: 'f4',
        buttonIndex: 7,
    },
    {
        name: 'publish',
        icon: 'download',
        title: chrome.i18n.getMessage('download'),
        hotkey: 'ctrl+s',
        buttonIndex: 8,
    },
    {
        name: 'export',
        icon: 'file-code-o',
        title: chrome.i18n.getMessage('exportAsTwee'),
        hotkey: 'ctrl+e',
        action() {
            downloadTwee();
        },
    },
    {
        name: 'snap',
        icon: 'sitemap',
        title: chrome.i18n.getMessage('snapPassages'),
        action() {
            snapPassages();
            window.location.reload();
        },
    },
    {
        name: 'theme',
        icon: 'moon-o',
        title: chrome.i18n.getMessage('toggleDarkLightTheme'),
        action: toggleTheme,
    },
    {
        name: 'run',
        hotkey: 'shift+f10',
        buttonIndex: 10,
    },
    {
        name: 'debug',
        hotkey: 'shift+f9',
        buttonIndex: 9,
    },
    {
        name: 'snippet',
        icon: 'puzzle-piece',
        title: 'Insert snippet',
        hotkey: 'alt+a',
        action: addSnippet,
    },
];

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

function ToolbarButtons(visibleButtons) {
    return html`
        <div class="toolbarButtons">
            ${visibleButtons.map(button => Button(button))}
        </div>
    `;
}

function attachToDom(menu, toolbar, options) {
    const menuButtons = getMenuButtons(menu, toolbar[0]);

    const {visible, withShortcuts} = buttonsMap.reduce(
        (acc, button) => {
            if (!options[button.name]) {
                return acc;
            }

            if (button.icon && button.title) {
                acc.visible.push(button);
            }

            if (button.hotkey) {
                acc.withShortcuts.push(button);
            }

            return acc;
        },
        {
            visible: [],
            withShortcuts: [],
        }
    );

    const buttonsContainer = ToolbarButtons(visible);

    withShortcuts.forEach((button) => {
        listenForHotKey(button.hotkey, () => {
            const handler = btnConfToHandler(menuButtons, button);
            handler();
        });
    });

    buttonsContainer.addEventListener('click', (event) => {
        const button = event.target.closest('button[data-action]');
        const name = button.dataset.action;
        const conf = buttonsMap.find(conf => conf.name === name);
        const handler = btnConfToHandler(menuButtons, conf);
        handler();
    });

    toolbar[0].appendChild(buttonsContainer);
}

function btnConfToHandler(buttons, { buttonIndex, action}) {
    let handler;
    if (Number.isInteger(buttonIndex)) {
        handler = () => triggerEvent(buttons[buttonIndex]);
    } else if (typeof action === 'function') {
        handler = action;
    }

    return handler;
}

export async function attachShortcutToolbar() {
    const options = await loadOptions();

    if (!options.shortcutButtons) {
        return;
    }

    const toolbar = await waitForElement('.toolbar.main .left');

    if (toolbar[0].querySelector('.toolbarButtons')) {
        return;
    }

    const menu = getMenu(toolbar[0]);

    attachToDom(menu, toolbar, options);
}




