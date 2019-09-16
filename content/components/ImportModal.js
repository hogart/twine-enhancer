import { Component } from 'hyperhtml';
import { importTwee } from 'aife-twee2/src/importTwee';

import { homepage_url } from '../../manifest.json';
import { OverrideOptions } from './OverrideOptions.js';
import { readTextFromFile } from '../utils/readTextFromFile.js';
import { detectDuplicates } from '../story/detectDuplicates.js';

export class ImportModal extends Component {
    constructor(props) {
        super();
        const {parent, ...otherProps} = props;
        this._parent = parent;
        this.setState({
            error: '',
            makeBackup: true,
            files: [],
            story: null,
            duplicate: null,
            override: {},
            ...otherProps,
        });

        this.onOverride = (override) => {
            this.setState({override});
        };
    }

    onchange(e) {
        const target = e.currentTarget;
        if (target.name === 'file') {
            this.onFileChange(e);
        } else if (target.name === 'makeBackup') {
            this.onBackupChange(e);
        }
    }

    async onFileChange(e) {
        const files = e.currentTarget.files;

        let story = null;
        let error = '';
        let duplicate = null;

        try {
            const text = await readTextFromFile(files);
            story = importTwee(text);
            duplicate = detectDuplicates(story);

        } catch(e) {
            error = e.message;
        }

        this.setState({
            files,
            error,
            story,
            duplicate,
        });
    }

    onBackupChange(e) {
        this.setState({
            makeBackup: e.currentTarget.value === 'on',
        });
    }

    async confirm() {
        try {
            await this.state.onFileChange(this.state.files, this.state.makeBackup, this.state.override);
            this._hide();
            location.reload();
        } catch (e) {
            this.setState({error: e.message});
        }
    }

    cancel() {
        this._hide();
    }

    _hide() {
        this._parent.hide();
    }

    render() {
        const {files, error, makeBackup, duplicate} = this.state;
        const hasFiles = files.length !== 0;

        const wrapperClass = [
            'importDlg',
            error && 'error',
            duplicate && 'hasDuplicate',
            !makeBackup && 'merge',
        ].filter(str => !!str).join(' ');

        return this.html`
            <div class="${wrapperClass}">
                <p>${{html: chrome.i18n.getMessage('experimentalWarning')}}</p>
                <p>${{html: chrome.i18n.getMessage('importDlgHelp')}}</p>
                
                <p class="importDlg-error">${{html: chrome.i18n.getMessage('importDlgError', {homepage_url})}}</p>
                <pre class="importDlg-error">${error}</pre>
                
                <label class="block mb-1">
                    <input type="file" accept=".twee,.tw2" name="file" onchange="${this}"/>
                </label>
                
                <div class="importDlg-hasDuplicate">
                    <label class="block mb-1">
                        <input type="radio" name="makeBackup" value="on" onchange="${this}" checked="${makeBackup}"/>
                        ${chrome.i18n.getMessage('importDlgBackup')}
                    </label>
                    <label class="block mb-1">
                        <input type="radio" name="makeBackup" value="off" onchange="${this}" checked="${!makeBackup}"/>
                        ${chrome.i18n.getMessage('importDlgMerge')}
                    </label>
                    
                    <div class="importDlg-merge">
                        ${OverrideOptions.for({prefix: 'story', onInput: this.onOverride, cls: 'story'})}
                    </div>
                </div>

                <div class="buttons">
                    <button onclick="${this}" data-call="cancel">${chrome.i18n.getMessage('cancel')}</button>
                    <button onclick="${this}" data-call="confirm" disabled="${!hasFiles}" class="primary">${chrome.i18n.getMessage('confirm')}</button>
                </div>
            </div>
        `;
    }
}