<template>
  <v-layout column justify-center align-center app>
    <dev_warn />
    <!-- 播放控制的浮动按钮 -->
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
            {{ icons.close }}
          </v-icon>
          <v-icon v-else large>
            {{ icons.play }}
          </v-icon>
        </v-btn>
      </template>
      <v-btn fab small :class="fab_color" @click.stop="stop_all()">
        <span class="fab-tip">{{ $t('control.stop') }}</span>
        <v-icon :class="fab_icon">
          {{ icons.stop }}
        </v-icon>
      </v-btn>
      <v-btn fab small :class="fab_color" @click.stop="get_random_voice()">
        <span class="fab-tip">{{ $t('control.pick_one') }}</span>
        <v-icon :class="fab_icon">
          {{ icons.selection_ellipse_arrow_inside }}
        </v-icon>
      </v-btn>
      <v-btn fab small :class="fab_color" :disabled="random" @click.stop="overlap = !overlap">
        <span class="fab-tip">
          {{ overlap_text }}
        </span>
        <v-icon :class="fab_icon">
          {{ icons.view_parallel }}
        </v-icon>
      </v-btn>
      <v-btn fab small :class="fab_color" :disabled="random" @click.stop="repeat = !repeat">
        <span class="fab-tip">
          {{ repeat_text }}
        </span>
        <v-icon :class="fab_icon">
          {{ icons.repeat }}
        </v-icon>
      </v-btn>
      <v-btn fab small :class="fab_color" :disabled="overlap || repeat" @click.stop="random = !random">
        <span class="fab-tip">
          {{ random_text }}
        </span>
        <v-icon :class="fab_icon">
          {{ icons.shuffle }}
        </v-icon>
      </v-btn>
    </v-speed-dial>
    <v-flex xs12 sm8 md6>
      <!-- 直播面板 -->
      <v-card :loading="lives_loading">
        <v-card-title>
          <v-icon class="primary--text" :class="dark_text" style="margin-right: 8px;">
            {{ icons.clock_outline }}
          </v-icon>
          {{ $t('live.activity') }}
        </v-card-title>
        <v-card-text>
          <div v-for="live in lives" :key="live.startTime">
            <div v-if="live.title.length" :class="dark_text">
              <span v-if="live.type === 'upcoming'">{{ $t('live.schedule') + format_time(live.startTime) }}</span>
              <span v-if="live.type === 'live'" class="warning--text">{{ $t('live.on_air') }}</span>
              <a
                :href="'https://www.youtube.com/watch?v=' + live.id"
                target="_blank"
                rel="noreferrer"
                style="text-decoration: none;"
                :class="live.type === 'live' ? 'error--text' : ''"
              >
                {{ live.title }}
              </a>
            </div>
          </div>
          <div v-if="lives.length === 0">
            <p>{{ $t('live.no_schedule') }}</p>
          </div>
          <div>
            <p style="margin-top: 8px;">
              {{ $t('live.move') }}
            </p>
          </div>
        </v-card-text>
      </v-card>
      <!-- 对每个按钮组生成一个Card -->
      <v-card v-for="group in groups" :key="group.name">
        <v-card-title class="headline" :class="dark_text">
          {{ group.group_description[current_locale] }}
        </v-card-title>
        <v-card-text>
          <v-hover v-for="item in group.voice_list" :key="item.name">
            <template v-slot="{ hover }">
              <v-btn
                class="ma-1 pa-2 voice-button"
                :class="[dark_text, voice_button_color]"
                :elevation="hover ? 6 : 2"
                rounded
                height="max-content"
                min-height="36px"
                @click="play(item)"
              >
                <div class="voice-button-text">
                  {{ item.description[current_locale] }}
                </div>
              </v-btn>
            </template>
          </v-hover>
        </v-card-text>
      </v-card>
      <audio id="single_play" @ended="play_ended()" />
    </v-flex>
  </v-layout>
</template>

<style lang="scss">
$nonlinear-transition: cubic-bezier(0.25, 0.8, 0.5, 1);
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
  text-align: center;
  /*background-image: linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%) !important;*/
}

.voice-button div {
  display: inline-block;
  transition: 0.5s $nonlinear-transition;
  text-align: center;
  padding-left: 12px;
  padding-right: 12px;
}

.voice-button div:after {
  content: '🌽';
  position: absolute;
  right: -20px;
  opacity: 0;
  transition: 0.5s $nonlinear-transition;
}

.voice-button:hover div {
  padding-left: 0;
  padding-right: 24px;
}

.voice-button:hover div:after {
  opacity: 1;
  right: 0;
  text-align: center;
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
import dev_warn from '../components/dev_warn';
import {
  mdiClose,
  mdiPlay,
  mdiStop,
  mdiSelectionEllipseArrowInside,
  mdiViewParallel,
  mdiRepeat,
  mdiShuffle,
  mdiClockOutline
} from '@mdi/js';

export default {
  components: {
    dev_warn
  },
  data() {
    return {
      icons: {
        close: mdiClose,
        play: mdiPlay,
        stop: mdiStop,
        selection_ellipse_arrow_inside: mdiSelectionEllipseArrowInside,
        view_parallel: mdiViewParallel,
        repeat: mdiRepeat,
        shuffle: mdiShuffle,
        clock_outline: mdiClockOutline
      },
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
    voice_host() {
      if (process.env.NODE_ENV === 'production' && navigator.onLine && this.$i18n.locale === 'zh')
        return 'https://btn.lonelyion.com/voices/';
      else return '/voices/';
    },
    dark_text() {
      return {
        'grey--text text--lighten-2': this.$vuetify.theme.dark
      };
    },
    voice_button_color() {
      return {
        'light-blue darken-4': this.$vuetify.theme.dark,
        'blue lighten-2 white--text': !this.$vuetify.theme.dark
      };
    },
    fab_icon() {
      return [this.$vuetify.theme.dark ? 'white--text' : 'light-blue--text'];
    },
    fab_color() {
      return [this.$vuetify.theme.dark ? 'indigo darken-1' : 'white'];
    },
    speed_dial_color: function () {
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
    }
  },
  async mounted() {
    this.$vuetify.theme.dark = this.$store.state.dark === 'true';
    await this.fetch_live_data();
  },
  methods: {
    async fetch_live_data() {
      //TODO: 有空重构一下这段代码，接口变了好几回了
      let fetched = await this.$axios.$get('https://api.jetri.co/live/1.1');
      let fbk_lives = [];
      const channel_id = 'UCdn5BQ06XqgXoAxIhbqw5Rg';
      fetched.live.forEach(function (item) {
        if (item.channel === channel_id) {
          item.type = 'live';
          fbk_lives.push(item);
        }
      });
      fetched.upcoming.forEach(function (item) {
        if (item.channel === channel_id) {
          item.type = 'upcoming';
          fbk_lives.push(item);
        }
      });
      fbk_lives.forEach(function (item, index, object) {
        if (!item.title.length) {
          object.splice(index, 1);
        }
        if (item.type === 'live') {
          item.startTime = 0;
        }
      });
      this.lives = fbk_lives;
      this.lives.sort(function (a, b) {
        return a.startTime > b.startTime ? 1 : -1;
      });
      this.lives_loading = false;
    },
    format_time(stamp) {
      return require('dayjs').unix(stamp).format('YYYY/M/DD HH:mm');
    },
    play(item) {
      let that = this;
      if (!this.overlap) {
        let sp = document.getElementById('single_play');
        sp.src = this.voice_host + item.path;
        sp.load();
        sp.addEventListener('canplay', function () {
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
        let audio = new Audio(this.voice_host + item.path);
        audio.load();
        if ('mediaSession' in navigator) {
          const metadata = {
            title: that.$t('control.overlap_title'),
            artist: that.$t('control.full_name'),
            album: that.$t('site.title') + '(^・ω・^§)',
            artwork: [{ src: '/img/media-cover.jpg', sizes: '128x128', type: 'image/jpeg' }]
          };
          navigator.mediaSession.metadata = new window.MediaMetadata(metadata);
        }
        audio.addEventListener('canplay', function () {
          audio.volume = 1;
          audio.play();
        });
        audio.addEventListener('ended', function () {
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
      setInterval(function () {
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
      title: this.$t('site.title') + '(^・ω・^§)ﾉ',
      link: [{ rel: 'canonical', href: 'https://fubuki.moe' }]
    };
  }
};
</script>
