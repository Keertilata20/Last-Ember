<p align="center">
  <img src="last-ember-banner.svg" alt="Last Ember — one fire. A long night. Hold on till dawn." width="100%">
</p>

<p align="center">
  <strong>One survivor. One fire. Make it to dawn.</strong><br>
  <sub>A single-player winter survival game for desktop and phone browsers.</sub>
</p>

<p align="center">
  <a href="#the-game"><strong>THE GAME</strong></a> &nbsp; · &nbsp;
  <a href="#controls"><strong>CONTROLS</strong></a> &nbsp; · &nbsp;
  <a href="#play"><strong>PLAY</strong></a> &nbsp; · &nbsp;
  <a href="#offline-play"><strong>OFFLINE PLAY</strong></a>
</p>

## <a id="the-game"></a>What Last Ember is

Last Ember is a **single-player, real-time survival game**. You control one lone survivor in a snowy forest. Gather logs, carry them back to the campfire, and keep its light alive through the night. Wolves roam outside the firelight and can attack you when you leave its safety. Survive until dawn, choose an upgrade, and face a harder night.

There is **one playable character**. Wolves are enemies, not a second character or another player. There is no co-op or multiplayer, and progress is saved separately on each device.

The game includes touch controls for phones, keyboard controls for desktop, pause and restart controls, health and fire indicators, upgrades between nights, synthesized sound effects, and a locally saved best survival record.

## <a id="controls"></a>Controls

- **Phone/tablet:** tap or drag to move.
- **Desktop:** move with the arrow keys or WASD; use the mouse to interact with menus.
- **Pause:** P or Esc, or the pause button. The game also pauses when its tab is hidden.
- **Sound:** M or the speaker button cycles the volume.
- **Upgrades:** tap a card or press 1 or 2.

The in-game **?** button explains the HUD and how to play.

## <a id="play"></a>Play

- **Phone:** [Play Last Ember](https://last-ember-game.netlify.app/). On Android, install it from Chrome's menu. On iPhone, use Safari's **Share → Add to Home Screen**.
- **Desktop:** install the unpacked extension from [`last-ember-extension/`](last-ember-extension/README.md). Its toolbar button opens the game in a tab and leaves your New Tab page alone.
- **Local preview:** open [`last-ember-extension/index.html`](last-ember-extension/index.html) in a modern browser. Some PWA install and offline features require HTTPS or a local web server.

## <a id="offline-play"></a>Offline play and updates

The desktop extension bundles the game files and can launch them offline after installation. The phone PWA must first be opened successfully while online so its service worker can cache the game. After that, it can launch from the home screen without a connection. A newly published build downloads when the phone next opens the site online; offline devices keep their cached build until they reconnect.

The desktop extension and phone PWA are built from the same `index.html`, `style.css`, and `game.js` source. In this repository, the extension and PWA game files currently match. They do not share saved scores or sound settings across devices. The public phone site is hosted at Netlify; the extension runs locally from the browser.

To rebuild the phone upload folder after changing the extension source, run `node build-pwa.js` from this folder and deploy the contents of `last-ember-pwa/` to the HTTPS site.

## Other prototype

[`last-ember.html`](last-ember.html) is a **separate, turn-based camp-management prototype**. It starts with two survivors and asks you to manage food, wood, and the fire using daily actions. Those two survivors belong only to that prototype; they are not in the real-time game described above. It is not the game currently served at the phone link.

<p align="center"><sub><strong>LAST EMBER</strong> &nbsp;·&nbsp; MIDNIGHT <code>#182838</code> &nbsp; FROST <code>#D5E0E4</code> &nbsp; EMBER <code>#ED633B</code> &nbsp; FIRELIGHT <code>#FFBF69</code></sub></p>
