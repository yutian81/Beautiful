/*!
 * CountryFlags.js v1.0.0
 * 提供国家代码 -> 国旗Emoji映射 & API
 * 分类：中北美、南美、欧洲、亚洲、大洋洲、非洲
 */

(function (global) {
  const countryFlags = {
    // ===== 中北美 =====
    'US': { emoji: '🇺🇸', name: '美国', region: 'north_central_america' },
    'CA': { emoji: '🇨🇦', name: '加拿大', region: 'north_central_america' },
    'MX': { emoji: '🇲🇽', name: '墨西哥', region: 'north_central_america' },
    'CU': { emoji: '🇨🇺', name: '古巴', region: 'north_central_america' },
    'JM': { emoji: '🇯🇲', name: '牙买加', region: 'north_central_america' },
    'PA': { emoji: '🇵🇦', name: '巴拿马', region: 'north_central_america' },
    'CR': { emoji: '🇨🇷', name: '哥斯达黎加', region: 'north_central_america' },
    'GT': { emoji: '🇬🇹', name: '危地马拉', region: 'north_central_america' },
    'HN': { emoji: '🇭🇳', name: '洪都拉斯', region: 'north_central_america' },
    'NI': { emoji: '🇳🇮', name: '尼加拉瓜', region: 'north_central_america' },
    'SV': { emoji: '🇸🇻', name: '萨尔瓦多', region: 'north_central_america' },
    'TT': { emoji: '🇹🇹', name: '特立尼达和多巴哥', region: 'north_central_america' },

    // ===== 南美 =====
    'BR': { emoji: '🇧🇷', name: '巴西', region: 'south_america' },
    'AR': { emoji: '🇦🇷', name: '阿根廷', region: 'south_america' },
    'CL': { emoji: '🇨🇱', name: '智利', region: 'south_america' },
    'CO': { emoji: '🇨🇴', name: '哥伦比亚', region: 'south_america' },
    'PE': { emoji: '🇵🇪', name: '秘鲁', region: 'south_america' },
    'VE': { emoji: '🇻🇪', name: '委内瑞拉', region: 'south_america' },
    'UY': { emoji: '🇺🇾', name: '乌拉圭', region: 'south_america' },
    'PY': { emoji: '🇵🇾', name: '巴拉圭', region: 'south_america' },
    'BO': { emoji: '🇧🇴', name: '玻利维亚', region: 'south_america' },
    'EC': { emoji: '🇪🇨', name: '厄瓜多尔', region: 'south_america' },
    'GY': { emoji: '🇬🇾', name: '圭亚那', region: 'south_america' },
    'SR': { emoji: '🇸🇷', name: '苏里南', region: 'south_america' },

    // ===== 欧洲 =====
    'GB': { emoji: '🇬🇧', name: '英国', region: 'europe' },
    'FR': { emoji: '🇫🇷', name: '法国', region: 'europe' },
    'DE': { emoji: '🇩🇪', name: '德国', region: 'europe' },
    'IT': { emoji: '🇮🇹', name: '意大利', region: 'europe' },
    'ES': { emoji: '🇪🇸', name: '西班牙', region: 'europe' },
    'RU': { emoji: '🇷🇺', name: '俄罗斯', region: 'europe' },
    'NL': { emoji: '🇳🇱', name: '荷兰', region: 'europe' },
    'SE': { emoji: '🇸🇪', name: '瑞典', region: 'europe' },
    'NO': { emoji: '🇳🇴', name: '挪威', region: 'europe' },
    'FI': { emoji: '🇫🇮', name: '芬兰', region: 'europe' },
    'DK': { emoji: '🇩🇰', name: '丹麦', region: 'europe' },
    'IE': { emoji: '🇮🇪', name: '爱尔兰', region: 'europe' },
    'PT': { emoji: '🇵🇹', name: '葡萄牙', region: 'europe' },
    'CH': { emoji: '🇨🇭', name: '瑞士', region: 'europe' },
    'BE': { emoji: '🇧🇪', name: '比利时', region: 'europe' },
    'AT': { emoji: '🇦🇹', name: '奥地利', region: 'europe' },
    'GR': { emoji: '🇬🇷', name: '希腊', region: 'europe' },
    'TR': { emoji: '🇹🇷', name: '土耳其', region: 'europe' },
    'PL': { emoji: '🇵🇱', name: '波兰', region: 'europe' },
    'UA': { emoji: '🇺🇦', name: '乌克兰', region: 'europe' },
    'CZ': { emoji: '🇨🇿', name: '捷克', region: 'europe' },
    'HU': { emoji: '🇭🇺', name: '匈牙利', region: 'europe' },

    // ===== 亚洲 =====
    'CN': { emoji: '🇨🇳', name: '中国', region: 'asia' },
    'HK': { emoji: '🇭🇰', name: '中国香港', region: 'asia' },
    'MO': { emoji: '🇲🇴', name: '中国澳门', region: 'asia' },
    'TW': { emoji: '🇹🇼', name: '中国台湾', region: 'asia' },
    'JP': { emoji: '🇯🇵', name: '日本', region: 'asia' },
    'KR': { emoji: '🇰🇷', name: '韩国', region: 'asia' },
    'KP': { emoji: '🇰🇵', name: '朝鲜', region: 'asia' },
    'IN': { emoji: '🇮🇳', name: '印度', region: 'asia' },
    'PK': { emoji: '🇵🇰', name: '巴基斯坦', region: 'asia' },
    'BD': { emoji: '🇧🇩', name: '孟加拉国', region: 'asia' },
    'IR': { emoji: '🇮🇷', name: '伊朗', region: 'asia' },
    'IQ': { emoji: '🇮🇶', name: '伊拉克', region: 'asia' },
    'IL': { emoji: '🇮🇱', name: '以色列', region: 'asia' },
    'SA': { emoji: '🇸🇦', name: '沙特', region: 'asia' },
    'AE': { emoji: '🇦🇪', name: '阿联酋', region: 'asia' },
    'QA': { emoji: '🇶🇦', name: '卡塔尔', region: 'asia' },
    'KW': { emoji: '🇰🇼', name: '科威特', region: 'asia' },
    'OM': { emoji: '🇴🇲', name: '阿曼', region: 'asia' },
    'NP': { emoji: '🇳🇵', name: '尼泊尔', region: 'asia' },
    'LK': { emoji: '🇱🇰', name: '斯里兰卡', region: 'asia' },
    'MM': { emoji: '🇲🇲', name: '缅甸', region: 'asia' },
    'TH': { emoji: '🇹🇭', name: '泰国', region: 'asia' },
    'VN': { emoji: '🇻🇳', name: '越南', region: 'asia' },
    'PH': { emoji: '🇵🇭', name: '菲律宾', region: 'asia' },
    'MY': { emoji: '🇲🇾', name: '马来西亚', region: 'asia' },
    'SG': { emoji: '🇸🇬', name: '新加坡', region: 'asia' },
    'ID': { emoji: '🇮🇩', name: '印尼', region: 'asia' },

    // ===== 大洋洲 =====
    'AU': { emoji: '🇦🇺', name: '澳大利亚', region: 'oceania' },
    'NZ': { emoji: '🇳🇿', name: '新西兰', region: 'oceania' },
    'FJ': { emoji: '🇫🇯', name: '斐济', region: 'oceania' },
    'WS': { emoji: '🇼🇸', name: '萨摩亚', region: 'oceania' },
    'TO': { emoji: '🇹🇴', name: '汤加', region: 'oceania' },

    // ===== 非洲 =====
    'EG': { emoji: '🇪🇬', name: '埃及', region: 'africa' },
    'ZA': { emoji: '🇿🇦', name: '南非', region: 'africa' },
    'NG': { emoji: '🇳🇬', name: '尼日利亚', region: 'africa' },
    'KE': { emoji: '🇰🇪', name: '肯尼亚', region: 'africa' },
    'ET': { emoji: '🇪🇹', name: '埃塞俄比亚', region: 'africa' },
    'GH': { emoji: '🇬🇭', name: '加纳', region: 'africa' },
    'DZ': { emoji: '🇩🇿', name: '阿尔及利亚', region: 'africa' },
    'MA': { emoji: '🇲🇦', name: '摩洛哥', region: 'africa' },
    'TN': { emoji: '🇹🇳', name: '突尼斯', region: 'africa' },
    'SN': { emoji: '🇸🇳', name: '塞内加尔', region: 'africa' },
    'CM': { emoji: '🇨🇲', name: '喀麦隆', region: 'africa' },
  };

  // ===== 公共API =====
  const flags = {
    // 返回国旗 emoji
    get: function(code){
      const c = code.toUpperCase();
      return countryFlags[c]?.emoji || '🌐';
    },

    // 返回完整信息
    info: function(code){
      const c = code.toUpperCase();
      const info = countryFlags[c];
      if(!info) return null;
      return {
        emoji: info.emoji,
        code: c,
        name: info.name,
        region: info.region
      };
    },

    // 根据大洲获取所有国家代码
    region: function(region){
      return Object.keys(countryFlags).filter(c => countryFlags[c].region === region);
    },

    // 搜索国家（支持中文名/代码）
    search: function(query){
      const q = query.trim();
      return Object.keys(countryFlags).filter(c =>
        c.toUpperCase().includes(q.toUpperCase()) ||
        countryFlags[c].name.includes(q)
      );
    }
  };

  // 暴露到全局
  global.flags = flags;

})(typeof window !== "undefined" ? window : this);
