// 获取IP地址的国家、城市、ASN信息
async function ipinfo_query(vpsjson) {
  const IP_API = [
    {
      name: 'ipinfo.io',
      urlBuilder: (ip) => `https://ipinfo.io/${ip}/json`,
      dataParser: (data) => ({
        country_code: data.country || 'Unknown',
        city: data.city || 'Unknown',
        asn: (data.org?.split(' ')[0] || '').startsWith('AS') 
          ? data.org.split(' ')[0] 
          : 'Unknown'
      })
    },
    {
      name: 'ipapi.is',
      urlBuilder: (ip) => `https://api.ipapi.is/?q=${ip}`,
      dataParser: (data) => ({
        country_code: data.location?.country_code?.toUpperCase() ?? 'Unknown',
        city: data.location?.city ?? 'Unknown',
        asn: data.asn?.asn ?? 'Unknown'
      })
    },
    {
      name: 'ip.beck8',
      urlBuilder: (ip) => `https://ip.122911.xyz/api/ipinfo?ip=${ip}`,
      dataParser: (data) => ({
        country_code: data.country_code?.toUpperCase() ?? 'Unknown',
        city: data.city ?? 'Unknown',
        asn: data.asn ? 'AS' + data.asn : 'Unknown'
      })
    }
  ];

  const ipjson = await Promise.all(
    vpsjson.map(async ({ ip }) => {
      const finalData = { ip, country_code: 'Unknown', city: 'Unknown', asn: 'Unknown' };

      for (const provider of IP_API) {
        try {
          const data = await fetchIPInfo(ip, provider);
          if (!data) continue;

          // 逐字段更新，只更新 Unknown 的字段
          if (finalData.country_code === 'Unknown' && data.country_code !== 'Unknown') {
            finalData.country_code = data.country_code;
          }
          if (finalData.city === 'Unknown' && data.city !== 'Unknown') {
            finalData.city = data.city;
          }
          if (finalData.asn === 'Unknown' && data.asn !== 'Unknown') {
            finalData.asn = data.asn;
          }

          // 如果三个字段都已获取到有效值，就可以提前结束循环
          if (finalData.country_code !== 'Unknown' &&
              finalData.city !== 'Unknown' &&
              finalData.asn !== 'Unknown') {
            break;
          }
        } catch (error) {
          continue; // 单个 provider 失败，继续尝试下一个
        }
      }
      
      return finalData;
    })
  );
  return ipjson;
}
