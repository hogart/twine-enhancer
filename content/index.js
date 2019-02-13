import { attachShortcutToolbar } from './shortcuts.js';
import { detectStoryEditor } from './detectStoryEditor.js';
import './biggerEditors';
import './neaterPassages';
import { detectDashboard } from './detectDashboard';
import { addButtons } from './dashboardAddons';

detectStoryEditor(attachShortcutToolbar);
detectDashboard(addButtons);