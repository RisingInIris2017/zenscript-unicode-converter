# Zenscript Unicode Converter - ZS脚本中文转换器

## 概述

ZS 脚本中文转换器是一个开源、轻量的 VSCode 扩展，旨在解决困扰中文整合包作者的一个问题：

如果在 CraftTweaker 魔改脚本中包含中文等 Unicode 字符，那么在游戏内可能会显示为乱码。

为了避免这一问题，整合包作者往往需要反复折腾 U 码和中文的编码转换，

既有损脚本可读性，又浪费了大量的时间和精力。

我可以向你保证，装上这个扩展，可以一劳永逸地解决上述问题。

## 功能

ZS 脚本中文转换器实现的功能是：

- 打开一个包含 U 码，如 `"\u4e2d\u6587"` 的 ZenScript 脚本时，所有的 U 码均转换为中文字符，如 `"中文"`；
- 保存 ZenScript 脚本文件时，所有的字符立即转换为 U 码。
- 在上面两种情形下，注释（`//` 开头的行）中的中文不会被转换。
- 还可以通过手动调用 VSCode 命令 `Convert Native characters to Ascii` 或 `Convert Ascii to Native characters`，将字符转 U 码或做相反操作。

## 安装方法

1. 从 VSCode 窗口左侧工具栏，或使用快捷键 `Ctrl + Shift + X`，打开“扩展”菜单。
2. 搜索 ZenScript，即可找到作者名为 `IsaacTadokoro` 的本拓展，选择“安装”即可。

也可以通过本拓展的 [微软 VS MarketPlace 主页](https://marketplace.visualstudio.com/items?itemName=IsaacTadokoro.zenscript-unicode-converter) 来安装。

## 拓展配置

ZS 脚本中文转换器支持通过 VSCode 的配置编辑器进行配置，

并配有中、日、英三种语言的说明，随着你的 VSCode 语言设置自动切换。配置选项如下：

* `zenscript-unicode-converter.letter-case`: 使用小写字母表示 Unicode 编码，如设为 false 则使用大写字母。
* `zenscript-unicode-converter.comment-conversion`: 是否转换注释中的字符。
* `zenscript-unicode-converter.auto-conversion-on-save`: 是否在保存 ZenScript 源文件时，自动进行编码转换，默认为 `true`（是）。
* `zenscript-unicode-converter.auto-conversion-on-activate`: 是否在切换活动的 ZenScript 源文件时，自动进行编码转换，默认为 `true`（是）。
* `zenscript-unicode-converter.use-files.associations`: 是否使用 settings.json 中的 `"files.associations"` 配置项来控制编码转换功能。

  考虑到 CraftTweaker 不太可能更改 ZenScript 脚本文件的扩展名，不建议使用此功能，请保持此配置为默认值 `false`。

## 开源许可

ZS 脚本中文转换器是 VSCode 拓展 [native-ascii-converter](https://github.com/cwan/native-ascii-converter) 的分支，

上游项目依据 MIT 许可证开源，开源许可：https://github.com/cwan/native-ascii-converter/blob/master/LICENSE。

本拓展的日文支持继承自上游项目，在此向原作者 cwan 致谢。

与上游项目相同，本拓展依据 MIT 许可证在 [GitHub](https://github.com/RisingInIris2017/zenscript-unicode-converter) 开源。

本拓展的开源许可：https://github.com/RisingInIris2017/zenscript-unicode-converter/blob/main/LICENSE

## 未来计划

目前本拓展唯一不能良好支持的注释形式是行末注释。

如果你在不是分号结尾的行的末尾写了注释，这个注释总会被转换成 U 码，无视配置选项。

这是一个比较复杂的问题，假如你有兴趣，可以发起 Pull Request 我们一起来解决它。

## 结语

这是本人首次使用 TypeScript 编程，也是首次编写 VSCode 拓展。

如果有使用上的问题或建议，欢迎在这里 [提出 Issue](https://github.com/RisingInIris2017/zenscript-unicode-converter/issues)，或在 MCBBS 帖子下方回复留言。

如果你对编写 VSCode 插件有兴趣，也欢迎发起 Pull Request，一起来参与开发！
