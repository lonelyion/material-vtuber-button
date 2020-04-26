# Fubuki-Button - Shirakami Fubuki's Voice Button

Fubuki Button [Click here to visit https://sfubuki.moe](https://sfubuki.moe)

[![Build Status](https://github.com/copperion/fubuki-button/workflows/FBK-BTN-CI/badge.svg)](https://github.com/copperion/fubuki-button/actions)

README: **[中文](./README.md)** | [日本語](./README.JA.md) | English

相关链接:

* [Shirakami Fubuki's Youtube Channel](https://www.youtube.com/channel/UCdn5BQ06XqgXoAxIhbqw5Rg)
* [Shirakami Fubuki's Bilibili Channel](https://space.bilibili.com/332704117)
* [Shirakami Fubuki's Twitter](https://twitter.com/shirakamifubuki)

## Contributing

Please submit [Issues](https://github.com/copperion/fubuki-button/issues) to upload audio clips.

Or you can fork this project for modification, and after completing the modification, initiate a Pull Request in this project.

### Add or modify voice

**Description**：All voice meta information is stored in [src/voices.json](src/voices.json).To add or modify these voices, you need to modify this file accordingly.

Voice is always in mp3 format with 128Kbps bitrate and stored in [public/voices](public/voices).The corresponding URL is `voices/`。

For new voice, please use software such as MP3GainGUI for volume standardization. This project recommond to use Adobe Audition's "Match loudness" function with parameters: Target Loudness：-24LUFS, Tolerance:2LU, Max True Peak Level:-2dBTP.

Because this site uses a strong cache strategy, except for `index.html`, files with the same filename, even if modified, will **never** be refreshed by the client. Therefore, the filename of the newly voice, whatever it is new or modified, **MUST** be different from any previous filename.

If you are modifying voice, delete the original file after modification.

### Participate in translation

Please help us translate to English and Japanese!

The language files for the main program are in three .js files named the language name in [src/locales](src/locales).

The language files for voices are in [src/voices.json](src/voices.json).

The corresponding modification can be recognized by the program as a valid translation.

## Deploying a local development environment

This site is developed using Vue + jQuery + Bootstrap 3.

To deploy a local development environment, first install the latest version of Node. Then follow these steps:

1. Clone the code.

2. Go to the code directory and run `npm install`.

3. Run `npm run serve`. During the code modification process, this local development server can immediately reflect the results of the modification.

4. To compile the files for deployment, run `npm run build`, which will generate the `dist` directory. This site is completely static, you can directly deploy the entire `dist` directory.

To contribute your code to this project, you don't have to compile locally. After passing the test in the development server and pushing it to Github, you can directly require a Pull Request to this project.

## LICENCE

Program: MIT

Audio: According to the [Hololive Derivative Work License](https://www.hololive.tv/terms) (Japanese only).

This project is a work of enthusiasts and is not related to the hololive official.

## Special Thanks

This project is supported by MeowSound Idols.

This project is modified based on the [Aqua button](https://github.com/zyzsdy/aqua-button).
