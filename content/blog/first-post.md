---
title: Eleventy 入门指南
description: 快速上手 Eleventy 静态网站生成器，了解基本概念和项目结构。
date: 2026-08-01
tags:
  - Eleventy
  - 前端开发
---

Eleventy（11ty）是一个简洁的静态网站生成器，设计理念是快速、灵活、易用。本文将带你了解它的基础知识。

## 为什么选择 Eleventy？

与其他静态网站生成器不同，Eleventy 不强制你使用特定的 JavaScript 框架。它支持多种模板语言，默认不产生任何客户端 JavaScript——你的网站就是纯粹的 HTML 和 CSS，开箱即快。

## 核心概念

### 模板

Eleventy 支持多种模板语言：

- **Markdown** —— 适合撰写内容
- **Nunjucks** —— 强大的模板引擎，支持布局和引用
- **Liquid** —— 与 Nunjucks 类似，广泛使用
- **JavaScript** —— 用于动态数据

### 布局

布局是定义页面结构的包装模板，通过简单的继承链工作：

```
post.njk → base.njk
```

### 集合

集合用于组织相关内容。博客文章就是一个集合——任何带有 `posts` 标签的文件会自动加入博客集合。

## 快速开始

```bash
npm install
npm start
```

就这样！你的网站已在 `http://localhost:8080` 运行。开发服务器支持热重载，修改内容会即时显示。

> **提示**：首先编辑 `_data/metadata.js`，修改网站标题、描述和作者信息。

## 下一步

熟悉基础之后，可以尝试添加自定义过滤器、创建新集合，或接入无头 CMS。Eleventy 社区友好，文档完善。

祝你构建愉快！
