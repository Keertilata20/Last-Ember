# Last Ember — browser extension

This folder contains the shared Last Ember game plus two ways to launch it: a desktop browser extension and a mobile-installable PWA. The extension adds a Last Ember button to the browser toolbar. Clicking it opens the game in a tab; your normal New Tab page stays unchanged. The game files and icons are bundled locally and the extension manifest requests no browser permissions.

## Try it in Chrome or Brave

1. Open the browser's extensions page (`chrome://extensions` in Chrome; `brave://extensions` in Brave).
2. Turn on Developer mode.
3. Choose **Load unpacked** and select this `last-ember-extension` folder.
4. Pin Last Ember from the browser's Extensions menu if you want its button visible in the toolbar.
5. Click the Last Ember toolbar button whenever you want to play. Your New Tab page remains unchanged. To remove it later, disable or remove the extension from the same extensions page.

The toolbar button opens the bundled game locally, so it remains available offline. It does not replace the browser's built-in network-error page or Dino game.

## Install on a phone

The PWA files are in this same folder. To make a clean web upload, run `node build-pwa.js` from the parent `offline-game` folder; it creates `last-ember-pwa` from the shared source files. Publish that folder as a static site over HTTPS. Each phone must visit the site once while online so its service worker can cache the game files.

- Android: open the site in Chrome and choose **Install app** from the browser menu.
- iPhone: open the site in Safari, tap **Share**, then **Add to Home Screen**.

After the first successful cache, the home-screen app can launch offline. When we publish a character, environment, or gameplay update, the phone downloads it the next time it opens while online; if it is offline, it keeps using its cached build until it reconnects.

The extension and PWA use the same `index.html`, `style.css`, and `game.js`. For a desktop unpacked extension, reload it from the extensions page after changing those files. Rebuild and redeploy `last-ember-pwa` for phone users. A published extension would need a new version release. Scores and sound levels are stored separately on each device; cross-device save syncing would require an online account or sync service.

The source remains self-contained: the HTML, CSS, JavaScript, icons, PWA service worker, and extension service worker are all local. There are no remote libraries, images, fonts, or audio files.

The sound button cycles through Off, Low, Medium, and High; each click plays a short preview. Browsers require a user gesture before Web Audio can start, so sound begins after the first click or key press.
