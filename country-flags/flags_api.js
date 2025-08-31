function toLocaleFlag(countryCode) {
  if (!countryCode || countryCode === 'Unknown') {
    return '<img src="https://flagcdn.com/16x12/un.png" alt="Unknown" class="flag-img" style="vertical-align:middle;margin-right:4px;">';
  }

  // 特殊地区映射（可自行扩展）
  const specialCases = {
    EU: 'eu',
    UN: 'un',
    HK: 'hk',
    MO: 'mo',
    TW: 'tw'
  };

  const normalizedCode = countryCode.toUpperCase();
  const flagCode = specialCases[normalizedCode] || normalizedCode.toLowerCase();
  return `<img src="https://flagcdn.com/16x12/${flagCode}.png" alt="${normalizedCode}" class="flag-img" style="vertical-align:middle;margin-right:4px;">`;
}
