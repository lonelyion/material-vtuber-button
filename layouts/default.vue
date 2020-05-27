<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :mobile-break-point="1024" class="elevation-3" fixed app>
      <v-list style="padding-top: 0">
        <v-list-item to="/" router exact dense>
          <v-list-item-action>
            <v-icon>mdi-apps</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t('site.index') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-for="(item, i) in nav_items" :key="i" :href="item.to" target="_blank" router exact dense>
          <v-list-item-action>
            <v-img :src="item.icon" style="width: 24px" />
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <div v-if="current_locale === 'zh'">
        <v-divider />
        <v-list>
          <v-list-item dense href="https://space.bilibili.com/487763794/article" target="_blank">
            <v-list-item-action>
              <v-icon>mdi-newspaper</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>白上吹雪周报</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
      <v-divider />
      <v-list>
        <v-list-item dense to="/about" router exact>
          <v-list-item-action>
            <v-icon>mdi-code-tags</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t('site.about') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar dense elevate-on-scroll class="primary white--text" app>
      <v-app-bar-nav-icon class="white--text" @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="$t('site.title') + '(^・ω・^§)ﾉ'" />
      <v-img src="/img/oruyanke_transparent.png" style="max-width: 24px;margin-left: 6px;" />
      <v-spacer />
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon class="white--text" @click="switch_dark()" v-on="on">
            <v-icon>mdi-brightness-2</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('site.switch_dark_mode') }}</span>
      </v-tooltip>
      <v-menu offset-y>
        <template v-slot:activator="{ on: menu }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn icon class="white--text" v-on="{ ...tooltip, ...menu }">
                <v-icon>mdi-translate</v-icon>
              </v-btn>
            </template>
            <span>{{ $t('site.switch_language') }}</span>
          </v-tooltip>
        </template>
        <v-list>
          <v-list-item @click="switch_lang('zh')">
            <v-list-item-title>简体中文</v-list-item-title>
          </v-list-item>
          <v-list-item @click="switch_lang('ja')">
            <v-list-item-title>日本語</v-list-item-title>
          </v-list-item>
          <v-list-item @click="switch_lang('en')">
            <v-list-item-title>English</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
      <v-footer :fixed="false">
        <div>
          <div style="vertical-align: middle;">
            <span>&copy; {{ new Date().getFullYear() }} </span>
            <span>
              <a href="https://github.com/lonelyion" target="_blank" style="text-decoration: none;">
                {{ $t('site.footer.lonely_ion') }}
              </a>
            </span>
            <span>
              &
              <a href="https://github.com/oruyanke" target="_blank" style="text-decoration: none;">
                {{ $t('site.footer.oruyanke') }}
              </a>
            </span>
            <v-btn
              icon
              href="https://github.com/oruyanke/fubuki-button"
              target="_blank"
              style="vertical-align: middle;"
            >
              <v-icon>mdi-github</v-icon>
            </v-btn>
          </div>
          <div>
            <p>{{ $t('site.footer.content') }}</p>
          </div>
        </div>
      </v-footer>
    </v-content>
  </v-app>
</template>

<style lang="scss">
.v-application {
  font-family: $body-font-family, sans-serif !important;
}
</style>

<script>
export default {
  data() {
    return {
      drawer: false,
      fixed: false,
      nav_items: [
        {
          icon: '/img/youtube-fill.svg',
          title: 'Youtube',
          to: 'https://www.youtube.com/channel/UCdn5BQ06XqgXoAxIhbqw5Rg?sub_confirm=1'
        },
        {
          icon: '/img/twitter-fill.svg',
          title: 'Twitter',
          to: 'https://twitter.com/shirakamifubuki'
        },
        {
          icon: '/img/bilibili-fill.svg',
          title: 'Bilibili',
          to: 'https://space.bilibili.com/332704117'
        }
      ]
    };
  },
  computed: {
    current_locale() {
      return this.$i18n.locale;
    }
  },
  mounted() {
    this.$vuetify.theme.dark = this.$store.state.dark === 'true';
    if (window.innerWidth >= 1024) {
      this.drawer = true;
    }
  },
  methods: {
    switch_dark() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      this.$store.commit('SET_DARK', this.$vuetify.theme.dark);
    },
    switch_lang(lang) {
      console.log('switching to ' + lang);
      this.$store.commit('SET_LANG', lang);
      this.$i18n.locale = lang;
    }
  }
};
</script>
