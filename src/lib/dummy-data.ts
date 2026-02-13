// 대만 & 홍콩 ETF 시장 더미 데이터

export interface ETFRecord {
  id: string;
  ticker: string;
  name: string;
  market: "TW" | "HK";
  aum: number; // millions (local currency)
  flow1D: number;
  flow1W: number;
  flow1M: number;
  flow3M: number;
  flowYTD: number;
  price: number;
  priceChange1D: number;
  category: string;
  issuer: string;
}

export const twETFs: ETFRecord[] = [
  {
    id: "tw-1",
    ticker: "0050",
    name: "元大台灣50",
    market: "TW",
    aum: 432800,
    flow1D: 0.12,
    flow1W: 0.45,
    flow1M: 2.31,
    flow3M: 5.87,
    flowYTD: 8.42,
    price: 178.5,
    priceChange1D: 1.23,
    category: "大盤指數",
    issuer: "元大",
  },
  {
    id: "tw-2",
    ticker: "0056",
    name: "元大高股息",
    market: "TW",
    aum: 298500,
    flow1D: -0.08,
    flow1W: 0.22,
    flow1M: 1.15,
    flow3M: 3.42,
    flowYTD: 6.18,
    price: 38.92,
    priceChange1D: -0.45,
    category: "高配當",
    issuer: "元大",
  },
  {
    id: "tw-3",
    ticker: "00878",
    name: "國泰永續高股息",
    market: "TW",
    aum: 312400,
    flow1D: 0.34,
    flow1W: 1.12,
    flow1M: 4.56,
    flow3M: 8.92,
    flowYTD: 14.33,
    price: 22.15,
    priceChange1D: 0.68,
    category: "高配當",
    issuer: "國泰",
  },
  {
    id: "tw-4",
    ticker: "00919",
    name: "群益台灣精選高息",
    market: "TW",
    aum: 245600,
    flow1D: 0.56,
    flow1W: 1.87,
    flow1M: 6.23,
    flow3M: 12.45,
    flowYTD: 18.67,
    price: 24.88,
    priceChange1D: 1.05,
    category: "高配當",
    issuer: "群益",
  },
  {
    id: "tw-5",
    ticker: "00929",
    name: "復華台灣科技優息",
    market: "TW",
    aum: 198700,
    flow1D: 0.78,
    flow1W: 2.34,
    flow1M: 8.91,
    flow3M: 15.67,
    flowYTD: 22.34,
    price: 19.56,
    priceChange1D: 1.87,
    category: "科技",
    issuer: "復華",
  },
  {
    id: "tw-6",
    ticker: "006208",
    name: "富邦台50",
    market: "TW",
    aum: 156300,
    flow1D: 0.09,
    flow1W: 0.31,
    flow1M: 1.78,
    flow3M: 4.23,
    flowYTD: 7.11,
    price: 95.4,
    priceChange1D: 0.92,
    category: "大盤指數",
    issuer: "富邦",
  },
  {
    id: "tw-7",
    ticker: "00881",
    name: "國泰台灣5G+",
    market: "TW",
    aum: 87600,
    flow1D: -0.23,
    flow1W: -0.67,
    flow1M: -1.45,
    flow3M: 2.11,
    flowYTD: 3.45,
    price: 18.23,
    priceChange1D: -0.34,
    category: "科技",
    issuer: "國泰",
  },
  {
    id: "tw-8",
    ticker: "00940",
    name: "元大台灣價值高息",
    market: "TW",
    aum: 187400,
    flow1D: 0.45,
    flow1W: 1.56,
    flow1M: 5.67,
    flow3M: 9.88,
    flowYTD: 15.23,
    price: 10.82,
    priceChange1D: 0.56,
    category: "高配當",
    issuer: "元大",
  },
];

export const hkETFs: ETFRecord[] = [
  {
    id: "hk-1",
    ticker: "2800",
    name: "Tracker Fund of Hong Kong",
    market: "HK",
    aum: 128900,
    flow1D: 0.15,
    flow1W: 0.42,
    flow1M: 1.89,
    flow3M: 4.56,
    flowYTD: 7.23,
    price: 19.82,
    priceChange1D: 0.87,
    category: "Broad Market",
    issuer: "State Street",
  },
  {
    id: "hk-2",
    ticker: "2823",
    name: "iShares FTSE A50 China",
    market: "HK",
    aum: 96400,
    flow1D: 0.67,
    flow1W: 2.13,
    flow1M: 7.45,
    flow3M: 14.23,
    flowYTD: 19.87,
    price: 14.56,
    priceChange1D: 2.34,
    category: "China A-Share",
    issuer: "iShares",
  },
  {
    id: "hk-3",
    ticker: "3067",
    name: "iShares Hang Seng TECH",
    market: "HK",
    aum: 45600,
    flow1D: 1.23,
    flow1W: 3.45,
    flow1M: 12.34,
    flow3M: 22.56,
    flowYTD: 31.45,
    price: 4.89,
    priceChange1D: 3.12,
    category: "Tech",
    issuer: "iShares",
  },
  {
    id: "hk-4",
    ticker: "3033",
    name: "CSOP Hang Seng TECH",
    market: "HK",
    aum: 38200,
    flow1D: 0.98,
    flow1W: 2.87,
    flow1M: 10.56,
    flow3M: 19.78,
    flowYTD: 28.34,
    price: 5.12,
    priceChange1D: 2.89,
    category: "Tech",
    issuer: "CSOP",
  },
  {
    id: "hk-5",
    ticker: "9988",
    name: "Alibaba Group",
    market: "HK",
    aum: 0,
    flow1D: 0,
    flow1W: 0,
    flow1M: 0,
    flow3M: 0,
    flowYTD: 0,
    price: 118.5,
    priceChange1D: 4.56,
    category: "Individual",
    issuer: "-",
  },
  {
    id: "hk-6",
    ticker: "2828",
    name: "Hang Seng China Enterprises",
    market: "HK",
    aum: 72300,
    flow1D: 0.34,
    flow1W: 1.23,
    flow1M: 4.67,
    flow3M: 9.45,
    flowYTD: 13.78,
    price: 83.45,
    priceChange1D: 1.56,
    category: "China H-Share",
    issuer: "Hang Seng",
  },
  {
    id: "hk-7",
    ticker: "3188",
    name: "ChinaAMC CSI 300",
    market: "HK",
    aum: 54800,
    flow1D: 0.45,
    flow1W: 1.67,
    flow1M: 5.89,
    flow3M: 11.23,
    flowYTD: 16.45,
    price: 42.3,
    priceChange1D: 1.78,
    category: "China A-Share",
    issuer: "ChinaAMC",
  },
  {
    id: "hk-8",
    ticker: "3040",
    name: "Samsung CSI China Dragon",
    market: "HK",
    aum: 28900,
    flow1D: 0.89,
    flow1W: 2.45,
    flow1M: 8.12,
    flow3M: 16.78,
    flowYTD: 23.56,
    price: 8.67,
    priceChange1D: 2.45,
    category: "China Thematic",
    issuer: "Samsung",
  },
];

export const allETFs = [...twETFs, ...hkETFs];

// 시계열 더미 데이터 생성 (최근 30일)
export function generateTimeSeriesData(days: number = 30) {
  const data = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toISOString().split("T")[0],
      twAUM: 1850000 + Math.random() * 120000 - 60000 + i * 1200,
      hkAUM: 465000 + Math.random() * 45000 - 22000 + i * 800,
      twFlow: Math.random() * 8000 - 2000,
      hkFlow: Math.random() * 3000 - 800,
      twVolume: Math.random() * 50000 + 20000,
      hkVolume: Math.random() * 18000 + 8000,
    });
  }
  return data;
}

// 카테고리별 AUM 분포
export function getCategoryDistribution(market: "TW" | "HK") {
  const etfs = market === "TW" ? twETFs : hkETFs;
  const categories: Record<string, number> = {};
  etfs.forEach((etf) => {
    if (etf.aum > 0) {
      categories[etf.category] = (categories[etf.category] || 0) + etf.aum;
    }
  });
  return Object.entries(categories).map(([name, value]) => ({ name, value }));
}

// 발행사별 AUM 집계
export function getIssuerDistribution(market: "TW" | "HK") {
  const etfs = market === "TW" ? twETFs : hkETFs;
  const issuers: Record<string, number> = {};
  etfs.forEach((etf) => {
    if (etf.aum > 0) {
      issuers[etf.issuer] = (issuers[etf.issuer] || 0) + etf.aum;
    }
  });
  return Object.entries(issuers)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

// 시장 요약 통계
export function getMarketSummary(market: "TW" | "HK") {
  const etfs = market === "TW" ? twETFs : hkETFs;
  const activeETFs = etfs.filter((e) => e.aum > 0);
  const totalAUM = activeETFs.reduce((s, e) => s + e.aum, 0);
  const avgFlow1M =
    activeETFs.reduce((s, e) => s + e.flow1M, 0) / activeETFs.length;
  const topInflow = [...activeETFs].sort((a, b) => b.flow1M - a.flow1M)[0];
  const topOutflow = [...activeETFs].sort((a, b) => a.flow1M - b.flow1M)[0];

  return {
    totalAUM,
    etfCount: activeETFs.length,
    avgFlow1M,
    topInflow,
    topOutflow,
    currency: market === "TW" ? "TWD" : "HKD",
    currencySymbol: market === "TW" ? "NT$" : "HK$",
  };
}
