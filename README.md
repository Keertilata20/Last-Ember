<p align="center">
  <img src="last-ember-banner.svg" alt="Last Ember — one fire. A long night. Hold on till dawn." width="100%">
</p>

<p align="center">
  <strong>A quiet world. A hungry fire. A small group trying to see another morning.</strong><br>
  <sub>A turn-based winter survival game about keeping people alive through the long cold.</sub>
</p>

<p align="center">
  <a href="#play"><strong>▶ &nbsp; PLAY</strong></a> &nbsp;　·　&nbsp;
  <a href="#the-settlement"><strong>THE SETTLEMENT</strong></a> &nbsp;　·　&nbsp;
  <a href="#daily-actions"><strong>DAILY ACTIONS</strong></a> &nbsp;　·　&nbsp;
  <a href="#other-builds"><strong>OTHER BUILDS</strong></a>
</p>

<br>

## One more morning

The world has gone quiet. Snow swallows the trail, the dark presses close, and the fire is all that keeps the wolves back.

In **Last Ember**, you lead two survivors through a winter with no end in sight. Every day, decide how to spend your people’s time: chop wood, forage for food, stoke the fire, or build what the camp needs. At night, the weather takes its share. The fire sinks, hunger thins the group, and wolves test the light. Sometimes a stranger arrives at the edge of camp—with one more pair of hands, and one more mouth to feed.

Keep the fire alive. Keep enough food for everyone. Make it to another morning.

<table>
  <tr>
    <td align="center" width="25%"><strong>01 &nbsp; GATHER</strong><br><sub>Chop wood. Forage for food.</sub></td>
    <td align="center" width="25%"><strong>02 &nbsp; PREPARE</strong><br><sub>Stoke the fire. Build defenses.</sub></td>
    <td align="center" width="25%"><strong>03 &nbsp; END THE DAY</strong><br><sub>Face the weather and the wolves.</sub></td>
    <td align="center" width="25%"><strong>04 &nbsp; SURVIVE</strong><br><sub>Feed the camp. Begin again.</sub></td>
  </tr>
</table>

<p align="center"><code>🪵 WOOD &nbsp; + &nbsp; 🥕 FOOD &nbsp; + &nbsp; 🔥 FIRELIGHT &nbsp; → &nbsp; 🌅 ONE MORE MORNING</code></p>

## <a id="the-settlement"></a>Keep the camp alive

Your group starts with **two people**, **six wood**, **four food**, and a fire at **60 / 100**. Each person gives you one action per day. Everyone eats one food each night. If food runs out, people starve; if the fire dies, people freeze. When the fire falls below 30, wolves may attack.

Weather shifts between clear skies, cold snaps, and storms. A **Windbreak** slows the fire’s burn, a **Palisade** makes wolf attacks less likely, and a **Drying rack** improves each forage. After the second day, a stranger may appear. Taking them in adds an action—and another person to feed.

The run ends when the last person is lost. Your best number of nights survived is saved locally in the browser.

## <a id="daily-actions"></a>Spend the day

| Action | Cost / result |
|:--|:--|
| Chop wood | One action; gain **2–4 wood** |
| Forage | One action; gain **1–3 food** (**+1** with a Drying rack) |
| Stoke the fire | One action and **2 wood**; restore **30 fire** |
| Build a Windbreak | One action and **6 wood**; fire burns **4 less** each night |
| Build a Palisade | One action and **8 wood**; wolves are **70% less likely** to get in |
| Build a Drying rack | One action and **5 wood**; forage finds **1 extra food** |
| End day | Resolve the night; start the next day with one action per person |

Choose actions by clicking or tapping the buttons. The game runs as a single local HTML file; no keyboard controls, account, or network connection are required.

## <a id="play"></a>Play

Open [`last-ember.html`](last-ember.html) in a modern browser. It is self-contained and needs no install, server, or internet connection. Your best run is stored in that browser on that device.

## <a id="other-builds"></a>Other builds in this repository

The `last-ember-extension/` and `last-ember-pwa/` folders contain a **separate earlier version** of Last Ember: a real-time game where you directly move a survivor, gather logs, and evade wolves. The desktop extension launches that version from the browser toolbar; the PWA build can be hosted over HTTPS and installed on a phone. Their gameplay is not yet the same as the settlement game in `last-ember.html`.

- [Extension setup and phone installation notes](last-ember-extension/README.md)
- [PWA deployment guide](PWA-DEPLOY.md)
- Rebuild the PWA folder from the extension source with `node build-pwa.js`.

<p align="center"><sub><strong>LAST EMBER</strong> &nbsp;·&nbsp; MIDNIGHT <code>#182838</code> &nbsp; FROST <code>#D5E0E4</code> &nbsp; EMBER <code>#ED633B</code> &nbsp; FIRELIGHT <code>#FFBF69</code></sub></p>
