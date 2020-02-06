# Twine enhancer

Unofficial browser extension for online [Twine](https://twinery.org/2/).

* (Optionally) adds shortcut buttons to toolbar
* (Optionally) use customizable hotkeys for actions like running game, exporting to file and editing code
* (Optionaly) adds button and shortcut for exporting story to *.twee/*.tw2 file
* "Snap all passages to grid" feature
* Toggle day/night theme from toolbar
* (Optionally) Make all editor windows full-width always

###### Version 1.5:

* Russian locale is added
* *.twee/*.tw2 import added

###### Version 1.6:

* Import snippets in *.twee format

###### Version 1.6.1:

* Firefox compatibility

###### Version 1.7.0

This version brings much better import and snippet insertion control, as well as improved customization

* Hotkeys now can be customized by user
* "Extension settings" button added
* All options changes are applied on-the-fly, without page reloading
* [Twee 3 spec](https://github.com/iftechfoundation/twine-specs/blob/master/twee-3-specification.md) compatible import/export
* Snippet insertion now gives granular control over merge/override passages, story meta, style and script
* *.twee import dialogue now allows user to decide what to do when story with the same name exists: backup old story, completely overwrite it or merge with granular control

###### Version 1.8.0

* Support for SugarCube 2's media passages.
* Advanced tags colors management: use any number of colors!
* Now works on both http and https domains.

## Development

You should have nodejs and npm installed.

0. Clone or download repository
0. Run `npm install` in project directory.

    In **Chrome**, run `npm run chrome`, open `chrome://extensions` page and click "Load unpacked" button. Select project directory. You'll need to manually click "reload" button every time you make changes.

    In **Firefox**, run `npm run ff`. This will open browser window with extension installed and will automatically reload extension on changes.


## Building

0. In project directory, run `npm run build`. This will create `twine_enchancer-<vesrion>.zip` file in project root, ready for upload to extension stores.
