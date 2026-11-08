# Put Last Ember on a phone

The desktop toolbar extension cannot be installed as the phone game. The mobile route is the PWA build.

## Build the upload folder

From the `offline-game` folder, run:

```sh
node build-pwa.js
```

This creates `last-ember-pwa` using the same game source as the desktop extension. Upload the contents of that folder to a static web host that provides HTTPS. No account, server, or API is needed by the game itself; hosting is only needed for the first visit and future updates.

## Install on Android

1. Open the HTTPS game URL in Chrome while online.
2. Wait for the page to finish loading, then open the browser menu and choose **Install app**.
3. Launch Last Ember from the home screen. After its files are cached, it can run offline.

## Install on iPhone

1. Open the HTTPS game URL in Safari while online and let it finish loading.
2. Tap **Share → Add to Home Screen**.
3. Launch Last Ember from the home screen. After its files are cached, it can run offline.

## Updating both builds

Edit the shared game files in `last-ember-extension`, then:

- Reload the unpacked desktop extension in its extensions page.
- Run `node build-pwa.js` and upload the refreshed `last-ember-pwa` files. A phone receives the update the next time it opens online; while offline it keeps its previous cached build.

Player scores and sound settings remain local to each device. Sharing those would require a separate online sync feature.
