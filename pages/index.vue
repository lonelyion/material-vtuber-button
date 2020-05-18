<template>
  <v-layout column justify-center align-center app>
    <v-flex xs12 sm8 md6>
      <v-card v-if="lives.length !== 0">
        <v-card-title>
          <v-icon class="primary--text" :class="dark_text" style="margin-right: 8px;">
            mdi-clock-outline
          </v-icon>
          {{ $t('live.activity') }}
        </v-card-title>
        <v-card-text>
          <v-progress-circular v-if="lives_loading" indeterminate class="accent--text" />
          <div v-for="live in lives" :key="live.startTime">
            <div v-if="live.title.length" :class="dark_text">
              <span v-if="live.type === 'upcoming'">{{ $t('live.schedule') + format_time(live.startTime) }}</span>
              <span v-if="live.type === 'live'" class="warning--text">{{ $t('live.on_air') }}</span>
              <a
                :href="'https://www.youtube.com/watch?v=' + live.id"
                target="_blank"
                style="text-decoration: none;"
                :class="live.type === 'live' ? 'error--text' : ''"
              >
                {{ live.title }}
              </a>
            </div>
          </div>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-title>
          <img src="/favicon.ico" style="width: 24px; margin-right: 8px;" alt="icon" />
          {{ $t('control.self') }}
        </v-card-title>
        <v-card-text>
          <div>
            <div>
              <v-btn class="accent ma-1 pa-1" :class="dark_text" @click="get_random_voice()">
                {{ $t('control.pick_one') }}
              </v-btn>
              <v-btn class="accent ma-1 pa-1" :class="dark_text" @click="stop_all()">
                {{ $t('control.stop') }}
              </v-btn>
              <v-btn class="accent ma-1 pa-1" :class="dark_text" :disabled="random" @click="overlap = !overlap">
                <v-icon>{{ overlap ? 'mdi-check' : 'mdi-close' }}</v-icon>
                {{ $t('control.enable_overlap') }}
              </v-btn>
              <v-btn class="accent ma-1 pa-1" :class="dark_text" :disabled="overlap" @click="random = !random">
                <v-icon>{{ random ? 'mdi-check' : 'mdi-close' }}</v-icon>
                {{ $t('control.enable_random') }}
              </v-btn>
            </div>
          </div>
        </v-card-text>
      </v-card>
      <v-card v-for="group in groups" :key="group.name">
        <v-card-title class="headline" :class="dark_text">
          {{ group.group_description[$i18n.locale] }}
        </v-card-title>
        <v-card-text>
          <v-btn
            v-for="item in group.voice_list"
            :key="item.name"
            class="accent ma-1 pa-2 voice-button"
            :class="dark_text"
            height="max-content"
            min-height="36px"
            @click="play(item)"
          >
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
  text-transform: none !important;
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
      lives_loading: true,
      dark_text: {
        'grey--text': this.$vuetify.theme.dark,
        'text--lighten-2': this.$vuetify.theme.dark
      }
    };
  },
  async mounted() {
    await this.fetch_live_data();
  },
  methods: {
    async fetch_live_data() {
      let fetched = await this.$axios.$get('https://api.jetri.co/live');
      let fbk_lives = [];
      const channel_id = 'UCdn5BQ06XqgXoAxIhbqw5Rg';
      fetched.live.forEach(function(item) {
        if (item.channel === channel_id) {
          fbk_lives.push(item);
        }
      });
      fetched.upcoming.forEach(function(item) {
        if (item.channel === channel_id) {
          fbk_lives.push(item);
        }
      });
      fbk_lives.forEach(function(item, index, object) {
        if (!item.title.length) {
          object.splice(index, 1);
        }
        if (item.type === 'live') {
          item.startTime = 0;
        }
      });
      this.lives = fbk_lives;
      this.lives.sort(function(a, b) {
        return a.startTime > b.startTime ? 1 : -1;
      });
      this.lives_loading = false;
    },
    format_time(stamp) {
      return moment.unix(stamp).format('YYYY/M/DD HH:mm');
    },
    play(item) {
      if (!this.overlap) {
        let sp = document.getElementById('single_play');
        sp.pause();
        sp.src = '/voices/' + item.path;
        sp.addEventListener('canplay', function() {
          sp.play();
          if ('mediaSession' in navigator) {
            const metadata = {
              title: item.description[this.$i18n.locale],
              artist: this.$t('control.full_name'),
              album: this.$t('site.title') + '(^・ω・^§)',
              artwork: [{ src: '/media-cover.jpg', sizes: '128x128', type: 'image/png' }]
            };
            navigator.mediaSession.metadata = new window.MediaMetadata(metadata);
          }
        });
        this.$bus.$on('abort_play', () => {
          sp.pause();
          delete this.sp;
        });
      } else {
        let audio = new Audio('/voices/' + item.path);
        if ('mediaSession' in navigator) {
          const metadata = {
            title: this.$t('control.overlap_title'),
            artist: this.$t('control.full_name'),
            album: this.$t('site.title') + '(^・ω・^§)',
            artwork: [{ src: '/media-cover.jpg', sizes: '128x128', type: 'image/png' }]
          };
          navigator.mediaSession.metadata = new window.MediaMetadata(metadata);
        }
        audio.addEventListener('canplay', function() {
          audio.play();
        });
        this.$bus.$on('abort_play', () => {
          audio.pause();
          delete this.audio;
        });
      }
    },
    progress(audio, item) {
      setInterval(function() {
        item.progress = audio.currentTime / audio.duration;
      }, 500);
    },
    play_ended() {
      if (this.random) {
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
      console.log('stop-all');
      this.$bus.$emit('abort_play');
    }
  },
  head() {
    return {
      title: this.$t('site.title') + '(^・ω・^§)ﾉ'
    };
  }
};
</script>
