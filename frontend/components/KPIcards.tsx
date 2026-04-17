import React from 'react';
import { Award, Briefcase, Zap, UserCheck } from 'lucide-react';

interface KPIcardsProps {
  assessment?: 'Strong' | 'Good' | 'Average' | 'Needs Improvement';
  hireability?: 'Hireable' | 'Borderline' | 'Not Ready';
  summary?: string;
  totalProjects?: number;
  topProjectsCount?: number;
}

export default function KPIcards({ assessment, hireability, summary, totalProjects, topProjectsCount }: KPIcardsProps) {
  const getAssessmentStyle = (val?: string) => {
    switch(val) {
      case 'Strong': return 'bg-[#E8F0E4] text-[#4A7C40] border-[#C6D9A0]';
      case 'Good': return 'bg-[#EDE6DC] text-[#8B6F47] border-[#D9CEBD]';
      case 'Average': return 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]';
      default: return 'bg-[#F5E8E4] text-[#B85040] border-[#F0997B]';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
      {/* Portfolio Assessment */}
      <div className="bg-white border border-[#E2D9CC] rounded-2xl p-6 shadow-sm overflow-hidden flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#B8A898] uppercase tracking-wide font-sans">Portfolio Level</span>
            <Award className="h-5 w-5 text-[#8B6F47]" />
          </div>
          <div className={`inline-block px-4 py-1.5 rounded-full border text-2xl font-bold ${getAssessmentStyle(assessment)}`}>
            {assessment || 'Good'}
          </div>
        </div>
        <p className="mt-6 text-sm text-[#5C4D3A] leading-relaxed italic">
          {summary || "Strategic overview based on multi-dimensional repository signals."}
        </p>
      </div>

      {/* Hireability Status */}
      <div className="bg-white border border-[#E2D9CC] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#B8A898] uppercase tracking-wide font-sans">Market Ready</span>
            <UserCheck className="h-5 w-5 text-[#8B6F47]" />
          </div>
          <div className={`inline-block px-4 py-1.5 rounded-full border text-2xl font-bold ${getAssessmentStyle(hireability)}`}>
            {hireability || 'Borderline'}
          </div>
        </div>
        <div className="mt-6 flex items-center gap-3">
           <div className="p-2 bg-[#EDE6DC] rounded-xl text-[#8B6F47]">
              <Zap className="h-4 w-4" />
           </div>
           <p className="text-xs text-[#8B7A66] font-medium font-sans uppercase tracking-[0.1em]">Signal Priority: High</p>
        </div>
      </div>

      {/* Stats QuickView */}
      <div className="bg-white border border-[#E2D9CC] rounded-2xl p-6 shadow-sm flex flex-col justify-between gap-6">
        <div className="flex items-center justify-between">
           <span className="text-xs font-semibold text-[#B8A898] uppercase tracking-wide font-sans">Analysis Scope</span>
           <Briefcase className="h-5 w-5 text-[#8B6F47]" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-3xl font-bold text-[#2A2116] leading-none">{totalProjects || 0}</p>
            <p className="text-[10px] text-[#B8A898] font-sans uppercase tracking-widest">Total Repos</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-[#2A2116] leading-none">{topProjectsCount || 0}</p>
            <p className="text-[10px] text-[#B8A898] font-sans uppercase tracking-widest">Targeted Deep-Dives</p>
          </div>
        </div>
      </div>
    </div>
  );
}
