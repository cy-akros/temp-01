"use client";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = [
  "#c9963a",
  "#3ecf8e",
  "#60a5fa",
  "#ef5350",
  "#a78bfa",
  "#f59e0b",
  "#ec4899",
  "#14b8a6",
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload) return null;
  return (
    <div className="rounded-lg border border-border-primary bg-bg-secondary p-3 shadow-xl">
      <p className="mb-2 font-mono text-[10px] text-text-muted">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="font-mono text-xs text-text-secondary">
            {entry.name}:
          </span>
          <span className="font-mono text-xs font-medium text-text-primary">
            {typeof entry.value === "number"
              ? entry.value.toLocaleString()
              : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

interface ChartDataItem {
  [key: string]: string | number;
}

interface AUMChartProps {
  data: ChartDataItem[];
  dataKey1: string;
  dataKey2: string;
  name1: string;
  name2: string;
}

export function AUMAreaChart({
  data,
  dataKey1,
  dataKey2,
  name1,
  name2,
}: AUMChartProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c9963a" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#c9963a" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3ecf8e" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#3ecf8e" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="date"
          tickFormatter={(v: string) => v.slice(5)}
          tick={{ fontSize: 10 }}
        />
        <YAxis
          tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}B`}
          tick={{ fontSize: 10 }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey={dataKey1}
          name={name1}
          stroke="#c9963a"
          fill="url(#grad1)"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey={dataKey2}
          name={name2}
          stroke="#3ecf8e"
          fill="url(#grad2)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

interface FlowBarChartProps {
  data: ChartDataItem[];
  dataKey1: string;
  dataKey2: string;
  name1: string;
  name2: string;
}

export function FlowBarChart({
  data,
  dataKey1,
  dataKey2,
  name1,
  name2,
}: FlowBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="date"
          tickFormatter={(v: string) => v.slice(5)}
          tick={{ fontSize: 10 }}
        />
        <YAxis
          tickFormatter={(v: number) => `${(v / 1000).toFixed(1)}B`}
          tick={{ fontSize: 10 }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey={dataKey1} name={name1} fill="#c9963a" radius={[2, 2, 0, 0]} />
        <Bar dataKey={dataKey2} name={name2} fill="#3ecf8e" radius={[2, 2, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

interface CategoryPieChartProps {
  data: Array<{ name: string; value: number }>;
}

export function CategoryPieChart({ data }: CategoryPieChartProps) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          dataKey="value"
          stroke="var(--bg-primary)"
          strokeWidth={2}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
}
