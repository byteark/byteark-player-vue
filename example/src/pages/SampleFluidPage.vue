<template>
  <div>
    <NavBar />
    <div class="container">
      <div class="row mt-4">
        <div class="col-sm-8">
          <ByteArkPlayerContainer
            @ready="console.log('I\'m Ready!')"
            @firstplay="console.log('This is the first play.')"
            @play="console.log('You hit play.')"
            @pause="console.log('You hit pause.')"
            @ended="console.log('The video ended. What to watch next?')"
            @timeupdate="console.log('Time Updated.')"
            @seeking="console.log('You seeked the video.')"
            @waiting="console.log('Waiting for the video...')"
            @fullscreenchange="console.log('You toggled Full Screen Mode.')"
            @volumechange="console.log('You adjusted the volume.')"
            @ratechange="console.log('You adjusted the playback speed.')"
            @enterpictureinpicture="console.log('You entered Picture-in-Picture Mode.')"
            @leavepictureinpicture="console.log('You exited Picture-in-Picture Mode.')"
            :options="options" />
          <div class="mt-4">
            <VideoInfo
              :video="video" />
          </div>
        </div>
        <div class="col-sm-4">
          <VideoList
            :videos="videos"
            @onVideoSelected="setVideo" />
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import ByteArkPlayerContainer from '@byteark/byteark-player-vue';
import NavBar from '@/components/NavBar.vue';
import VideoInfo from '@/components/VideoInfo.vue';
import VideoList from '@/components/VideoList.vue';
import videos from '../videos';

export default {
  data() {
    return {
      video: null,
      options: {},
      videos,
    };
  },
  computed: {
    console: () => console,
  },
  components: {
    ByteArkPlayerContainer,
    NavBar,
    VideoInfo,
    VideoList,
  },
  created() {
    // eslint-disable-next-line
    this.video = videos[0];
    this.options = {
      fluid: true,
      aspectRatio: '16:9',
      autoplay: true,
      poster: this.video.poster,
      sources: this.video,
      playbackRates: [0.5, 1, 1.5, 2],
    };
  },
  methods: {
    setVideo(video) {
      this.video = video;
      this.options = {
        ...this.options,
        poster: video.poster,
        sources: video,
      };
    },
  },
};
</script>
