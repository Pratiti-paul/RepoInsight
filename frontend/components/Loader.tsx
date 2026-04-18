'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, Check, Clock, BrainCircuit, Search, BarChart3, Rocket } from 'lucide-react';

export default function Loader() {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    { label: 'Initializing Neural Trace', icon: <Search className="w-4 h-4" /> },
    { label: 'Deep-Parsing Repository Logic', icon: <BrainCircuit className="w-4 h-4" /> },
    { label: 'Calibrating Professional Signals', icon: <BarChart3 className="w-4 h-4" /> },
    { label: 'Synthesizing Strategic Insights', icon: <Rocket className="w-4 h-4" /> },
  ];

  useEffect(() => {
    // Progress bar tick: slower overall and asymptotes toward 99%
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 99) return 99;
        
        // Dynamic increment: starts fast, slows down
        let increment = 1;
        if (prev > 80) increment = 0.3;
        else if (prev > 50) increment = 0.6;
        
        return Math.min(parseFloat((prev + increment).toFixed(1)), 99);
      });
    }, 400); // 400ms * 100 ticks = 40 seconds baseline

    // Content steps: advance every 8 seconds (total 32s for 4 steps)
    const stepTimer = setInterval(() => {
      setStep((prev) => {
        if (prev >= steps.length - 1) return prev;
        return prev + 1;
      });
    }, 8000); 

    return () => {
      clearInterval(timer);
      clearInterval(stepTimer);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-10 pt-2 pb-12 animate-in fade-in duration-700">
      
      {/* Central Icon */}
      <div className="relative">
        <div className="bg-white border border-[#E2D9CC] rounded-2xl p-6 shadow-sm relative z-10 transition-transform duration-1000 animate-pulse">
           <Loader2 className="w-10 h-10 text-[#2A2116] animate-spin" />
        </div>
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold text-[#2A2116] tracking-tight">AI Agent Analysis in Progress</h2>
        <p className="text-[#B8A898] text-xs font-sans italic">Assembling your professional intelligence report...</p>
      </div>

      <div className="w-full max-w-md bg-white border border-[#E2D9CC] rounded-2xl p-8 shadow-sm space-y-10">
        
        {/* Progress Pipeline */}
        <div className="space-y-4">
          {steps.map((s, idx) => {
            const isCompleted = idx < step;
            const isActive = idx === step;
            
            return (
              <div key={idx} className="flex items-center gap-4 transition-all duration-500">
                <div className={`p-2 rounded-xl flex items-center justify-center border transition-all duration-500 ${
                  isCompleted ? 'bg-[#E8F0E4] border-[#C6D9A0] text-[#4A7C40]' : 
                  isActive ? 'bg-[#EDE6DC] border-[#D9CEBD] text-[#8B6F47]' : 
                  'bg-[#F7F3ED] border-[#E2D9CC] text-[#B8A898]'
                }`}>
                  {isCompleted ? <Check className="w-4 h-4" /> : s.icon}
                </div>
                <span className={`text-sm font-medium ${
                  isCompleted ? 'text-[#B8A898] line-through decoration-[#B8A898]/30' : 
                  isActive ? 'text-[#2A2116] font-semibold' : 
                  'text-[#B8A898]/60 font-sans'
                }`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Global Progress Bar */}
        <div className="space-y-4 pt-4 border-t border-[#F7F3ED]">
          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest font-sans">
             <span className="text-[#B8A898]">Pipeline Progress</span>
             <span className="text-[#8B6F47]">{progress}%</span>
          </div>
          <div className="h-1.5 w-full bg-[#EDE6DC] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#2A2116] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
