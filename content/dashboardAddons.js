import hyper from 'hyperhtml';

import { loadOptions, subscribeToOptions } from '../syncOptions';
import { waitForElement } from './utils/waitForElement';

import { DashboardButton } from './components/DashboardButton.js';
import { ModalWrapper } from '../shared/ModalWrapper';
import { ImportModal } from './components/ImportModal';


function createImportModal() {
    return new ModalWrapper({
        slotted: ImportModal,
        title: chrome.i18n.getMessage('importDlgTitle'),
    });
}

/**
 * @param {WindowMessageListener} actionListener
 * @return {Function}
 */
export function addButtons(actionListener) {
    let block = false; // waitForElement uses setTimeout inside, so it's possible to run several instances of async function in parallel
    return async function() {
        if (block) {
            return;
        } else {
            block = true;
        }

        delete document.documentElement.dataset.storyFormat;

        const [listControlsUl] = await waitForElement('nav.listControls ul');

        // check if we already created buttons
        if (listControlsUl.querySelector('._enhancer-button') !== null) {
            return;
        }

        const options = await loadOptions();

        const modal = createImportModal();
        const modalWrapper = document.createElement('div');
        hyper(modalWrapper)`${modal}`;
        document.body.appendChild(modalWrapper);

        const actionsMap = {
            import() {
                modal.show();
            },
        };

        actionListener.add(actionsMap);

        const button = new DashboardButton({
            name: 'import',
            text: chrome.i18n.getMessage('importBtn'),
            icon: 'file-text',
            active: options.import,
        });

        const wrapper = document.createElement('li');
        listControlsUl.insertBefore(wrapper, listControlsUl.querySelector('li:nth-child(3)'));

        hyper(wrapper)`${button}`;

        await subscribeToOptions(() => {
            button.setState({ active: options.import });
        }, options);

        block = false; // eslint-disable-line require-atomic-updates
    };
}