export const state = () => ({
  locales: ['en', 'zh'],
  locale: 'zh',
  dark: false,
})


const Cookie = require('js-cookie');
export const mutations = {
  SET_LANG (state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale;
      Cookie.set('locale', state.locale);
    }
  },
  SET_DARK(state, dark) {
      state.dark = dark;
      Cookie.set('dark', state.dark);
      console.log('dark changed: ', state.dark);
  }
}
