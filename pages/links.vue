<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-card-title>{{ $t('links.title') }}</v-card-title>
        <v-card-text>
          <a v-for="item in links" :key="item.title" :href="item.url" target="_blank">
            <voice-btn :large="true" class="link-button white--text" :class="item.color_class" :emoji="item.emoji">
              {{ item.title }}
            </voice-btn>
          </a>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<style scoped>
.link-button div:after {
}
</style>

<script>
import VoiceBtn from '../components/voice-btn';
export default {
  components: {
    VoiceBtn
  },
  computed: {
    links() {
      return [
        {
          title: this.$t('links.mio'),
          url: 'https://ookamimio.org',
          emoji: '🌲',
          color_class: 'grey darken-3'
        },
        {
          title: this.$t('links.korone'),
          url: 'https://korone.icu',
          emoji: '🥐',
          color_class: 'brown darken-1'
        },
        {
          title: this.$t('links.okayu'),
          url: 'https://okayu.icu',
          emoji: '🍙',
          color_class: 'purple lighten-1'
        },
        {
          title: this.$t('links.matsuri'),
          url: 'https://natsuiromatsuri.moe/',
          emoji: '🏮',
          color_class: 'amber darken-2'
        },
        {
          title: this.$t('links.peko'),
          url: 'https://peko.top',
          emoji: '🥕',
          color_class: 'orange darken-1'
        },
        {
          title: this.$t('links.aqua'),
          url: 'https://aquaminato.moe',
          emoji: '⚓',
          color_class: 'pink accent-1'
        },
        {
          title: this.$t('links.ayame'),
          url: 'https://nakiriayame.moe/',
          emoji: '😈',
          color_class: 'red darken-1'
        },
        {
          title: this.$t('links.suisei'),
          url: 'https://suisei.moe/',
          emoji: '🌠',
          color_class: 'indigo darken-1'
        },
        {
          title: this.$t('links.towa'),
          url: 'https://towa.live/',
          emoji: '👾',
          color_class: 'purple lighten-3'
        },
        {
          title: this.$t('links.echo'),
          url: 'https://sepeach.com/',
          emoji: '🍑',
          color_class: 'pink lighten-2'
        },
        {
          title: this.$t('links.vm'),
          url: 'https://vtbmusic.com',
          emoji: '🎵',
          color_class: 'cyan accent-4'
        },
        {
          title: this.$t('links.collection'),
          url: 'https://vtbbtn.org',
          emoji: '📚',
          color_class: 'accent'
        }
      ];
    }
  }
};
</script>
