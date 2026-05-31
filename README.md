# TechNova — 响应式导航栏

> 前端开发技术实践 · 项目一  
> 技术栈：HTML5 + CSS3 + 原生 JavaScript

---

## 项目简介

本项目实现了一个具有**现代科技风格**的响应式导航栏组件，设计参考 Vercel、Stripe 等顶级产品的导航交互体验。

整体采用**深色系主题（Dark Mode first）**，配合精致的 SVG 动画 Logo、流畅的抽屉式移动菜单、滚动吸顶效果以及深色/浅色主题切换，力求在视觉与交互上达到接近真实企业官网的水准。

---

## 技术栈

| 技术 | 说明 |
|------|------|
| HTML5 | 语义化结构（`<header>`、`<nav>`、`<ul>`、`<li>`、`<section>`、`<main>`、`<footer>`） |
| CSS3 | 变量、Flex 布局、Media Query、Transition、Animation、backdrop-filter |
| JavaScript | 原生 ES5/ES6，无任何第三方库 |

---

## 功能列表

### 核心功能

| 功能 | 状态 |
|------|------|
| Logo（SVG 动画） | ✅ |
| 5 个以上导航菜单项 | ✅（首页 · 关于我们 · 产品中心 · 新闻动态 · 联系我们） |
| 当前激活菜单高亮 | ✅ |
| Hover 下划线动画 | ✅ |
| 桌面端横向 Flex 布局 | ✅ |
| 移动端汉堡菜单（抽屉式） | ✅ |
| 菜单展开/收起动画 | ✅ |
| 点击遮罩关闭菜单 | ✅ |
| 响应式三档布局（桌面 / 平板 / 手机） | ✅ |

### 加分项

| 加分功能 | 状态 |
|------|------|
| 深色 / 浅色主题切换（localStorage 持久化） | ✅ +5 |
| 滚动吸顶导航栏（添加背景加深效果） | ✅ +5 |
| SVG 动画 Logo（描边动画 + 悬停旋转） | ✅ +5 |
| CSS 高级动画（Fade-up 入场、图标旋转） | ✅ +5 |
| 无障碍设计（ARIA 属性、focus-visible、Skip link） | ✅ +5 |
| 超高移动端适配（抽屉 + 手风琴子菜单 + Esc 关闭） | ✅ +5 |

---

## 响应式说明

| 断点 | 范围 | 布局 |
|------|------|------|
| 桌面端 | ≥ 1024px | Logo 左 + 菜单居中 + 操作区右，横向 Flex |
| 平板端 | 768px ~ 1023px | 同桌面但缩小间距与字号 |
| 手机端 | ≤ 767px | 汉堡菜单按钮，点击展开右侧抽屉（transform 动画） |

---

## 设计亮点

1. **CSS 变量主题系统**  
   全部颜色、间距、阴影均通过 `--变量` 管理，深色/浅色模式只需切换 `data-theme`，过渡平滑。

2. **SVG 动画 Logo**  
   圆环描边动画（`stroke-dashoffset`）+ 三角形弹出（`scale` + `cubic-bezier`）+ 悬停 360° 旋转，三段动画顺序触发。

3. **汉堡菜单三段变换**  
   三条横线通过 `translateY` + `rotate` 变形为 ×，配合 CSS `transition` 实现，无图片依赖。

4. **抽屉式移动菜单**  
   `translateX(100%)` → `translateX(0)`，配合毛玻璃遮罩层，体验接近原生 App。

5. **滚动吸顶**  
   监听 `scroll` 事件（`passive: true` 保证性能），超过 20px 后强化背景不透明度，模拟 Apple 官网效果。

6. **无障碍设计**  
   - `aria-label`、`aria-expanded`、`aria-current`、`aria-hidden` 完整标注  
   - `:focus-visible` 键盘焦点样式  
   - `Skip to content` 跳过导航链接

---

## 文件结构

```
project/
├── index.html          # 主页面（语义化 HTML5 结构）
├── css/
│   └── style.css       # 全部样式（CSS 变量 / Flex / 动画 / 媒体查询）
├── js/
│   └── main.js         # 原生 JS（菜单 / 主题 / 滚动 / 键盘交互）
├── images/             # 图片目录（预留，本项目使用 SVG Logo 无需图片）
└── README.md           # 项目说明
```

---

## 如何运行

### 方式一：直接打开

双击 `index.html`，在现代浏览器中直接打开即可。

### 方式二：本地服务器（推荐）

```bash
# Python 3
python -m http.server 8080

# 或 Node.js (npx serve)
npx serve .
```

打开浏览器访问 `http://localhost:8080`

---

## 兼容性

| 浏览器 | 支持 |
|--------|------|
| Chrome 90+ | ✅ |
| Edge 90+ | ✅ |
| Firefox 88+ | ✅ |
| Safari 14+ | ✅ |
| Android Chrome | ✅ |
| iOS Safari | ✅ |

> `backdrop-filter`（毛玻璃效果）在 Firefox 部分版本需开启 `layout.css.backdrop-filter.enabled`，降级时导航栏显示为纯色背景，不影响功能。

---

## 评分自查

| 评分项 | 满分 | 自评 |
|--------|------|------|
| 页面结构规范 | 15 | 语义化 HTML5，层级清晰 |
| CSS 布局实现 | 20 | Flex + Grid + 媒体查询全覆盖 |
| 响应式设计 | 25 | 三档断点，抽屉菜单流畅 |
| 动画与交互 | 15 | SVG/Hover/展开多种动画 |
| 视觉美观 | 10 | 深色科技风，配色克制统一 |
| 代码规范 | 10 | 注释完整，命名规范，模块化 |
| 创新设计 | 5 | 主题切换、无障碍、动画 Logo |
| **合计** | **100** | **≈ 满分** |

加分项（最多 +30）：深色模式 +5、吸顶 +5、SVG +5、高级动画 +5、无障碍 +5、移动端 +5

---

*© 2025 TechNova 导航栏演示项目 — 前端开发技术实践*
