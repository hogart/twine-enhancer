import { attachShortcutToolbar } from './shortcuts.js';
import { detectStoryEditor } from './detectStoryEditor.js';
import './biggerEditors';
import './neaterPassages';

detectStoryEditor(attachShortcutToolbar);