# hexo-document-plugin

Hexo 是一个底子不错相对轻量的程序, 本插件旨在通过一些hack的方式, 扩展hexo的接口, 以便使它更适合做一些文档类站点的职能。

## 配置说明

```
  "hexoHackedFeature": {
    "enable_components_demo_raw_content": ["on", "components的demo目录保持内容为raw"],
    "cancel_escape_at_document_title": ["on", "取消对文档标题内容的转义"],
    "extend_is_helper": ["on", "使用增强的is辅助函数"],
    "enable_components_list":["on", "使用组件列表侧边栏"]
  },

```