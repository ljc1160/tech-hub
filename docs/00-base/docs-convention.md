# 文档规范

## 目录结构

```
docs/
├── 00-base/                        # 全局基建文档
│   ├── docs-convention.md          # 本文档：文档规范
│   ├── architecture.md             # 技术架构
│   ├── conventions.md              # 开发惯例
│   ├── database.md                 # 数据库规约
│   ├── glossary.md                 # 业务名词
│   └── deployment.md               # 部署手册
└── 01-features/                    # 功能文档
    └── {YYYYMMDD}-{feature-name}/
        ├── 01-{name}-index.md      # 功能索引（plan 模式产出，AI 生成）✅ 必须
        ├── 02-{name}-prd.md        # 产品需求（用户编写）✅ 必须
        ├── 03-{name}-prd-review.md # PRD 评审记录 🔲 可选
        ├── 04-{name}-arch.md       # 技术设计 ✅ 必须
        ├── 05-{name}-arch-review.md# 技术评审记录 🔲 可选
        ├── 06-{name}-task.md       # 执行清单 ✅ 必须
        ├── 07-{name}-task-review.md# 任务评审记录 🔲 可选
        └── 99-{name}-release.md    # 发版说明 🔲 可选
```

> 序号允许跳跃，不强求连续。缺少某个序号表示该阶段未发生，不是遗漏。`99` 固定作为发版说明的终态文档。

## Feature 开发流程

新功能按以下顺序**逐步推进，每步需用户审核通过后才进入下一步**：

| 步骤 | 产出文件 | 负责人 | 是否必须 |
|------|---------|--------|---------|
| 1. Plan 模式探讨需求 | `01-{name}-index.md` | AI 生成 | ✅ |
| 2. 审核 index，补充细节 | `02-{name}-prd.md` | 用户编写 | ✅ |
| 2.5. PRD 评审（可选） | `03-{name}-prd-review.md` | 团队 | 🔲 |
| 3. 技术设计 | `04-{name}-arch.md` | AI 生成，用户审核 | ✅ |
| 3.5. 技术评审（可选） | `05-{name}-arch-review.md` | 团队 | 🔲 |
| 4. 执行清单 | `06-{name}-task.md` | AI 生成，用户审核 | ✅ |
| 5. 编码实现 | — | 按清单逐步执行 | ✅ |
| 6. 发版说明（可选） | `99-{name}-release.md` | 用户编写 | 🔲 |

## 命名规范

- **目录**：`{YYYYMMDD}-{feature-name}`，feature-name 用连字符，英文小写
- **文件**：`{序号}-{feature-name}-{类型}.md`
- **分支**：`feature/{YYYYMMDD}-{feature-name}`
- **序号跳跃**（02→04→06）：为中间可能插入的文档预留空间

## 使用说明

新项目接入：
1. 将本文件复制到新项目 `docs/00-base/docs-convention.md`
2. 在项目 `CLAUDE.md` 中添加引用（见下方模板）

CLAUDE.md 引用模板：
```
## 📋 文档规范
见 `docs/00-base/docs-convention.md`
```
