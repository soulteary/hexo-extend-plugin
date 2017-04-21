# Hexo Extend Plugin

Hexo 是一个快速、简洁且高效的博客框架，本插件通过扩展hexo原有的接口，以及对接hexo原有的数据接口，来让写作以及使用hexo制作偏文档类型的站点更加轻松。

## 当前插件匹配状态

| 插件版本 | Hexo版本 |
| --- | --- |
| 0.1.11 | 3.2.2 / 3.3.1 |
| 0.1.10 | 3.2.2 |

## 使用方法

使用`npm`将插件安装于Hexo网站目录即可激活本插件主要功能：

```
npm install hexo-extend-plugin --save
```

如果你期望在Hexo主题中使用扩展的helper， 可以执行:

```
hexo extend-features --on
```

## 集成功能

### 站外链接自动添加nofollow

Adds nofollow attribute to all external links in your hexo blog posts automatically.

inspire [link](https://github.com/liuzc/hexo-autonofollow) ver: #188f556

### 中英文之间自动添加空格

Add spaces between CJK characters and western characters.

inspire [link](https://github.com/hexojs/hexo-filter-auto-spacing) ver: 0.2.1

### 压缩HTML页面内容

Minify HTML files with HTMLMinifier.

inspire [link](https://github.com/hexojs/hexo-html-minifier) ver: #2d0b092


### 自动插入Markdown TOC

📖 Insert a markdown TOC before posts be rendered.

inspire [link](https://github.com/bubkoo/hexo-toc) ver: #2f0c6fc


### 生成跳转页面

Generate alias pages for redirecting to posts, pages or URL

inspire [ink](https://github.com/hexojs/hexo-generator-alias) ver: # #6d96684


concat hexo-generator-feed@1.1.0 / hexo-generator-seo-friendly-sitemap@0.0.16...


## 配置说明

```
{
  "hexo": {
    "version": "3.2.2"
  },
  "hexoExtendFeature": {
    "enable_components_demo_raw_content": [
      "on",
      "components的demo目录保持内容为raw"
    ],
    "extend_is_helper": [
      "on",
      "使用增强的is辅助函数"
    ],
    "components_list": [
      "off",
      "使用组件列表侧边栏"
    ],
    "cancel_escape_at_document_title": [
      "off",
      "组件文档页面标题不转义多次"
    ],
    "archive_dirs_structure_in_source_dir": [
      "on",
      "源文件目录使用年月日方式保持目录结构"
    ],
    "remove_date_prefix_in_post_url": [
      "off",
      "去掉文档页面URL中存在的日期字符串"
    ]
  }
}
```

## 已知问题

- Hexo v3.2.2 在处理过1000个文件的时候，需要的内存资源大于node默认分配资源
- Hexo v3.2.2 如果watch出现问题，可以尝试中断进程，重新启动。（wormhole的小坑）


