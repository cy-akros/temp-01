"use client";

import { useState, useEffect } from "react";
import { StatCard } from "@/components/stat-card";
import { AUMAreaChart, CategoryPieChart } from "@/components/charts";
import { ETFTable } from "@/components/etf-table";
import {
  fetchETFs,
  fetchTimeSeries,
  getMarketSummary,
  getCategoryDistribution,
  getIssuerDistribution,
} from "@/lib/queries";
import { TrendingUp, Wallet, ArrowUpRight, ArrowDownRight, Loader2 } from "lucide-react";

export default function TaiwanPage() {
  const [etfs, setEtfs] = useState<any[]>([]);
  const [timeSeriesData, setTimeSeriesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [etfData, tsData] = await Promise.all([
          fetchETFs("TW"),
          fetchTimeSeries(),
        ]);
        setEtfs(etfData);
        setTimeSeriesData(tsData);
      } catch (error) {
        console.error("Error loading Taiwan data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-accent-amber" />
          <p className="font-mono text-sm text-text-muted">Loading Taiwan ETFs...</p>
        </div>
      </div>
    );
  }

  const summary = getMarketSummary(etfs);
  const categories = getCategoryDistribution(etfs);
  const issuers = getIssuerDistribution(etfs);

  return (
    <div className="space-y-8">
      <div className="animate-fade-in-up">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🇹🇼</span>
          <div>
            <h1 className="font-display text-4xl text-text-primary">
              Taiwan ETFs
            </h1>
            <p className="mt-1 font-mono text-sm text-text-muted">
              TWSE listed ETFs — {summary.etfCount} funds tracked
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard
          title="Total AUM"
          value={`NT$${(summary.totalAUM / 1000000).toFixed(2)}T`}
          subtitle={`${summary.etfCount} active ETFs`}
          icon={<Wallet size={18} />}
          delay={1}
        />
        <StatCard
          title="Avg 1M Flow"
          value={`${summary.avgFlow1M.toFixed(2)}%`}
          subtitle="Net inflow rate"
          change={summary.avgFlow1M}
          icon={<TrendingUp size={18} />}
          delay={2}
        />
        <StatCard
          title="Top Inflow"
          value={summary.topInflow.ticker}
          subtitle={summary.topInflow.name}
          change={summary.topInflow.flow1M}
          icon={<ArrowUpRight size={18} />}
          delay={3}
        />
        <StatCard
          title="Weakest Flow"
          value={summary.topOutflow.ticker}
          subtitle={summary.topOutflow.name}
          change={summary.topOutflow.flow1M}
          icon={<ArrowDownRight size={18} />}
          delay={4}
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 animate-fade-in-up delay-3 rounded-xl border border-border-primary bg-bg-card p-6">
          <h3 className="mb-1 text-sm font-medium text-text-primary">
            TW Market AUM Trend
          </h3>
          <p className="mb-4 font-mono text-[10px] text-text-muted">
            30-day AUM & volume
          </p>
          <AUMAreaChart
            data={timeSeriesData}
            dataKey1="tw_aum"
            dataKey2="tw_volume"
            name1="AUM"
            name2="Volume"
          />
        </div>

        <div className="animate-fade-in-up delay-4 rounded-xl border border-border-primary bg-bg-card p-6">
          <h3 className="mb-1 text-sm font-medium text-text-primary">
            By Category
          </h3>
          <p className="mb-4 font-mono text-[10px] text-text-muted">
            AUM distribution
          </p>
          <CategoryPieChart data={categories} />
          <div className="mt-4 space-y-1.5">
            {categories.map((c, i) => (
              <div key={c.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="h-2 w-2 rounded-sm"
                    style={{
                      backgroundColor: [
                        "#c9963a",
                        "#3ecf8e",
                        "#60a5fa",
                        "#ef5350",
                        "#a78bfa",
                      ][i % 5],
                    }}
                  />
                  <span className="font-mono text-[11px] text-text-secondary">
                    {c.name}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-text-muted">
                  NT${(c.value / 1000).toFixed(0)}B
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Issuer breakdown */}
      <div className="animate-fade-in-up delay-5 rounded-xl border border-border-primary bg-bg-card p-6">
        <h3 className="mb-1 text-sm font-medium text-text-primary">
          By Issuer
        </h3>
        <p className="mb-4 font-mono text-[10px] text-text-muted">
          AUM market share by asset manager
        </p>
        <div className="flex gap-3">
          {issuers.map((issuer, i) => {
            const share = (issuer.value / summary.totalAUM) * 100;
            return (
              <div
                key={issuer.name}
                className="flex-1 rounded-lg border border-border-primary bg-bg-tertiary p-4"
              >
                <p className="font-body text-sm font-medium text-text-primary">
                  {issuer.name}
                </p>
                <p className="mt-1 font-mono text-lg text-accent-amber">
                  {share.toFixed(1)}%
                </p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-bg-primary">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${share}%`,
                      backgroundColor: [
                        "#c9963a",
                        "#3ecf8e",
                        "#60a5fa",
                        "#ef5350",
                        "#a78bfa",
                      ][i % 5],
                    }}
                  />
                </div>
                <p className="mt-1 font-mono text-[10px] text-text-muted">
                  NT${(issuer.value / 1000).toFixed(0)}B
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full ETF Table */}
      <div className="animate-fade-in-up delay-6 rounded-xl border border-border-primary bg-bg-card p-6">
        <h3 className="mb-1 text-sm font-medium text-text-primary">
          All Taiwan ETFs
        </h3>
        <p className="mb-4 font-mono text-[10px] text-text-muted">
          Complete fund flow data
        </p>
        <ETFTable data={etfs} currencySymbol="NT$" />
      </div>
    </div>
  );
}
