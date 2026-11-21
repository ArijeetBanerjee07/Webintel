
"use client";

import type { PositioningProfile } from "@/data/competitors/competitorTypes";

interface PositioningComparisonTableProps {
  domains: PositioningProfile[];
}

export default function PositioningComparisonTable({
  domains,
}: PositioningComparisonTableProps) {
  // Positioning attributes displayed as table rows
  const positioningFields = [
    {
      label: "Homepage Messaging",
      render: (profile: PositioningProfile) => profile.homepageMessaging,
    },
    {
      label: "Services",
      render: (profile: PositioningProfile) => profile.services,
    },
    {
      label: "Offers",
      render: (profile: PositioningProfile) => profile.offers,
    },
    {
      label: "Calls to Action",
      render: (profile: PositioningProfile) => profile.callsToAction,
    },
    {
      label: "Pricing Presentation",
      render: (profile: PositioningProfile) => profile.pricingPresentation,
    },
    {
      label: "Pricing Page",
      render: (profile: PositioningProfile) =>
        profile.pricingPageUrl || "Not available",
    },
    {
      label: "Differentiators",
      render: (profile: PositioningProfile) => profile.differentiators,
    },
  ];

  return (
    <div className="overflow-x-auto rounded-2xl border border-emerald-500/20 bg-[#05170d]">
      <table className="w-full min-w-[1000px] table-fixed border-collapse">
        <thead>
          <tr className="border-b border-emerald-500/20">
            <th className="w-44 p-4 text-left text-sm font-semibold text-slate-300">
              Positioning Attributes
            </th>

            {domains.map((profile, index) => (
              <th
                key={profile.domain}
                className={`min-w-[210px] p-4 text-left text-sm font-semibold ${
                  index === 0
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "text-white"
                }`}
              >
                <span className="block text-xs text-slate-400">
                  {index === 0 ? "Your Website" : `Competitor ${index}`}
                </span>

                <span className="mt-1 block break-all">
                  {profile.domain}
                </span>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {positioningFields.map((field) => (
            <tr
              key={field.label}
              className="border-b border-emerald-500/10 last:border-0"
            >
              <th className="p-4 text-left align-top text-sm font-medium text-white">
                {field.label}
              </th>

              {domains.map((profile, index) => {
                const value = field.render(profile);

                return (
                  <td
                    key={profile.domain}
                    className={`p-4 align-top text-sm leading-6 text-slate-400 ${
                      index === 0 ? "bg-emerald-500/5" : ""
                    }`}
                  >
                    {Array.isArray(value) ? (
                      <ul className="space-y-2">
                        {value.length > 0 ? (
                          value.map((item, itemIndex) => (
                            <li key={itemIndex} className="break-words">
                              <span className="mr-2 text-emerald-400">•</span>
                              {item}
                            </li>
                          ))
                        ) : (
                          <li className="text-slate-500">
                            Not available
                          </li>
                        )}
                      </ul>
                    ) : (
                      <span className="break-words">
                        {value}
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
