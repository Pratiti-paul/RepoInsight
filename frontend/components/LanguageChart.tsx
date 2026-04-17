import React from 'react';
import { PieChart } from 'lucide-react';

interface LanguageStat {
  name: string;
  percentage: number;
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
        <p className="text-[#8B7A66] font-medium italic">No language data available</p>
      </div>
    );
  }

  const chartData = data.slice(0, 8);
  let cumulativePercentage = 0;
  const segments = chartData.map((stat, idx) => {
    const start = cumulativePercentage;
    cumulativePercentage += stat.percentage;
    return `${COLORS[idx % COLORS.length]} ${start}% ${cumulativePercentage}%`;
  }).join(', ');

  const topLanguage = chartData[0]?.name || "N/A";

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2D9CC] h-full flex flex-col justify-between animate-fade-in-up">
      <div className="space-y-1 mb-6">
        <h3 className="text-base font-bold text-[#2A2116] tracking-tight flex items-center gap-2">
           <PieChart className="w-5 h-5 text-[#8B6F47]" />
           Stack Distribution
        </h3>
        <p className="text-[#B8A898] text-xs font-sans italic">Primary languages by bytecode volume</p>
      </div>

      <div className="relative flex justify-center py-6">
        <div 
          className="w-44 h-44 rounded-full shadow-inner flex items-center justify-center"
          style={{ background: `conic-gradient(${segments})` }}
        >
          <div className="w-32 h-32 bg-white rounded-full shadow-lg flex flex-col items-center justify-center text-center p-4">
             <p className="text-[#B8A898] text-[10px] font-bold uppercase tracking-widest font-sans mb-1">Top</p>
             <p className="text-xl font-bold text-[#2A2116] leading-none">{topLanguage}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3 mt-6">
        {chartData.map((stat, idx) => (
          <div key={idx} className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div 
                className="w-2.5 h-2.5 rounded-full shadow-sm"
                style={{ backgroundColor: COLORS[idx % COLORS.length] }}
              />
              <span className="text-sm font-semibold text-[#2A2116]">{stat.name}</span>
            </div>
            <span className="text-sm font-mono font-bold text-[#8B7A66]/80">{(stat.percentage || 0).toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
