import { createClient } from "@/lib/supabase/client";

export interface ETFRecord {
  id: string;
  ticker: string;
  name: string;
  market: "TW" | "HK";
  aum: number;
  flow_1d: number;
  flow_1w: number;
  flow_1m: number;
  flow_3m: number;
  flow_ytd: number;
  price: number;
  price_change_1d: number;
  category: string;
  issuer: string;
}

export interface TimeSeriesRecord {
  date: string;
  tw_aum: number;
  hk_aum: number;
  tw_flow: number;
  hk_flow: number;
  tw_volume: number;
  hk_volume: number;
}

export async function fetchETFs(market?: "TW" | "HK") {
  const supabase = createClient();
  let query = supabase.from("etfs").select("*").order("aum", { ascending: false });
  if (market) query = query.eq("market", market);
  const { data, error } = await query;
  if (error) throw error;
  return data as ETFRecord[];
}

export async function fetchTimeSeries() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("etf_timeseries")
    .select("*")
    .order("date", { ascending: true });
  if (error) throw error;
  return data as TimeSeriesRecord[];
}

// 카테고리별 AUM 분포
export function getCategoryDistribution(etfs: ETFRecord[]) {
  const categories: Record<string, number> = {};
  etfs.forEach((etf) => {
    if (etf.aum > 0) {
      categories[etf.category] = (categories[etf.category] || 0) + etf.aum;
    }
  });
  return Object.entries(categories).map(([name, value]) => ({ name, value }));
}

// 발행사별 AUM 집계
export function getIssuerDistribution(etfs: ETFRecord[]) {
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
export function getMarketSummary(etfs: ETFRecord[]) {
  const activeETFs = etfs.filter((e) => e.aum > 0);
  const totalAUM = activeETFs.reduce((s, e) => s + e.aum, 0);
  const avgFlow1M =
    activeETFs.length > 0
      ? activeETFs.reduce((s, e) => s + e.flow_1m, 0) / activeETFs.length
      : 0;
  const topInflow = [...activeETFs].sort((a, b) => b.flow_1m - a.flow_1m)[0];
  const topOutflow = [...activeETFs].sort((a, b) => a.flow_1m - b.flow_1m)[0];

  return {
    totalAUM,
    etfCount: activeETFs.length,
    avgFlow1M,
    topInflow,
    topOutflow,
  };
}
