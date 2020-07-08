# ByteArk Player Container for Vue.js

[![NPM](https://img.shields.io/npm/v/@byteark/byteark-player-vue.svg)](https://www.npmjs.com/package/@byteark/byteark-player-vue) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Table of Contents
* [Demo](#demo)
* [Features](#features)
* [Installation](#installation)
* [Usages](#usages)
* [Options prop](#options-prop)
    * [Source Object](#source-object)
* [Callback Props](#callback-props)
* [Advanced Usages](#advance-usages)
    * [Controlling Players](#controlling-players)
    * [Request Media/Encryption with credentials](#request-media-encryption-with-credentials)

## Demo

You can try on [the demo page](https://byteark.github.io/byteark-player-vue/).

## Features

* Remote player updates. No need to update your code for minor improvements.
* Show placeholder while waiting the player to be ready.
* Controls basic behaviours via props.
* Custom advanced callbacks to access ByteArk Player/VideoJS instance directly.

## Installation

This library is distributed via NPM. You may install from NPM or Yarn.

```bash
# For NPM
npm install --save @byteark/byteark-player-vue
# For Yarn
yarn add @byteark/byteark-player-vue
```

## Usage

Include and register `ByteArkPlayerContainer` in your project.

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

Include stylesheet in your project

```vue
// Inside your main SCSS file
@import '~@byteark/byteark-player-vue/dist/@byteark/byteark-player-vue.css';

// Or inside the component
<style lang="scss" scoped>
@import '~@byteark/byteark-player-vue/dist/@byteark/byteark-player-vue.css';
</style>
```

Use `fill` mode if you want the video to be displayed on a fixed-size container.

```vue
<template>
  <ByteArkPlayerContainer
    :options="playerOptions" />
</template>

<script>
import ByteArkPlayerContainer from 'byteark-player-vue';

export default {
  components: {
    ByteArkPlayerContainer,
  },
  data() {
    return {
      playerOptions: {
        autoplay: true,
        fill: true,
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

## Options prop

You have to pass options into `ByteArkPlayerContainer` 

Additional properties will be passed to the player.

| Name                 | Type           | Default | Description                                                                  |
|----------------------|----------------|---------|------------------------------------------------------------------------------|
| autoplay             | Boolean        | true    | Autoplay the video after the player is created.                              |
| aspectRatio          | String         | '16:9'  | Use with fluid layout mode, to inform expected video's aspect ratio          |
| controls             | Boolean        | true    | Show the controls bar.                                                       |
| customClass          | String         | -       | Custom class name to be applied to the video container.                      |
| fill                 | Boolean        | false   | Use fill layout mode.                                                        |
| fluid                | Boolean        | true    | Use fluid layout mode.                                                       |
| loop                 | Boolean        | -       | Replay the video after ending                                                |
| muted                | Boolean        | -       | Play the video without sounds.                                               |
| playerVersion        | String         | 'v1'    | Version of the player.                                                       |
| playbackRate         | Number         | 1.0     | Playback speed. 1.0 means original speed.                                    |
| playsinline          | Boolean        | true    | Should be true so custom controls available on all platforms, including iOS. |
| poster               | String         | -       | Image to show before playing the video.                                      |
| preload              | String         | -       | Preload the video before playing. (none / metadata / auto)                   |
| responsive           | Boolean        | -       | Auto show/hide controls depending on the screen size.                        |
| sources              | Object/Array   | -       | Source of videos (See [Source Object](#source-object))                                       |
| volume               | Number         | -       | Video's volume between 0 and 1.                                              |

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

## Callback Props

You can inject some behaviour directly to the ByteArk Player, and the VideoJS's instance.

| Name                 | Type     | Callback Parameters   | Description                                                                 |
|----------------------|----------|-----------------------|-----------------------------------------------------------------------------|
| onPlayerCreated      | Function | `(player)`            | Callback function to be called when a player instance is created.           |
| onPlayerLoadingError | Function | `({ code, message })` | Callback function to be called when there're an error about loading player. |
| onReady              | Function | `(player)`            | Callback function to be called when a player instance is ready.             |

## Advanced Props

We also provide some ways to custom the appearance of the video placeholder,
and some advanced behaviours.

| Name                      | Type     | Description                                                                     |
|---------------------------|----------|---------------------------------------------------------------------------------|
| createPlaceholderFunction | Function | Custom video placeholder. This function should return a React component.        |
| createPlayerFunction      | Function | Custom video instance. This function should return a VideoJS's player instance. |
| playerEndpoint            | String   | Endpoint to the video player (without version part).                            |
| playerJsFileName          | String   | File name of player's JS.                                                       |
| playerCssFileName         | String   | File name of player's CSS.                                                      |

## Advance Usages

### Controlling Players

You may access the player directly via `getPlayer()` method,
or using the player instance that sent from `onReady` callback.

```vue
<template>
  <ByteArkPlayerContainer
    :onReady="onReady"
    :options="playerOptions" />
  <button @click.stop="playerInstance.play()">Play</button>
  <button @click.stop="playerInstance.pause()">Pause</button>
</template>

<script>
import ByteArkPlayerContainer from 'byteark-player-vue';

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
      this.playerInstance = newPlayerInstance;
    },
  },
};
</script>
```


### Using VideoJS Plugins

```vue
<template>
  <ByteArkPlayerContainer
    :onReady="onReady"
    :options="playerOptions" />
</template>

<script>
import ByteArkPlayerContainer from 'byteark-player-vue';

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
    :onReady="onReady"
    :options="playerOptions" />
</template>

<script>
import ByteArkPlayerContainer from 'byteark-player-vue';

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
