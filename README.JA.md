# フブキボタン - 白上フブキのボイスボタン

![Version](https://img.shields.io/github/package-json/v/lonelyion/fubuki-button)
![Build](https://img.shields.io/github/workflow/status/lonelyion/fubuki-button/FBK-BTN-NG-CI)
![Last Commit](https://img.shields.io/github/last-commit/lonelyion/fubuki-button)
![Starts](https://img.shields.io/github/stars/lonelyion/fubuki-button)

README: [中文](https://github.com/oruyanke/fubuki-button/blob/master/README.md) | **日本語** | [English](https://github.com/oruyanke/fubuki-button/blob/master/README.EN.md)

> 新しい白上フブキのボイスボタン。私たちの目標は白上フブキの総合的なファンサイトを作ることです。

ホームページ https://sfubuki.moe

関連リンク:

* [白上フブキのYouTubeチャンネル](https://www.youtube.com/channel/UCdn5BQ06XqgXoAxIhbqw5Rg)
* [白上フブキのBilibiliチャンネル](https://space.bilibili.com/332704117)
* [白上フブキのTwitter](https://twitter.com/shirakamifubuki)

## 計画中の機能

- 生放送や動画のカレンダーを表示
- フブキのスタンプ/ミーム
- YouTube/Bilibiliのデータを表示

## このプロジェクトへの貢献(コントリビュート)

GitHubの開発に直接参加する方法が分からない場合は、素材や意見を直接以下のメールアドレスに送信してください。([voice@sfubuki.moe](mailto:voice@sfubuki.moe))。またメールの中にタイトル、内容及びあなたのID（Bilibili、Twitterやその他）を記述してください。そうすることで私達は下のコントリビューターリストにあなたの名前を掲載することができます。

もしくは素材や意見をGitHubの[Issues](https://github.com/copperion/fubuki-button/issues)ページに送ることもできます。メールの場合と同じようにタイトルと内容を記述してください。

もしGitHubでの開発方法を知っている場合は、プロジェクトをフォークして変更してください。変更が完了したら、プルリクエストしてください。各項目の編集に関しては以下に記述されています。

### 音声の追加または修正

音声データはmp3のビットレート128Kbpsで統一し、`static/voices/`に保存してください。対応するURLは`/voices/`に入れてください。

すべての音声データのメタデータは`assets/voices.json`に追加または修正をしてください。

音声を変更する場合は変更後に変更前のファイルを削除してください。音声ファイルは，必ず過去を含め現在のファイル名と同じものであってはなりません。

### 翻訳

日本語と英語への翻訳が必要です！

ボタンなどのテキストの翻訳は `assets/locales/` 内に各言語に対応した3つの.jsonファイルがあります。

音声のタイトルテキストファイルは `aseets/voices.json` 内にあります。

## ローカルでのデプロイ

このサイトは Vue + NuxtJS + Vuetify を使用しています。ローカル開発環境をデプロイするには、最新版のNodeとYarnパッケージマネージャをインストールしてください。

1. Codeをフォークもしくはクローン。
2. Codeディクトリーへ行きyarnを実行。
3. ローカル開発サーバのために`yarn dev`を `localhost:3000` 実行する。こうすることで変更をすぐにローカルサーバーで確認することができます。
4. ファイルをコンパイルするために`yarn generate`を実行すると，`dist`ディクトリーが生成されます。このサイトは静的であるため`dist`ディクトリー全体をデプロイできます。

## コントリビューター

開発:

- [孤独のイオン](https://github.com/lonelyion)
- [Morxi](https://github.com/Morxi)

オーディオクリップ：

- [孤独のイオン](https://github.com/lonelyion)
- hanyuu

特別協力：

- [吹雪的猫咪茶铺](https://space.bilibili.com/431210892/)
- [狐狸的玉米地](https://space.bilibili.com/474495056)
- [亡音ちゃん](https://space.bilibili.com/2613724)

## LICENCE

プログラム： [MIT License](https://github.com/oruyanke/fubuki-button/blob/master/LICENSE)

音声: [Hololive 二次创作条款](https://www.hololive.tv/terms)

このプロジェクトはファンによるもので、Hololive公式は一切関係ありません
