# Fubuki-Button - Shirakami Fubuki's Voice Button

![Version](https://img.shields.io/github/package-json/v/lonelyion/fubuki-button)
![Build](https://img.shields.io/github/workflow/status/lonelyion/fubuki-button/FBK-BTN-NG-CI)
![Last Commit](https://img.shields.io/github/last-commit/lonelyion/fubuki-button)
![Starts](https://img.shields.io/github/stars/lonelyion/fubuki-button)

README: [中文]([./README.md](https://github.com/oruyanke/fubuki-button/blob/master/README.md)) | [日本語]([./README.JA.md](https://github.com/oruyanke/fubuki-button/blob/master/README.JA.md)) | **English**

> Brand new voice buttons for Shirakami Fubuki, we are aimming at building a comprehensive project related to Shirakami Fubuki.

Project Homepage: https://sfubuki.moe

Related Links:

* [Shirakami Fubuki's Youtube Channel](https://www.youtube.com/channel/UCdn5BQ06XqgXoAxIhbqw5Rg)
* [Shirakami Fubuki's Bilibili Channel](https://space.bilibili.com/332704117)
* [Shirakami Fubuki's Twitter](https://twitter.com/shirakamifubuki)

## Planning to do

- Calender of lives / activities
- Memes for Fubuki
- Data visualization of Youtube / Bilibili

## Contributing

If you don't know how to participate on GitHub, you can directly send voice clips or suggestions to [voice@sfubuki.moe](mailto:voice@sfubuki.moe) with title, content and your social ID(Twitter, Bilibili or so on). We will add your ID to the contributors list below.

Also you can submit [Issues](https://github.com/copperion/fubuki-button/issues) to upload audio clips.

If you can do some programming, just fork this repository and modify it. After you have done, just open a Pull Request. For detailed information, please read below.

### Add or modify voice

Voice is always in mp3 format with 128Kbps bitrate and stored in `static/voices/`. The corresponding URL is `/voices/`.

All voice meta data is stored in `assets/voices.json`. To add or modify these voices, you need to modify this file accordingly.

If you want to modify existed voice clips, I suggest deleting the origin file and name a new filename to avoid browers' cache problem.

### Participate in translation

Please help us translate to English and Japanese!

The language files for the main program are in three json files named the language name in `assets/locales/`.

The language files for voices are in `assets/voices.json`.

## Deploying a local development environment

This site is developed using Vue + NuxtJS + Vuetify.

To deploy a local development environment, first install the latest version of Node and Yarn. Then follow these steps:

1. Fork and clone the code.

2. Go to the code directory and run `yarn` to install dependencies.

3. Run `yarn dev` to start local developemnt server at `localhost:3000`. The local development server can immediately reflect the results of your modification.

4. To compile the files for deployment, run `yarn generate`, which will generate the `dist` directory. This site is completely static, you can directly deploy the entire `dist` directory.

## Contributors

Development:
- [Lonely Ion](https://github.com/lonelyion)
- [Asrui Morus](https://github.com/Morxi)

Audio Editors:
- [Lonely Ion](https://github.com/lonelyion)
- hanyuu

Special Thanks to:
- Bilibili [吹雪的猫咪茶铺](https://space.bilibili.com/431210892/)
- Bilibili [狐狸的玉米地](https://space.bilibili.com/474495056)
- Bilibili [亡音ちゃん](https://space.bilibili.com/2613724)
- GitHub [Dakumasu](https://github.com/dakuamsu)
- GitHub [Yourein](https://github.com/Yourein)
- Twitter [nekoy0212anagi](https://twitter.com/nekoy0212anagi)

## LICENCE

Audio: According to the [Hololive Secondary Creation Terms](https://www.hololive.tv/terms) (Japanese only).

Other parts: [MIT License](https://github.com/oruyanke/fubuki-button/blob/master/LICENSE)

This project is a work of enthusiasts and is not related to the Hololive official.

