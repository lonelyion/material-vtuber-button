# 狐按钮 / FUBUKI-BUTTON

![Version](https://img.shields.io/github/package-json/v/lonelyion/fubuki-button)
![Build](https://img.shields.io/github/workflow/status/lonelyion/fubuki-button/FBK-BTN-NG-CI)
![Last Commit](https://img.shields.io/github/last-commit/lonelyion/fubuki-button)
![Starts](https://img.shields.io/github/stars/lonelyion/fubuki-button)

README: **中文** | [日本語](https://github.com/oruyanke/fubuki-button/blob/master/README.JA.md) | [English](https://github.com/oruyanke/fubuki-button/blob/master/README.EN.md)

> 全新的白上吹雪语音按钮，目标是打造一个整合白上吹雪各个方面的应援项目

项目地址： https://sfubuki.moe

相关链接:

- [白上吹雪的 YouTube 频道](https://www.youtube.com/channel/UCdn5BQ06XqgXoAxIhbqw5Rg)
- [白上吹雪的 Bilibili 频道](https://space.bilibili.com/332704117)
- [白上吹雪的 Twitter](https://twitter.com/shirakamifubuki)

## 计划中的特性

- 生放送とイベントのスケジュール
- 吹雪表情包合集/搜索
- YouTube/Bilibili数据可视化

## 参与完善本项目

如果您不知道如何直接参与GitHub开发，可以直接将素材或意见建议发送到[voice@sfubuki.moe](mailto:voice@sfubuki.moe)，带上标题、内容以及您的ID（Bilibili、Twitter等均可），贡献者名单将会有您的名字。

当然您也可以发在 [Issues](https://github.com/copperion/fubuki-button/issues)，同样也请带上标题和内容。

如果您可以进行开发，那么请Fork本项目进行修改，完成修改后在本项目中发起一个Pull Request，详细说明如下：

### 添加或修改音频

音频文件为mp3格式，码率128Kbps，储存在`static/voices/`目录下，对应的URL为`/voices/`。

所有的音频信息都存储在`assets/voices.json`中，要添加或修改音频，你同样需要修改这个文件中对应的内容。

如果需要对现有音频进行修改，建议将原音频文件删除，重新命名一个新文件，这样可以避免浏览器缓存问题。

### 参与翻译

请帮助进行日语和英语的翻译！

网页的翻译在`assets/locales/`中的以三个语音命名的json文件中，音频信息的翻译在`assets/voices.json`中对应的字段。

### 参与网页开发

本项目使用Vue + NuxtJS + Vuetify框架进行开发，要部署本地开发环境，请先安装最新版的Node与Yarn包管理器。

1. Fork 并 Clone 代码到本地
2. 进入代码目录，运行`yarn`以安装依赖项目
3. 开启本地开发服务器，运行`yarn dev`，这将会在`localhost:3000`启动，在代码修改过程中，本地开发服务器可以即时反映修改的结果。
4. 要编译可供部署的文件，请运行`yarn generate`，这将会在`dist`目录下生成可以直接部署到静态网站托管（GitHub Pages等）的文件。

## 贡献者

开发：

- [孤单离子](https://github.com/lonelyion)
- [Asrui Morus](https://github.com/Morxi)

音频剪辑：

- [孤单离子](https://github.com/lonelyion)
- hanyuu

特别感谢：

- Bilibili [吹雪的猫咪茶铺](https://space.bilibili.com/431210892/)
- Bilibili [亡音ちゃん](https://space.bilibili.com/2613724)
- GitHub [Dakumasu](https://github.com/dakuamsu)
- GitHub [Yourein](https://github.com/Yourein)
- Twitter [nekoy0212anagi](https://twitter.com/nekoy0212anagi)

## 协议

音频部分: [Hololive 二次创作条款](https://www.hololive.tv/terms)(只有日语).

其他部分：[MIT License](https://github.com/oruyanke/fubuki-button/blob/master/LICENSE)

本项目为爱好者作品，和 Hololive 官方没有关联
