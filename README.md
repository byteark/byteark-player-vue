# ByteArk Player Container for Vue.js

[![NPM](https://img.shields.io/npm/v/@byteark/byteark-player-vue.svg)](https://www.npmjs.com/package/@byteark/byteark-player-vue) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Table of Contents
- [ByteArk Player Container for Vue.js](#byteark-player-container-for-vuejs)
  - [Demo](#demo)
  - [Features](#features)
  - [Installation](#installation)
  - [Compatibility](#compatibility)
  - [Usage](#usage)
  - [Options prop](#options-prop)
    - [Source Object](#source-object)
  - [Event Handling](#event-handling)
  - [Advanced Props](#advanced-props)
  - [Advanced Usages](#advanced-usages)
    - [Controlling Players](#controlling-players)
    - [Using VideoJS Plugins](#using-videojs-plugins)
    - [Request Media/Encryption with credentials](#request-mediaencryption-with-credentials)
  - [License](#license)

## Demo

You can try on [the demo page](https://byteark.github.io/byteark-player-vue/).

## Features

* Remote player updates. No need to update your code for minor improvements.
* Show placeholder while waiting the player to be ready.
* Controls basic behaviours via props.
* Custom advanced callbacks to access ByteArk Player/VideoJS instance directly.

## Compatibility

Since Vue 3 is not backward compatible, please make sure to install the correct ByteArk Player Container version based on your Vue version.

| Vue Version | Package Version |
|-------------|-----------------|
| 2.x         | 3.x             |
| 3.x         | 4.x             |


## Installation

This library is distributed via NPM. You may install from NPM or Yarn.

```bash
# For NPM
npm install --save @byteark/byteark-player-vue
# For Yarn
yarn add @byteark/byteark-player-vue
```

## Usage

1. Include and register `ByteArkPlayerContainer` in your project.

```vue
<template>
  <ByteArkPlayerContainer
    :options="playerOptions" />
</template>

<script>
import ByteArkPlayerContainer from '@byteark/byteark-player-vue';

export default {
  components: {
    ByteArkPlayerContainer,
  },
  data() {
    return {
      playerOptions: {
        autoplay: true,
        fluid: true,
        aspectRatio: '16:9',
        poster: 'https://qoder.byteark.com/images/video-frames/1/GU/cg/1GUcgd3XwsmD-large.jpg',
        sources: {
          src: 'https://video.example.com/path/to/video/playlist.m3u8',
          type: 'application/x-mpegURL',
          // Optional
          title: 'Video Title',
          videoId: 'RI2PimuHxDXw',
          poster: 'https://qoder.byteark.com/images/video-frames/1/GU/cg/1GUcgd3XwsmD-large.jpg',
        },
      },
    };
  },
};
</script>
```

2. Include stylesheet in your project

```vue
// Inside your main SCSS file
@import '~@byteark/byteark-player-vue/dist/@byteark/byteark-player-vue.css';

// Or inside the component
<style lang="scss" scoped>
@import '~@byteark/byteark-player-vue/dist/@byteark/byteark-player-vue.css';
</style>
```

In case that you want to display videos inside a fix-sized container, use fill layout mode by passing `fill: true` in the player options.
```
playerOptions: {
  ...options,
  fill: true,
},
```

## Options prop

You have to pass `options` object to `ByteArkPlayerContainer`

| Name         | Type         | Default | Description                                                                  |
|--------------|--------------|---------|------------------------------------------------------------------------------|
| autoplay     | Boolean      | true    | Autoplay the video after the player is created.                              |
| aspectRatio  | String       | '16:9'  | Use with fluid layout mode, to inform expected video's aspect ratio          |
| controls     | Boolean      | true    | Show the controls bar.                                                       |
| customClass  | String       | -       | Custom class name to be applied to the video container.                      |
| fill         | Boolean      | false   | Use fill layout mode.                                                        |
| fluid        | Boolean      | true    | Use fluid layout mode.                                                       |
| loop         | Boolean      | -       | Replay the video after ending                                                |
| muted        | Boolean      | -       | Play the video without sounds.                                               |
| playbackRate | Number       | 1.0     | Playback speed. 1.0 means original speed.                                    |
| playsinline  | Boolean      | true    | Should be true so custom controls available on all platforms, including iOS. |
| poster       | String       | -       | Image to show before playing the video.                                      |
| preload      | String       | -       | Preload the video before playing. (none / metadata / auto)                   |
| responsive   | Boolean      | -       | Auto show/hide controls depending on the screen size.                        |
| sources      | Object/Array | -       | Source of videos (See [Source Object](#source-object))                       |
| seekButtons  | Boolean      | false   | Show 10 seconds seek buttons and allow double-tap to seek on mobile.         |
| volume       | Number       | -       | Video's volume between 0 and 1.                                              |
| plugins      | Array        | -       | Videojs's plugins                                                            |

The following 5 properties can also be added to `options` for an advanced usage.

| Name                      | Type     | Description                                                                     |
|---------------------------|----------|---------------------------------------------------------------------------------|
| playerSlugId              | String   | SlugId of player created via api player server service                          |
| playerVersion             | String   | Custom version of the player. (default: 'v1')                                   |
| playerEndpoint            | String   | Endpoint to the video player (without version part and ending slash).           |
| playerJsFileName          | String   | File name of player's JS. (default: 'byteark-player.min.js')                    |
| playerCssFileName         | String   | File name of player's CSS. (default: 'byteark-player.min.css')                  |

You can also use other props not listed here,
but appear as [VideoJS's options](https://docs.videojs.com/tutorial-options.html#playbackrates).
However, changing props will not effective after the player is created.

### Source Object

The `sources` object has 2 required fields.

| Name    | Type   | Required | Description                                          |
|---------|--------|----------|------------------------------------------------------|
| src     | String | true     | URL to the video.                                    |
| type    | String | true     | Video content type.                                  |
| title   | String | false    | Video title to display on the player.                |
| videoId | String | false    | Video's ID, usually used by analytical applications. |
| poster  | String | false    | Image to show before playing the video.              |

To provide multiple version of sources, you can use array of source objects.

## Event Handling

ByteArk Player emits events that you can use to trigger your custom functions.

| Event Name              | Callback Parameters               | Trigger Condition                                                           |
|-------------------------|-----------------------------------|-----------------------------------------------------------------------------|
| created                 | `(player)`                        | When the player instance was created.                                       |
| error                   | `(originalError)`                 | When there was an error while loading player.                               |
| ready                   | `(player)`                        | When the player instance was ready to play.                                 |
| firstplay               | `(player)`                        | When the video played for the first time.                                   |
| play                    | `(player, currentTime)`           | When the video played or the user hit play.      (Value of currentTime is a number in seconds) |
| pause                   | `(player, currentTime)`           | When the video played or the user hit pause.     (Value of currentTime is a number in seconds) |
| ended⁕                  | `(player)`                        | When the video ended.                                                       |
| timeupdate              | `(player, currentTime)`           | When the current playback time changed.          (Value of currentTime is a number in seconds) |
| seeking                 | `(player, currentTime)`           | When the the user seeked the video.              (Value of currentTime is a number in seconds) |
| waiting                 | `(player)`                        | When the player is waiting for the video.                                   |
| fullscreenchange        | `(player, isFullscreen)`          | When the user entered or exited the full screen mode.   (Value of isFullscreen is True or False) |
| volumechange            | `(player, volume)`                | When the user adjusted the volume.     (Value of volume is between 0 - 1)       |
| ratechange              | `(player, playbackSpeed)`         | When the user adjusted the playback speed.     (Value of playbackSpeed is a number)  |
| enterpictureinpicture   | `(player)`                        | When the user entered Picture-in-Picture mode.                                   |
| leavepictureinpicture   | `(player)`                        | When the user exited Picture-in-Picture mode.                                    |

⁕ You are reminded that [HTML5 video element fires a pause event whenever the playback stops](https://www.w3.org/2010/05/video/mediaevents.html), including at the end of the content.

For an example of implementing these events, please see [Controlling Players Section](#controlling-players).

## Advanced Props

We also provide ways to customize the player functions and behaviours by passing the following props to the player.

| Name                      | Type     | Description                                                                     |
|---------------------------|----------|---------------------------------------------------------------------------------|
| createPlayerFunction      | Function | Custom video instance. This function should return a VideoJS's player instance. |
| lazyload                  | Boolean  | The player loads its asset files once it got rendered on the webpage. By passing this prop, the player then loads its asset files once the user clicked on the player instead. |
| onPlayerSetup             | Function | Inject your custom functions before creating a player instance.                 |
| onPlayerSetupError        | Function | Inject your custom functions when there was an error during the setup.          |

```vue
<template>
  <ByteArkPlayerContainer
    :options="options"
    lazyload />
</template>
```
## Advanced Usages

### Controlling Players

You may access the player directly via `getPlayer()` method,
or using the player instance that sent from `onReady` callback.

```vue
<template>
  <ByteArkPlayerContainer
    @ready="onReady"
    @firstplay="onFirstPlay"
    @play="onPlay"
    @pause="onPause"
    @ended="onVideoEnded"
    @timeupdate="onTimeUpdated"
    @seeking="onVideoSeeked"
    @waiting="onPlayerWaiting"
    @fullscreenchange="onToggleFullScreen"
    @volumechange="onVolumeChange"
    @ratechange="onPlaybackSpeedChanged"
    @enterpictureinpicture="onPIPEntered"
    @leavepictureinpicture="onPIPExited"
    :options="playerOptions" />
  <button @click.stop="playerInstance.play()">Play</button>
  <button @click.stop="playerInstance.pause()">Pause</button>
</template>

<script>
import ByteArkPlayerContainer from '@byteark/byteark-player-vue';

export default {
  components: {
    ByteArkPlayerContainer,
  },
  data() {
    return {
      playerInstance: null,
      playerOptions: {
        autoplay: true,
        fluid: true,
        sources: {
          src: 'https://video.example.com/path/to/video/playlist.m3u8',
          type: 'application/x-mpegURL',
          // Optional
          title: 'Video Title'
        },
      },
    };
  },
  methods: {
    doSomething() {
      // Do something...
    },
    onReady(newPlayerInstance) {
      this.playerInstance = newPlayerInstance;
      this.doSomething();
    },
    onFirstPlay(playerInstance) {
      this.doSomething();
    },
    onPlay(playerInstance, currentTime) {
      this.doSomething();
    },
    onPause(playerInstance, currentTime) {
      this.doSomething();
    },
    onVideoEnded(playerInstance) {
      this.doSomething();
    },
    onTimeUpdated(playerInstance, currentTime) {
      this.doSomething();
    },
    onVideoSeeked(playerInstance, currentTime) {
      this.doSomething();
    },
    onPlayerWaiting(playerInstance) {
      this.doSomething();
    },
    onToggleFullScreen(playerInstance, isFullscreen) {
      this.doSomething();
    },
    onVolumeChange(playerInstance, volume) {
      this.doSomething();
    },
    onPlaybackSpeedChanged(playerInstance, playbackSpeed) {
      this.doSomething();
    },
    onPIPEntered(playerInstance) {
      this.doSomething();
    },
    onPIPExited(playerInstance) {
      this.doSomething();
    },
  },
};
</script>
```


### Using VideoJS Plugins

```vue
<template>
  <ByteArkPlayerContainer
    @ready="onReady"
    :options="playerOptions" />
</template>

<script>
import ByteArkPlayerContainer from '@byteark/byteark-player-vue';

export default {
  components: {
    ByteArkPlayerContainer,
  },
  data() {
    return {
      playerInstance: null,
      playerOptions: {
        autoplay: true,
        fluid: true,
        sources: {
          src: 'https://video.example.com/path/to/video/playlist.m3u8',
          type: 'application/x-mpegURL',
          // Optional
          title: 'Video Title'
        },
      },
    };
  },
  methods: {
    onReady(newPlayerInstance) {
      // The player is ready! Initialize plugins here.
    },
  },
};
</script>
```

### Request Media/Encryption with credentials

```vue
<template>
  <ByteArkPlayerContainer
          @ready="onReady"
          :options="playerOptions" />
</template>

<script>
import ByteArkPlayerContainer from '@byteark/byteark-player-vue';

export default {
  components: {
    ByteArkPlayerContainer,
  },
  data() {
    return {
      playerInstance: null,
      playerOptions: {
        autoplay: true,
        fluid: true,
        sources: {
          src: 'https://video.example.com/path/to/video/playlist.m3u8',
          type: 'application/x-mpegURL',
          // Optional
          title: 'Video Title',
        },
        html5: {
          hlsjs: {
            xhrSetup: function(xhr, url) {
              xhr.withCredentials = true;
            },
          },
        },
      },
    };
  },
  methods: {
    onReady(newPlayerInstance) {
      // The player is ready! Initialize plugins here.
    },
  },
};
</script>
```

## License

MIT © [ByteArk Co. Ltd.](https://github.com/byteark)
