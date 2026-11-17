---
title: INS 改版技术方案
status: implemented
date: 2026-11-17
---
# 架构

继续使用 Next.js App Router 与 output: export。页面和归档静态生成；搜索、排序、信源筛选使用小范围客户端组件。保留现有本地 Geist 字体，通过 next/font/local 自托管，构建不访问 Google Fonts。

ArticleExplorer 统一内容检索；ArticleCard 保留语义 article、标题、来源、日期与原文外链。CategoryPage 统一分类内容与 CollectionPage、BreadcrumbList 结构化数据。日期固定 Asia/Shanghai，避免服务端与客户端时区差异。

每 36 条生成一个 /archive/N 静态页，所有内容均可通过普通链接遍历；每 18 条为交互阅读批次。/feed.xml 输出最近 100 条的 RSS。元信息统一由 src/lib/site.ts 构建，域名固定 https://ins.itcsdn.com，站点地图使用真实数据日期，不伪造更新时间。

部署 out/ 时需为干净 URL 配置 Nginx try_files $uri $uri.html $uri/ =404，并将自定义错误页指向 /404.html。域名配置与证书申请不在本次本地改版中执行。

参考：[Next.js 14 Metadata](https://nextjs.org/docs/14/app/building-your-application/optimizing/metadata)、[Google 站点地图指南](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)。
