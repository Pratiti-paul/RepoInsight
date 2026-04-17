'use client';

import React from 'react';
import Link from 'next/link';
import { Github } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#F7F3ED] border-b border-[#E2D9CC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="p-1.5 bg-[#2A2116] rounded-lg transition-transform group-hover:scale-105 shadow-sm">
            <Github className="h-5 w-5 text-[#F7F3ED]" />
          </div>
          <span className="text-xl font-bold text-[#2A2116] tracking-tight">
            RepoInsight
          </span>
        </Link>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center px-3 py-1 bg-[#EDE6DC] border border-[#D9CEBD] rounded-full">
            <span className="text-[10px] font-bold text-[#8B7A66] uppercase tracking-wider font-sans">
              Powered by AI
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
