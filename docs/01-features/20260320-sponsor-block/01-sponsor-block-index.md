# 计划：tech-hub 推广区块（工具推荐）

## Context

用户希望在 tech-hub 网站中展示客户的微信小程序二维码和描述，用于推广引流。要求：
- 形式隐晦，不像广告，以"工具推荐"为定位
- 可扩展，后续支持多个广告主

## 设计决策

- 标签文字：**工具推荐**（用户选择，最隐晦）
- 视觉风格：与 `CuratedCard` 同族，左侧 amber/emerald 色装饰线，区别于站长精选的 indigo
- 放置位置：AI 资讯区块和开源项目区块之间（内容消费完一屏后自然出现）
- 数据管理：静态 JSON 文件，`active` 字段控制上下线，零代码改动即可新增/下线广告主

## 新增文件

| 文件 | 说明 |
|------|------|
| `data/sponsors.json` | 推广配置数据 |
| `src/types/sponsor.ts` | Sponsor 类型定义 |
| `src/lib/sponsors.ts` | 数据读取函数 |
| `src/components/SponsorCard.tsx` | 推广卡片组件 |
| `public/sponsors/` | 二维码/Logo 图片目录（.gitkeep） |

## 修改文件

- `src/app/page.tsx`：在 AI 资讯 section 之后插入推广 section（条件渲染，无广告主时自动隐藏）

## 数据结构（sponsors.json）

```json
[
  {
    "id": "sponsor-001",
    "active": true,
    "type": "miniprogram",
    "name": "产品名称",
    "tagline": "对开发者的一句话价值描述",
    "description": "更详细的描述，60 字以内（可选）",
    "qrcode": "/sponsors/sponsor-001-qr.png",
    "category": "ai-tool",
    "placement": ["home"],
    "startDate": "2026-03-20",
    "endDate": null
  }
]
```

字段说明：
- `active`：快速上下线
- `placement`：支持多页面 `["home", "ai", "opensource"]`
- `endDate`：到期自动过滤，null 表示永不过期
- `type`：`miniprogram` 显示二维码，`saas` 显示链接按钮

## 组件视觉设计

```
┌─────────────────────────────────────────┐
│ ▌(amber)  [🔧 工具推荐]  微信小程序     │
│                                         │
│  左侧：产品名（粗）                     │
│        一句话价值描述（主）             │
│        详细描述（灰色，可选）           │
│                                         │
│  右侧：二维码图片（80x80）              │
│        "扫码了解" 文字                  │
└─────────────────────────────────────────┘
```

- 左侧 accent 线颜色：`amber-400`（区别于 CuratedCard 的 indigo）
- 标签背景：`amber-50`，文字：`amber-700`
- 卡片 hover：与 ArticleCard 一致（上浮 + 阴影）

## page.tsx 集成方式

```tsx
// 数据获取（Server Component）
const sponsors = getSponsors('home')

// 在 AI 资讯 section 之后插入（条件渲染）
{sponsors.length > 0 && (
  <section className="...">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-semibold">开发者工具</h2>
    </div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {sponsors.map(s => <SponsorCard key={s.id} sponsor={s} />)}
    </div>
  </section>
)}
```

## 参考文件

- `src/components/CuratedCard.tsx` — 视觉风格参照
- `src/types/article.ts` — 类型定义风格参照
- `src/lib/articles.ts` — 数据读取模式参照
- `data/curated.json` — JSON 结构风格参照

## 验证步骤

1. 运行 `npm run dev`，访问主页确认推广区块出现在正确位置
2. 检查二维码图片正常显示（需将真实图片放入 `public/sponsors/`）
3. 将 `sponsors.json` 中 `active` 改为 `false`，确认区块自动隐藏
4. 测试响应式：移动端二维码和文字布局正常
5. 运行 `npm run build`，确认无 TypeScript 错误
