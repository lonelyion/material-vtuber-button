<template>
  <v-layout
    column
    justify-center
    align-center
    app
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <v-card>
        <v-card-title>
          <img src="/favicon.ico" style="width: 24px; margin-right: 8px" alt="icon"/>
          操作控制
        </v-card-title>
        <v-card-actions>
          <v-btn class="accent control-button">帮我选一个</v-btn>
          <v-btn class="accent control-button">停止</v-btn>
          <v-btn class="accent control-button" @click="overlap = !overlap">
            <v-icon>{{ overlap ? 'mdi-check' : 'mdi-close' }}</v-icon>允许重叠播放
          </v-btn>
          <v-btn class="accent control-button" @click="random = !random">
            <v-icon>{{ random ? 'mdi-check' : 'mdi-close' }}</v-icon>随机模式
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card>
        <v-card-title class="headline">
          (^・ω・^§)ﾉ<img src="/favicon.ico" style="width: 24px; margin-left: 8px"  alt="corn"/>
        </v-card-title>
        <v-card-text>
          <p v-text="text" style="white-space: pre-line;"/>
          <p v-text="text"/>
          <hr class="my-3">
          <a
            href="https://nuxtjs.org/"
            target="_blank"
          >
            Nuxt Documentation
          </a>
          <br>
          <a
            href="https://github.com/nuxt/nuxt.js"
            target="_blank"
          >
            Nuxt GitHub
          </a>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            nuxt
            to="/inspire"
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<style>
  .control-button {
    margin-left: 8px;
  }
  .v-card {
    margin: 8px auto;
  }
</style>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  data() {
    return {
      overlap: false,
      random: false,
      text: '没错 你们 你们是赢不了我的\n' +
        '无论是能够被空酱摸摸头\n' +
        '或是偶尔能和Azki酱道一声早安\n' +
        '或是让萝卜子说“吹雪酱真的好可爱呀”然后给我膝枕的\n' +
        '还是让miko酱说“吹酱 吹酱”然后和她抱抱\n' +
        '或是让小祭说“fbk~~”然后让她过来蹭蹭我\n' +
        '还有能够让梅露酱咔噗咔噗我\n' +
        '还有让心心偶尔来踩我...虽然好像不会踩\n' +
        '但偶尔遇见的时候还是会“吹雪酱~”这样抱着我\n' +
        '还有享用Aki酱亲手做的料理和她的拥抱\n' +
        '能够抱住阿库娅酱的也是我\n' +
        '能够沉溺在巧可老师的双峰之间的也是我\n' +
        '还有能够可以蹭蹭绫目酱的角\n' +
        '就算盯着诗音酱的脚看\n' +
        '她也只会说“moooo 吹雪前辈真是H”然后就会原谅我\n' +
        '还有 能够默默昴的头\n' +
        '然后看着昴酱露出微笑说着“吹雪前辈 请住手的说”\n' +
        '无论是揉揉mio的狼耳朵\n' +
        '还是摸摸小粥的猫尾巴\n' +
        '还有摸摸沁音蓬松的尾巴\n' +
        '然后听她喊“吹↗酱↘吹↗酱↘”\n' +
        '还有能够被芙碳嘲讽的 是呢\n' +
        '还有能够让团长说“吹雪前辈！”然后一起吃牛肉盖饭的\n' +
        '无论是能够嘲讽玛琳酱的\n' +
        '还是让她说“吹雪前辈 真是的~”这样被生气\n' +
        '还有让佩克拉说“吹雪前辈！”这样子\n' +
        '“pekora！pekora！”这样子看着她跳呀跳的\n' +
        'wwwww\n' +
        '还有能够让露西亚说喜欢我\n' +
        '还有能和彗酱一起吃饭 然后让她教教我怎么唱歌（这里字幕组是让后\n' +
        '和彼方酱.... wwwww\n' +
        '能够让彼方酱说“吹雪前辈~我好开心！”这样说的\n' +
        '第一次联动的时候彼方酱露出的小人真是难忘呀\n' +
        '能够被可可会长喊“大姐！”的也是我\n' +
        '还有和绵芽酱一起 能够和她一起突击联动\n' +
        '能让绵芽酱说“吹雪前辈 吹雪前辈”什么的\n' +
        '和towa酱在扭曲乐园中喜欢的角色一样\n' +
        '所以说不定能够和她一起畅谈喜欢的角色\n' +
        '还有露娜酱她也“na~~~吹雪前辈！”这样说着\n' +
        '然后这样向我撒娇什么的 你们都做不到吧~~\n' +
        'wwwwww\n' +
        '羡  慕  吧'
    }
  }
}
</script>
