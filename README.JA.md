# フブキボタン - 白上フブキの音声ボタン

フブキボタン [ここをクリック https://sfubuki.moe](https://sfubuki.moe)

[![Build Status](https://github.com/copperion/fubuki-button/workflows/FBK-BTN-CI/badge.svg)](https://github.com/copperion/fubuki-button/actions)

README: [中文](./README.md) | **日本語** | [English](./README.EN.md)

関連リンク:

* [白上フブキのYouTubeチャンネル](https://www.youtube.com/channel/UCdn5BQ06XqgXoAxIhbqw5Rg)
* [白上フブキのBilibiliチャンネル](https://space.bilibili.com/332704117)
* [白上フブキのTwitter](https://twitter.com/shirakamifubuki)

## このプロジェクトへの貢献

音声ファイルをアップロードして[Issues](https://github.com/copperion/fubuki-button/issues)を立ててください。

またはforkをし、変更または修正をした後、Pull Requestを送ってください。

### 追加または修正

**説明**：すべての音声データのメタデータは[src/voices.json](src/voices.json)に追加または修正をしてください。

音声データはmp3のビットレート128Kbpsで統一し、[public/voices](public/voices)に保存してください。。対応するURLは`voices/`に入れてください。。

新規に追加する音声はMP3GainGUIを使用してボリュームの標準化を行ってください。このプロジェクトはAdobe Auditionの"Match loudness"の機能を使用してパラメーターを，目標値：-24LUFS，許容誤差:2LU，最大ピークレベル：-2dBTPにしてください。

このサイトは`index.html`を除いて強力なキャッシュを使用しているため、同じファイル名のファイルは，変更されてもクライアントによって**更新されません**。そのため新しい音声ファイルは，**必ず**過去を含め現在のファイル名と同じものであってはなりません。

音声を変更する場合は変更後に変更前のファイルを削除してください。

### 翻訳に参加する

翻訳してくれる日本人と英語話者を求めています！

メインプログラムの言語不ディレクトリ [src/locales](src/locales) 内に3つの.jsファイルがあります。

音声の言語ファイルは [src/voices.json](src/voices.json) 内にあります。

変更はプログラムに有効な翻訳です。

## ローカル環境での使用

このサイトは Vue + jQuery + Bootstrap 3 を使用しています。

ローカルでの開発環境の設置はまず最新バージョンをインストールし、以下のステップに従って進めます。：

1. Clone。

2. Codeディクトリーへ行き`yarn`を実行。

3. `yarnserve`を実行すると，コード変更プロセス中に、このローカル開発サーバーは変更の結果をすぐに反映できます。。

4. ファイルをコンパイルするために`yarn build`を実行すると，`dist`ディクトリーが生成されます。このサイトは静的であるため`dist`ディクトリー全体をデプロイできます。

このプロジェクトに貢献するためにローカル環境でコンパイルする必要はありません。テストをした後GithubにPushするとすぐにPull Requestを送ることができます。

## LICENCE

プログラム： MIT

音声: 引用 [Hololive 二次創作規約](https://www.hololive.tv/terms).

このプロジェクトはファンによるもので、Hololive公式は一切関係ありません

## 特別協力

このプロジェクトは MeowSound Idols 支援されています.

このプロジェクトは [Aqua button](https://github.com/zyzsdy/aqua-button) を基に作成しています.
