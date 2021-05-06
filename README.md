# Material Vtuber Button

**还在施工，暂时不可用。**

这是一个模板项目，旨在帮助开发者快速创建一个VTuber（甚至其他角色或人物）的语音按钮网站。

## 计划中的特性

- 使用TypeScript / Vue 3.x重构项目，至少包含现有全部的功能
- 进一步抽象出配置文件，方便其他按钮移植和维护

## 如何使用这个模板

### 从模板创建仓库

1. 在 GitHub 上，导航到仓库的主页面。
2. 在文件列表上方，单击 **Use this template**（使用此模板）。
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

```js
//TODO: 具体的配置文件列表和配置项说明
```

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

### 部署到GitHub Pages或Vercel等托管平台

```js
//TODO: 部署教程
```

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

[MIT License](https://github.com/voosc/fubuki-button/blob/master/LICENSE)

作为模板使用时，请开发者务必关注相关VTuber或其他人物角色的二次创作版权问题

## 支持

### BrowserStack

Proudly using BrowserStack.

[![browserstack](https://i.loli.net/2017/09/27/59cbc16b0f8b4.png)](https://www.browserstack.com/)

> **BrowserStack** is a cloud-based cross-browser testing tool that enables developers to test their websites across various browsers on different operating systems and mobile devices, without requiring users to install virtual machines, devices or emulators.

### Vercel

Powered by Vercel.

[![vercel](https://i.loli.net/2020/07/18/rPah8FVmqBXL6dj.png)](https://www.vercel.com/?utm_source=oruyanke)

> **​Vercel** is a cloud platform for static sites and Serverless Functions that fits perfectly with your workflow. It enables developers to host Jamstack websites and web services that deploy instantly, scale automatically, and requires no supervision, all with no configuration.
