import React from 'react';
import { Github, Twitter, Linkedin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg shadow-sm">
            <Github className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold text-slate-900">RepoInsight</span>
        </div>
        
        <div className="flex items-center gap-1 text-sm text-slate-500">
          <span>Built with</span>
          <Heart className="h-4 w-4 text-red-500 fill-red-500 mx-0.5" />
          <span>for Developers</span>
        </div>
        
        <div className="flex items-center gap-4">
          <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors" aria-label="GitHub">
            <Github className="h-5 w-5" />
          </a>
          <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors" aria-label="Twitter">
            <Twitter className="h-5 w-5" />
          </a>
          <a href="#" className="text-slate-400 hover:text-blue-700 transition-colors" aria-label="LinkedIn">
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
        
      </div>
    </footer>
  );
}
