<template>
  <v-layout
    column
    justify-center
    align-center
    app
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <v-card v-if="lives">
        <v-card-title>直播动态</v-card-title>
        <v-card-text>
          <v-progress-circular indeterminate class="accent--text" v-if="lives_loading" />
          <div v-for="live in lives">
            <div v-if="live.title.length">
              <span v-if="live.type === 'upcoming'">计划{{ format_time(live.startTime) }}</span>
              <span v-if="live.type === 'live'">正在直播</span>
              <a :href="'https://www.youtube.com/watch?v=' + live.id" target="_blank">{{ live.title }}</a>
            </div>
          </div>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-title>
          <img src="/favicon.ico" style="width: 24px; margin-right: 8px" alt="icon"/>
          {{ $t('control.self') }}
        </v-card-title>
        <v-card-text>
          <v-btn class="accent ma-1 pa-1">{{ $t('control.pick_one') }}</v-btn>
          <v-btn class="accent ma-1 pa-1">{{ $t('control.stop') }}</v-btn>
          <v-btn class="accent ma-1 pa-1" @click="overlap = !overlap">
            <v-icon>{{ overlap ? 'mdi-check' : 'mdi-close' }}</v-icon>{{ $t('control.enable_overlap') }}
          </v-btn>
          <v-btn class="accent ma-1 pa-1" @click="random = !random">
            <v-icon>{{ random ? 'mdi-check' : 'mdi-close' }}</v-icon>{{ $t('control.enable_random') }}
          </v-btn>
        </v-card-text>
      </v-card>
      <v-card v-for="group in groups" :key="group.name">
        <v-card-title class="headline">
          {{ group.group_description[$i18n.locale] }}
        </v-card-title>
        <v-card-text>
          <v-btn v-for="item in group.voice_list" :key="item.name"
                 @click="play(item)"
                 :loading="item.loading"
                 class="accent ma-1 pa-2 voice-button"
                 height="max-content" min-height="36px">
            {{ item.description[$i18n.locale] }}
          </v-btn>
        </v-card-text>
      </v-card>
      <audio id="single_play" @ended="ended()" />
    </v-flex>
  </v-layout>
</template>

<style>
  .v-card {
    margin: 8px auto;
  }
  .voice-button {
    display: inline-block;
    max-width: 100%;
    word-wrap: break-word !important;
    word-break: break-all !important;
    white-space: normal !important;
  }
</style>

<script>
import voice_lists from '~/assets/voices.json';
import moment from 'moment';

export default {
  data() {
    return {
      overlap: false,
      random: false,
      groups: voice_lists.groups,
      lives: [],
      lives_loading: true
    }
  },
  methods: {
    format_time(stamp) {
      return moment.unix(stamp).format('YYYY/M/DD HH:mm');
    },
    play(item) {
      if(!this.overlap) {
        let sp = document.getElementById('single_play');
        sp.pause();
        sp.src = '/voices/' + item.path;
        sp.play();
      } else {
        let audio = new Audio('/voices/' + item.path);
        audio.play();
      }
    },
    progress(audio, item) {
      setInterval(function() {
        item.progress = audio.currentTime / audio.duration;
      }, 500);
    },
    ended() {

    }
  },
  async mounted() {
    let holo = await this.$axios.$get('https://cors-ion.herokuapp.com/https://storage.googleapis.com/vthell-data/live.json');
    this.lives = holo.UCdn5BQ06XqgXoAxIhbqw5Rg;
    this.lives_loading = false;
  }
}
</script>
