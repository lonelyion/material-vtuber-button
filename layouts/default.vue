<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mobile-break-point="1024"
      class="elevation-3"
      fixed
      app
    >
      <v-list style="padding-top: 0">
        <v-list-item to="/" router exact dense>
          <v-list-item-action>
            <v-icon>mdi-apps</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t('site.index') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="(item, i) in nav_items"
          :key="i"
          :[item.link_type]="item.to"
          :target="item.link_type === 'href' ? '_blank' : ''"
          router
          exact
          dense
        >
          <v-list-item-action>
            <v-img :src="item.icon" style="width: 24px"/>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider />
      <v-list>
        <v-list-item dense to="/settings" router exact>
          <v-list-item-action>
            <v-icon>mdi-code-tags</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t('site.about') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      dense
      elevate-on-scroll
      class="primary white--text"
      app
    >
      <v-app-bar-nav-icon class="white--text" @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="$t('site.title') + '(^・ω・^§)ﾉ'" />
      <v-img src="/img/oruyanke_transparent.png" style="max-width: 24px;margin-left: 6px;" />
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon @click="switch_dark()" v-on="on" class="white--text">
            <v-icon>mdi-brightness-2</v-icon>
          </v-btn>
        </template>
        <span>夜间模式开关</span>
      </v-tooltip>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" class="white--text">
              <v-icon>mdi-translate</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="switch_lang('zh')">
              <v-list-item-title>简体中文</v-list-item-title>
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
      <v-footer
        :fixed="false"
      >
        <div>
          <div style="">
            <span style="vertical-align: middle;">&copy; {{ new Date().getFullYear() }} Lonely_ion / 孤单离子</span>
            <v-btn icon href="https://github.com/lonelyion" target="_blank"
                   style="vertical-align: middle;">
              <v-icon>mdi-github</v-icon>
            </v-btn>
          </div>
          <div>
            <span>特别感谢：</span>
          </div>
          <div>
            <p>本站为爱好者作品，和Hololive官方没有关联，更多信息请查看"
              <nuxt-link to="/about" style="text-decoration: none;">关于</nuxt-link>"页面</p>
          </div>
        </div>
      </v-footer>
    </v-content>
  </v-app>
</template>

<style>
  .footer-content {
  }
</style>

<script>
export default {

  methods: {
    switch_dark() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    switch_lang(lang) {
      console.log('switching to ' + lang);
      this.$store.commit("SET_LANG", lang);
      this.$i18n.locale = lang;
    }
  },
  computed: {

  },
  data () {
    return {
      drawer: true,
      fixed: false,
      nav_items: [
        {
          icon: '/img/youtube-fill.svg',
          title: 'Youtube',
          to: 'https://www.youtube.com/channel/UCdn5BQ06XqgXoAxIhbqw5Rg?sub_confirm=1',
        },
        {
          icon: '/img/twitter-fill.svg',
          title: 'Twitter',
          to: 'https://twitter.com/shirakamifubuki',
        },
        {
          icon: '/img/bilibili-fill.svg',
          title: 'Bilibili',
          to: 'https://space.bilibili.com/332704117',
        }
      ]
    }
  }
}
</script>
