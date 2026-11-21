
"use client";

import { useMemo,useState } from "react";
import { useCompetitor } from "@/context/CompetitorContext";
import { competitorMockData } from "@/data/competitors/competitorMockData";
import { Target } from "lucide-react";

export default function KeywordGapPage() {
  const { selectedDomain } = useCompetitor();
  const [selectedIntent, setSelectedIntent] = useState("All");
const [selectedDifficulty, setSelectedDifficulty] = useState("All");
const [selectedCountry, setSelectedCountry] = useState("All");

  const keywordGaps = useMemo(() => {
    return competitorMockData[selectedDomain.domain]?.keywordGaps ?? [];
  }, [selectedDomain.domain]);

  const filteredKeywords = useMemo(() => {
  return keywordGaps.filter((item) => {
    const matchesIntent =
      selectedIntent === "All" ||
      item.searchIntent === selectedIntent;

    const matchesDifficulty =
      selectedDifficulty === "All" ||
      (selectedDifficulty === "Low" && item.keywordDifficulty <= 30) ||
      (selectedDifficulty === "Medium" &&
        item.keywordDifficulty > 30 &&
        item.keywordDifficulty <= 60) ||
      (selectedDifficulty === "High" && item.keywordDifficulty > 60);

    const matchesCountry =
      selectedCountry === "All" ||
      item.country === selectedCountry;

    return matchesIntent && matchesDifficulty && matchesCountry;
  });
}, [keywordGaps, selectedIntent, selectedDifficulty, selectedCountry]);

const getDifficultyStyle = (difficulty: number) => {
  if (difficulty <= 30) {
    return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
  }

  if (difficulty <= 60) {
    return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
  }

  return "bg-red-500/10 text-red-400 border-red-500/20";
};

  return (
    <div className="min-h-screen bg-[#020603] text-white selection:bg-emerald-500/30 selection:text-emerald-200 flex flex-col">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Page Heading */}

         <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-2">
              <Target size={14} />
              <span>Competitor Intelligence</span>
            </div>

        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Keyword Gap Analysis
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
            Discover keywords your competitors rank for but your website is missing.
          </p>

          <p className="text-sm text-emerald-400 mt-3">
            Target Domain: {selectedDomain.domain}
          </p>
        </div>

        {/* Keyword Filters */}
<div className="rounded-2xl border border-emerald-500/20 bg-[#05170d] p-5 mb-6">

  <h2 className="text-lg font-semibold text-white mb-4">
    Filter Keywords
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

    {/* Search Intent */}
    <div>
      <label className="block text-sm text-slate-400 mb-2">
        Search Intent
      </label>

      <select
        value={selectedIntent}
        onChange={(e) => setSelectedIntent(e.target.value)}
        className="w-full rounded-lg border border-emerald-500/20 bg-[#020603] text-white px-3 py-2.5 outline-none focus:border-emerald-500"
      >
        <option value="All">All Intents</option>
        <option value="Informational">Informational</option>
        <option value="Navigational">Navigational</option>
        <option value="Commercial">Commercial</option>
        <option value="Transactional">Transactional</option>
      </select>
    </div>

    {/* Keyword Difficulty */}
    <div>
      <label className="block text-sm text-slate-400 mb-2">
        Keyword Difficulty
      </label>

      <select
        value={selectedDifficulty}
        onChange={(e) => setSelectedDifficulty(e.target.value)}
        className="w-full rounded-lg border border-emerald-500/20 bg-[#020603] text-white px-3 py-2.5 outline-none focus:border-emerald-500"
      >
        <option value="All">All Difficulties</option>
        <option value="Low">Low (0–30)</option>
        <option value="Medium">Medium (31–60)</option>
        <option value="High">High (61–100)</option>
      </select>
    </div>

    {/* Geography */}
    <div>
      <label className="block text-sm text-slate-400 mb-2">
        Geography
      </label>

      <select
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
        className="w-full rounded-lg border border-emerald-500/20 bg-[#020603] text-white px-3 py-2.5 outline-none focus:border-emerald-500"
      >
        <option value="All">All Countries</option>
        {["India", "United States", "United Kingdom", "Australia"].map(
          (country) => (
            <option key={country} value={country}>
              {country}
            </option>
          )
        )}
      </select>
    </div>

  </div>
</div>
        {/* Keyword Gap Table */}
        <div className="rounded-2xl border border-emerald-500/20 bg-[#05170d] overflow-hidden">

          <div className="p-5 border-b border-emerald-500/20">
            <h2 className="text-lg font-semibold text-white">
              Missing Keywords
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              {filteredKeywords.length} keyword opportunities found
            </p>
          </div>

          <div className="overflow-x-auto">
             <p className="mb-3 px-1 text-xs text-slate-500 sm:hidden">
          Swipe horizontally to view all competitors →
        </p>

            <table className="w-full text-sm text-left">

              <thead className="bg-[#082012] text-slate-400">
                <tr>
                  <th className="px-5 py-4 font-medium">Keyword</th>
                  <th className="px-5 py-4 font-medium">Search Volume</th>
                  <th className="px-5 py-4 font-medium">Difficulty</th>
                  <th className="px-5 py-4 font-medium">Search Intent</th>
                  <th className="px-5 py-4 font-medium">Competitor</th>
                  <th className="px-5 py-4 font-medium">Competitor Rank</th>
                  <th className="px-5 py-4 font-medium">Country</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-emerald-500/10">
                {filteredKeywords.map((item, index) => (
                  <tr
                    key={`${item.keyword}-${index}`}
                    className="hover:bg-emerald-500/5 transition-colors"
                  >
                    <td className="px-5 py-4 font-medium text-white">
                      {item.keyword}
                    </td>

                    <td className="px-5 py-4 text-slate-300">
                      {item.searchVolume.toLocaleString()}
                    </td>

                    <td className="px-5 py-4">
                        <span   className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${getDifficultyStyle(
                        item.keywordDifficulty
                        )}`}
                        >
                        {item.keywordDifficulty}/100
                        </span>
                    </td>
                    <td className="px-5 py-4 text-slate-300">
                      {item.searchIntent}
                    </td>

                    <td className="px-5 py-4 text-emerald-400">
                      {item.competitorDomain}
                    </td>

                    <td className="px-5 py-4 text-slate-300">
                      #{item.competitorRanking}
                    </td>

                    <td className="px-5 py-4 text-slate-300">
                      {item.country}
                    </td>
                  </tr>
                ))}

                {keywordGaps.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-10 text-center text-slate-400"
                    >
                      No keyword gap data available for this domain.
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
