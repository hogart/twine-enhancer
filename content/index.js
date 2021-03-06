import { attachShortcutToolbar } from './editorAddons.js';
import { detectStoryEditor } from './detectStoryEditor.js';
import './biggerEditors.js';
import './neaterPassages.js';
import { detectDashboard } from './detectDashboard.js';
import { addButtons } from './dashboardAddons.js';
import { WindowMessageListener } from './utils/WindowMessageListener.js';

const actionListener = new WindowMessageListener();

detectStoryEditor(attachShortcutToolbar(actionListener));
detectDashboard(addButtons(actionListener));