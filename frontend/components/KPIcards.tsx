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
      <div className="bg-white border border-[#E2D9CC] rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full min-h-[220px]">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#B8A898] uppercase tracking-wide font-sans">Portfolio Level</span>
          <Award className="h-5 w-5 text-[#8B6F47] opacity-40" />
        </div>
        
        <div className="flex flex-col gap-2">
          <div className={`inline-block px-4 py-1.5 rounded-full border text-2xl font-bold w-fit ${getAssessmentStyle(assessment)}`}>
            {assessment || 'Good'}
          </div>
        </div>

        <p className="text-sm text-[#5C4D3A] leading-relaxed italic">
          {summary || "Strategic overview based on multi-dimensional repository signals."}
        </p>
      </div>

      {/* Hireability Status */}
      <div className="bg-white border border-[#E2D9CC] rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full min-h-[220px]">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#B8A898] uppercase tracking-wide font-sans">Market Ready</span>
          <UserCheck className="h-5 w-5 text-[#8B6F47] opacity-40" />
        </div>
        
        <div className="flex flex-col gap-2">
          <div className={`inline-block px-4 py-1.5 rounded-full border text-2xl font-bold w-fit ${getAssessmentStyle(hireability)}`}>
            {hireability || 'Borderline'}
          </div>
        </div>

        <div className="flex items-center gap-2">
           <Zap className="h-4 w-4 text-[#8B6F47]" />
           <p className="text-[10px] text-[#8B7A66] font-bold font-sans uppercase tracking-widest leading-none">Signal Priority: High</p>
        </div>
      </div>

      {/* Analysis Scope */}
      <div className="bg-white border border-[#E2D9CC] rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full min-h-[220px]">
        <div className="flex items-center justify-between">
           <span className="text-xs font-semibold text-[#B8A898] uppercase tracking-wide font-sans">Analysis Scope</span>
           <Briefcase className="h-5 w-5 text-[#8B6F47] opacity-40" />
        </div>
        
        <div className="flex items-center gap-8">
          <div className="space-y-1">
            <p className="text-3xl font-bold text-[#2A2116] leading-none">{totalProjects || 0}</p>
            <p className="text-[10px] text-[#B8A898] font-sans uppercase tracking-widest font-bold">Total Repos</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-[#2A2116] leading-none">{topProjectsCount || 0}</p>
            <p className="text-[10px] text-[#B8A898] font-sans uppercase tracking-widest font-bold">Deep-Dives</p>
          </div>
        </div>

        <div /> {/* Bottom spacer for consistency */}
      </div>
    </div>
  );
}
