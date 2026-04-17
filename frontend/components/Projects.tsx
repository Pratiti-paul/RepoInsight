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
          bg: 'bg-[#E8F0E4] text-[#4A7C40] border-[#C6D9A0]',
          icon: <ShieldCheck className="w-4 h-4" />,
          label: 'Strong Signal'
        };
      case 'Intermediate': 
        return {
          bg: 'bg-[#EAE8F5] text-[#5A519C] border-[#C4C1ED]',
          icon: <Shield className="w-4 h-4" />,
          label: 'Solid Potential'
        };
      default: 
        return {
          bg: 'bg-[#EDE6DC] text-[#8B6F47] border-[#D9CEBD]',
          icon: <ShieldAlert className="w-4 h-4" />,
          label: 'Foundational'
        };
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col items-center text-center space-y-4 mb-12">
        <div className="p-3 bg-[#2A2116] rounded-2xl text-[#F7F3ED] shadow-sm">
          <BookOpen className="h-6 w-6" />
        </div>
        <h2 className="text-2xl font-bold text-[#2A2116] tracking-tight">Project Deep Dive</h2>
        <p className="text-[#8B7A66] max-w-lg mx-auto text-sm font-medium leading-relaxed font-sans">
           A detailed analysis of individual repositories, identifying professional signals and complexity.
        </p>
      </div>

      <div className="space-y-6">
        {projects.map((project, idx) => {
          const meta = getStrengthMeta(project.project_strength);
          
          return (
            <div 
              key={idx} 
              className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-6 border border-[#E2D9CC]"
            >
              {/* Main Content Area */}
              <div className="flex flex-col lg:flex-row items-stretch gap-8">
                
                {/* Left: Project Branding & Info */}
                <div className="flex-1 space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                       <span className={`px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1.5 font-sans ${meta.bg}`}>
                        {meta.icon}
                        {meta.label}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-[#2A2116] tracking-tight leading-tight">
                      {project.name}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-[#B8A898] uppercase tracking-widest font-sans flex items-center gap-2">
                        <Rocket className="w-3 h-3" /> Impact Summary
                      </h4>
                      <p className="text-[#5C4D3A] text-sm leading-relaxed font-medium">
                        {project.summary}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.tech_stack && project.tech_stack.map((tech, tIdx) => (
                        <span key={tIdx} className="px-3 py-1 bg-[#EDE6DC] text-[#8B6F47] rounded-md text-xs font-semibold border border-[#D9CEBD]/50 font-sans">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: AI Recruiter Column */}
                <div className="lg:w-80 bg-[#F7F3ED] rounded-xl p-6 border border-[#E2D9CC] flex flex-col justify-center">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Search className="w-4 h-4 text-[#8B6F47]" />
                      <h4 className="text-xs font-bold text-[#8B6F47] uppercase tracking-wide font-sans">Recruiter's Perspective</h4>
                    </div>
                    
                    <p className="text-sm text-[#5C4D3A] leading-relaxed font-medium italic">
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
