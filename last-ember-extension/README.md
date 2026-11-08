# Last Ember — desktop extension and phone game

Last Ember is a **single-player, real-time winter survival game**. You control one survivor, collect logs, and carry them back to the campfire to keep it burning until dawn. Wolves threaten you when you leave the firelight. Make it through the night to choose an upgrade and continue the run.

There is one playable character. Wolves are enemies. There is no second survivor in this game and no multiplayer. The separate [`last-ember.html`](../last-ember.html) file is an older, turn-based camp-management prototype; its two survivors are not part of this real-time game.

This folder contains the shared game source and two ways to launch it:

- **Desktop extension:** adds a Last Ember button to the Chrome or Brave toolbar. Clicking it opens the game in a tab and does not replace the browser's New Tab page. The game files are bundled with the extension, so it can launch offline after installation. It does not replace the browser's built-in network-error page or Dino game.
- **Phone PWA:** the same game, hosted over HTTPS so it can be installed from a mobile browser and cached for offline launch.

The extension and PWA use the same `index.html`, `style.css`, and `game.js`. The corresponding files in `last-ember-extension/` and `last-ember-pwa/` currently match. They run independently: best scores and sound volume are stored locally on each device and are not synced.

## Install the desktop extension in Chrome or Brave

1. Open the extensions page (`chrome://extensions` in Chrome or `brave://extensions` in Brave).
2. Turn on **Developer mode**.
3. Choose **Load unpacked** and select this `last-ember-extension` folder.
4. Pin Last Ember from the browser's Extensions menu if you want its toolbar button visible.
5. Click the toolbar button to play. Your New Tab page stays as it was.

To remove the extension, disable or remove it from the same extensions page.

## Install the phone game

The public phone build is [last-ember-game.netlify.app](https://last-ember-game.netlify.app). It needs one successful visit while online so the service worker can cache the game files.

- **Android:** open the link in Chrome, then choose **Install app** from the browser menu.
- **iPhone:** open the link in Safari, tap **Share → Add to Home Screen**.

After the initial cache, launch the game from the home screen while offline. When a new version is published, the phone downloads it the next time it opens the site online; until then, offline play uses the cached version.

## Update the phone build

Edit `index.html`, `style.css`, or `game.js` in this folder. Then run `node build-pwa.js` from the parent `offline-game` folder. This copies the PWA files into `last-ember-pwa/`; deploy that folder's contents to the HTTPS site. The desktop unpacked extension picks up source changes after you reload it from the extensions page. A store-published extension would need a new release.

The game has touch controls, keyboard controls, pause and restart, upgrades, and synthesized Web Audio effects. Browsers start audio only after the player interacts with the page. There are no remote libraries, images, fonts, or audio files required by the game.
