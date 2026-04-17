import React from 'react';
import { Flame, Calendar, Trophy } from 'lucide-react';

interface Day {
  date: string;
  count: number;
  color: string;
}

interface ContributionHeatmapProps {
  total: number;
  streakCurrent: number;
  streakLongest: number;
  days: Day[];
}

export default function ContributionHeatmap({ total, streakCurrent, streakLongest, days }: ContributionHeatmapProps) {
  if (!days || days.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2D9CC] flex flex-col items-center justify-center min-h-[300px]">
        <Calendar className="w-12 h-12 text-[#EDE6DC] mb-4" />
        <p className="text-[#8B7A66] font-medium italic">No contribution data available</p>
      </div>
    );
  }

  const weeks: Day[][] = [];
  let currentWeek: Day[] = [];
  
  days.forEach((day, i) => {
    currentWeek.push(day);
    if (currentWeek.length === 7 || i === days.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2D9CC] space-y-8 animate-fade-in-up">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-[#2A2116] tracking-tight flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#8B6F47]" />
            Contribution Activity
          </h3>
          <p className="text-[#B8A898] text-xs font-sans italic">{total.toLocaleString()} total contributions in the last year</p>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-[#FFF7ED] px-4 py-2 rounded-xl border border-[#FDE68A] flex items-center gap-3">
            <Flame className="w-5 h-5 text-[#EA580C]" />
            <div>
              <p className="text-[10px] font-bold text-[#C2410C] uppercase leading-none mb-1 font-sans">Current Streak</p>
              <p className="text-lg font-bold text-[#9A3412] leading-none">{streakCurrent} days</p>
            </div>
          </div>
          <div className="bg-[#EDE6DC] px-4 py-2 rounded-xl border border-[#D9CEBD] flex items-center gap-3">
            <Trophy className="w-5 h-5 text-[#8B6F47]" />
            <div>
              <p className="text-[10px] font-bold text-[#8B7A66] uppercase leading-none mb-1 font-sans">Longest Streak</p>
              <p className="text-lg font-bold text-[#2A2116] leading-none">{streakLongest} days</p>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto pb-4 scrollbar-hide">
        <div className="inline-grid grid-flow-col gap-1 auto-cols-max">
          {weeks.map((week, wIdx) => (
            <div key={wIdx} className="grid grid-rows-7 gap-1">
              {week.map((day, dIdx) => (
                <div
                  key={`${wIdx}-${dIdx}`}
                  title={`${day.date}: ${day.count} contributions`}
                  className="w-3 h-3 rounded-[2px] transition-all duration-300 hover:scale-150 hover:z-10"
                  style={{ backgroundColor: day.color === '#ebedf0' ? '#EDE6DC' : day.color }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pt-2">
        <span className="text-[10px] font-bold text-[#B8A898] uppercase tracking-widest mr-2 font-sans">Less</span>
        <div className="w-3 h-3 rounded-[2px] bg-[#EDE6DC]"></div>
        <div className="w-3 h-3 rounded-[2px] bg-[#9be9a8]"></div>
        <div className="w-3 h-3 rounded-[2px] bg-[#40c463]"></div>
        <div className="w-3 h-3 rounded-[2px] bg-[#30a14e]"></div>
        <div className="w-3 h-3 rounded-[2px] bg-[#216e39]"></div>
        <span className="text-[10px] font-bold text-[#B8A898] uppercase tracking-widest ml-1 font-sans">More</span>
      </div>
    </div>
  );
}
