# フブキボタン - 白上フブキの音声ボタン

![Version](https://img.shields.io/github/package-json/v/lonelyion/fubuki-button)
![Build](https://img.shields.io/github/workflow/status/lonelyion/fubuki-button/FBK-BTN-NG-CI)
![Last Commit](https://img.shields.io/github/last-commit/lonelyion/fubuki-button)
![Starts](https://img.shields.io/github/stars/lonelyion/fubuki-button)

README: [中文](https://github.com/oruyanke/fubuki-button/blob/master/README.md) | **日本語** | [English](https://github.com/oruyanke/fubuki-button/blob/master/README.EN.md)

> 新しい白上フブキの音声ボタン。私たちの目標は白上フブキの総合応援サイトを作ることです。

ここをクリック https://sfubuki.moe

関連リンク:

* [白上フブキのYouTubeチャンネル](https://www.youtube.com/channel/UCdn5BQ06XqgXoAxIhbqw5Rg)
* [白上フブキのBilibiliチャンネル](https://space.bilibili.com/332704117)
* [白上フブキのTwitter](https://twitter.com/shirakamifubuki)

## 計画中の機能

- 生放送とイベントのスケジュール
- フブキのスタンプ/ミーム
- YouTube/Bilibiliデータ可視化

## このプロジェクトへの貢献

GitHub開発に直接参加する方法が分からないなら、素材や意見を直接電子メールに送ることができます([voice@sfubuki.moe](mailto:voice@sfubuki.moe))。タイトル、内容及びID（Bilibili、Twitterなどでも可）を表示してください。貢献者リストに名前があります。

もちろん、あなたも[Issues](https://github.com/copperion/fubuki-button/issues)に送ってもいいです。同じようにタイトルと内容を書いてください。

開発できる場合は、プロジェクトをフォークして変更してください。変更が完了したら、プロジェクトでプルリクエストを開始します。詳細な手順は次のとおりです。

### 追加または修正

音声データはmp3のビットレート128Kbpsで統一し、`static/voices/`に保存してください。対応するURLは`/voices/`に入れてください。

すべての音声データのメタデータは`assets/voices.json`に追加または修正をしてください。

音声を変更する場合は変更後に変更前のファイルを削除してください。そのため新しい音声ファイルは，必ず過去を含め現在のファイル名と同じものであってはなりません。

### 翻訳に参加する

翻訳してくれる日本人と英語話者を求めています！

メインプログラムの言語ディレクトリ `assets/locales/` 内に3つの.jsonファイルがあります。

音声の言語ファイルは `aseets/voices.json` 内にあります。

変更はプログラムに有効な翻訳です。

## ローカル環境での使用

このサイトは Vue + NuxtJS + Vuetify を使用しています。現地開発環境を展開するには、最新版のNodeとYarnパッケージマネージャをインストールしてください。

1. ForkとClone本倉庫。
2. Codeディクトリーへ行きyarnを実行。
3. `yarn dev`を実行すると，コード変更プロセス中に、このローカル開発サーバーは変更の結果をすぐに反映できます。
4. ファイルをコンパイルするために`yarn generate`を実行すると，`dist`ディクトリーが生成されます。このサイトは静的であるため`dist`ディクトリー全体をデプロイできます。

## 貢献者

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
