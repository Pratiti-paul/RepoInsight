import React from 'react';
import { Target, AlertTriangle, Lightbulb, Star, Construction } from 'lucide-react';

interface TopProjectData {
  name: string;
  reasoning: string;
}

interface InsightsProps {
  strengths: string[];
  weaknesses: string[];
  missing_skills: string[];
  top_projects: TopProjectData[];
}

export default function Insights({ strengths, weaknesses, missing_skills, top_projects }: InsightsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
      {/* Portfolio Analysis */}
      <div className="bg-white border border-[#E2D9CC] rounded-2xl p-6 shadow-sm space-y-8 animate-fade-in-up">
        <div className="flex items-center gap-3 border-b border-[#EDE6DC] pb-4">
          <div className="p-2 bg-[#EDE6DC] rounded-xl text-[#8B6F47]">
            <Target className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold text-[#2A2116] uppercase tracking-[0.15em] font-sans">Core Analysis</h3>
        </div>

        <div className="space-y-6">
          <Section label="Key Differentiators" items={strengths} color="#4A7C40" icon={<Star className="w-3 h-3" />} />
          <Section label="Growth Areas" items={weaknesses} color="#B85040" icon={<AlertTriangle className="w-3 h-3" />} />
          <Section label="Missing Tech Stack" items={missing_skills} color="#5A519C" icon={<Construction className="w-3 h-3" />} />
        </div>
      </div>

      {/* Recruiter Picks */}
      <div className="bg-white border border-[#E2D9CC] rounded-2xl p-6 shadow-sm space-y-8 animate-fade-in-up transition-all" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center gap-3 border-b border-[#EDE6DC] pb-4">
          <div className="p-2 bg-[#EDE6DC] rounded-xl text-[#8B6F47]">
            <Lightbulb className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold text-[#2A2116] uppercase tracking-[0.15em] font-sans">Recruiter Recommendations</h3>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <p className="text-xs font-bold text-[#8B6F47] uppercase tracking-widest font-sans px-1">Top Project Highlights</p>
            <div className="space-y-3">
              {top_projects.map((proj, idx) => (
                <div key={idx} className="p-4 bg-[#F7F3ED] rounded-xl border border-[#E2D9CC] group hover:border-[#D9CEBD] transition-all">
                  <h4 className="text-sm font-bold text-[#2A2116] mb-1">{proj.name}</h4>
                  <p className="text-xs text-[#8B7A66] italic font-medium leading-relaxed">
                    "{proj.reasoning}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ label, items, color, icon }: { label: string, items: string[], color: string, icon: React.ReactNode }) {
  if (!items || items.length === 0) return null;
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 px-1">
         <span className="text-xs font-bold uppercase tracking-widest font-sans" style={{ color }}>{label}</span>
      </div>
      <ul className="grid grid-cols-1 gap-2">
        {items.map((item, id) => (
          <li key={id} className="flex items-start gap-3 p-2 group transition-colors">
            <div className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
            <span className="text-[#5C4D3A] text-sm leading-relaxed font-medium">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
