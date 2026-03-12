# tech-open-hub 部署指南

## 项目概述

tech-open-hub 是一个 **Next.js 14 静态导出**项目，构建产物为纯静态 HTML/CSS/JS 文件，可部署到任意静态托管平台，无需 Node.js 运行时。

数据流程：
```
GitHub Actions (每小时)
  → 抓取 RSS 数据
  → 更新 data/articles.json 并提交
  → 触发重新部署（Cloudflare Pages 自动检测到 GitHub 推送）
```

---

## 方案一：Cloudflare Pages（推荐）

免费、全球 CDN、对国内访问友好，支持 GitHub 推送自动部署。

### 注册账号

1. 访问 [cloudflare.com](https://cloudflare.com) 注册账号
2. 登录后进入控制台

### 创建项目

1. 左侧菜单选择 **Workers & Pages** → 点击 **Create**
2. ⚠️ **必须选 Pages 标签**（不是 Workers），点击 **Connect to Git**
   > 误选 Workers 会导致部署命令变成 `npx wrangler deploy`，构建必定失败
3. 授权 Cloudflare 访问 GitHub，选择 `tech-open-hub` 仓库
4. 构建配置填写（**不要选 Framework preset**，留空或选 None）：
   - **Framework preset**: None
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
   > 若选了 Next.js preset，构建命令会自动变成 `npx opennextjs-cloudflare build`，导致构建失败
5. 点击 **Save and Deploy**，等待 1-2 分钟

部署成功后会分配临时域名，类似 `tech-open-hub.pages.dev`。

### 自动部署机制

- 每次推送到 `main` 分支都会自动触发重新构建
- GitHub Actions 每小时更新数据 → Cloudflare Pages 自动重新部署 → 站点内容保持最新

### 绑定 itcsdn.com 域名

> 如果域名也托管在 Cloudflare，绑定最简单；如果在其他平台，需要配置 CNAME。

**域名在 Cloudflare 托管时：**

1. 进入 Pages 项目 → **Custom domains** → **Set up a custom domain**
2. 输入 `itcsdn.com`，点击 **Continue**
3. Cloudflare 自动配置 DNS，直接激活

**域名在其他平台（阿里云/腾讯云等）时：**

1. 同上添加自定义域名后，Cloudflare 会提供一条 CNAME 记录
2. 去域名注册商的 DNS 控制台，添加：
   ```
   类型:  CNAME
   名称:  @（或 www）
   值:    tech-open-hub.pages.dev
   ```
3. DNS 生效通常需要几分钟到几小时

---

## 方案二：Vercel

> ⚠️ 注意：国内新注册账号可能触发人工验证，需等待审核通过才能使用。

### 步骤

1. 访问 [vercel.com](https://vercel.com)，用 GitHub 账号登录
2. 点击 **Add New Project** → 导入 `tech-open-hub` 仓库
3. 构建配置保持默认（自动识别 Next.js）：
   - **Build Command**: `npm run build`
   - **Output Directory**: `out`
4. 点击 **Deploy**

### 绑定域名

在项目 → Settings → Domains 中添加 `itcsdn.com`，然后配置 DNS：
```
类型:  A
名称:  @
值:    76.76.21.21
```

---

## 方案三：GitHub Pages

利用 GitHub Actions 构建后发布到 GitHub Pages。

### 步骤

1. 在仓库 Settings → Pages 中，将 Source 设置为 **GitHub Actions**

2. 新建文件 `.github/workflows/deploy.yml`：

```yaml
name: 部署到 GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4

      - name: 配置 Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: 安装依赖
        run: npm ci

      - name: 构建
        run: npm run build

      - name: 上传静态文件
        uses: actions/upload-pages-artifact@v3
        with:
          path: out

      - name: 部署到 GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

3. 推送到 `main` 分支后自动触发部署

### 注意事项

- GitHub Pages 默认域名为 `https://<username>.github.io/<repo-name>/`
- 若部署在子路径下，需在 `next.config.mjs` 中添加 `basePath` 配置：
  ```js
  const nextConfig = {
    output: 'export',
    basePath: '/<repo-name>',
    images: { unoptimized: true },
  }
  ```

---

## 方案四：自托管（Nginx）

适合有自己服务器的场景。

### 本地构建

```bash
# 安装依赖
npm ci

# 构建静态文件（输出到 out/ 目录）
npm run build
```

### 上传文件

```bash
# 将 out/ 目录上传到服务器
scp -r out/ user@server:/var/www/tech-open-hub/
```

### Nginx 配置

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/tech-open-hub;
    index index.html;

    # 处理 Next.js 静态导出的路由
    location / {
        try_files $uri $uri.html $uri/ /index.html;
    }

    # 静态资源缓存
    location /_next/static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 数据更新

自托管时，GitHub Actions 无法自动触发服务器重新部署。可选方案：

- **手动部署**：定期拉取仓库并重新构建
- **Webhook**：在 GitHub 仓库添加 Webhook，推送时自动触发服务器脚本执行构建

---

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器（http://localhost:3000）
npm run dev

# 手动抓取 RSS 数据
npm run fetch

# 运行测试
npm test

# 本地构建预览
npm run build
npx serve out
```

---

## 环境要求

| 项目 | 版本要求 |
|------|---------|
| Node.js | >= 20 |
| npm | >= 10 |

---

## GitHub Actions 数据抓取

现有 `.github/workflows/fetch.yml` 每小时自动执行：

1. 抓取以下 RSS 源：
   - GitHub Explore（开源项目）
   - Hacker News（技术资讯）
   - Reddit/programming（技术资讯）
   - Reddit/MachineLearning（AI）
   - arXiv AI（AI 论文）
2. 去重后保留最新 200 条，写入 `data/articles.json`
3. 自动提交到 `main` 分支

> 可在 GitHub 仓库 Actions 页面手动触发该 Workflow。
