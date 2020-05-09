export const state = () => ({
  locales: ['en', 'zh'],
  locale: 'zh'
})

export const mutations = {
  SET_LANG (state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale;
      const Cookie = require('js-cookie');
      Cookie.set('locale', state.locale);
    }
  }
}
