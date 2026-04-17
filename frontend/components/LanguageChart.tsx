import React from 'react';
import { PieChart } from 'lucide-react';

interface LanguageStat {
  name: string;
  value?: number;      // Using value as described by the user
  percentage?: number; // Fallback for transition
}

interface LanguageChartProps {
  data: LanguageStat[];
}

const COLORS = ['#8B6F47', '#4A7C40', '#5A519C', '#B85040', '#92400E', '#0D9488', '#4F46E5', '#BE185D'];

export default function LanguageChart({ data }: LanguageChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2D9CC] flex flex-col items-center justify-center min-h-[300px]">
        <PieChart className="w-12 h-12 text-[#EDE6DC] mb-4" />
        <p className="text-[#8B7A66] font-medium italic font-sans text-sm">No language data available</p>
      </div>
    );
  }

  // 1. Normalization Logic
  const rawData = data.slice(0, 8).map(item => ({
    name: item.name,
    rawVal: item.value ?? item.percentage ?? 0
  }));

  const total = rawData.reduce((acc, curr) => acc + curr.rawVal, 0);

  if (total === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2D9CC] flex flex-col items-center justify-center min-h-[300px]">
        <PieChart className="w-12 h-12 text-[#EDE6DC] mb-4" />
        <p className="text-[#8B7A66] font-medium italic font-sans text-sm">No language data available</p>
      </div>
    );
  }

  // 2. Convert to normalized percentages
  let cumulative = 0;
  const segments = rawData.map((item, index) => {
    const normalizedValue = (item.rawVal / total) * 100;
    const start = cumulative;
    cumulative += normalizedValue;
    return {
      name: item.name,
      normalizedValue,
      start,
      end: cumulative,
      color: COLORS[index % COLORS.length]
    };
  });

  // 3. Generate background string
  const gradientString = segments.map(s => 
    `${s.color} ${s.start.toFixed(2)}% ${s.end.toFixed(2)}%`
  ).join(', ');

  const topLanguage = segments[0]?.name || "N/A";

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2D9CC] h-full flex flex-col justify-between animate-fade-in-up">
      <div className="space-y-1 mb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#2A2116] tracking-tight flex items-center gap-2">
             Stack Distribution
          </h3>
          <PieChart className="w-5 h-5 text-[#8B6F47] opacity-40" />
        </div>
        <p className="text-[#B8A898] text-xs font-sans italic">Primary languages by bytecode volume</p>
      </div>

      <div className="relative flex justify-center py-6">
        <div 
          className="w-44 h-44 rounded-full flex items-center justify-center transition-all duration-700"
          style={{ background: `conic-gradient(${gradientString})` }}
        >
          <div className="w-32 h-32 bg-white rounded-full shadow-lg flex flex-col items-center justify-center text-center p-4">
             <p className="text-[#B8A898] text-[10px] font-bold uppercase tracking-widest font-sans mb-1">Top</p>
             <p className="text-xl font-bold text-[#2A2116] leading-none">{topLanguage}</p>
          </div>
        </div>
      </div>

      <div className="space-y-2.5 mt-6">
        {segments.map((stat, idx) => (
          <div key={idx} className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div 
                className="w-2 rounded-full h-2 shadow-sm"
                style={{ backgroundColor: stat.color }}
              />
              <span className="text-xs font-semibold text-[#2A2116] font-sans">{stat.name}</span>
            </div>
            <span className="text-xs font-mono font-bold text-[#8B7A66]">{stat.normalizedValue.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
