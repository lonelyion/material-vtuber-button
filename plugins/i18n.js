import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

export default ({ app, store }) => {
  app.i18n = new VueI18n({
    locale: store.state.locale,
    fallbackLocale: 'zh',
    messages: {
      en: require('~/assets/locales/en.json'),
      ja: require('~/assets/locales/ja.json'),
      zh: require('~/assets/locales/default.json')
    }
  });
};
