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
        <v-card-title>
          <v-icon class="primary--text" style="margin-right: 8px">mdi-clock-outline</v-icon>
          直播动态
        </v-card-title>
        <v-card-text>
          <v-progress-circular indeterminate class="accent--text" v-if="lives_loading" />
          <div v-for="live in lives" :key="live.startTime">
            <div v-if="live.title.length">
              <span v-if="live.type === 'upcoming'">计划{{ format_time(live.startTime) }}</span>
              <span v-if="live.type === 'live'" class="warning--text">正在直播</span>
              <a :href="'https://www.youtube.com/watch?v=' + live.id" target="_blank"
                  style="text-decoration: none;" :class="live.type === 'live' ? 'error--text' : ''">{{ live.title }}</a>
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
          <div>
            <div>
              <v-btn class="accent ma-1 pa-1" @click="get_random_voice()">{{ $t('control.pick_one') }}</v-btn>
              <v-btn class="accent ma-1 pa-1" >{{ $t('control.stop') }}</v-btn>
              <v-btn class="accent ma-1 pa-1" @click="overlap = !overlap" :disabled="random">
                <v-icon>{{ overlap ? 'mdi-check' : 'mdi-close' }}</v-icon>{{ $t('control.enable_overlap') }}
              </v-btn>
              <v-btn class="accent ma-1 pa-1" @click="random = !random" :disabled="overlap">
                <v-icon>{{ random ? 'mdi-check' : 'mdi-close' }}</v-icon>{{ $t('control.enable_random') }}
              </v-btn>
            </div>
          </div>
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
      <audio id="single_play" @ended="play_ended()" />
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
    text-transform:none !important;
    font-weight: 400;
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
      item.loading = true;
      if(!this.overlap) {
        let sp = document.getElementById('single_play');
        sp.pause();
        sp.src = '/voices/' + item.path;
        sp.addEventListener('canplay', function() {
          sp.play();
          item.loading = false;
        })
      } else {
        let audio = new Audio('/voices/' + item.path);
        audio.play();
        audio.addEventListener('canplay', function() {
          audio.play();
          item.loading = false;
        })
      }
    },
    progress(audio, item) {
      setInterval(function() {
        item.progress = audio.currentTime / audio.duration;
      }, 500);
    },
    play_ended() {
      if(this.random) {
        this.get_random_voice();
      }
    },
    get_random_int(max) {
      return Math.floor(Math.random() * Math.floor(max));
    },
    get_random_voice() {
      let random_list = this.groups[this.get_random_int(this.groups.length)];
      this.play(random_list.voice_list[this.get_random_int(random_list.voice_list.length)]);
    },
    stop_all() {

    }
  },
  async mounted() {
    let holo = await this.$axios.$get('https://cors.lonelyion.workers.dev/?https://storage.googleapis.com/vthell-data/live.json');
    let fbk_lives = holo.UCdn5BQ06XqgXoAxIhbqw5Rg;
    fbk_lives.forEach(function(item, index, object) {
      if(!item.title.length) {
        object.splice(index, 1);
      }
    })
    this.lives = fbk_lives;
    this.lives_loading = false;
  }
}
</script>
