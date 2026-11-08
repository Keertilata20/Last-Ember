# Last Ember

The world has gone quiet. Snow swallows the trail, the dark presses close, and the fire is all that keeps the wolves back.

In **Last Ember**, each night is a fight to see the dawn. Leave the warmth to gather scattered logs, then carry them back before the flames die. The light is safety, but only while you can keep it alive. Survive the night and choose an upgrade. Stay out there long enough, and the cold will have to wait one more night.

Last Ember is a small, self-contained survival game that runs in your browser, even when you are offline. No account or connection needed. Just you, the snow, and one more night.

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

## When night falls

- Keep the fire alive until dawn. Fuel drains as the night wears on, so venture out for logs and bring them back to the fire.
- Move with **WASD** or the **arrow keys**, or tap and drag on the play area.
- Stay within the dashed ring of light when you can. Wolves prowl beyond it and keep their distance from the fire.
- Make it to dawn to choose one of two upgrades. Each night brings a longer wait and more danger.
- Press **P** or **Esc** to pause, and **M** to cycle sound volume. Use **1** or **2** to choose an upgrade at dawn.
- Select **?** in game for the control guide. The game pauses when the tab loses focus.

Your best run and sound level are saved locally in the browser. Sound begins after your first input, as browsers require a user gesture before audio can play.

## Project files

- `last-ember.html` — standalone game.
- `last-ember-extension/` — browser extension source, assets, and setup instructions.
- `last-ember-v2.html`, `last-ember-live-3.html`, `last-ember-live-4.html`, `last-ember-live-5.html`, and `last-ember-live-6.html` — earlier and in-progress standalone builds.

The extension game is implemented with local HTML, CSS, JavaScript, and image assets. It uses no remote libraries, fonts, or media.
