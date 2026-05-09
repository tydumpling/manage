# Vue Admin - 现代化管理后台系统

<div align="center">
  <img src="public/logo.svg" alt="Vue Admin Logo" width="120" height="120">
  
  <h3>基于 Vue 3 + Vite + Element Plus 的现代化管理后台模板</h3>
  
  [![Vue](https://img.shields.io/badge/Vue-3.5.16-4FC08D?style=flat-square&logo=vue.js)](https://vuejs.org/)
  [![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
  [![Element Plus](https://img.shields.io/badge/Element%20Plus-2.10.1-409EFF?style=flat-square&logo=element)](https://element-plus.org/)
  [![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
  
  <h4>
    <a href="https://vue.yddekd.com/#/dashboard" target="_blank">🚀 在线预览</a>
  </h4>
</div>

## ✨ 特性

- 🚀 **最新技术栈**：基于 Vue 3.5、Vite 6、Element Plus 2.10 等最新版本
- 🎨 **现代化 UI**：精美的界面设计，支持明暗主题切换
- 🌍 **国际化**：内置中英文双语支持，可扩展多语言
- 📱 **响应式设计**：适配不同屏幕
- 🔐 **权限管理**：完整的认证授权体系，支持动态路由
- 📊 **数据可视化**：集成 ECharts，提供丰富的图表组件
- 🛠 **丰富组件**：内置多种实用功能组件
- ⚡ **性能优化**：代码分割、懒加载、Gzip压缩等优化策略
- 🔧 **开发友好**：完善的开发工具链，支持热更新、ESLint、Prettier

## 🚀 快速开始

### 环境要求

- **Node.js**: >= 18.0.0
- **pnpm**: >= 8.0.0 (推荐) 或 npm >= 9.0.0

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/ltadpoles/vue-admin.git

# 进入项目目录
cd vue-admin

# 安装依赖
pnpm install
```

### 开发运行

```bash
# 启动开发服务器
pnpm dev

# 访问 http://localhost:8210
```

### 构建部署

```bash
# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview
```

### 代码规范

```bash
# ESLint 检查和修复
pnpm lint

# Prettier 格式化
pnpm format
```

## 📦 技术栈

### 核心框架
- [Vue 3.5.16](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Vite 6.3.5](https://vitejs.dev/) - 下一代前端构建工具
- [Vue Router 4.5.1](https://router.vuejs.org/) - Vue.js 官方路由
- [Pinia 3.0.3](https://pinia.vuejs.org/) - Vue 状态管理库

### UI 框架
- [Element Plus 2.10.1](https://element-plus.org/) - 基于 Vue 3 的组件库
- [@element-plus/icons-vue](https://github.com/element-plus/element-plus-icons) - Element Plus 图标库

### 功能库
- [ECharts 5.6.0](https://echarts.apache.org/) - 数据可视化图表库
- [Axios 1.9.0](https://axios-http.com/) - HTTP 请求库
- [Vue I18n 11.1.5](https://vue-i18n.intlify.dev/) - Vue 国际化插件
- [NProgress 0.2.0](https://ricostacruz.github.io/nprogress/) - 页面加载进度条

### 特色组件
- [@wangeditor/editor](https://www.wangeditor.com/) - 富文本编辑器
- [md-editor-v3](https://imzbf.github.io/md-editor-v3/) - Markdown 编辑器
- [vue-cropper](https://github.com/xyxiao001/vue-cropper) - 图片裁剪组件
- [xgplayer](https://v2.h5player.bytedance.com/) - 视频播放器
- [vue-pdf-embed](https://github.com/hrynko/vue-pdf-embed) - PDF 预览组件
- [qrcode.vue](https://github.com/scopewu/qrcode.vue) - 二维码生成组件
- [pinyin-pro](https://github.com/zh-lx/pinyin-pro) - 汉语拼音转换
- [@amap/amap-jsapi-loader](https://lbs.amap.com/) - 高德地图 JS API

### 开发工具
- [ESLint 9.28.0](https://eslint.org/) - 代码质量检查
- [Prettier 3.5.3](https://prettier.io/) - 代码格式化
- [Sass 1.89.2](https://sass-lang.com/) - CSS 预处理器
- [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) - 自动导入
- [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) - 组件自动导入

## 📁 项目结构

```
vue-admin/
├── public/                 # 静态资源目录
│   └── logo.svg           # 项目Logo
├── src/                   # 源码目录
│   ├── api/              # API接口
│   │   └── user.js       # 用户相关接口
│   ├── assets/           # 资源文件
│   │   ├── images/       # 图片资源
│   │   ├── styles/       # 全局样式
│   │   └── svg/          # SVG图标
│   ├── components/       # 公共组件
│   │   ├── dialog/       # 对话框组件
│   │   ├── drawer/       # 抽屉组件
│   │   └── svgIcon/      # SVG图标组件
│   ├── config/           # 配置文件
│   │   └── index.js      # 全局配置
│   ├── hooks/            # 自定义Hooks
│   │   └── useCommon.js  # 通用Hooks
│   ├── i18n/             # 国际化配置
│   │   ├── en.js         # 英文语言包
│   │   ├── zhCN.js       # 中文语言包
│   │   └── index.js      # 国际化配置
│   ├── layout/           # 布局组件
│   │   ├── components/   # 布局子组件
│   │   │   ├── header/   # 头部组件
│   │   │   ├── sidebar/  # 侧边栏组件
│   │   │   ├── tags/     # 标签栏组件
│   │   │   └── footer/   # 底部组件
│   │   └── index.vue     # 主布局组件
│   ├── router/           # 路由配置
│   │   ├── modules/      # 路由模块
│   │   ├── index.js      # 路由主文件
│   │   ├── static.js     # 静态路由
│   │   └── utils.js      # 路由工具
│   ├── stores/           # 状态管理
│   │   ├── modules/      # 状态模块
│   │   │   ├── user.js   # 用户状态
│   │   │   ├── setting.js # 系统设置
│   │   │   └── tag.js    # 标签状态
│   │   ├── index.js      # Store主文件
│   │   └── reset.js      # 状态重置
│   ├── utils/            # 工具函数
│   │   ├── http/         # HTTP请求封装
│   │   ├── index.js      # 通用工具
│   │   └── theme.js      # 主题工具
│   ├── views/            # 页面组件
│   │   ├── dashboard/    # 仪表盘
│   │   ├── components/   # 功能组件页面
│   │   ├── system/       # 系统管理
│   │   ├── login/        # 登录页面
│   │   ├── error/        # 错误页面
│   │   └── about/        # 关于页面
│   ├── App.vue           # 根组件
│   └── main.js           # 入口文件
├── index.html            # HTML模板
├── vite.config.js        # Vite配置
├── eslint.config.js      # ESLint配置
├── package.json          # 项目依赖
└── README.md             # 项目说明
```

## 🔧 配置说明

### 开发服务器配置

项目默认运行在 `http://localhost:8210`，API代理配置指向 `http://127.0.0.1:3000`。

### 环境变量

支持多环境配置，可在 `env/` 目录下创建对应的环境变量文件：

- `.env.development` - 开发环境
- `.env.production` - 生产环境
- `.env.staging` - 测试环境

### 主要配置项

```javascript
// src/config/index.js
export default {
  LOGIN_URL: '/login',           // 登录页路由
  ROUTER_WHITE_LIST: ['/login'], // 路由白名单
  ISBREADCRUMB: true,           // 是否显示面包屑
  ISTAGS: true,                 // 是否显示标签栏
  ISREFRESHTOKEN: false,        // 是否开启token刷新
  PINIASTORY: sessionStorage    // Pinia持久化存储方式
}
```

## 🎨 主题定制

### 主题切换

系统支持明暗主题切换，主题状态保存在 Pinia Store 中：

```javascript
// 切换主题
const settingStore = useSettingStore()
settingStore.setDark(!settingStore.isDark)
```

### 自定义主题色

支持动态修改系统主题色：

```javascript
// 设置主题色
settingStore.setPrimaryColor('#409eff')
```

### 字体大小调节

支持调节系统字体大小：

```javascript
// 设置字体大小
settingStore.setFontSize(16)
```

## 🔐 权限管理

### 路由权限

基于 Vue Router 的路由守卫实现：

- **登录验证**：未登录用户自动跳转到登录页
- **路由白名单**：配置无需验证的路由
- **动态路由**：根据用户权限动态加载路由

### 菜单权限

支持基于角色的菜单权限控制：

```javascript
// 设置用户菜单权限
userStore.setMenu(menuList)
```

## 📊 数据可视化

集成 ECharts 5.6.0，提供多种图表类型：

- **柱状图** (`bar`) - 数据对比分析
- **折线图** (`line`) - 趋势变化展示
- **饼图** (`pie`) - 数据占比分析
- **散点图** (`scatter`) - 数据分布展示
- **象形柱图** (`pictorial-bar`) - 创意数据展示

## 🌍 国际化

基于 Vue I18n 实现多语言支持：

```javascript
// 切换语言
const settingStore = useSettingStore()
settingStore.setLocale('en') // 'zhCN' | 'en'
```

支持的语言：
- 🇨🇳 简体中文
- 🇺🇸 English

## 🔧 开发指南

### 添加新页面

1. 在 `src/views/` 下创建页面组件
2. 在 `src/router/modules/` 下添加路由配置
3. 如需菜单显示，配置相应的 `meta` 信息

### 添加新组件

1. 在 `src/components/` 下创建组件
2. 如需全局使用，在 `main.js` 中注册
3. 遵循组件命名规范和文档注释

### 状态管理

使用 Pinia 进行状态管理：

```javascript
// 创建新的 store
export const useExampleStore = defineStore('example', {
  state: () => ({
    data: []
  }),
  actions: {
    setData(data) {
      this.data = data
    }
  },
  persist: true // 开启持久化
})
```

### API 请求

统一使用封装的 HTTP 请求：

```javascript
import http from '@/utils/http'

// GET 请求
const getData = () => {
  return http.get('/api/data')
}

// POST 请求
const postData = (data) => {
  return http.post('/api/data', data)
}
```

## 🚀 部署

### 构建优化

项目已配置多项构建优化：

- **代码分割**：按需加载，减少首屏加载时间
- **Gzip 压缩**：减少传输体积
- **资源优化**：图片压缩、CSS/JS 压缩
- **缓存策略**：合理的文件命名和缓存配置

## 📄 许可证

本项目基于 [MIT](LICENSE) 许可证开源。

## 📞 联系我

如果您有任何问题或建议，请通过以下方式联系：

- 🐛 Issues: [GitHub Issues](https://github.com/ltadpoles/vue-admin/issues)
- 💬 留言: [留言](https://www.yddekd.com/board)

---

<div align="center">
  <p>如果这个项目对您有帮助，请给个 ⭐️ Star 支持一下！</p>
  <p>Made with ❤️ by Vue Admin Team</p>
</div>