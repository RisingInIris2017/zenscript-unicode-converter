# Zenscript Unicode Converter

Fork of "[native-ascii-converter](https://github.com/cwan/native-ascii-converter)" VS Code extension, aims to help Minecraft modpack-makers to deal with unicodes.

[**中文用户请点这里查看中文说明文档**](https://github.com/RisingInIris2017/zenscript-unicode-converter/blob/main/README_zh.md)

## Features

* Commands (manual execution):
  + `Convert Native characters to Ascii` - Convert all non-ASCII characters in the active text document with Unicode escapes.
  + `Convert Ascii to Native characters` - Convert all Unicode escapes characters in the active text document with native characters.

Caution: The two commands above will neglect the configuration parameter `zenscript-unicode-converter.comment-conversion`. So be careful to use theese commands if you like to put both native unicode characters and ascii codes in the same file.

* Options:
  + If you activate a ZenScript file, all ascii codes (`"\u4e2d\u6587"` for example) will be converted into native characters (`"中文"` for example).
  + If you save a ZenScript file, all native characters will be converted into ascii codes.
  + If configured, native characters in comment lines that start with `//` will not be converted.

## Extension Settings

This extension contributes the following settings:

* `zenscript-unicode-converter.letter-case`: Use lower case in Unicode. False for upper case.
    + `true`: Lower case
    + `false`: Upper case
* `zenscript-unicode-converter.comment-conversion`: Unicode conversion of the comment is carried out
    + `true`: carried out
    + `false`: not carried out (default)
* `zenscript-unicode-converter.auto-conversion-on-save`: Convert automatically when a ZenScript file is saved
    + `true`: effective (default)
    + `false`: ineffective
* `zenscript-unicode-converter.auto-conversion-on-activate`: Convert automatically when a ZenScript file is activated
    + `true`: effective (default)
    + `false`: ineffective
* `zenscript-unicode-converter.use-files.associations`: Use "files.associations" in the settings.json for the automatic conversions
    + `true`: Use "files.associations" in the settings.json
    + `false`: Not use "files.associations", only files named `*.zs` are converted automatically. (default)

If `zenscript-unicode-converter.use-files.associations` is` true` and the settings.json is set as follows, the file which name matches `*.foo` or `*.bar` will be converted automatically.

```json
{
  "files.associations": {
    "*.foo": "zenscript",
    "*.bar": "zenscript"
  }
}
```

Caution: considering it is not very possibly fot ZenScript (or ZenCode for CraftTweaker 1.16 or above) to change its file extension name, you may not need to use this configuration and just keep it as default.
