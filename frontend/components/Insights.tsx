import React from 'react';
import { ThumbsUp, AlertTriangle, Lightbulb, UserMinus, Activity, FolderGit2 } from 'lucide-react';

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
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-3">
          <Icon className={`h-5 w-5 ${colorClass}`} />
          <h4 className="font-semibold text-slate-800">{title}</h4>
        </div>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className={`inline-block w-1.5 h-1.5 rounded-full mt-2 mr-2 flex-shrink-0 ${colorClass.replace('text-', 'bg-')}`} />
              <span className="text-slate-600 text-sm leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left Column */}
      <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 h-full">
        <ListSection title="Strengths" items={strengths} icon={ThumbsUp} colorClass="text-green-500" />
        <div className="h-px bg-slate-100 my-6"></div>
        <ListSection title="Weaknesses" items={weaknesses} icon={AlertTriangle} colorClass="text-orange-500" />
        {red_flags && red_flags.length > 0 && (
          <>
            <div className="h-px bg-slate-100 my-6"></div>
            <ListSection title="Red Flags" items={red_flags} icon={AlertTriangle} colorClass="text-red-500" />
          </>
        )}
      </div>

      {/* Right Column */}
      <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 h-full">
        <ListSection title="Missing Skills to Learn" items={missing_skills} icon={UserMinus} colorClass="text-purple-500" />
        <div className="h-px bg-slate-100 my-6"></div>
        
        {/* Render Top Projects specifically because it's now an array of objects */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <Lightbulb className="h-5 w-5 text-blue-500" />
            <h4 className="font-semibold text-slate-800">Top AI Recommended Projects</h4>
          </div>
          <ul className="space-y-4">
            {top_projects && top_projects.map((project, index) => (
              <li key={index} className="flex items-start flex-col">
                <div className="font-medium text-slate-800 flex items-center mb-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full mr-2 flex-shrink-0 bg-blue-500" />
                  {project.name}
                </div>
                <div className="text-slate-600 text-sm leading-relaxed pl-3.5">
                  {project.reasoning}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
