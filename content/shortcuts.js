import { hyper } from 'hyperhtml';

import { loadOptions } from '../syncOptions';
import { waitForElement } from './dom/waitForElement';
import { triggerEvent } from './dom/triggerEvent.js';
import { ToolbarButtons } from './components/ToolbarButtons.js';
import { ButtonsConfig, buttonsMap } from '../buttonsMap.js';
import { downloadTwee } from './downloadTwee.js';
import { snapPassages } from './snapPassages.js';
import { toggleTheme } from './toggleTheme.js';
import { addSnippet } from './addSnippet.js';
import { listenOptions } from '../syncOptions.js';
import { HotKeyListener } from './dom/HotKeyListener.js';

function getMenu(toolbar) {
    const menuButton = toolbar.querySelector('.storyName');
    triggerEvent(menuButton);
    triggerEvent(menuButton);

    return document.querySelector('.drop-content div .menu:first-child');
}

const actionsMap = {
    editJs: 0,
    editCss: 1,
    proofRead: 7,
    publish: 8,
    export: downloadTwee,
    snap: snapPassages,
    theme: toggleTheme,
    run: 10,
    debug: 9,
    snippet: addSnippet,
};

function getMenuButtons(menu, toolbar) {
    return [
        ...menu.querySelectorAll('li button'),
        ...toolbar.closest('.toolbar').querySelectorAll('.right > button'),
    ];
}

function createContainer(builtinButtons, btnConf) {
    function emulateMenuButton(index) {
        triggerEvent(builtinButtons[index]);
    }

    window.addEventListener(
        'message',
        (request) => {
            if (request.data && request.data.action) {
                const action = actionsMap[request.data.action];
                if (action !== undefined) {
                    if (typeof action === 'number') {
                        emulateMenuButton(action);
                    } else {
                        action();
                    }
                }
            }
        }
    );

    return new ToolbarButtons(btnConf);
}

export async function attachShortcutToolbar() {
    const options = await loadOptions();

    const btnConf = new ButtonsConfig(buttonsMap, options);
    const hotKeyListener = new HotKeyListener(buttonsMap, options);

    if (!options.shortcutButtons) {
        return;
    }

    const [toolbar] = await waitForElement('.toolbar.main .left');

    if (toolbar.querySelector('.toolbarButtons')) {
        return;
    }

    const menu = getMenu(toolbar);

    const builtinButtons = getMenuButtons(menu, toolbar);

    const buttonsContainer = createContainer(builtinButtons, btnConf);
    const wrapper = document.createElement('span');

    toolbar.appendChild(wrapper);
    hyper(wrapper)`${buttonsContainer}`;

    listenOptions((changes) => {
        for (const key of Object.keys(changes)) {
            options[key] = changes[key].newValue;
        }

        btnConf.update(options);
        hotKeyListener.update(buttonsMap, options);
        buttonsContainer.setState({buttons: btnConf});
    });
}




