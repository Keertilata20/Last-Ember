<p align="center">
  <strong>LAST EMBER</strong><br>
  <sub>One survivor. One fire. One more night.</sub>
</p>

# Desktop extension + phone game

The snow is falling. The fire is shrinking. Somewhere beyond its glow, wolves are watching.

**Last Ember** is a single-player, real-time winter survival game. You guide one survivor, gather logs, and carry them back to the campfire to make it through the night. Reach dawn to choose an upgrade and face the next night.

> **The cast:** one playable survivor and a pack of wolves. The wolves are enemies, not another player. There is no second survivor or multiplayer in this game.

[`last-ember.html`](../last-ember.html) is a separate, turn-based camp-management prototype. That one has two survivors managing supplies; they are not characters in this real-time game.

## Two ways to enter the same game

| Desktop extension | Phone PWA |
|:--|:--|
| A Last Ember button sits in the Chrome or Brave toolbar. Click it to open the game in a tab; your New Tab page stays as it is. | Visit [last-ember-game.netlify.app](https://last-ember-game.netlify.app) and install it from your mobile browser. |
| Game files are bundled with the extension, so it can launch offline after installation. | Open the site successfully online once so the service worker can cache it. After that, launch from your home screen offline. |

Neither version replaces Chrome or Brave’s built-in network-error page or Dino game. They run separately, so best scores and sound settings stay on each device and do not sync.

The extension and PWA use the same `index.html`, `style.css`, and `game.js`. Those game files currently match in `last-ember-extension/` and `last-ember-pwa/`.

## Install on Chrome or Brave

1. Open `chrome://extensions` in Chrome or `brave://extensions` in Brave.
2. Switch on **Developer mode**.
3. Choose **Load unpacked** and select this `last-ember-extension` folder.
4. Pin Last Ember from the Extensions menu if you want its toolbar button visible.
5. Click the button whenever the woods call.

To remove it later, disable or remove Last Ember from the same extensions page.

## Install on your phone

First, [open Last Ember online](https://last-ember-game.netlify.app/) and let it finish loading. That first visit lets the service worker store the game files for offline play.

- **Android:** open the site in Chrome and choose **Install app** from the browser menu.
- **iPhone:** open the site in Safari and choose **Share → Add to Home Screen**.

Once cached, launch Last Ember from your home screen—even when you’re offline. After a new version is published, open the site online again to download it. Until then, your phone keeps its cached version.

## Updating both builds

Edit `index.html`, `style.css`, or `game.js` in this folder. Reload the unpacked desktop extension from the extensions page. Then run `node build-pwa.js` from the parent `offline-game` folder and deploy the contents of `last-ember-pwa/` to the HTTPS site. A store-published extension would need a new release.

## Quick controls

- **Phone:** tap or drag to move.
- **Desktop:** arrow keys or WASD to move.
- **Pause:** P, Esc, or the pause button.
- **Sound:** M or the speaker button changes volume; audio starts after your first interaction with the page.
- **Upgrades:** tap a card or press 1 or 2.

There are no remote libraries, images, fonts, or audio files required by the game. Sound effects are generated in the browser.
