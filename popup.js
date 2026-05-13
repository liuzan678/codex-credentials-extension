(function initializePopup(){
  'use strict';

  const grabButton = document.getElementById('grabButton');
  const status = document.getElementById('status');
  const preview = document.getElementById('preview');
  const previewContent = document.getElementById('previewContent');
  const builder = window.CodexCredentialBuilder;

  function setStatus(message, kind = 'hint') {
    status.textContent = message;
    status.className = kind;
  }

  function setBusy(isBusy) {
    grabButton.disabled = isBusy;
    grabButton.textContent = isBusy ? '正在抓取...' : '抓取并复制 auth.json';
  }

  function formatExpiry(iso) {
    if (!iso) return '未知';
    const ms = Date.parse(iso) - Date.now();
    if (Number.isNaN(ms)) return iso;
    if (ms <= 0) return `${iso}(已过期)`;
    const days = ms / 86400000;
    if (days >= 1) return `${iso}(约 ${days.toFixed(1)} 天后过期)`;
    const hours = ms / 3600000;
    if (hours >= 1) return `${iso}(约 ${hours.toFixed(1)} 小时后过期)`;
    const minutes = Math.max(1, Math.floor(ms / 60000));
    return `${iso}(约 ${minutes} 分钟后过期)`;
  }

  async function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const fallback = document.createElement('textarea');
    fallback.value = text;
    fallback.style.position = 'fixed';
    fallback.style.opacity = '0';
    document.body.appendChild(fallback);
    fallback.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(fallback);

    if (!ok) {
      throw new Error('剪贴板写入失败,请手动复制下方预览内容。');
    }
  }

  async function grabAndCopyAuth() {
    setBusy(true);
    setStatus('正在请求 chatgpt.com/api/auth/session ...', 'hint');
    preview.hidden = true;

    try {
      const result = await builder.buildFromBrowser();
      const json = JSON.stringify(result.auth, null, 2);
      previewContent.textContent = json;
      preview.hidden = false;
      await copyToClipboard(json);

      const lines = [
        '已复制到剪贴板,粘贴覆盖到 ~/.codex/auth.json 即可。',
        `账号: ${result.meta.email || '(未知)'}  ·  套餐: ${result.meta.planType || '(未知)'}`,
        `account_id: ${result.auth.tokens.account_id}`,
        `access_token 过期: ${formatExpiry(result.meta.accessTokenExpiresAt)}`,
        `session cookie 过期: ${formatExpiry(result.meta.sessionExpires)}`,
        '提示: 没有 refresh_token,access_token 过期后请再点一次本按钮。',
      ];
      setStatus(lines.join('\n'), 'ok');
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setStatus(message, 'error');
    } finally {
      setBusy(false);
    }
  }

  grabButton.addEventListener('click', grabAndCopyAuth);
})();
