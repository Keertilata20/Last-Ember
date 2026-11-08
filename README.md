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

## <a id="the-game"></a>The night is yours to survive

The forest is dark, the cold is closing in, and the fire is your one safe place. **Last Ember** is a real-time, single-player survival game: guide one lone survivor through the snow, pick up logs, and bring them back to the campfire before its glow fades. Wolves prowl beyond the light. Stay close, keep moving, and hold on until dawn.

Make it through the night and you’ll earn an upgrade before the next one begins. The longer you survive, the harder the forest presses back.

> **One playable survivor. Wolves are enemies.** There is no second survivor, co-op, or multiplayer in this game. Your best score and sound setting are saved on each device separately.

<table>
  <tr>
    <td align="center"><strong>🪵 FIND</strong><br><sub>Search the snowy dark for logs.</sub></td>
    <td align="center"><strong>🔥 FEED</strong><br><sub>Bring wood back to the fire.</sub></td>
    <td align="center"><strong>🐺 SURVIVE</strong><br><sub>Keep to the light and outlast the wolves.</sub></td>
    <td align="center"><strong>🌅 RETURN</strong><br><sub>Reach dawn, choose an upgrade, begin again.</sub></td>
  </tr>
</table>

The game has touch controls for phones and keyboard controls for desktop, plus pause and restart, health and fire indicators, upgrades between nights, synthesized sound effects, and a locally saved best survival record.

## <a id="controls"></a>Find your way through the dark

| Device / action | Controls |
|:--|:--|
| Phone or tablet | Tap or drag to move |
| Desktop movement | Arrow keys or WASD |
| Pause | P, Esc, or the pause button; the game also pauses when its tab is hidden |
| Sound | M or the speaker button cycles the volume |
| Upgrades | Tap a card or press 1 or 2 |

Tap the in-game **?** for the full instructions and HUD guide.

## <a id="play"></a>Choose your way in

- **Phone:** [Play Last Ember](https://last-ember-game.netlify.app/). On Android, choose **Install app** from Chrome’s menu. On iPhone, open it in Safari and choose **Share → Add to Home Screen**.
- **Desktop:** install the unpacked extension using the [desktop setup guide](last-ember-extension/README.md). Its toolbar button opens the game in a tab and leaves your New Tab page alone.
- **Local preview:** open [`last-ember-extension/index.html`](last-ember-extension/index.html) in a modern browser. PWA installation and offline caching need HTTPS or a local web server.

## <a id="offline-play"></a>Take the fire offline

The desktop extension bundles the game, so it can launch without internet after installation. The phone version is a PWA: open the site successfully while online once, and its service worker caches the game for offline launch from your home screen. When a new version is published, your phone downloads it the next time you open the site online; while offline, it keeps using its cached version.

Both builds use the same `index.html`, `style.css`, and `game.js` source. The desktop and phone game files in this repository currently match. They play the same game, but saved scores and sound settings stay on their own devices; there is no cross-device sync. The phone site is hosted on Netlify, while the extension runs locally in your browser.

To prepare a phone update after changing the extension source, run `node build-pwa.js` from this folder, then deploy the contents of `last-ember-pwa/` to the HTTPS site.

## <a id="other-prototype"></a>A different trail: the camp prototype

[`last-ember.html`](last-ember.html) is a separate, turn-based camp-management prototype. In that version, **two survivors** manage food, wood, and the fire through daily actions. Those two survivors belong only to that prototype; they do not appear in the real-time game above or at the phone link.

<p align="center"><sub><strong>THE LAST EMBER</strong> &nbsp;·&nbsp; MIDNIGHT <code>#182838</code> &nbsp; FROST <code>#D5E0E4</code> &nbsp; EMBER <code>#ED633B</code> &nbsp; FIRELIGHT <code>#FFBF69</code></sub></p>
