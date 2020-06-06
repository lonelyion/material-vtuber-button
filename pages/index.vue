<template>
  <v-layout column justify-center align-center app>
    <v-speed-dial
      v-model="fab"
      fixed
      bottom
      right
      direction="top"
      open-on-click
      transition="slide-y-reverse-transition"
    >
      <template v-slot:activator>
        <v-btn slot="activator" v-model="fab" :class="speed_dial_color" dark fab hover>
          <v-icon v-if="fab">
            mdi-close
          </v-icon>
          <v-icon v-else large>
            mdi-play
          </v-icon>
        </v-btn>
      </template>
      <v-btn fab small :class="fab_color" @click.stop="stop_all()">
        <span class="fab-tip">{{ $t('control.stop') }}</span>
        <v-icon :class="fab_icon">
          mdi-stop
        </v-icon>
      </v-btn>
      <v-btn fab small :class="fab_color" @click.stop="get_random_voice()">
        <span class="fab-tip">{{ $t('control.pick_one') }}</span>
        <v-icon :class="fab_icon">
          mdi-selection-ellipse-arrow-inside
        </v-icon>
      </v-btn>
      <v-btn fab small :class="fab_color" :disabled="random" @click.stop="overlap = !overlap">
        <span class="fab-tip">
          {{ overlap_text }}
        </span>
        <v-icon :class="fab_icon">
          mdi-view-parallel
        </v-icon>
      </v-btn>
      <v-btn fab small :class="fab_color" :disabled="random" @click.stop="repeat = !repeat">
        <span class="fab-tip">
          {{ repeat_text }}
        </span>
        <v-icon :class="fab_icon">
          mdi-repeat
        </v-icon>
      </v-btn>
      <v-btn fab small :class="fab_color" :disabled="overlap || repeat" @click.stop="random = !random">
        <span class="fab-tip">
          {{ random_text }}
        </span>
        <v-icon :class="fab_icon">
          mdi-shuffle
        </v-icon>
      </v-btn>
    </v-speed-dial>
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
      <v-card v-for="group in groups" :key="group.name">
        <v-card-title class="headline" :class="dark_text">
          {{ group.group_description[current_locale] }}
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
            {{ item.description[current_locale] }}
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
.fab-tip {
  position: absolute;
  right: 52px;
  padding: 5px 16px;
  background: rgba(97, 97, 97, 0.9);
  border-radius: 4px;
  color: #fff;
  width: auto;
  font-size: 14px;
  font-weight: normal;
  line-height: 22px;
  opacity: 0.9;
  text-transform: none;
  letter-spacing: normal;
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
      repeat: false,
      fab: false,
      groups: voice_lists.groups,
      lives: [],
      lives_loading: true
    };
  },
  computed: {
    dark_text: function() {
      return {
        'grey--text': this.$vuetify.theme.dark,
        'text--lighten-2': this.$vuetify.theme.dark
      };
    },
    fab_icon: function() {
      return [this.$vuetify.theme.dark ? 'white--text' : 'light-blue--text'];
    },
    fab_color: function() {
      return [this.$vuetify.theme.dark ? 'indigo darken-1' : 'white'];
    },
    speed_dial_color: function() {
      return [this.$vuetify.theme.dark ? 'cyan darken-1' : 'cyan lighten-2'];
    },
    current_locale() {
      return this.$i18n.locale;
    },
    overlap_text() {
      return (
        this.$t('control.overlap') + ' ' + (this.overlap ? this.$t('control.enabled') : this.$t('control.disabled'))
      );
    },
    random_text() {
      return this.$t('control.random') + ' ' + (this.random ? this.$t('control.enabled') : this.$t('control.disabled'));
    },
    repeat_text() {
      return this.$t('control.repeat') + ' ' + (this.repeat ? this.$t('control.enabled') : this.$t('control.disabled'));
    },
    second_anniversary() {
      return moment().isSame('2020-06-01', 'day');
    }
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
      let that = this;
      if (!this.overlap) {
        let sp = document.getElementById('single_play');
        sp.src = '/voices/' + item.path;
        sp.load();
        sp.addEventListener('canplay', function() {
          sp.volume = 1;
          sp.play();
          if ('mediaSession' in navigator) {
            let meta = {
              title: item.description[that.current_locale],
              artist: that.$t('control.full_name'),
              album: that.$t('site.title') + '(^・ω・^§)',
              artwork: [{ src: '/img/media-cover.jpg', sizes: '128x128', type: 'image/jpeg' }]
            };
            navigator.mediaSession.metadata = new window.MediaMetadata(meta);
          }
        });
        this.$bus.$on('abort_play', () => {
          sp.pause();
        });
      } else {
        //重叠播放
        let audio = new Audio('/voices/' + item.path);
        audio.load();
        if ('mediaSession' in navigator) {
          const metadata = {
            title: that.$t('control.overlap_title'),
            artist: that.$t('control.full_name'),
            album: that.$t('site.title') + '(^・ω・^§)',
            artwork: [{ src: '/img/media-cover.jpg', sizes: '128x128', type: 'image/png' }]
          };
          navigator.mediaSession.metadata = new window.MediaMetadata(metadata);
        }
        audio.addEventListener('canplay', function() {
          audio.volume = 1;
          audio.play();
        });
        audio.addEventListener('ended', function() {
          //重叠播放下的循环播放实现
          if (that.repeat) {
            audio.play();
          }
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
      } else if (this.repeat && !this.overlap) {
        //对于单个音频的循环播放
        let sp = document.getElementById('single_play');
        sp.play();
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
