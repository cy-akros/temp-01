"use client";

import { useState, useEffect } from "react";
import { AUMAreaChart, FlowBarChart } from "@/components/charts";
import {
  fetchETFs,
  fetchTimeSeries,
  getMarketSummary,
  type ETFRecord,
  type TimeSeriesRecord,
} from "@/lib/queries";
import { Loader2 } from "lucide-react";

export default function ComparisonPage() {
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
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-accent-amber" />
          <p className="font-mono text-sm text-text-muted">Loading comparison data...</p>
        </div>
      </div>
    );
  }

  const twETFs = allETFs.filter((e) => e.market === "TW");
  const hkETFs = allETFs.filter((e) => e.market === "HK");
  const twSummary = getMarketSummary(twETFs);
  const hkSummary = getMarketSummary(hkETFs);

  const twTopFlows = [...twETFs].sort((a, b) => b.flow_1m - a.flow_1m).slice(0, 5);
  const hkTopFlows = [...hkETFs].sort((a, b) => b.flow_1m - a.flow_1m).slice(0, 5);

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
          Market Comparison
        </h1>
        <p className="mt-1 font-mono text-sm text-text-muted">
          Taiwan vs Hong Kong — Side-by-side analytics
        </p>
      </div>

      <div className="animate-fade-in-up delay-1 rounded-xl border border-border-primary bg-bg-card p-6">
        <div className="mb-6 flex items-center border-b border-border-primary pb-4">
          <div className="w-1/3" />
          <div className="w-1/3 text-center">
            <span className="inline-flex items-center gap-2 rounded-lg border border-accent-amber/20 bg-accent-amber-dim px-4 py-1.5 font-body text-sm font-medium text-accent-amber">
              🇹🇼 Taiwan
            </span>
          </div>
          <div className="w-1/3 text-center">
            <span className="inline-flex items-center gap-2 rounded-lg border border-accent-green/20 bg-accent-green-dim px-4 py-1.5 font-body text-sm font-medium text-accent-green">
              🇭🇰 Hong Kong
            </span>
          </div>
        </div>

        <MetricRow
          label="Total AUM"
          twValue={`NT$${(twSummary.totalAUM / 1000000).toFixed(2)}T`}
          hkValue={`HK$${(hkSummary.totalAUM / 1000).toFixed(1)}B`}
          twHighlight
        />
        <MetricRow
          label="ETFs Tracked"
          twValue={`${twSummary.etfCount}`}
          hkValue={`${hkSummary.etfCount}`}
          twHighlight={twSummary.etfCount > hkSummary.etfCount}
          hkHighlight={hkSummary.etfCount > twSummary.etfCount}
        />
        <MetricRow
          label="Avg 1M Flow"
          twValue={`${twSummary.avgFlow1M.toFixed(2)}%`}
          hkValue={`${hkSummary.avgFlow1M.toFixed(2)}%`}
          twHighlight={twSummary.avgFlow1M > hkSummary.avgFlow1M}
          hkHighlight={hkSummary.avgFlow1M > twSummary.avgFlow1M}
        />
        {twSummary.topInflow && hkSummary.topInflow && (
          <MetricRow
            label="Top Inflow ETF"
            twValue={`${twSummary.topInflow.ticker} (${twSummary.topInflow.flow_1m.toFixed(1)}%)`}
            hkValue={`${hkSummary.topInflow.ticker} (${hkSummary.topInflow.flow_1m.toFixed(1)}%)`}
          />
        )}
        {twSummary.topOutflow && hkSummary.topOutflow && (
          <MetricRow
            label="Weakest ETF"
            twValue={`${twSummary.topOutflow.ticker} (${twSummary.topOutflow.flow_1m.toFixed(1)}%)`}
            hkValue={`${hkSummary.topOutflow.ticker} (${hkSummary.topOutflow.flow_1m.toFixed(1)}%)`}
          />
        )}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="animate-fade-in-up delay-3 rounded-xl border border-border-primary bg-bg-card p-6">
          <h3 className="mb-1 text-sm font-medium text-text-primary">AUM Trend Overlay</h3>
          <p className="mb-4 font-mono text-[10px] text-text-muted">30-day comparison</p>
          <AUMAreaChart data={chartData} dataKey1="twAUM" dataKey2="hkAUM" name1="Taiwan AUM" name2="Hong Kong AUM" />
        </div>
        <div className="animate-fade-in-up delay-4 rounded-xl border border-border-primary bg-bg-card p-6">
          <h3 className="mb-1 text-sm font-medium text-text-primary">Flow Comparison</h3>
          <p className="mb-4 font-mono text-[10px] text-text-muted">Daily net flows</p>
          <FlowBarChart data={chartData} dataKey1="twFlow" dataKey2="hkFlow" name1="TW Flow" name2="HK Flow" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="animate-fade-in-up delay-5 rounded-xl border border-border-primary bg-bg-card p-6">
          <h3 className="mb-1 text-sm font-medium text-text-primary">🇹🇼 TW Top Inflows</h3>
          <p className="mb-4 font-mono text-[10px] text-text-muted">By 1-month flow rate</p>
          <div className="space-y-3">
            {twTopFlows.map((etf, i) => (
              <div key={etf.id} className="flex items-center gap-3 rounded-lg border border-border-primary/50 bg-bg-tertiary px-4 py-3">
                <span className="font-mono text-xs text-text-muted w-4">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text-primary truncate">{etf.name}</p>
                  <p className="font-mono text-[10px] text-text-muted">{etf.ticker}</p>
                </div>
                <span className="inline-flex rounded bg-accent-green-dim px-2 py-0.5 font-mono text-xs text-accent-green">
                  +{etf.flow_1m.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-fade-in-up delay-6 rounded-xl border border-border-primary bg-bg-card p-6">
          <h3 className="mb-1 text-sm font-medium text-text-primary">🇭🇰 HK Top Inflows</h3>
          <p className="mb-4 font-mono text-[10px] text-text-muted">By 1-month flow rate</p>
          <div className="space-y-3">
            {hkTopFlows.map((etf, i) => (
              <div key={etf.id} className="flex items-center gap-3 rounded-lg border border-border-primary/50 bg-bg-tertiary px-4 py-3">
                <span className="font-mono text-xs text-text-muted w-4">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text-primary truncate">{etf.name}</p>
                  <p className="font-mono text-[10px] text-text-muted">{etf.ticker}</p>
                </div>
                <span className="inline-flex rounded bg-accent-green-dim px-2 py-0.5 font-mono text-xs text-accent-green">
                  +{etf.flow_1m.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricRow({
  label,
  twValue,
  hkValue,
  twHighlight,
  hkHighlight,
}: {
  label: string;
  twValue: string;
  hkValue: string;
  twHighlight?: boolean;
  hkHighlight?: boolean;
}) {
  return (
    <div className="flex items-center border-b border-border-primary/50 py-4">
      <div className="w-1/3 font-mono text-xs uppercase tracking-wider text-text-muted">{label}</div>
      <div className="w-1/3 text-center">
        <span className={`font-mono text-sm ${twHighlight ? "text-accent-amber font-medium" : "text-text-primary"}`}>
          {twValue}
        </span>
      </div>
      <div className="w-1/3 text-center">
        <span className={`font-mono text-sm ${hkHighlight ? "text-accent-green font-medium" : "text-text-primary"}`}>
          {hkValue}
        </span>
      </div>
    </div>
  );
}
