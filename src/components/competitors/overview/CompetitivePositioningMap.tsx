
"use client";

import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
   Legend
} from "recharts";

import type { PositioningMapPoint } from "@/data/competitors/competitorTypes";

interface CompetitivePositioningMapProps {
  data: PositioningMapPoint[];
  selectedDomain: string;
}

export default function CompetitivePositioningMap({
  data,
   selectedDomain,
}: CompetitivePositioningMapProps) {

  const selectedWebsite = data.filter(
  (point) => point.domain === selectedDomain
);

const competitorWebsites = data.filter(
  (point) => point.domain !== selectedDomain
);

  return (
    <div className="rounded-2xl border border-emerald-500/20 bg-[#05170d] p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">
          Competitive Positioning Map
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Compare competitors based on estimated organic traffic and keyword
          footprint.
        </p>
      </div>

      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#16452c" />

            <XAxis
              type="number"
              dataKey="organicKeywords"
              name="Organic Keywords"
              stroke="#94a3b8"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              label={{
                value: "Organic Keywords",
                position: "insideBottom",
                offset: -10,
                fill: "#94a3b8",
              }}
            />

            <YAxis
              type="number"
              dataKey="organicTraffic"
              name="Organic Traffic"
              stroke="#94a3b8"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              label={{
                value: "Organic Traffic",
                angle: -90,
                position: "insideLeft",
                fill: "#94a3b8",
              }}
            />

            <ZAxis
              type="number"
              dataKey="visibility"
              range={[100, 600]}
            />
            <Legend
  verticalAlign="bottom"
  align="center"
  iconType="circle"
  wrapperStyle={{
    paddingTop: "15px",
    fontSize: "12px",
    color: "#94a3b8",
  }}
/>

            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const point = payload[0].payload as PositioningMapPoint;

                  return (
                    <div className="rounded-xl border border-emerald-500/30 bg-[#020603] p-3 shadow-xl">
                      <p className="font-semibold text-white">
                        {point.domain}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        Organic Keywords: {point.organicKeywords.toLocaleString()}
                      </p>
                      <p className="text-xs text-slate-400">
                        Organic Traffic: {point.organicTraffic.toLocaleString()}
                      </p>
                      <p className="text-xs text-emerald-400">
                        Visibility: {point.visibility}%
                      </p>
                    </div>
                  );
                }

                return null;
              }}
            />

            
<Scatter
  name="Selected Website"
  data={selectedWebsite}
  fill="#10b981"
/>

<Scatter
  name="Competitors"
  data={competitorWebsites}
  fill="#64748b"
/>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-3 text-xs text-slate-500">
        Illustrative mock data. Organic traffic and keyword metrics will
        require an SEO data provider.
      </p>
    </div>
  );
}
