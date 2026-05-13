[中文](#chinese) | [English](#english)

<a id="chinese"></a>

# Codex 凭据导出器 / Codex Credentials Exporter

> 一个用于从浏览器当前 `chatgpt.com` 登录态中提取 OAuth `access_token`、生成 Codex CLI `auth.json` 并复制到剪贴板的 Chrome 扩展。
>
> A Chrome extension that extracts the OAuth `access_token` from the current `chatgpt.com` browser session, generates a Codex CLI `auth.json`, and copies it to the clipboard.

---

## 中文简介

### 功能特性

- 跳过 Codex 登录阶段的手机号校验
- 从当前浏览器登录态读取 `chatgpt.com/api/auth/session`
- 自动提取 `access_token`
- 生成可用于 Codex CLI 的 `auth.json`
- 一键复制到剪贴板
- 在弹窗中预览生成结果
- 显示账号、套餐和过期时间等信息

### 截图

#### 1. 安装扩展

![安装扩展截图](./docs/images/install-extension.png)

#### 2. 扩展弹窗界面

![扩展弹窗截图](./docs/images/popup-ui.png)

#### 3. 生成并复制 auth.json

![使用结果截图](./docs/images/auth-result.png)

### 安装方法

1. 克隆或下载本仓库
2. 打开 Chrome / Edge 浏览器，进入扩展管理页面：
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
3. 打开右上角的“开发者模式”
4. 点击“加载已解压的扩展程序”
5. 选择本仓库目录

### 使用方法

1. 先在浏览器中登录 `https://chatgpt.com`
2. 点击浏览器工具栏中的扩展图标
3. 点击 **“抓取并复制 auth.json”**
4. 扩展会读取当前会话并生成 `auth.json`
5. 将复制到剪贴板的内容粘贴到：

```bash
~/.codex/auth.json
```

### 注意事项

- `auth.json` 包含敏感凭据，请勿泄露给他人
- 当前生成结果不包含 `refresh_token`
- 当 `access_token` 过期后，需要重新在扩展中执行一次导出
- 使用前请确保当前浏览器中的 `chatgpt.com` 登录状态有效

### License

本项目采用 Apache License 2.0，详见 [LICENSE](./LICENSE)。

---

<a id="english"></a>

## English

### Features

- Skip phone number verification during Codex login
- Reads the current `chatgpt.com/api/auth/session` browser session
- Extracts the OAuth `access_token`
- Generates a Codex CLI compatible `auth.json`
- Copies the result to the clipboard with one click
- Shows a preview inside the extension popup
- Displays account, plan, and expiration details

### Screenshots

#### 1. Install the extension

![Install extension screenshot](./docs/images/install-extension.png)

#### 2. Extension popup

![Extension popup screenshot](./docs/images/popup-ui.png)

#### 3. Generated auth.json result

![Generated auth result screenshot](./docs/images/auth-result.png)

### Installation

1. Clone or download this repository
2. Open the browser extension management page:
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
3. Enable **Developer mode**
4. Click **Load unpacked**
5. Select this repository folder

### Usage

1. Sign in to `https://chatgpt.com` in your browser
2. Click the extension icon in the browser toolbar
3. Click **“抓取并复制 auth.json”**
4. The extension will read the current session and generate `auth.json`
5. Paste the copied content into:

```bash
~/.codex/auth.json
```

### Notes

- The generated `auth.json` contains sensitive credentials; do not share it
- The output does not include a `refresh_token`
- After the `access_token` expires, run the export again from the extension
- Make sure your `chatgpt.com` session is valid before using the extension

### License

This project is licensed under the Apache License 2.0. See [LICENSE](./LICENSE) for details.
