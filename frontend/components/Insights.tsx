import React from 'react';
import { ThumbsUp, AlertTriangle, Lightbulb, UserMinus } from 'lucide-react';

interface TopProjectData {
  name: string;
  reasoning: string;
}

interface InsightsProps {
  strengths: string[];
  weaknesses: string[];
  missing_skills: string[];
  red_flags?: string[];
  top_projects: TopProjectData[];
}

export default function Insights({
  strengths,
  weaknesses,
  missing_skills,
  red_flags,
  top_projects,
}: InsightsProps) {
  const ListSection = ({ title, items, icon: Icon, colorClass }: { title: string, items: string[], icon: any, colorClass: string }) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Icon className={`h-4 w-4 ${colorClass}`} />
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">{title}</h4>
        </div>
        <ul className="space-y-4">
          {items.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className={`inline-block w-1 h-1 rounded-full mt-2 mr-3 flex-shrink-0 ${colorClass.replace('text-', 'bg-')}`} />
              <span className="text-slate-600 text-sm leading-loose font-medium">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Left Column: Positive/Negative signals */}
      <div className="bg-white rounded-[2.5rem] p-10 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.02)] space-y-16">
        <ListSection title="Strengths" items={strengths} icon={ThumbsUp} colorClass="text-emerald-500" />
        <ListSection title="Major Weaknesses" items={weaknesses} icon={AlertTriangle} colorClass="text-amber-500" />
        {red_flags && red_flags.length > 0 && (
          <ListSection title="Critical Red Flags" items={red_flags} icon={AlertTriangle} colorClass="text-red-500" />
        )}
      </div>

      {/* Right Column: Growth & Recommendations */}
      <div className="bg-white rounded-[2.5rem] p-10 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.02)] space-y-16">
        <ListSection title="Growth Opportunities" items={missing_skills} icon={UserMinus} colorClass="text-purple-500" />
        
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <Lightbulb className="h-4 w-4 text-blue-500" />
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Strategy Recommendations</h4>
          </div>
          <ul className="space-y-8">
            {top_projects && top_projects.map((project, index) => (
              <li key={index} className="flex flex-col space-y-2">
                <div className="font-bold text-slate-800 text-sm flex items-center">
                  <span className="inline-block w-1 h-1 rounded-full mr-3 flex-shrink-0 bg-blue-500" />
                  {project.name}
                </div>
                <div className="text-slate-500 text-xs leading-loose pl-4 font-medium italic">
                  "{project.reasoning}"
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
