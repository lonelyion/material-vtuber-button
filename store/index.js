export const state = () => ({
  locales: ['en', 'ja', 'zh'],
  locale: 'zh',
  dark: false
});

export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale;
      localStorage.setItem('locale', state.locale);
    }
  },
  SET_DARK(state, dark) {
    state.dark = dark;
    localStorage.setItem('dark', state.dark);
  }
};
