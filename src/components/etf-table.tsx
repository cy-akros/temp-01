"use client";

import type { ETFRecord } from "@/lib/queries";

interface ETFTableProps {
  data: ETFRecord[];
  currencySymbol: string;
}

export function ETFTable({ data, currencySymbol }: ETFTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border-primary">
            {[
              "Ticker",
              "Name",
              "AUM (M)",
              "1D Flow",
              "1W Flow",
              "1M Flow",
              "YTD Flow",
              "Price",
              "1D Chg",
            ].map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted font-normal"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((etf) => (
            <tr
              key={etf.id}
              className="border-b border-border-primary/50 transition-colors hover:bg-bg-tertiary/50"
            >
              <td className="px-4 py-3 font-mono text-xs font-medium text-accent-amber">
                {etf.ticker}
              </td>
              <td className="px-4 py-3 text-sm text-text-primary max-w-[200px] truncate">
                {etf.name}
              </td>
              <td className="px-4 py-3 font-mono text-xs text-text-secondary">
                {currencySymbol}
                {etf.aum.toLocaleString()}
              </td>
              <td className="px-4 py-3">
                <FlowCell value={etf.flow_1d} />
              </td>
              <td className="px-4 py-3">
                <FlowCell value={etf.flow_1w} />
              </td>
              <td className="px-4 py-3">
                <FlowCell value={etf.flow_1m} />
              </td>
              <td className="px-4 py-3">
                <FlowCell value={etf.flow_ytd} />
              </td>
              <td className="px-4 py-3 font-mono text-xs text-text-primary">
                {etf.price.toFixed(2)}
              </td>
              <td className="px-4 py-3">
                <FlowCell value={etf.price_change_1d} suffix="%" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FlowCell({ value, suffix = "%" }: { value: number; suffix?: string }) {
  const isPositive = value >= 0;
  return (
    <span
      className={`inline-flex items-center rounded px-1.5 py-0.5 font-mono text-xs ${
        isPositive
          ? "bg-accent-green-dim text-accent-green"
          : "bg-accent-red-dim text-accent-red"
      }`}
    >
      {isPositive ? "+" : ""}
      {value.toFixed(2)}
      {suffix}
    </span>
  );
}
