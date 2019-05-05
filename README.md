# Twine enhancer

Unofficial browser extension for online [Twine](https://twinery.org/2/).

* (Optionally) adds shortcut buttons to toolbar
* (Optionally) use hotkeys for actions like running game, exporting to file and editing code
* (Optionaly) adds button and shortcut for exporting story to *.twee/*.tw2 file
* "Snap all passages to grid" feature
* Toggle day/night theme from toolbar
* (Optionally) Make all editor windows full-width always

Version 1.5:

* Russian locale is added
* *.twee/*.tw2 import added

Version 1.6:

* Import snippets in *.twee format

## Development

You should have nodejs and npm installed.

0. Clone or download repository
0. Run `npm install` in project directory.
0. Run `npm run watch`. This will assemble scripts that need assembling. 
    
    In **Chrome**, open `chrome://extensions` page and click "Load unpacked" button. Select project directory. You'll need to manually click "reload" button every time you make changes.
    
    In **Firefox**, you'll need to make manual build after every changes.


## Building

0. In project directory, run `npm run build`. This will create `build` directory with some files. Contents of this directory (not directory itself!) should be packed into *.zip file, which can be submitted to Chrome and Firefox extension stores.
