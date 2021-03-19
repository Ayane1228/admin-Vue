# 基于vue-element-admin搭建的毕业设计的前端项目

#### 使用vue-element-admin 源码搭建前端框架：

```javascript
git clone https://github.com/PanJiaChen/vue-element-admin
cd vue-element-admin
npm i
npm run dev
```

### 精简项目

- 删除 src/views 下的源码，保留：

  - dashboard：首页
  - error-page：异常页面
  - login：登录
  - redirect：重定向

- 对 src/router/index 进行相应修改

- 删除 src/router/modules 文件夹

- 删除 src/vendor 文件夹

- 通过 src/settings.js 进行全局配置：

  - title：站点标题，进入某个页面后，格式为：

    ```
    页面标题 - 站点标题
    ```

    - showSettings：是否显示右侧悬浮配置按钮 false
    - tagsView：是否显示页面标签功能条 true
    - fixedHeader：是否将头部布局固定在窗口顶部。true
    - sidebarLogo：菜单栏中是否显示LOGO false

## 项目结构

src文件下：

```
|-src
├─api
├─assets
│  ├─401_images
│  ├─404_images
│  └─custom-theme
│      └─fonts
├─components
│  ├─BackToTop
│  ├─Breadcrumb
│  ├─Charts
│  │  └─mixins
│  ├─DndList
│  ├─DragSelect
│  ├─Dropzone
│  ├─ErrorLog
│  ├─GithubCorner
│  ├─Hamburger
│  ├─HeaderSearch
│  ├─ImageCropper
│  │  └─utils
│  ├─JsonEditor
│  ├─Kanban
│  ├─MarkdownEditor
│  ├─MDinput
│  ├─Pagination
│  ├─PanThumb
│  ├─RightPanel
│  ├─Screenfull
│  ├─Share
│  ├─SizeSelect
│  ├─Sticky
│  ├─SvgIcon
│  ├─TextHoverEffect
│  ├─ThemePicker
│  ├─Tinymce
│  │  └─components
│  ├─Upload
│  └─UploadExcel
├─directive
│  ├─clipboard
│  ├─el-drag-dialog
│  ├─el-table
│  ├─permission
│  └─waves
├─filters
├─icons
│  └─svg
├─layout
│  ├─components
│  │  ├─Settings
│  │  ├─Sidebar
│  │  └─TagsView
│  └─mixin
├─router
├─store
│  └─modules
├─styles
├─utils
└─views
    ├─account
    ├─error-page
    ├─information
    ├─login
    ├─notice
    ├─redirect
    └─select
```

# 使用全局地址VUE_APP_BASE_API

## 建立.env系列文件

首先我们在根目录新建3个文件，分别为.env.development，.env.production，.env.test
注意文件是只有后缀的。

.env.development 模式用于serve，开发环境，就是开始环境的时候会引用这个文件里面的配置

.env.production模式用于build，线上环境。

.env.test 测试环境

## 更改package.json文件

```js
 "scripts": {
    "dev": "vue-cli-service serve",
    "test": "vue-cli-service serve --mode test",
    "build": "vue-cli-service build",
    "build:test": "vue-cli-service build --mode test",
    "lint": "vue-cli-service lint"
  },
```

## 使用

当需要用到该变量是可以用`process.env.VUE_APP_BASE_API`进行取值。