# rhmap-mobile-monitor

Cordova application written using React, Redux, and TypeScript that provides
information related to RHMAP and your specific RHMAP instance.


## Prequisites

* node.js 4.4.3 (newer versions will likely be fine too)
* npm 4.0.5 (other versions will probably be fine, but are not tested)
* Xcode 8.2.1
* Google Chrome
* VSCode - Recommended IDE for TypeScript


## Running Locally

Before doing anything else run `npm install` to install app dependencies. Easy!

### Configuration

Be sure to setup the Cloud Application for this before running locally. You can
find the information about that [here](https://github.com/evanshortiss/rhmap-mobile-monitor-cloud)

Once the Cloud Application is up and running install dependencies for this
application by doing an `npm install`. After that completes you're good to go!

### Browser

Run this command:

```
npm run start
```

Now open http://localhost:8080/?url=http://localhost:8001, ideally using a
Chromium/Chrome browser.

### iOS Emulator

You'll need xCode installed on macOS to do this:

```
# You only need to run this if platforms/ios does not already exist
npm run cordova platform add ios

# This will fire up the project in a simulator
npm run ios-sim
```

## Developing & Making Changes

### Serving the Application 

Starting the application using `npm start` will perform numerous actions:

1. Firstly all TypeScript files are used to generate their JavaScript equivalent
by running the `tsc` command
2. The generated JavaScript files are then bundled into a single `bundle.js`
using `browserify`
3. Any `node_modules` that the `bundle.js` needs are compiled into a separate
`vendor.js` file - this saves us time later since it only needs to be done once
at startup or when you install a new module
4. Finally, we run the following tools concurrently until start `npm start` command is killed:
    * start a `http-server` thats serves the app on http://localhost:8080
    * run the TypeScript watcher so if any files are changed they get recompiled
    * run the `browserify` watcher (`watchify`) so it regenerates our bundle when the TypeScript watcher updates JavaScript files

The entry point for the application is `index.tsx` - in here you'll find the
code tha performs an initial `React.render` call and starts our application. You
can follow the tree of `React.Components` from there to see the appliaction
structure.

### Adding new Dependencies
If you add a new dependency that you plan to `require` or `import` in a
TypeScript file you must modify the `compile-vendor` script in the
`package.json` to include it.

For example, you might do `npm install moment-timezone --save`. After doing so
you must add `-r moment-timezone` in the `compile-vendor` script to ensure it
can be accessed by your code.
