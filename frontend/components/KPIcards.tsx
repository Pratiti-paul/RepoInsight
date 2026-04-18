import React from 'react';
import { Award, Briefcase, Zap, UserCheck } from 'lucide-react';

interface KPIcardsProps {
  assessment?: 'Ready to be Hired' | 'Needs Some Improvement' | 'Early Stage';
  strengthFocus?: string;
  hireability?: 'Hireable' | 'Borderline' | 'Not Ready';
  summary?: string;
  totalProjects?: number;
  topProjectsCount?: number;
  analyzedCount?: number;
}

export default function KPIcards({ assessment, strengthFocus, hireability, summary, totalProjects, topProjectsCount, analyzedCount }: KPIcardsProps) {
  const getAssessmentStyle = (val?: string) => {
    switch(val) {
      case 'Ready to be Hired': return 'bg-[#E8F0E4] text-[#4A7C40] border-[#C6D9A0]';
      case 'Needs Some Improvement': return 'bg-[#EDE6DC] text-[#8B6F47] border-[#D9CEBD]';
      case 'Early Stage': 
      case 'Average': // Temporary fallback
        return 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]';
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
        
        <div className="flex flex-col items-center justify-center flex-grow py-2">
          <div className={`px-4 py-2 rounded-xl border text-lg font-bold text-center leading-tight ${getAssessmentStyle(assessment)}`}>
            {assessment || 'Good'}
          </div>
        </div>

        <div /> {/* Bottom spacer for consistency */}
      </div>

      {/* Strength Focus */}
      <div className="bg-white border border-[#E2D9CC] rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full min-h-[220px]">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#B8A898] uppercase tracking-wide font-sans">Strength Focus</span>
          <UserCheck className="h-5 w-5 text-[#8B6F47] opacity-40" />
        </div>
        
        <div className="flex flex-col items-center justify-center flex-grow py-2">
          <div className={`px-4 py-2 rounded-xl border text-lg font-bold text-center leading-tight ${getAssessmentStyle('Needs Some Improvement')}`}>
            {strengthFocus || 'Full-Stack Development'}
          </div>
        </div>

        <div /> {/* Bottom spacer for consistency */}
      </div>

      {/* Analysis Scope */}
      <div className="bg-white border border-[#E2D9CC] rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full min-h-[220px]">
        <div className="flex items-center justify-between">
           <span className="text-xs font-semibold text-[#B8A898] uppercase tracking-wide font-sans">Analysis Scope</span>
           <Briefcase className="h-5 w-5 text-[#8B6F47] opacity-40" />
        </div>
        
        <div className="flex flex-col items-center justify-center flex-grow py-4">
          <div className="text-center space-y-2">
            <p className="text-5xl font-bold text-[#2A2116] leading-none tracking-tight">{totalProjects || 0}</p>
            <p className="text-[10px] text-[#B8A898] font-sans uppercase tracking-widest font-bold">Public Repositories</p>
          </div>
        </div>

        <div /> {/* Bottom spacer for consistency */}
      </div>
    </div>
  );
}
