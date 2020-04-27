<template>
  <div id="app">
        <Modal></Modal>
        <nav class="navbar navbar-default navbar-fixed-top">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-navbar-collapse" aria-expanded="false">
                        <span class="sr-only">{{ $t("action.toggleNavbar") }}</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <router-link class="navbar-brand" to="/">
                        <div style="display: inline; vertical-align:middle;">
                            <img src="/fav.png" height="100%" />
                            {{ $t("info.title") }}
                        </div>
                    </router-link>
                </div>

                <div class="collapse navbar-collapse" id="bs-navbar-collapse">
                    <ul class="nav navbar-nav">
                        <li><a href="https://www.youtube.com/channel/UCdn5BQ06XqgXoAxIhbqw5Rg?sub_confirm=1" target="_blank"><img src="resources/youtube_social_icon_red.png" height="18"/></a></li>
                        <li><a href="https://twitter.com/shirakamifubuki" target="_blank"><img src="resources/Twitter_Social_Icon_Circle_Color.png" height="18"/></a></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li class="dropdown">
                            <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" role="button" 
                               aria-haspopup="true" aria-expanded="false">
                                <div class="box">
                                    <img src="resources/language-black.svg" style="width:20px;" />
                                    <span>{{$t("lang." + currentLang)}} </span>
                                    <span class="caret"></span>
                                </div>        
                            </a>
                            <ul class="dropdown-menu">
                                <li><a href="javascript:;" @click="chlang('zh-CN')">{{$t("lang.zh-CN")}}</a></li>
                                <li><a href="javascript:;" @click="chlang('en-US')">{{$t("lang.en-US")}}</a></li>
                                <li><a href="javascript:;" @click="chlang('ja-JP')">{{$t("lang.ja-JP")}}</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
        <div class="container-fluid main-content">
            <router-view></router-view>
            <div id="vcomments" style="width:95%;margin:0 auto;"></div>
        </div>
        <footer class="footer">
            <div class="container-fluid footer-content">
                <div>
                    <div><a href="https://github.com/copperion/fubuki-button" target="_blank">{{$t("info.toGithub")}} <img src="https://img.shields.io/github/stars/copperion/fubuki-button.svg?style=social"/></a></div>
                    <div>{{$t("info.notOfficial")}}</div>
                </div>
                <div>
                    <div>{{$t("info.audioStaff")}}</div>
                    <div>Lonely_ion 2020 <span style="color: rgba(0, 0, 0, 0.1)">Powered By Meowsound Idols</span></div>
                </div>
            </div>
        </footer>
  </div>
</template>

<style lang="scss">
@import "../node_modules/bootstrap/dist/css/bootstrap.css";
body{
    padding-top: 70px;
}
.main-content{
    min-height: 100vh;
}
.footer {
    width: 100%;
    height: 100%;
    min-height: 60px;
    background-color: #ebebeb;
}
.footer-content {
    padding-top: 10px;
    padding-bottom: 10px;
    color: #666;
    text-align: center; 
}
.text-right{
    text-align: right;
}
.box {
    display: flex; align-items: center;
}
</style>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import Modal from './components/modal.vue'
import Valine from 'valine';
import eMap from './util/emoji.js'
//import fetchpost from './util/fetchpost'

@Component({
    components:{
        Modal
    }
})
class App extends Vue {
    get currentLang(){
        return this.$i18n.locale;
    }
    created(){
        // eslint-disable-next-line
        console.log("Produced by MoewSound Idols");
        this.$i18n.locale = localStorage.getItem("lang") || this.$i18n.locale;
    }
    initComment() {
        var short_lang = '';
        switch(this.$i18n.locale) {
            case 'zh-CN':
                short_lang = 'zh-CN'; break;
            case 'en-US':
                short_lang = 'en'; break;
            case 'ja-JP':
                short_lang = 'ja'; break;
        }

        var valine = new Valine();
        valine.init({
            el:'#vcomments',
            appId: 'XSITg2dneuN0dACwQYA6yRzc-gzGzoHsz',
            appKey: 'xybKLxTKA45UgefGOS7Lqvam',
            placeholder: this.$t("comment.here"),
            lang: short_lang,
            emojiCDN: 'https://valinecdn.bili33.top/',
            emojiMaps: eMap,
            avatar: 'hide'
        })
    }
    chlang(v){
        this.$i18n.locale = v;
        localStorage.setItem("lang", v);
        this.initComment();
    }
    mounted(){
        this.initComment();
    }
    
}
export default App;



</script>

