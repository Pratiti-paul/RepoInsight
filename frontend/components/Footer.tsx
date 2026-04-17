'use client';

import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#F7F3ED] border-t border-[#E2D9CC] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <div className="p-1.5 bg-[#2A2116] rounded-lg">
                <Github className="h-5 w-5 text-[#F7F3ED]" />
              </div>
              <span className="text-xl font-bold text-[#2A2116] tracking-tight">RepoInsight</span>
            </div>
            <p className="text-[#8B7A66] text-xs font-sans">
              Built with precision for the next generation of software elite.
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-[#B8A898] hover:text-[#2A2116] transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-[#B8A898] hover:text-[#2A2116] transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="text-[#B8A898] hover:text-[#2A2116] transition-colors">
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-[#E2D9CC]/50 text-center">
          <p className="text-[#B8A898] text-[10px] uppercase tracking-widest font-sans">
            &copy; {new Date().getFullYear()} RepoInsight. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
