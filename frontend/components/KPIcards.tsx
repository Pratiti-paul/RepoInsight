import React from 'react';
import { Target, Trophy, Briefcase, Star } from 'lucide-react';

interface KPIcardsProps {
  portfolioScore?: number;
  portfolioLevel?: string;
  portfolioSummary?: string;
  totalProjects: number;
  topProjectsCount: number;
}

export default function KPIcards({ 
  portfolioScore, 
  portfolioLevel, 
  portfolioSummary,
  totalProjects, 
  topProjectsCount 
}: KPIcardsProps) {
  
  // Convert 0-10 score to 0-100 for better UI granularity
  const displayScore = portfolioScore !== undefined ? Math.round(portfolioScore * 10) : null;
  
  const getLevelColor = (level?: string) => {
    const l = level?.toLowerCase();
    if (l === 'high') return 'bg-green-100 text-green-700 border-green-200';
    if (l === 'medium') return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    if (l === 'low') return 'bg-red-100 text-red-700 border-red-200';
    return 'bg-slate-100 text-slate-700 border-slate-200';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
      {/* Primary Score Card */}
      <div className="lg:col-span-1 bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col justify-between relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
           <Star className="w-32 h-32 rotate-12" />
        </div>
        
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div className="p-3 rounded-2xl bg-blue-50 text-blue-600">
               <Briefcase className="h-6 w-6" />
            </div>
            {portfolioLevel && (
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getLevelColor(portfolioLevel)}`}>
                Level: {portfolioLevel}
              </span>
            )}
          </div>

          <div className="space-y-1 mb-6">
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Portfolio Strength</p>
            <div className="flex items-baseline gap-1">
              <h3 className={`text-5xl font-black tracking-tight ${displayScore !== null ? getScoreColor(displayScore) : 'text-slate-300'}`}>
                {displayScore !== null ? displayScore : '--'}
              </h3>
              <span className="text-xl font-bold text-slate-300">/100</span>
            </div>
          </div>

          {displayScore !== null && (
            <div className="w-full h-2 bg-slate-100 rounded-full mb-6 relative overflow-hidden">
               <div 
                 className={`h-full rounded-full transition-all duration-1000 ease-out ${getProgressColor(displayScore)}`}
                 style={{ width: `${displayScore}%` }}
               />
            </div>
          )}
        </div>

        <p className="text-slate-600 text-sm leading-relaxed font-medium italic">
          "{portfolioSummary || 'No summary available for this portfolio'}"
        </p>
      </div>

      {/* Secondary Metric Cards Container */}
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Analyzed Repos */}
        <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex items-center space-x-6">
          <div className="p-5 rounded-2xl text-emerald-600 bg-emerald-50">
            <Target className="h-10 w-10" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Total Analysis</p>
            <h3 className="text-4xl font-black text-slate-900">{totalProjects}</h3>
            <p className="text-xs text-slate-500 mt-1 font-medium">Repositories scanned</p>
          </div>
        </div>

        {/* Standout Projects */}
        <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex items-center space-x-6">
          <div className="p-5 rounded-2xl text-amber-600 bg-amber-50">
            <Trophy className="h-10 w-10" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Top Tier</p>
            <h3 className="text-4xl font-black text-slate-900">{topProjectsCount}</h3>
            <p className="text-xs text-slate-500 mt-1 font-medium">Original standout works</p>
          </div>
        </div>
      </div>
    </div>
  );
}
