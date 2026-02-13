"use client";

import { useEffect, useState } from "react";
import { StatCard } from "@/components/stat-card";
import { AUMAreaChart, FlowBarChart, CategoryPieChart } from "@/components/charts";
import { ETFTable } from "@/components/etf-table";
import {
  fetchETFs,
  fetchTimeSeries,
  getMarketSummary,
  getCategoryDistribution,
  type ETFRecord,
  type TimeSeriesRecord,
} from "@/lib/queries";
import { TrendingUp, BarChart3, Layers, Activity } from "lucide-react";

export default function OverviewPage() {
  const [allETFs, setAllETFs] = useState<ETFRecord[]>([]);
  const [timeSeries, setTimeSeries] = useState<TimeSeriesRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchETFs(), fetchTimeSeries()])
      .then(([etfs, ts]) => {
        setAllETFs(etfs);
        setTimeSeries(ts);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-border-primary border-t-accent-amber" />
      </div>
    );
  }

  const twETFs = allETFs.filter((e) => e.market === "TW");
  const hkETFs = allETFs.filter((e) => e.market === "HK");
  const twSummary = getMarketSummary(twETFs);
  const hkSummary = getMarketSummary(hkETFs);
  const twCategories = getCategoryDistribution(twETFs);
  const hkCategories = getCategoryDistribution(hkETFs);

  const topInflowETFs = [...allETFs]
    .filter((e) => e.aum > 0)
    .sort((a, b) => b.flow_1m - a.flow_1m)
    .slice(0, 5);

  const chartData = timeSeries.map((d) => ({
    date: d.date,
    twAUM: d.tw_aum,
    hkAUM: d.hk_aum,
    twFlow: d.tw_flow,
    hkFlow: d.hk_flow,
  }));

  return (
    <div className="space-y-8">
      <div className="animate-fade-in-up">
        <h1 className="font-display text-4xl text-text-primary">
          Market Overview
        </h1>
        <p className="mt-1 font-mono text-sm text-text-muted">
          Taiwan & Hong Kong ETF Markets — Real-time analytics
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard
          title="TW Total AUM"
          value={`NT$${(twSummary.totalAUM / 1000000).toFixed(1)}T`}
          subtitle={`${twSummary.etfCount} ETFs tracked`}
          change={twSummary.avgFlow1M}
          icon={<TrendingUp size={18} />}
          delay={1}
        />
        <StatCard
          title="HK Total AUM"
          value={`HK$${(hkSummary.totalAUM / 1000).toFixed(0)}B`}
          subtitle={`${hkSummary.etfCount} ETFs tracked`}
          change={hkSummary.avgFlow1M}
          icon={<BarChart3 size={18} />}
          delay={2}
        />
        {twSummary.topInflow && (
          <StatCard
            title="Top TW Inflow"
            value={twSummary.topInflow.ticker}
            subtitle={twSummary.topInflow.name}
            change={twSummary.topInflow.flow_1m}
            icon={<Activity size={18} />}
            delay={3}
          />
        )}
        {hkSummary.topInflow && (
          <StatCard
            title="Top HK Inflow"
            value={hkSummary.topInflow.ticker}
            subtitle={hkSummary.topInflow.name}
            change={hkSummary.topInflow.flow_1m}
            icon={<Layers size={18} />}
            delay={4}
          />
        )}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="animate-fade-in-up delay-3 rounded-xl border border-border-primary bg-bg-card p-6">
          <h3 className="mb-1 font-body text-sm font-medium text-text-primary">
            AUM Trend
          </h3>
          <p className="mb-4 font-mono text-[10px] text-text-muted">
            30-day total AUM (millions)
          </p>
          <AUMAreaChart
            data={chartData}
            dataKey1="twAUM"
            dataKey2="hkAUM"
            name1="Taiwan"
            name2="Hong Kong"
          />
        </div>

        <div className="animate-fade-in-up delay-4 rounded-xl border border-border-primary bg-bg-card p-6">
          <h3 className="mb-1 font-body text-sm font-medium text-text-primary">
            Daily Fund Flows
          </h3>
          <p className="mb-4 font-mono text-[10px] text-text-muted">
            Net inflow/outflow (millions)
          </p>
          <FlowBarChart
            data={chartData}
            dataKey1="twFlow"
            dataKey2="hkFlow"
            name1="TW Flow"
            name2="HK Flow"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="animate-fade-in-up delay-5 rounded-xl border border-border-primary bg-bg-card p-6">
          <h3 className="mb-1 font-body text-sm font-medium text-text-primary">
            TW Category Distribution
          </h3>
          <p className="mb-4 font-mono text-[10px] text-text-muted">
            AUM by category
          </p>
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <CategoryPieChart data={twCategories} />
            </div>
            <div className="space-y-2">
              {twCategories.map((c, i) => (
                <div key={c.name} className="flex items-center gap-2">
                  <div
                    className="h-2.5 w-2.5 rounded-sm"
                    style={{
                      backgroundColor: ["#c9963a", "#3ecf8e", "#60a5fa", "#ef5350", "#a78bfa"][i % 5],
                    }}
                  />
                  <span className="font-mono text-[11px] text-text-secondary">
                    {c.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="animate-fade-in-up delay-6 rounded-xl border border-border-primary bg-bg-card p-6">
          <h3 className="mb-1 font-body text-sm font-medium text-text-primary">
            HK Category Distribution
          </h3>
          <p className="mb-4 font-mono text-[10px] text-text-muted">
            AUM by category
          </p>
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <CategoryPieChart data={hkCategories} />
            </div>
            <div className="space-y-2">
              {hkCategories.map((c, i) => (
                <div key={c.name} className="flex items-center gap-2">
                  <div
                    className="h-2.5 w-2.5 rounded-sm"
                    style={{
                      backgroundColor: ["#c9963a", "#3ecf8e", "#60a5fa", "#ef5350", "#a78bfa"][i % 5],
                    }}
                  />
                  <span className="font-mono text-[11px] text-text-secondary">
                    {c.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="animate-fade-in-up delay-5 rounded-xl border border-border-primary bg-bg-card p-6">
        <h3 className="mb-1 font-body text-sm font-medium text-text-primary">
          Top Fund Inflows — All Markets
        </h3>
        <p className="mb-4 font-mono text-[10px] text-text-muted">
          Ranked by 1-month flow rate
        </p>
        <ETFTable data={topInflowETFs} currencySymbol="" />
      </div>
    </div>
  );
}
