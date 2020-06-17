<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-card-text>
          <div v-html="about_md"></div>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import about_zh from '../README.md';
import about_en from '../README.EN.md';
import about_ja from '../README.JA.md';
export default {
  computed: {
    about_md() {
      switch (this.$i18n.locale) {
        case 'ja':
          return about_ja;
        case 'en':
          return about_en;
        default:
          return about_zh;
      }
    }
  },
  head() {
    return {
      title: this.$t('site.about') + ' - ' + this.$t('site.title'),
      link: [{ rel: 'canonical', href: 'https://fubuki.moe/about' }]
    };
  }
};
</script>
