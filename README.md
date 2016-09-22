# Starter kit to use Gulp with Less.
====================================

### LESS / CSS Stuff

- Watches for Less changes on save
- Checks for Less errors and outputs them without you having to rerun Gulp
- Autoprefixes for legacy browsers
- Combines all CSS into one big and sexy minified file
- Includes Less Bootstrap

### Javascript Stuff

- Automatically compiles all jQuery libraries into one big file JS file
- Lints custom scripts for errors
- Combines all custom scripts into one file

## How To Use

    $ git clone git@github.com:scotch-io/gulp-and-less-starter-kit.git
    $ cd gulp-and-less-starter-kit
    $ npm install
    
After, run

    $ gulp
    

## Updates

**If this isn't working**, it's probably because you need to update. Just run `npm update --save-dev`

**If no command gulp found?**, you need to install it globally `npm install -g gulp` or run `npm run gulp`

### Still broken or not working?

Try this:

```javascript
sudo npm cache clean
npm install --save-dev
npm update --save-dev
gulp
```


## Quick Tips
- Any changes in `assets/less/*` will trigger the Less to compile on save
- All files in `assets/js/libs/*`  will be compressed to `build/jquery.plugins.min.js`
- All files in `assets/js/*` (except for `libs`) will be compressed to `build/scripts.min.js`

