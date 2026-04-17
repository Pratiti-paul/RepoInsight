import React from 'react';
import { ExternalLink, BookOpen, Rocket, Search, ShieldCheck, ShieldAlert, Shield } from 'lucide-react';

export interface ProjectData {
  name: string;
  summary: string;
  tech_stack: string[];
  project_strength: 'Strong' | 'Intermediate' | 'Weak';
  reasoning: string;
}

interface ProjectsProps {
  projects: ProjectData[];
}

export default function Projects({ projects }: ProjectsProps) {
  if (!projects || projects.length === 0) return null;

  const getStrengthMeta = (strength: string) => {
    switch (strength) {
      case 'Strong': 
        return {
          bg: 'bg-green-50 text-green-700 border-green-200',
          icon: <ShieldCheck className="w-4 h-4" />,
          label: 'Strong Project'
        };
      case 'Intermediate': 
        return {
          bg: 'bg-blue-50 text-blue-700 border-blue-200',
          icon: <Shield className="w-4 h-4" />,
          label: 'Intermediate'
        };
      default: 
        return {
          bg: 'bg-amber-50 text-amber-600 border-amber-200',
          icon: <ShieldAlert className="w-4 h-4" />,
          label: 'Needs Growth'
        };
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3 mb-2">
        <div className="p-2 bg-blue-600 rounded-lg text-white font-bold">
          <BookOpen className="h-6 w-6" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Recruiter Analysis</h2>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {projects.map((project, idx) => {
          const meta = getStrengthMeta(project.project_strength);
          
          return (
            <div 
              key={idx} 
              className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all flex flex-col lg:flex-row gap-8"
            >
              {/* Left Column: Core Info */}
              <div className="flex-1 space-y-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2 group cursor-pointer decoration-blue-500/30 hover:underline">
                      {project.name}
                      <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
                    </h3>
                    <div className="flex gap-2">
                      <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border flex items-center gap-1.5 ${meta.bg}`}>
                        {meta.icon}
                        {meta.label}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Rocket className="w-4 h-4" /> Professional Impact
                    </h4>
                    <p className="text-slate-700 leading-relaxed font-semibold">
                      {project.summary}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tech_stack.map((tech, tIdx) => (
                      <span key={tIdx} className="px-3 py-1 bg-slate-50 text-slate-500 rounded-lg text-[11px] font-bold border border-slate-100 uppercase tracking-wider">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: AI Reasoning */}
              <div className="lg:w-96 bg-blue-50/40 rounded-2xl p-6 border border-blue-100/50 flex flex-col justify-center">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-blue-500" />
                    <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest">Recruiter's Reasoning</h4>
                  </div>
                  
                  <p className="text-sm text-slate-600 leading-relaxed font-medium italic">
                    "{project.reasoning}"
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
