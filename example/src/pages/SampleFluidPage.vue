<template>
  <div>
    <NavBar />
    <div class="container">
      <div class="row mt-4">
        <div class="col-sm-8">
          <ByteArkPlayerContainer
            :sources="video"
            :poster="video.poster"
            :options="options" />
          <div class="mt-4">
            <VideoInfo
              :title="video.title"
              :description="video.description" />
          </div>
          <code>
          </code>
        </div>
        <div class="col-sm-4">
          <VideoList
            :video.sync="video"
            :videos="videos"
            :onVideoSelected="setVideo" />
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
      fluid: true,
      aspectRatio: '16:9',
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
