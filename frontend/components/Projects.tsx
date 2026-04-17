import React from 'react';
import { ExternalLink, Star, GitFork, BookOpen, Code2, Rocket, Search } from 'lucide-react';

export interface ProjectData {
  name: string;
  summary: string;
  tech_stack: string[];
  quality: 'Beginner' | 'Intermediate' | 'Strong';
  score?: {
    total: number;
    breakdown: {
      impact: number;
      complexity: number;
      readability: number;
      consistency: number;
    };
    justification: string;
  };
  improvement: string;
}

interface ProjectsProps {
  projects: ProjectData[];
}

export default function Projects({ projects }: ProjectsProps) {
  if (!projects || projects.length === 0) return null;

  const getQualityStyle = (quality: string) => {
    switch (quality) {
      case 'Strong': return 'bg-green-50 text-green-700 border-green-200';
      case 'Intermediate': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMetricColor = (val: number, max: number) => {
    const ratio = val / max;
    if (ratio >= 0.8) return 'bg-green-500';
    if (ratio >= 0.5) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3 mb-2">
        <div className="p-2 bg-blue-600 rounded-lg text-white">
          <BookOpen className="h-6 w-6" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Repository Deep Dive</h2>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {projects.map((project, idx) => {
          const displayTotal = project.score ? Math.round(project.score.total * 10) : null;
          
          return (
            <div 
              key={idx} 
              className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all flex flex-col lg:flex-row gap-8"
            >
              {/* Left Column: Core Info */}
              <div className="flex-1 space-y-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2 group cursor-pointer">
                      {project.name}
                      <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
                    </h3>
                    <div className="flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getQualityStyle(project.quality)}`}>
                        {project.quality}
                      </span>
                    </div>
                  </div>

                  {displayTotal !== null && (
                    <div className="text-right">
                      <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Project Score</div>
                      <div className="flex items-baseline justify-end gap-1">
                        <span className={`text-4xl font-black ${getScoreColor(project.score!.total)}`}>{displayTotal}</span>
                        <span className="text-sm font-bold text-slate-300">/100</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <Rocket className="w-4 h-4" /> Purpose & Impact
                    </h4>
                    <p className="text-slate-600 leading-relaxed font-medium">
                      {project.summary}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tech_stack.map((tech, tIdx) => (
                      <span key={tIdx} className="px-3 py-1 bg-slate-50 text-slate-600 rounded-lg text-xs font-bold border border-slate-100">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-50">
                  <h4 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span> Actionable Improvement
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed italic">
                    {project.improvement}
                  </p>
                </div>
              </div>

              {/* Right Column: AI Metrics & Justification */}
              {project.score && (
                <div className="lg:w-80 bg-slate-50 rounded-2xl p-6 space-y-6 border border-slate-100">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Code2 className="w-4 h-4" /> Metric Breakdown
                    </h4>
                    
                    <div className="space-y-4">
                      {/* Impact */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-bold text-slate-600">
                          <span>Impact</span>
                          <span>{project.score.breakdown.impact}/3</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${getMetricColor(project.score.breakdown.impact, 3)}`}
                            style={{ width: `${(project.score.breakdown.impact / 3) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Complexity */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-bold text-slate-600">
                          <span>Complexity</span>
                          <span>{project.score.breakdown.complexity}/3</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${getMetricColor(project.score.breakdown.complexity, 3)}`}
                            style={{ width: `${(project.score.breakdown.complexity / 3) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Readability */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-bold text-slate-600">
                          <span>Readability</span>
                          <span>{project.score.breakdown.readability}/2</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${getMetricColor(project.score.breakdown.readability, 2)}`}
                            style={{ width: `${(project.score.breakdown.readability / 2) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Consistency */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-bold text-slate-600">
                          <span>Consistency</span>
                          <span>{project.score.breakdown.consistency}/2</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${getMetricColor(project.score.breakdown.consistency, 2)}`}
                            style={{ width: `${(project.score.breakdown.consistency / 2) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                       <Search className="w-3 h-3" /> Justification
                    </h4>
                    <p className="text-xs text-slate-500 leading-normal font-medium italic">
                      "{project.score.justification}"
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
