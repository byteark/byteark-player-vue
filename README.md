# ByteArk Player Container for Vue.js

[![NPM](https://img.shields.io/npm/v/@byteark/byteark-player-vue.svg)](https://www.npmjs.com/package/@byteark/byteark-player-vue)

Table of Contents
- [ByteArk Player Container for Vue.js](#byteark-player-container-for-vuejs)
  - [Demo](#demo)
  - [Features](#features)
  - [Compatibility](#compatibility)
  - [Installation](#installation)
  - [Usage](#usage)
  - [ByteArkPlayerContainer Props](#bytearkplayercontainer-props)
    - [ByteArk Player Options](#byteark-player-options)
    - [Source Object](#source-object)
  - [Event Handling](#event-handling)
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

| Vue Version | Package Version | Branch |
|-------------|-----------------|--------|
| 2.x         | 3.x             | master |
| 3.x         | 4.x             | main   |

## Installation

This library is distributed via NPM. You may install from NPM, Yarn, PNPM.

```bash
# For NPM
npm install --save @byteark/byteark-player-vue
# For Yarn
yarn add @byteark/byteark-player-vue
# For PNPM
pnpm add @byteark/byteark-player-vue
```

## Usage

1. Include and register `ByteArkPlayerContainer` in your project.

```vue
<template>
  <ByteArkPlayerContainer
    :options="playerOptions"
  />
</template>

<script setup lang="ts">
import ByteArkPlayerContainer from '@byteark/byteark-player-vue';
import type { ByteArkPlayerOptions } from '@byteark/byteark-player-vue';

const playerOptions: ByteArkPlayerOptions = {
  autoplay: 'any',
  fluid: true,
  aspectRatio: '16:9',
  poster: 'https://stream-image.byteark.com/image/video-cover-480p/7/K/7KPloVWgN.png',
  sources: [{
    src: 'https://byteark-playertzxedwv.stream-playlist.byteark.com/streams/TZyZheqEJUwC/playlist.m3u8',
    type: 'application/x-mpegURL',
    title: 'Big Buck Bunny',
    videoId: 'TZyZheqEJUwC',
    poster: 'https://stream-image.byteark.com/image/video-cover-480p/7/K/7KPloVWgN.png',
  }]
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

## ByteArkPlayerContainer Props

Following properties are the properties that can be updated to the ByteArkPlayerContainer.

| Name                 | Type                                                                                                                         | Default | Description                                                                                                                                                                    |
|----------------------|------------------------------------------------------------------------------------------------------------------------------|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| options              | ByteArkPlayerOptions                                                                                                         | -       | An options pass to ByteArk Player (See [ByteArk Player Options Object](#byteark-player-options))                                                                               |
| customClass          | String                                                                                                                       | -       | Add custom css class to ByteArkPlayerContainer component                                                                                                                       |
| lazyload             | Boolean                                                                                                                      | -       | The player loads its asset files once it got rendered on the webpage. By passing this prop, the player then loads its asset files once the user clicked on the player instead. |
| playerEndpoint       | String                                                                                                                       | -       | Endpoint to the video player (without version part).                                                                                                                           |
| playerSlugId         | String                                                                                                                       | -       | SlugId of player created via api player server service                                                                                                                         |
| playerVersion        | String                                                                                                                       | v2      | Custom version of the player.                                                                                                                                                  |
| playerJsFileName     | String                                                                                                                       |         | File name of player's JS.                                                                                                                                                      |
| playerCssFileName    | String                                                                                                                       |         | File name of player's CSS.                                                                                                                                                     |
| setupPlayerFunction  | `(options: ByteArkPlayerOptions, loadScriptOrStyleFunction: (id: string, url: string, type: 'script' \| 'style') => Promise` | -       | This function call to before create player function                                                                                                                            |
| createPlayerFunction | `(node: HTMLMediaElement, options: ByteArkPlayerOptions, onReady: () => void) => ByteArkPlayer`                              | -       | This function should return a VideoJS's player instance.                                                                                                                       |
| onPlayerLoaded       | `() => void`                                                                                                                 | -       | Callback function to be called when loaded player's resources.                                                                                                                 |
| onPlayerLoadError    | `(error: ByteArkPlayerContainerError, originalError: ByteArkPlayerError \| unknown) => void`                                 | -       | Callback function to be called when there're an error about loading player.                                                                                                    |
| onPlayerSetup        | `() => void`                                                                                                                 | -       | Callback function to be called when player is setup.                                                                                                                           |
| onPlayerSetupError   | `(error: ByteArkPlayerContainerError, originalError: ByteArkPlayerError \| unknown) => void`                                 | -       | Callback function to be called when there're an error when setup player.                                                                                                       |
| onPlayerCreated      | `(player: ByteArkPlayer) => void`                                                                                            | -       | Callback function to be called when a player instance is created.                                                                                                              |
| onPlayerReady        | `(player: ByteArkPlayer) => void`                                                                                            | -       | Callback function to be called when a player instance is ready.                                                                                                                |

### ByteArk Player Options

You have to pass `options` object to `ByteArkPlayerContainer` in order to create ByteArk Player instance.

| Name         | Type           | Default | Description                                                                                                                       |
|--------------|----------------|---------|-----------------------------------------------------------------------------------------------------------------------------------|
| autoplay     | Boolean/String | -       | Autoplay the video after the player is created. (Seee [VideoJS's autoplay options](https://videojs.com/guides/options/#autoplay)) |
| aspectRatio  | String         | -       | Use with fluid layout mode, to inform expected video's aspect ratio                                                               |
| controls     | Boolean        | true    | Show the controls bar.                                                                                                            |
| fill         | Boolean        | -       | Use fill layout mode.                                                                                                             |
| fluid        | Boolean        | -       | Use fluid layout mode.                                                                                                            |
| loop         | Boolean        | -       | Replay the video after ending                                                                                                     |
| muted        | Boolean        | -       | Play the video without sounds.                                                                                                    |
| playbackRate | Number         | 1.0     | Playback speed. 1.0 means original speed.                                                                                         |
| playsinline  | Boolean        | true    | Should be true so custom controls available on all platforms, including iOS.                                                      |
| poster       | String         | -       | Image to show before playing the video.                                                                                           |
| preload      | String         | -       | Preload the video before playing. (none / metadata / auto)                                                                        |
| responsive   | Boolean        | -       | Auto show/hide controls depending on the screen size.                                                                             |
| seekButtons  | Boolean        | -       | Show 10 seconds seek buttons and allow double-tap to seek on mobile.                                                              |
| sources      | Array          | -       | Array of video source object to be played. (See [Source Object](#source-object))                                                  |
| volume       | Number         | -       | Video's volume between 0 and 1.                                                                                                   |
| plugins      | Array          | -       | Videojs's plugins                                                                                                                 |

You can also use other props not listed here,
but appear as [VideoJS's options](https://videojs.com/guides/options/).
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

ByteArkPlayerContainer emits events that you can use to trigger your custom functions.

| Event Name            | Callback Parameters                                                                        | Trigger Condition                                                                                |
|-----------------------|--------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| loaded                | -                                                                                          | When loaded player's resources.                                                                  |
| loaderror             | `(error: ByteArkPlayerContainerError, originalError: ByteArkPlayerError \| unknown): void` | When there're an error about loading player's resources.                                         |
| setup                 | -                                                                                          | When player is setup.                                                                            |
| setuperror            | `(error: ByteArkPlayerContainerError, originalError: ByteArkPlayerError \| unknown): void` | When there're an error when setup player.                                                        |
| created               | `(player: ByteArkPlayer)`                                                                  | When the player instance was created.                                                            |
| ready                 | `(player: ByteArkPlayer)`                                                                  | When the player instance was ready to play.                                                      |
| firstplay             | `(player: ByteArkPlayer)`                                                                  | When the video played for the first time.                                                        |
| play                  | `(player: ByteArkPlayer, currentTime: number)`                                             | When the video played or the user hit play.      (Value of currentTime is a number in seconds)   |
| pause                 | `(player: ByteArkPlayer, currentTime: number)`                                             | When the video played or the user hit pause.     (Value of currentTime is a number in seconds)   |
| ended                 | `(player: ByteArkPlayer)`                                                                  | When the video ended.                                                                            |
| timeupdate            | `(player: ByteArkPlayer, currentTime: number)`                                             | When the current playback time changed.          (Value of currentTime is a number in seconds)   |
| seeking               | `(player: ByteArkPlayer, currentTime: number)`                                             | When the the user seeked the video.              (Value of currentTime is a number in seconds)   |
| seeked                | `(player: ByteArkPlayer, currentTime: number)`                                             | When the the user seeked the video.              (Value of currentTime is a number in seconds)   |
| waiting               | `(player: ByteArkPlayer)`                                                                  | When the player is waiting for the video.                                                        |
| stalled               | `(player: ByteArkPlayer)`                                                                  | When the player is waiting for the video.                                                        |
| fullscreenchange      | `(player: ByteArkPlayer, isFullscreen: boolean)`                                           | When the user entered or exited the full screen mode.   (Value of isFullscreen is True or False) |
| volumechange          | `(player: ByteArkPlayer, volume: number)`                                                  | When the user adjusted the volume.     (Value of volume is between 0 - 1)                        |
| ratechange            | `(player: ByteArkPlayer, playbackSpeed: number)`                                           | When the user adjusted the playback speed.     (Value of playbackSpeed is a number)              |
| enterpictureinpicture | `(player: ByteArkPlayer)`                                                                  | When the user entered Picture-in-Picture mode.                                                   |
| leavepictureinpicture | `(player: ByteArkPlayer)`                                                                  | When the user exited Picture-in-Picture mode.                                                    |
| error                 | `(error: ByteArkPlayerError \| MediaError \| unknown \| null)`                             | When there was an error while loading player.                                                    |

For an example of implementing these events, please see [Controlling Players Section](#controlling-players).

## Advanced Usages

### Controlling Players

You may access the player instance from onReady callback parameter.

```vue
<template>
  <ByteArkPlayerContainer
    @ready="onReady"
    @firstplay="onFirstPlay"
    @play="onPlay"
    @pause="onPause"
    @ended="onVideoEnded"
    @timeupdate="onTimeUpdated"
    @seeking="onVideoSeeking"
    @seeked="onVideoSeeked"
    @fullscreenchange="onToggleFullScreen"
    @volumechange="onVolumeChange"
    @ratechange="onPlaybackSpeedChanged"
    @enterpictureinpicture="onPIPEntered"
    @leavepictureinpicture="onPIPExited"
    :options="playerOptions" />
  <button @click="player.value?.play()">Play</button>
  <button @click="player.value?.pause()">Pause</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ByteArkPlayerContainer from '@byteark/byteark-player-vue'
import type { ByteArkPlayerOptions, ByteArkPlayer } from '@byteark/byteark-player-vue'

const playerRef = ref<ByteArkPlayer | null>(null)

const playerOptions: ByteArkPlayerOptions = {
  autoplay: 'any',
  fluid: true,
  aspectRatio: '16:9',
  poster: 'https://stream-image.byteark.com/image/video-cover-480p/7/K/7KPloVWgN.png',
  sources: [{
    src: 'https://byteark-playertzxedwv.stream-playlist.byteark.com/streams/TZyZheqEJUwC/playlist.m3u8',
    type: 'application/x-mpegURL',
    title: 'Big Buck Bunny',
    videoId: 'TZyZheqEJUwC',
    poster: 'https://stream-image.byteark.com/image/video-cover-480p/7/K/7KPloVWgN.png',
  }]
}

const onReady = (player: ByteArkPlayer) => {
  // The player is ready! save player instance
  playerRef.value = player
}

const onFirstPlay = (player: ByteArkPlayer) => {
  // Do something...
}

const onPlay = (player: ByteArkPlayer, currentTime: number) => {
  // Do something...
}

const onPause = (player: ByteArkPlayer, currentTime: number) => {
  // Do something...
}

const onVideoEnded = () => {
  // Do something...
}

const onTimeUpdated = (player: ByteArkPlayer, currentTime: number) => {
  // Do something...
}

const onVideoSeeking = (player: ByteArkPlayer, currentTime: number) => {
  // Do something...
}

const onVideoSeeked = (player: ByteArkPlayer, currentTime: number) => {
  // Do something...
}

const onToggleFullScreen = (player: ByteArkPlayer, isFullscreen: boolean) => {
  // Do something...
}

const onVolumeChange = (player: ByteArkPlayer, volume: number) => {
  // Do something...
}

const onPlaybackSpeedChanged = (player: ByteArkPlayer, playbackSpeed: number) => {
  // Do something...
}

const onPIPEntered = (player: ByteArkPlayer,) => {
  // Do something...
}

const onPIPExited = (player: ByteArkPlayer,) => {
  // Do something...
}
</script>
```

### Using VideoJS Plugins

```vue
<template>
  <ByteArkPlayerContainer
    @ready="onReady"
    :options="playerOptions"
  />
</template>

<script setup lang="ts">
import ByteArkPlayerContainer from '@byteark/byteark-player-vue'
import type { ByteArkPlayerOptions, ByteArkPlayer } from '@byteark/byteark-player-vue'

const playerOptions: ByteArkPlayerOptions = {
  autoplay: 'any',
  fluid: true,
  aspectRatio: '16:9',
  poster: 'https://stream-image.byteark.com/image/video-cover-480p/7/K/7KPloVWgN.png',
  sources: [{
    src: 'https://byteark-playertzxedwv.stream-playlist.byteark.com/streams/TZyZheqEJUwC/playlist.m3u8',
    type: 'application/x-mpegURL',
    title: 'Big Buck Bunny',
    videoId: 'TZyZheqEJUwC',
    poster: 'https://stream-image.byteark.com/image/video-cover-480p/7/K/7KPloVWgN.png',
  }]
}

const onReady = (player: ByteArkPlayer) => {
  // The player is ready! Initialize plugins here.
  player.somePlugin()
}
</script>
```

### Request Media/Encryption with credentials

```vue
<template>
  <ByteArkPlayerContainer
    :options="playerOptions"
  />
</template>

<script setup lang="ts">
import ByteArkPlayerContainer from '@byteark/byteark-player-vue'
import type { ByteArkPlayerOptions, ByteArkPlayer } from '@byteark/byteark-player-vue'

const playerOptions: ByteArkPlayerOptions = {
  autoplay: 'any',
  fluid: true,
  aspectRatio: '16:9',
  poster: 'https://stream-image.byteark.com/image/video-cover-480p/7/K/7KPloVWgN.png',
  sources: [{
    src: 'https://byteark-playertzxedwv.stream-playlist.byteark.com/streams/TZyZheqEJUwC/playlist.m3u8',
    type: 'application/x-mpegURL',
    title: 'Big Buck Bunny',
    videoId: 'TZyZheqEJUwC',
    poster: 'https://stream-image.byteark.com/image/video-cover-480p/7/K/7KPloVWgN.png',
  }],
  html5: {
    hlsjs: {
      xhrSetup: function(xhr, url) {
        xhr.withCredentials = true;
      },
    },
  },
}
</script>
```

## License

MIT © [ByteArk Co. Ltd.](https://github.com/byteark)
