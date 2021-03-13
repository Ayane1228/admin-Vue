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

