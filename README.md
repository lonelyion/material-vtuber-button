# Material Vtuber Button

这是一个模板项目，旨在帮助开发者快速创建一个Material Design风格的VTuber/VUP（甚至其他角色或人物）的语音按钮网站。

![Version](https://img.shields.io/github/package-json/v/lonelyion/material-vtuber-button)
![Last Commit](https://img.shields.io/github/last-commit/lonelyion/material-vtuber-button)
![Stars](https://img.shields.io/github/stars/lonelyion/material-vtuber-button)

**目录**

- [计划中的特性](#计划中的特性)
- [如何使用这个模板](#如何使用这个模板)
  * [从模板创建仓库](#从模板创建仓库)
  * [克隆到本地](#克隆到本地)
  * [修改模板配置](#修改模板配置)
    + [文本字符串等](#文本字符串等)
    + [外观样式等](#外观样式等)
  * [添加音频切片](#添加音频切片)
  * [部署](#部署)
  * [本地开发和调试](#本地开发和调试)
- [参与完善本项目](#参与完善本项目)
- [协议](#协议)
- [预览](#预览)
- [支持和赞助](#支持和赞助)

## 计划中的特性

- 使用TypeScript / Vue 3.x重构项目，至少包含现有全部的功能
- 改用YAML格式作为主要的配置文件，JSON个人觉得有点反人类（x）

## 如何使用这个模板

### 从模板创建仓库

1. 在 GitHub 上，导航到仓库的主页面。
2. 在文件列表上方，单击 **[Use this template](https://github.com/lonelyion/material-vtuber-button/generate)**（使用此模板）。
3. 使用 Owner（所有者）下拉菜单选择你想要拥有仓库的帐户，一般都是你自己的账户名称。
4. 输入仓库的名称（例如hirro-button）和描述。
5. 选择仓库可见性是公开(Public)还是私有(Private)。
6. 单击 **Create repository from template**（从模板创建仓库）。

### 克隆到本地

使用Git将你新创建的仓库克隆到本地：

```sh
git clone https://github.com/<你的用户名>/<刚才创建的仓库名称>
```

### 修改模板配置

使用[Visual Studio Code](https://code.visualstudio.com/)或者任何你喜欢的编辑器/IDE打开刚刚克隆的目录，然后修改以下内容：

#### 文本字符串等

这部分内容都在`assets/locales/`下面， 修改各个语言的翻译字符串，里面包含站点标题、描述等等内容，可根据需要修改。

如果需要添加某个语言，可复制一份`default.json`，然后文件名修改为语言简称，同时需要在`layouts/default.vue L83`处添加UI入口，在`plugins/i18n.js`和`store/index.js`两个文件分别添加相应的配置，可参考现有的语言。

如果需要添加某个语言，则将改语言的json文件删除，同时需要在`layouts/default.vue L83`处删除UI入口，在`plugins/i18n.js`和`store/index.js`两个文件分别删除相应的配置。

网站的关于页面(`/about`)将会显示主目录下的`README.md`(也就是你现在正在阅读的这个文件)以及对应的语言(`README.lang.md`)，如果需要修改关于页支持的语言，可以到`pages/about.vue`中对应位置添加或删除，有现成的示例。

此外，本模板支持Google Analytics，只需在`plugins/analytics.js`中将`UA-XXXXXXXXX-X`替换为自己的UA字符串即可，不需要的话可以注释掉或者将文件内容改为其他统计服务的JS。

#### 外观样式等

首先是主题色，配置在`assets/themes.js`里面，分为亮色和暗色主题，可以使用[Vuetify预定义好的颜色](https://vuetifyjs.com/en/styles/colors/)，也可以使用16进制颜色，例如`primary: '#FF0000'`。

还有是鼠标移动到按钮上会显示一个emoji，这个emoji的默认值可以在`components/VoiceBtn.vue`中修改，支持[Twemoji](https://twemoji.twitter.com/)，也就是推特样式的emoji。

其余部分倒是不用修改太多，不同语言使用的字体配置在`assets/variables.scss`，具体的样式可以自行修改`layouts/`和`pages/`中对应页面的域内CSS。

### 添加音频切片

音频文件支持mp3格式，码率建议使用128Kbps，码率太高会对服务器宽带以及网络延迟造成一定的影响，储存在`static/voices/`目录下，可以使用子目录，对应的URL为`/voices/`。

所有的音频信息都存储在`assets/voices.json`中，要添加或修改音频，你同样需要修改这个文件中对应的内容。

voice.json的定义如下，最外层为一个名为`groups`的数组，可以包含若干个组（`group`），表现在网站上即是不同的分类。一个组应该包含组的唯一name、显示在网页上的三语翻译、以及稍后介绍的音频列表。

```json
{
      "group_name": "组的name",
      "group_description": {
        "zh": "组名的中文翻译",
        "en": "组名的英语翻译",
        "ja": "组名的日语翻译"
      },
      "voice_list": [...]
}
```

在voice_list内，可以包含若干个音频。一个音频的定义如下，包含它的唯一name、相对`static/voices/`的路径以及显示在网站上的三语翻译。

```json
{
  "name": "我没说过这个",
  "path": "我没说过这个.mp3 或者 子目录/再子目录/我没说过.mp3",
  "description": {
    "zh": "我没说过这个",
    "en": "I never said that",
    "ja": "そんなことは言っていません"
  }
}
```

本模板自带一个完整的`voices.json`供开发者参考，请务必完全修改其内容。

如果未来需要对已有音频进行修改，建议将原音频文件删除，重新命名一个新文件，这样可以避免浏览器缓存问题。

### 部署

要生成静态HTML文件，可以使用以下命令，这将会在`/dist/`中生成可部署的HTML文件。

```sh
yarn generate
```

要部署到云服务器或托管平台，可以参考以下NUXT官方的部署文档，将`/dist/`中的内容部署，或配置自动化部署。

[部署到Vercel](https://zh.nuxtjs.org/docs/2.x/deployment/vercel-deployment)

[部署到GitHub Pages](https://zh.nuxtjs.org/docs/2.x/deployment/github-pages)

[部署到Heroku](https://zh.nuxtjs.org/docs/2.x/deployment/heroku-deployment)

[部署到NGINX](https://zh.nuxtjs.org/docs/2.x/deployment/nginx-proxy)

随便点一个进去还可以看其他支持的部署方式，比如Azure和AWS之类的。

### 本地开发和调试

本项目使用Vue + NuxtJS + Vuetify框架进行开发，要部署本地开发环境，请先安装最新版的Node与Yarn包管理器。

1. Fork 并 Clone 代码到本地
2. 进入代码目录，运行`yarn`以安装依赖项目
3. 开启本地开发服务器，运行`yarn dev`，这将会在`localhost:3000`启动，在代码修改过程中，本地开发服务器可以即时反映修改的结果。
4. 要编译可供部署的文件，请运行`yarn generate`，这将会在`dist`目录下生成可以直接部署到静态网站托管（GitHub Pages等）的文件。

## 参与完善本项目

如果您有任何的意见建议，可以发在 [Issues](https://github.com/lonelyion/material-vtuber-button/issues) 。

如果您可以进行开发，那么请Fork本项目进行修改，完成修改后在本项目中发起一个Pull Request.

## 协议

[MIT License](https://github.com/lonelyion/material-vtuber-button/blob/master/LICENSE)

作为模板使用时，请开发者务必关注相关VTuber或其他人物角色的二次创作版权问题

## 预览

![20210813215910.png](https://i.loli.net/2021/08/13/5jAUsatKG6i1SLr.png)

[Preview Deployment](https://material-vtuber-button.vercel.app)

## 支持和赞助

### BrowserStack

Proudly using BrowserStack.

[![browserstack](https://i.loli.net/2017/09/27/59cbc16b0f8b4.png)](https://www.browserstack.com/)

> **BrowserStack** is a cloud-based cross-browser testing tool that enables developers to test their websites across various browsers on different operating systems and mobile devices, without requiring users to install virtual machines, devices or emulators.

### Vercel

Powered by Vercel.

[![vercel](https://i.loli.net/2020/07/18/rPah8FVmqBXL6dj.png)](https://www.vercel.com/?utm_source=miriko-ch)

> **​Vercel** is a cloud platform for static sites and Serverless Functions that fits perfectly with your workflow. It enables developers to host Jamstack websites and web services that deploy instantly, scale automatically, and requires no supervision, all with no configuration.
