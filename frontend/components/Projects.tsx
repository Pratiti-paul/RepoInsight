import React from 'react';
import { BookOpen, Rocket, Search, ShieldCheck, ShieldAlert, Shield } from 'lucide-react';

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
          bg: 'bg-green-50 text-green-700 border-green-100',
          icon: <ShieldCheck className="w-4 h-4" />,
          label: 'Strong Signal'
        };
      case 'Intermediate': 
        return {
          bg: 'bg-blue-50 text-blue-700 border-blue-100',
          icon: <Shield className="w-4 h-4" />,
          label: 'Solid Potential'
        };
      default: 
        return {
          bg: 'bg-amber-50 text-amber-600 border-amber-100',
          icon: <ShieldAlert className="w-4 h-4" />,
          label: 'Foundational'
        };
    }
  };

  return (
    <div className="space-y-16">
      <div className="flex flex-col items-center text-center space-y-4 mb-12">
        <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-xl shadow-blue-200">
          <BookOpen className="h-6 w-6" />
        </div>
        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Project Deep Dive</h2>
        <p className="text-slate-500 max-w-lg mx-auto text-sm font-medium leading-relaxed">
           A detailed analysis of individual repositories, identifying professional signals and complexity.
        </p>
      </div>

      <div className="space-y-24">
        {projects.map((project, idx) => {
          const meta = getStrengthMeta(project.project_strength);
          
          return (
            <div 
              key={idx} 
              className="bg-white rounded-[2.5rem] p-10 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.02)] flex flex-col gap-12 border border-slate-50/50"
            >
              {/* Main Content Area */}
              <div className="flex flex-col lg:flex-row items-start gap-12">
                
                {/* Left: Project Branding & Info */}
                <div className="flex-1 space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border flex items-center gap-1.5 ${meta.bg}`}>
                        {meta.icon}
                        {meta.label}
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 tracking-tight leading-none">
                      {project.name}
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-1">
                      <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] flex items-center gap-2">
                        <Rocket className="w-3 h-3" /> Impact Summary
                      </h4>
                      <p className="text-slate-700 text-lg leading-relaxed font-semibold">
                        {project.summary}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-2">
                      {project.tech_stack.map((tech, tIdx) => (
                        <span key={tIdx} className="px-4 py-1.5 bg-slate-50 text-slate-400 rounded-xl text-[10px] font-bold border border-slate-100/50 uppercase tracking-widest">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: AI Recruiter Column */}
                <div className="lg:w-[26rem] bg-slate-50/50 rounded-[2rem] p-8 border border-slate-100/50 flex flex-col justify-center gap-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Search className="w-4 h-4 text-blue-500" />
                      <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Recruiter's Perspective</h4>
                    </div>
                    
                    <p className="text-sm text-slate-600 leading-loose font-medium italic">
                      "{project.reasoning}"
                    </p>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
