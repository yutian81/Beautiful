document.addEventListener('DOMContentLoaded', function() {
  // 自动解密：检查本地存储的密码
  const encryptedBlocks = document.querySelectorAll('.encrypted-block');
  
  encryptedBlocks.forEach(block => {
    const storageKey = `hexo-encrypt-${block.dataset.encrypted}`;
    const savedData = localStorage.getItem(storageKey);
    
    if (savedData) {
      try {
        const { password, expire } = JSON.parse(savedData);
        
        // 检查是否过期
        if (expire > Date.now()) {
          // 自动解密
          block.querySelector('.encrypt-input').value = password;
          setTimeout(() => handleDecrypt(block), 300);
        } else {
          // 过期则清除
          localStorage.removeItem(storageKey);
        }
      } catch (e) {
        console.error('Failed to parse saved data', e);
        localStorage.removeItem(storageKey);
      }
    }
  });

  // 事件委托处理解密
  document.body.addEventListener('click', function(e) {
    if (e.target.classList.contains('decrypt-btn')) {
      handleDecrypt(e.target.closest('.encrypted-block'));
    }
  });
  
  // 添加回车键支持
  document.body.addEventListener('keypress', function(e) {
    if (e.target.classList.contains('encrypt-input') && e.key === 'Enter') {
      handleDecrypt(e.target.closest('.encrypted-block'));
    }
  });

  // 在指定位置显示提示
  function showHint(block, message, type = 'info') {
    const hint = document.createElement('div');
    hint.className = `auto-decrypt-hint ${type}-hint`;
    hint.innerHTML = message;
    const inputGroup = block.querySelector('.encrypt-input-group');
    inputGroup.appendChild(hint);
  }

  // 清除提示
  function clearDecryptHints(block) {
    const hints = block.querySelectorAll('.auto-decrypt-hint');
    hints.forEach(hint => hint.remove());
  }

  function handleDecrypt(block) {
    if (!block) return;
    
    const encrypted = decodeURIComponent(block.dataset.encrypted);
    const input = block.querySelector('.encrypt-input').value;
    const resultArea = block.querySelector('.decrypted-content');
    const decryptResult = block.querySelector('.decrypt-result');
    
    // 确保结果区域可见
    decryptResult.style.display = 'block';
    // 清除所有提示信息
    clearDecryptHints(block);
    
    if (!input) {
      showHint(block, '⚠️ 请输入密码', 'error');
      return;
    }
    
    try {
      const bytes = CryptoJS.AES.decrypt(encrypted, input);
      const text = bytes.toString(CryptoJS.enc.Utf8);
      
      // 使用统一标识符验证
      const prefix = "HEXO_ENCRYPT_PREFIX|";
      const suffix = "|HEXO_ENCRYPT_SUFFIX";
      
      if (!text || text.indexOf(prefix) === -1 || text.indexOf(suffix) === -1) {
        throw new Error('解密失败');
      }
      
      // 提取实际内容
      const startIndex = text.indexOf(prefix) + prefix.length;
      const endIndex = text.indexOf(suffix);
      const actualContent = text.substring(startIndex, endIndex);
      
      // 使用 marked.parse() 渲染 Markdown
      resultArea.innerHTML = DOMPurify.sanitize(marked.parse(actualContent));
      block.classList.add('decrypted');
      
      // 存储密码到本地（有效期7天）
      const storageKey = `hexo-encrypt-${block.dataset.encrypted}`;
      const expireTime = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7天
      
      localStorage.setItem(storageKey, JSON.stringify({
        password: input,
        expire: expireTime
      }));
      
      // 添加自动解密提示  
      showHint(block, '✔️ 密码正确！7 天内自动解密', 'success');

    } catch (error) {
      showHint(block, '❌ 密码错误！请重试', 'error');
    }
  }
});
