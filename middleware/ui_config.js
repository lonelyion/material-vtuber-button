export default function ({ isHMR, app, store, route, params, error, redirect }) {
  //if (isHMR) return;

  const Cookie = require('js-cookie');

  //Locale
  const defaultLocale = app.i18n.fallbackLocale;
  let locale = null;
  const cookie_locale = Cookie.get('locale');
  if (cookie_locale) {
    locale = cookie_locale;
  }

  if (!locale){
    const cookies = Cookie.set('locale', defaultLocale)
        .split('; ').map(stringCookie => stringCookie.split('='));
    const cookie = cookies.find(cookie => cookie[0] === 'locale');
    if (cookie)
      locale = cookie[1];
  }
  store.commit('SET_LANG', locale);
  app.i18n.locale = store.state.locale;

  //Dark
  let dark_mode = false;
  const cookie_dark = Cookie.get('dark');
  if(cookie_dark) {
    dark_mode = cookie_dark;
  } else {
    Cookie.set('dark', dark_mode);
  }
  store.commit("SET_DARK", dark_mode);

  console.log('middleware: cookies = ', Cookie.get());
}
