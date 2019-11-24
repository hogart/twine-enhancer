import { Component } from 'hyperhtml';
import { importTwee } from 'aife-twee2/src/importTwee';

import { homepage_url } from '../../manifest.json';
import { OverrideOptions } from './OverrideOptions.js';
import { readTextFromFile } from '../utils/readTextFromFile.js';
import { detectDuplicates } from '../story/detectDuplicates.js';
import { renameDuplicate } from '../story/renameDuplicate.js';
import { inferPassagePosition } from '../story/inferPassagePosition.js';
import { writeStory } from '../story/writeStory.js';

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

    onchange(event) {
        const target = event.currentTarget;
        if (target.name === 'file') {
            this.onFileChange(event);
        } else if (target.name === 'makeBackup') {
            this.onBackupChange(event);
        }
    }

    async onFileChange(event) {
        const files = event.currentTarget.files;

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

    confirm() {
        try {
            if (this.state.duplicate !== null) {
                if (this.state.makeBackup) {
                    renameDuplicate(this.state.duplicate);
                } else {
                    this.state.story.id = this.state.duplicate.id;
                }
            }

            this.state.story.passages.forEach(inferPassagePosition);

            writeStory(this.state.story);
            window.location.reload();
        } catch (e) {
            this.setState({
                error: e.message,
            });
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
                    <p>${chrome.i18n.getMessage('importDlgHasDuplicate')}</p>
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