# Last Ember — browser extension

This unpacked Manifest V3 extension adds a Last Ember button to the browser toolbar. Clicking it opens the game in a tab; your normal New Tab page stays unchanged. The game files and icons are bundled locally and the manifest requests no browser permissions, so gameplay does not need a network connection.

## Try it in Chrome or Brave

1. Open the browser's extensions page (`chrome://extensions` in Chrome; `brave://extensions` in Brave).
2. Turn on Developer mode.
3. Choose **Load unpacked** and select this `last-ember-extension` folder.
4. Pin Last Ember from the browser's Extensions menu if you want its button visible in the toolbar.
5. Click the Last Ember toolbar button whenever you want to play. Your New Tab page remains unchanged. To remove it later, disable or remove the extension from the same extensions page.

The toolbar button opens the bundled game locally, so it remains available offline. It does not replace the browser's built-in network-error page or Dino game.

The source remains self-contained: `index.html`, `style.css`, `game.js`, `service-worker.js`, and `manifest.json` are all local. There are no remote libraries, images, fonts, or audio files. Game scores and the sound level are saved in the extension's own local storage.

The sound button cycles through Off, Low, Medium, and High; each click plays a short preview. Browsers require a user gesture before Web Audio can start, so sound begins after the first click or key press.
