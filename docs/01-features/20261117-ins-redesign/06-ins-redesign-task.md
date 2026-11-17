---
title: INS 改版实施与验收
status: verified
date: 2026-11-17
---
# 检查清单

- 已实现：首页与统一分类页、工具入口、关于与 404。
- 已实现：独立品牌、本地字体、检索筛选排序、空状态、键盘焦点。
- 已实现：Canonical、Description、Open Graph、Twitter、JSON-LD、站点地图、robots、RSS 与归档分页。
- 已验证：类型、生产构建、Lint、浏览器桌面/手机、筛选交互、全部静态页面 SEO、原始数据未变。

## 验证结果

- Next.js 生产构建、TypeScript 和 ESLint 通过；共生成 25 个静态路由产物。
- 18 个主要 HTML 页面（首页、四分类、关于、12 页归档）逐页检查通过：唯一 H1、zh-CN、唯一 ins Canonical、Description、OG、Twitter、JSON-LD。
- 站点地图包含 18 个规范 URL；RSS XML 可解析，含 100 个 item；全部 400 条原始内容链接均出现在可遍历归档中。
- Chromium 桌面 1440×1080、手机 393×852、窄屏 320px 无横向溢出。
- 搜索、无结果、清除、信源筛选、日期排序、加载更多、手机信源选择均通过。
- 分类、关于、归档路由返回 200；缺失页面返回 404；关闭 JavaScript 后最终归档页仍显示剩余 4 条。
- 未捕获运行或 hydration 错误。截图见 previews/。
- 原始 data JSON 无差异；主目录仍只有用户已有的 CLAUDE.md 和 DESIGN.md 状态。
- 修正 Next.js 14 开发时 export 动态路由兼容问题；生产仍完整静态输出。
- 构建仅提示原依赖的 caniuse-lite 数据陈旧，未改动依赖版本。
