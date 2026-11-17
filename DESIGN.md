---
version: alpha
name: tech-hub (itcsdn.com)
description: 开发者技术趋势聚合平台设计系统，从 src/app/globals.css 与 tailwind.config.ts 反推。

colors:
  # —— 强调色：globals.css 注释「强调色：极客紫 / Indigo」，即 CLAUDE.md 设计系统的全站唯一强调色 ——
  primary: "#4f46e5"          # globals.css --accent ＝ tailwind accent.DEFAULT
  primary-hover: "#4338ca"    # globals.css --accent-hover ＝ accent.hover；按钮/链接 hover 态
  primary-light: "#eef2ff"    # globals.css --accent-light ＝ accent.light；对应组件 bg-accent/8、bg-accent/10 的视觉结果
  primary-border: "#c7d2fe"   # globals.css --accent-border ＝ accent.border；CuratedCard 边框
  # —— 背景层级：globals.css 注释「背景层级」，白 → 浅灰 → 更浅灰 ——
  surface: "#ffffff"          # globals.css --bg-base；body 背景、卡片底色
  surface-sunken: "#f8fafc"   # globals.css --bg-surface ＝ tailwind surface ＝ slate-50（bg-surface / bg-slate-50 用同一值）
  surface-divider: "#f1f5f9"  # globals.css --bg-muted ＝ tailwind muted ＝ slate-100（border-slate-100 分隔线）
  # —— 边框：globals.css 注释「边框」 ——
  border: "#e2e8f0"           # globals.css --border ＝ slate-200；次级按钮描边
  border-hover: "#cbd5e1"     # globals.css --border-hover ＝ slate-300；hover:border-slate-300
  # —— 文字层级：globals.css 注释「文字层级」；组件实际直接使用 slate 工具类，数值与变量对齐 ——
  text-primary: "#0f172a"     # globals.css --text-primary ＝ slate-900（text-slate-900，16 处）
  text-secondary: "#64748b"   # ＝ slate-500（text-slate-500，12 处）；注意 globals --text-secondary 定义为 #475569(slate-600，仅 1 处)，存在变量/用类漂移
  text-tertiary: "#94a3b8"    # globals.css --text-muted ＝ slate-400（6 处，仅时间戳等非关键元信息）
  text-button-secondary: "#334155"  # ＝ slate-700（1 处，hero 次级按钮文字）
  text-on-primary: "#ffffff"  # text-white；accent 底上的 Logo「I」与主按钮文字
  # —— 装饰例外色：仅 about/page.tsx:51-55 个人介绍卡出现，非交互 ——
  highlight: "#fbbf24"        # bg-amber-400；装饰条
  highlight-bg: "#fffbeb"     # bg-amber-50；装饰标签底
  highlight-text: "#b45309"   # text-amber-700；装饰标签文字

typography:
  # 正文档唯一字体 Inter：layout.tsx 经 next/font/google 注入 --font-inter，回退 system-ui（tailwind fontFamily.sans）
  display-hero:               # src/app/page.tsx:68 「text-4xl sm:text-5xl font-bold tracking-tight leading-tight」
    fontFamily: Inter
    fontSize: 48px            # 移动端为 36px（text-4xl sm:text-5xl）
    fontWeight: 700
    lineHeight: 1.25          # leading-tight
    letterSpacing: -0.025em   # tracking-tight
  headline-page:              # ai / news / opensource / about 四页 h1「text-3xl font-bold」
    fontFamily: Inter
    fontSize: 30px
    fontWeight: 700
    lineHeight: 1.2           # tailwind text-3xl 默认行高
  headline-section:           # src/app/page.tsx:17 区块标题「text-xl font-bold」
    fontFamily: Inter
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.4           # tailwind text-xl 默认行高
  title-card:                 # ArticleCard/CuratedCard 标题「text-sm font-semibold leading-relaxed」
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.625         # leading-relaxed
  body-lg:                    # page.tsx:72 hero 副文案「text-lg … leading-relaxed」
    fontFamily: Inter
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.625
  body-md:                    # about 页正文「text-base」（2 处）
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5           # tailwind text-base 默认行高
  nav-label:                  # Header 桌面导航/按钮「text-sm font-medium」；footer 品牌为同字号 600
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.43          # tailwind text-sm 默认行高
  label-md:                   # 精选/状态 chip「text-xs font-medium」（12px 为全站最高频字号，20 处）
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.33          # tailwind text-xs 默认行高
  label-bold:                 # Header Logo「text-xs font-bold」
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1.33
  label-mono:                 # ArticleCard:13 / CuratedCard:18 来源角标「text-xs font-mono」
    fontFamily: Geist Mono    # tailwind fontFamily.mono 引用 --font-geist-mono，但该变量未注入，实际落到 ui-monospace 回退
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.33

rounded:
  # config 未覆写 borderRadius，全部为 Tailwind 默认档位；仅收录组件中出现过的
  md: 6px      # 来源角标（ArticleCard/CuratedCard）、移动端导航项（Header:64）
  lg: 8px      # Logo 色块（Header:22）、桌面导航项（Header:39）
  xl: 12px     # hero 主/次按钮（page.tsx:80,86）、about 特性块（about:35）
  2xl: 16px    # 卡片容器 ArticleCard/CuratedCard、about 个人介绍卡；装饰条用 rounded-l-2xl 同档
  full: 9999px # 状态圆点（page.tsx:63、Header:48）、pill chip（各页标题下徽章 rounded-full）

spacing:
  # Tailwind 基准 4px；键 x{n} ＝ tailwind spacing-{n} 档位，仅收录实际出现过的
  unit: 4px    # Tailwind 步长基准（n=1）
  x0-5: 2px    # py-0.5 角标、gap-0.5 移动导航、mt-0.5、hover:-translate-y-0.5 微位移
  x1: 4px      # gap-1、mb-1、accent 装饰条 w-1（Header 指示点 w-1 h-1）
  x1-5: 6px    # mt-1.5、圆点 w-1.5 h-1.5、w-2 指示点邻近档位
  x2: 8px      # gap-2（9 处）、mt-2（摘要间距）、px-2、w-2 h-2
  x2-5: 10px   # px-2.5、py-2.5（角标/按钮水平内边距）
  x3: 12px     # gap-3、mb-3（元信息行下间距）、px-3、pl-3（CuratedCard 让出装饰条）、mt-3
  x4: 16px     # p-4、px-4、gap-4（卡片栅格间距，9 处最高频）、mb-4、space-y-8 的中间档参照
  x5: 20px     # p-5（卡片内边距，ArticleCard/CuratedCard 统一）、px-5（按钮水平）
  x6: 24px     # px-6（容器左右留白）、mx-6、mb-6（区块标题下间距）
  x8: 32px     # lg:px-8（容器宽屏留白）、mx-8、mt-8（hero 按钮组上边距）
  x10: 40px    # py-10（footer）、mb-10（页头区下边距）
  x12: 48px    # py-12（main 纵向）、mt-12
  x16: 64px    # pb-16（hero 区下留白）；h-16 顶栏高 64px 同值
  x20: 80px    # pt-20 / mt-20 / space-y-20（首屏顶留白、footer 上边距、区块间最大节奏）

components:
  header-bar:
    backgroundColor: "{colors.surface}"   # bg-white/80 ＋ backdrop-blur-md（毛玻璃半透明）
    textColor: "{colors.text-primary}"
    typography: "{typography.nav-label}"
    height: 64px                          # h-16
    borderColor: "{colors.surface-divider}"  # border-b border-slate-100；sticky top-0 z-50
  nav-item:
    textColor: "{colors.text-secondary}"  # 未激活 text-slate-500，hover:text-slate-900 ＋ hover:bg-slate-50
    typography: "{typography.nav-label}"
    rounded: "{rounded.lg}"               # 桌面 lg / 移动端降为 md＋text-xs
    padding: 8px                          # py-2；水平为 px-4
  nav-item-active:
    textColor: "{colors.primary}"         # text-accent ＋ 底部 w-1 h-1 rounded-full 圆点指示
    backgroundColor: "{colors.primary-light}"  # bg-accent/8 的等效实色
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-on-primary}"
    typography: "{typography.nav-label}"
    rounded: "{rounded.xl}"
    padding: 10px                         # py-2.5；水平为 px-5；另带 shadow-sm
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-button-secondary}"  # text-slate-700
    borderColor: "{colors.border}"        # border border-slate-200
    rounded: "{rounded.xl}"
    padding: 10px                         # py-2.5；水平为 px-5
  button-secondary-hover:
    backgroundColor: "{colors.surface-sunken}"
    borderColor: "{colors.border-hover}"  # hover:border-slate-300
  meta-time:                              # 卡片日期/来源附加信息（ArticleCard:16、CuratedCard:21 等）
    textColor: "{colors.text-tertiary}"   # text-xs text-slate-400，Regular 字重（低于 label-md 的 500）
    typography: "{typography.label-md}"
  card-article:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"    # 标题；摘要为 text-secondary（见 prose）
    typography: "{typography.title-card}"
    borderColor: "{colors.surface-divider}"  # border-slate-100
    rounded: "{rounded.2xl}"
    padding: 20px                         # p-5；阴影见 Elevation：shadow-card → hover:shadow-card-hover ＋ -translate-y-0.5
  card-curated:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    typography: "{typography.title-card}"
    borderColor: "{colors.primary-border}"   # border-accent-border ＋ 左侧 w-1 bg-accent 装饰条
    rounded: "{rounded.2xl}"
    padding: 20px
  badge-source:
    backgroundColor: "{colors.surface-sunken}"  # bg-slate-50 ＋ border border-slate-100
    textColor: "{colors.text-secondary}"
    typography: "{typography.label-mono}"  # 唯一使用等宽字体的元素，标识内容来源
    rounded: "{rounded.md}"
    padding: 2px                          # py-0.5；水平为 px-2 或 px-2.5
  chip-status:
    backgroundColor: "{colors.primary-light}"  # bg-accent/10 ＋ border-accent/20
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: 4px                          # py-1；水平为 px-3；内嵌 animate-pulse 圆点
  logo-mark:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-on-primary}"
    typography: "{typography.label-bold}"
    rounded: "{rounded.lg}"
    size: 28px                            # w-7 h-7；另带 shadow-sm
  callout-highlight:                      # about/page.tsx:50 「站长推荐」卡——与 card-curated 同形，装饰条换成 amber
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.surface-divider}"  # border-slate-100；正文 text-primary / body-md 用 slate-600
    rounded: "{rounded.2xl}"
    padding: 20px
  decor-bar-highlight:                    # about:51 左侧装饰条，对应 CuratedCard 的 bg-accent 条
    backgroundColor: "{colors.highlight}"    # w-1 ＋ rounded-l-2xl
    width: 4px
  badge-highlight:                        # about:55 「工具推荐」标签，对应 badge-source 的 amber 版
    backgroundColor: "{colors.highlight-bg}"
    textColor: "{colors.highlight-text}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: 2px                          # py-0.5；水平为 px-2
---

# tech-hub (itcsdn.com) 设计系统

## Overview

面向开发者的技术趋势聚合站。视觉基调是**克制的极客风**：白色基底、浅灰层级、单一极客紫强调色（globals.css 原注释：「强调色：极客紫 / Indigo」），配合弥散阴影营造轻薄的卡片悬浮感。信息密度偏高（RSS 聚合流），因此用留白节奏和灰阶对比来保证长列表可读，而非用色彩分区。整体应显得专业、安静、可扫读，避免任何营销感的重装饰。

## Colors

色彩体系由两组构成：**灰阶骨架** + **单一强调色**。这是本系统最重要的隐含规则——可交互元素全站只用 Indigo 一族。

- **Primary (#4f46e5):** 全站唯一强调色（globals.css `--accent`）。用于按钮、链接 hover、精选卡片装饰条、导航激活态、状态点。强调色族（hover/light/border）由同一色相派生，不引入第二种色相做交互。
- **Neutral 灰阶:** 直接复用 Tailwind `slate` 标尺：`slate-900` 正文主色（`--text-primary`）、`slate-500` 次级文字、`slate-400` 仅时间戳等可忽略信息、`slate-100/200/300` 描边与分隔、`slate-50` 下沉底色。globals.css 的变量值与 slate 标尺一一对齐。
- **背景三级:** `#fff → #f8fafc → #f1f5f9`（globals.css「背景层级」注释），白卡永远浮于浅灰之上。
- **Amber 例外 (#fbbf24/#fffbeb/#b45309):** 全代码库仅 about 页个人介绍卡使用，纯静态装饰，**不是**第二强调色。

> 已知漂移：globals.css `--text-secondary` 定义为 `#475569`(slate-600)，但组件实际清一色用 `text-slate-500`(#64748b)。token 以组件实际用值为准。

## Typography

单一字体族 Inter（`next/font/google` 注入 `--font-inter`，回退 system-ui），层级靠字号 + 字重区分，不混排多款字体。

- **标题:** hero 用 48px Bold 紧字距（移动端 36px），页面 h1 30px Bold，区块标题 20px Bold——全部 700 字重以建立稳定的权威感。
- **正文:** 卡片标题 14px Semibold ＋ `leading-relaxed`(1.625) 保证两行截断（line-clamp-2）下的呼吸感；摘要 12px Regular；长文 16px/18px。
- **元信息:** 12px 是全站最高频字号，Medium 字重；**等宽字体仅用于来源角标**（font-mono，标识 GitHub/HN 等数据源），强化"技术数据"语义。注意：config 引用的 `--font-geist-mono` 从未注入，mono 当前实际落到 `ui-monospace`。

## Layout

**固定最大宽度栅格**：内容容器统一 `max-w-7xl`（80rem）水平居中，左右留白 `px-6`、宽屏升到 `lg:px-8`（见 layout.tsx 的 main/footer 与 Header 内框）。卡片列表用响应式 grid：1 列 → `sm:2` → `lg:3`，栅格间隙固定 `gap-4`（16px）。

节奏基于 Tailwind 4px 步长（14 个实际出现档位，见 spacing tokens）：组件内 8–20px，区块间 40–80px（`mb-10`/`py-12`/`space-y-20`），形成"卡内紧、卡外松"的呼吸对比。负 margin（`-mx-6 lg:-mx-8`）用于 hero 区全出血，是容器规则内唯一例外。config 定义的 `maxWidth.8xl`（88rem）全库未使用。

## Elevation & Depth

深度靠**三级手段叠加**，全部轻量（globals.css 原注释：「弥散阴影 — 卡片悬浮感」）：

1. **色调分层:** 白卡置于浅灰/白底之上（`--bg-base` → `--bg-surface`），层级关系先由背景色差建立。
2. **两档弥散阴影:** `shadow-card`（静止：双层 4%/6% 黑）→ `shadow-card-hover`（悬浮：6%/8%、更远扩散）。阴影只有这两档，不临时手写 box-shadow。
3. **微位移:** hover 时 `shadow-card-hover` 必配 `-translate-y-0.5` ＋ `transition-all duration-200`，让卡片"抬起来"。

其余场景（列表行、页头分隔）用 1px 实线 `border-slate-100` 表达边界，而非阴影。

## Shapes

圆角语言是"柔和的工程感"：全部使用 Tailwind 默认档位，形状严格对位——**16px(2xl) 给卡片容器，12px(xl) 给按钮，8px(lg) 给导航项与 Logo 方块，6px(md) 给角标/小标签，full 给圆点与 pill chip**。尺寸越小圆角越小，形成一致的同心观感；CuratedCard/about 卡的左侧装饰条用 `rounded-l-2xl` 与宿主卡片圆角同档，保证描边贴合。

## Components

核心构件见 front matter `components`。卡片是本系统的主角：`card-article`（中性资讯流）与 `card-curated`（站长精选，以 `--accent-border` 描边 ＋ 左侧 4px accent 色条区别于普通卡）共用同一套内边距/圆角/阴影/悬停语言，只有边框与装饰条不同——用"同形不同饰"表达内容分级。Header 导航激活态用 accent 文字 ＋ `accent/8` 淡底 ＋ 底部小圆点三重冗余指示，不依赖颜色单点。

## Do's and Don'ts

- **Do** 把 Indigo（primary 族）作为全站唯一的交互色；新按钮、链接、激活态一律从 `{colors.primary*}` 取色。
- **Don't** 引入新的强调色相做交互。amber 三色仅存在于 about 页静态装饰，不得扩展到新组件、不得用于可点击元素。
- **Do** 用灰阶（slate-900/500/400）表达文字层级，用背景色差（#fff/#f8fafc）表达容器层级。
- **Don't** 用 `text-slate-400` 承载必须阅读的内容——它仅用于时间戳等次级元信息（白底对比度约 2.6:1，未达 WCAG AA）。
- **Do** 卡片悬停统一三件套：`shadow-card` → `shadow-card-hover` ＋ `-translate-y-0.5` ＋ `duration-200`。
- **Don't** 手写新的 box-shadow 值；阴影体系只有这两档（Logo/主按钮上的 `shadow-sm` 除外）。
- **Do** 按形状语义选圆角：卡片 2xl / 按钮 xl / 导航 lg / 角标 md / 圆点与 chip full，并复用 {rounded} 中的档位。
- **Don't** 在同类元素中混用不同圆角档（如同一列表里部分卡 2xl 部分 lg）。
- **Do** 用 `font-mono` 标注内容来源角标，暗示"机器抓取的元数据"。
- **Don't** 把等宽字体用于标题、正文或按钮。
- **Do** 新页面复用容器约定：`max-w-7xl mx-auto px-6 lg:px-8`，页头徽章用 chip-status 样式保持四页一致。
- **Don't** 绕过 4px 步长体系写任意像素值；负 margin 仅限 hero 全出血一处。


## 2026-11-17 INS 改版实施档

本次用户授权页面改版继续使用现有白、slate 与 Indigo 色值，不新增强调色。字体调整为仓库已提供的本地 Geist Variable + 中文系统黑体，以 next/font/local 加载；数值使用 tabular-nums。全局 CSS 将颜色集中于既有 tokens，并新增语义圆角 tokens（卡片 16px、控件 12px、角标 6px），与原规范数值一致。

文章以清晰的标题、来源、日期与摘要组成阅读流，用分隔线表达内容边界；编辑收藏保留卡片结构。首页右侧雷达为信源发现的概念图，不将图示点位作为实际热度或实时状态。布局沿用 1280px 容器、4px 步长与单一 Indigo 交互色。
