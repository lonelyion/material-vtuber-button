export default ({ app, store }) => {
  app.router.beforeEach((to, from, next) => {
    // local
    let locale = null;
    const stored_locale = localStorage.getItem('locale');
    if (stored_locale) {
      locale = stored_locale;
    } else {
      const browserLocale = navigator.language.replace('-', '_').toLowerCase().split('_')[0];
      locale = app.i18n.availableLocales.includes(browserLocale) ? browserLocale : app.i18n.fallbackLocale;
      localStorage.setItem('locale', locale);
    }
    store.commit('SET_LANG', locale);
    app.i18n.locale = store.state.locale;

    // Dark
    let dark_mode = false;
    const cookie_dark = localStorage.getItem('dark');
    if (cookie_dark) {
      dark_mode = cookie_dark;
    } else {
      localStorage.setItem('dark', dark_mode);
    }
    store.commit('SET_DARK', dark_mode);
    next();
  });
};
