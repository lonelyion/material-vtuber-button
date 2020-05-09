export default function ({ isHMR, app, store, route, params, error, redirect }) {
  if (isHMR) return

  const defaultLocale = app.i18n.fallbackLocale
  let locale = null
  const Cookie = require('js-cookie')
  const cookie = Cookie.get('locale')
  if (cookie) {
    locale = cookie;
    console.log('middleware: locale found ' + locale);
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
}
