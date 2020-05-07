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
            <v-icon v-if="!item.svg">{{ item.icon }}</v-icon>
            <v-img v-else :src="item.icon" style="width: 24px"/>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider />
      <v-list>
        <v-list-item
          v-for="(item, i) in related_links"
          :key="i"
          :href="item.to"
          target="_blank"
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
            <v-list-item-title>关于</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      dense
      elevate-on-scroll
      class="primary"
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-img src="/img/oruyanke_transparent.png" style="max-width: 24px;margin-left: 6px;" />
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon @click="switch_dark()" v-on="on">
            <v-icon>mdi-brightness-2</v-icon>
          </v-btn>
        </template>
        <span>夜间模式开关</span>
      </v-tooltip>
      <v-btn icon @click="switch_dark()">
        <v-icon>mdi-translate</v-icon>
      </v-btn>
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
    }
  },
  data () {
    return {
      title: '狐按钮(^・ω・^§)ﾉ',
      drawer: true,
      fixed: false,
      nav_items: [
        {
          icon: 'mdi-apps',
          title: '主页',
          to: '/',
          svg: false,
          link_type: 'to'
        },
        {
          icon: '/img/youtube-fill.svg',
          title: 'Youtube',
          to: 'https://www.youtube.com/channel/UCdn5BQ06XqgXoAxIhbqw5Rg?sub_confirm=1',
          svg: true,
          link_type: 'href'
        },
        {
          icon: '/img/twitter-fill.svg',
          title: 'Twitter',
          to: 'https://twitter.com/shirakamifubuki',
          svg: true,
          link_type: 'href'
        },
        {
          icon: '/img/bilibili-fill.svg',
          title: 'Bilibili',
          to: 'https://space.bilibili.com/332704117',
          svg: true,
          link_type: 'href'
        }
      ],
      related_links: [
        {
          icon: 'https://ookamimio.org/favicon.png',
          title: '狼按钮/MioButton',
          to: 'https://ookamimio.org/'
        }
      ]
    }
  }
}
</script>
