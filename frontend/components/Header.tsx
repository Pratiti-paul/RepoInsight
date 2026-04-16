import React from 'react';
import { Github } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/70 backdrop-blur-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105">
          <div className="bg-blue-600 p-1.5 rounded-lg shadow-sm">
            <Github className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
            RepoInsight
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-slate-500 bg-slate-100/50 px-3 py-1 rounded-full border border-slate-200">
            Powered by AI
          </span>
        </div>
      </div>
    </header>
  );
}
