# Last Ember

**Last Ember** is a small, self-contained winter survival game that runs in your browser, including when you are offline. Keep the fire burning until dawn, gather wood, and survive as many nights as you can while wolves circle the light.

## Play the game

### Open the standalone game

Open [`last-ember.html`](last-ember.html) in a modern browser. The game is contained in that file and does not need a server, installation, or internet connection.

### Install the browser extension

The [`last-ember-extension`](last-ember-extension/) folder contains an unpacked Manifest V3 extension for Chrome and Brave. It adds a toolbar button that opens the locally bundled game.

1. Open `chrome://extensions` in Chrome or `brave://extensions` in Brave.
2. Turn on **Developer mode**.
3. Choose **Load unpacked** and select the `last-ember-extension` folder.
4. Pin **Last Ember** from the Extensions menu if you want its button in the toolbar.

See the [extension README](last-ember-extension/README.md) for more details.

## How to play

- Keep the fire alive until dawn. Its fuel drains over time, so collect logs and return to the fire to add fuel.
- Move with **WASD** or the **arrow keys**, or tap and drag on the play area.
- Stay within the dashed ring of light. Wolves attack outside it and avoid the fire.
- Survive each night to choose one of two upgrades. Nights get longer and more dangerous as you progress.
- Press **P** or **Esc** to pause, and **M** to cycle sound volume. Use **1** or **2** to choose an upgrade at dawn.
- Select **?** in game for the control guide. The game pauses when the tab loses focus.

Your best number of nights survived and sound level are saved locally in the browser. Sound starts after your first input because browsers require a user gesture before audio can play.

## Project files

- `last-ember.html` — standalone game.
- `last-ember-extension/` — browser extension source, assets, and setup instructions.
- `last-ember-v2.html`, `last-ember-live-3.html`, `last-ember-live-4.html`, `last-ember-live-5.html`, and `last-ember-live-6.html` — earlier and in-progress standalone builds.

The extension game is implemented with local HTML, CSS, JavaScript, and image assets. It uses no remote libraries, fonts, or media.
