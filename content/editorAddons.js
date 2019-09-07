import { hyper } from 'hyperhtml';

import { loadOptions } from '../syncOptions';
import { waitForElement } from './utils/waitForElement';
import { triggerEvent } from './utils/triggerEvent.js';
import { ToolbarButtons } from './components/ToolbarButtons.js';
import { ButtonsConfig, buttonsMap } from '../buttonsMap.js';
import { downloadTwee } from './downloadTwee.js';
import { snapPassages } from './snapPassages.js';
import { toggleTheme } from './toggleTheme.js';
import { addSnippet } from './addSnippet.js';
import { listenOptions } from '../syncOptions.js';
import { HotKeyListener } from './utils/HotKeyListener.js';

function getMenu(toolbar) {
    const menuButton = toolbar.querySelector('.storyName');
    triggerEvent(menuButton);
    triggerEvent(menuButton);

    return document.querySelector('.drop-content div .menu:first-child');
}

function getActionsMap(builtinButtons) {
    function emulateMenuButton(index) {
        triggerEvent(builtinButtons[index]);
    }

    return {
        editJs() {
            emulateMenuButton(0);
        },
        editCss() {
            emulateMenuButton(1);
        },
        proofRead() {
            emulateMenuButton(7);
        },
        publish() {
            emulateMenuButton(8);
        },
        export: downloadTwee,
        snap: snapPassages,
        theme: toggleTheme,
        run() {
            emulateMenuButton(10);
        },
        debug() {
            emulateMenuButton(9);
        },
        openOptions() {
            chrome.runtime.sendMessage({action: 'openOptions'});
        },
        snippet: addSnippet,
    };
}

function getBuiltinButtons(menu, toolbar) {
    return [
        ...menu.querySelectorAll('li button'),
        ...toolbar.closest('.toolbar').querySelectorAll('.right > button'),
    ];
}

/**
 * @param {WindowMessageListener} actionListener
 * @return {Function}
 */
export function attachShortcutToolbar(actionListener) {
    // waitForElement uses setTimeout inside, so it's possible to run several instances of async function in parallel
    let block = false;
    return async function() {
        if (block) {
            return;
        } else {
            block = true;
        }
        const [toolbar] = await waitForElement('.toolbar.main .left');

        if (toolbar.querySelector('.toolbarButtons')) {
            return;
        }

        const options = await loadOptions();
        const btnConf = new ButtonsConfig(buttonsMap, options);
        const hotKeyListener = new HotKeyListener(buttonsMap, options);

        const menu = getMenu(toolbar);
        const builtinButtons = getBuiltinButtons(menu, toolbar);

        actionListener.add(getActionsMap(builtinButtons));

        const buttonsContainer = new ToolbarButtons(btnConf);
        const wrapper = document.createElement('span');

        toolbar.appendChild(wrapper);
        hyper(wrapper)`${buttonsContainer}`;

        listenOptions((changes) => {
            for (const key of Object.keys(changes)) {
                options[key] = changes[key].newValue;
            }

            btnConf.update(options);
            hotKeyListener.update(options);
            buttonsContainer.setState({ buttons: btnConf });
        });

        block = false; // eslint-disable-line require-atomic-updates
    };
}




