/**
 * TechNova — 全局文本内容参数配置文件
 * 网页上所有的文字都在这里，想改哪里直接改对应的值即可
 */

export const SITE_CONFIG = {
  // ======= 1. 浏览器标签页标题 =======
  pageTitle: "TJUNova — 响应式导航栏",

  // ======= 2. 导航栏 (Navbar) =======
  navbar: {
    brand: {
      name: "TJU",        // 普通文本
      accent: "Nova",     // 加粗/高亮文本
      homeLink: "#hero"   // 点击 Logo 跳转的地址
    },
    cta: {
      text: "免费开始",
      link: "#contact"
    },
    // 导航菜单
    menuItems: [
      { name: "首页", link: "#hero", active: true },
      { name: "关于我们", link: "#about" },
      { 
        name: "产品中心", 
        link: "#products",
        dropdown: [
          { name: "云计算平台", link: "#" },
          { name: "AI 解决方案", link: "#" },
          { name: "数据分析", link: "#" },
          { name: "安全服务", link: "#" }
        ]
      },
      { name: "新闻动态", link: "#news" },
      { name: "联系我们", link: "#contact" }
    ]
  },

  // ======= 3. Hero 主视觉区域 =======
  hero: {
    badge: "✦ 全新平台上线",
    titleLine1: "构建下一代",
    titleGradient: "数字基础设施", // 渐变高亮文字
    desc: "TJUNova 提供企业级云计算、AI 与数据解决方案，<br/>助力业务从概念到规模化落地。",
    btnPrimary: { text: "立即体验", link: "#contact" },
    btnGhost: { text: "了解更多 →", link: "#about" }
  },

  // ======= 4. 关于我们区域 =======
  about: {
    title: "关于我们",
    desc: "TJUNova 成立于 2026 年，致力于为全球企业提供高可用、高安全、可扩展的云原生解决方案。我们的团队由来自顶级科技公司的工程师和设计师组成，已服务超过 500 家企业客户。"
  },

  // ======= 5. 产品中心区域 =======
  products: {
    title: "产品中心",
    cards: [
      { icon: "☁", title: "云计算平台", desc: "弹性计算、存储与网络资源，按需扩缩，降低运维成本。" },
      { icon: "🤖", title: "AI 解决方案", desc: "预训练大模型与定制化微调服务，快速构建智能应用。" },
      { icon: "📊", title: "数据分析", desc: "实时数据管道与可视化看板，让数据驱动每一个决策。" }
    ]
  },

  // ======= 6. 新闻动态区域 =======
  news: {
    title: "新闻动态",
    items: [
      { date: "2026 · 05", text: "TJUNova 完成 B 轮融资，估值突破 20 亿美元", link: "#" },
      { date: "2026 · 04", text: "新产品发布：AI 代码助手正式上线公测", link: "#" },
        { date: "2026 · 03", text: "荣获\"年度最具创新力科技企业\"称号", link: "#" },
        { date: "2026 · 02", text: "与全球领先云服务商达成战略合作", link: "#" },
        { date: "2026 · 01", text: "TJUNova 正式更名，开启全新品牌战略", link: "#" }
    ]
  },

  // ======= 7. 联系我们区域 =======
   contact: {
    title: "联系我们",
    desc: "有任何问题或合作意向，欢迎随时联系我们的团队。",
    email: "hello@tjunova.example.com",
    phone: "400 - 888 - 8888",
    address: "天津市津南区天津大学北洋园校区"
  },

  // ======= 8. 页脚 =======
  footer: {
    copyRight: "© 2025 TJUNova Inc. — 响应式导航栏演示项目"
  }
};