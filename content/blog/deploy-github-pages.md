---
title: 如何将静态网站部署到 GitHub Pages
description: 使用 GitHub Actions 自动构建和部署 Eleventy 静态网站到 GitHub Pages 的完整教程。
date: 2026-08-10
tags:
  - 运维
  - GitHub
  - 教程
---

将静态网站部署到 GitHub Pages 完全免费、快速且稳定。本文介绍如何使用 GitHub Actions 实现自动部署。

## 为什么选择 GitHub Pages？

- 公开仓库**免费托管**
- **自动 HTTPS**，支持自定义域名
- **内置 CI/CD**，通过 GitHub Actions 实现
- **全球 CDN**，访问速度快

## 工作原理

部署流程非常简单：

1. 将代码推送到 `main` 分支
2. GitHub Actions 自动运行构建命令
3. 生成的静态文件部署到 GitHub Pages

## 配置 GitHub Actions

在项目根目录创建 `.github/workflows/gh-pages.yml`：

```yaml
name: 部署到 GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run build-ghpages
      - uses: actions/upload-pages-artifact@v3

  deploy:
    needs: build
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    steps:
      - uses: actions/deploy-pages@v4
```

## 配置仓库

推送工作流文件之后：

1. 进入 **Settings → Pages**
2. 在 **Build and Deployment** 中，选择 **GitHub Actions** 作为来源
3. 推送到 `main` 分支——网站会自动部署

## 自定义域名（可选）

如需使用自己的域名：

1. 在 `public/` 目录下新建 `CNAME` 文件，写入你的域名
2. 在域名提供商处配置 DNS，添加 CNAME 记录指向 `你的用户名.github.io`
3. 在 Pages 设置中开启 HTTPS

---

只需这几步就完成了。每次推送到 `main` 分支都会触发自动构建和部署——你的博客始终保持在最新状态。
