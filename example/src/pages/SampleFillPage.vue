<template>
  <div>
    <div style="width: 100%; height: 75vh">
      <ByteArkPlayerContainer
        :sources="video"
        :poster="video.poster"
        :options="options" />
    </div>
    <NavBar />
    <div class="container mt-4">
      <div class="row">
        <div class="col-sm-8 mt-1">
          <VideoInfo
            :title="video.title"
            :description="video.description" />
        </div>
        <div class="col-sm-4 mt-1">
          <VideoList
            :videos="videos"
            @onVideoSelected="setVideo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import ByteArkPlayerContainer from 'byteark-player-vue';

import NavBar from '@/components/NavBar.vue';
import VideoInfo from '@/components/VideoInfo.vue';
import VideoList from '@/components/VideoList.vue';
import videos from '../videos';
import ByteArkPlayerContainer from '../../../src/components/ByteArkPlayerContainer.vue';

export default {
  data() {
    return {
      video: null,
      options: {},
      videos,
    };
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
      fill: true,
      onPlayerCreated: () => {
        console.log('Created!');
      },
      onReady: () => {
        console.log('Ready!');
      },
    };
  },
  methods: {
    setVideo(video) {
      this.$emit('update:video', video);
    },
  },
};
</script>
