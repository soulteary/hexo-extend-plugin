# hexo-document-plugin

Hexo 是一个快速、简洁且高效的博客框架，本插件通过扩展hexo原有的接口，以及对接hexo原有的数据接口，来让写作以及使用hexo制作偏文档类型的站点更加轻松。

## 如何使用插件?

使用`npm`将插件安装于你的hexo目录即可激活插件主要功能。

```
npm install hexo-document-plugin --save
```

如果你要在主题中使用扩展的helper,需要执行:

```
hexo enable-document --on
```


## 配置说明

```
  "hexoHackedFeature": {
    "enable_components_demo_raw_content": ["on", "components的demo目录保持内容为raw"],
    "cancel_escape_at_document_title": ["on", "取消对文档标题内容的转义"],
    "extend_is_helper": ["on", "使用增强的is辅助函数"],
    "enable_components_list":["on", "使用组件列表侧边栏"]
  },

```