import React from 'react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Submit Identity',
      description: 'Enter your GitHub username to authorize our AI agent to trace your engineering evolution.',
    },
    {
      number: '02',
      title: 'Neural Deep-Dive',
      description: 'Our engine parses repository complexity, code patterns, and professional signals across your history.',
    },
    {
      number: '03',
      title: 'Recruiter Calibration',
      description: 'Receive a personalized assessment mapped to real-world hiring standards and senior-level expectations.',
    },
  ];

  return (
    <div className="py-12">
      <div className="text-center mb-16 space-y-3">
        <h2 className="text-2xl font-bold text-[#2A2116] tracking-tight">The Analysis Pipeline</h2>
        <p className="text-[#8B7A66] text-sm font-medium font-sans italic">Synthesizing raw data into professional intelligence.</p>
      </div>

      <div className="relative">
        <div className="hidden md:block absolute top-10 left-0 w-full h-0.5 bg-[#E2D9CC]" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-center space-y-6">
              <div className="z-10 w-16 h-16 bg-[#2A2116] text-[#F7F3ED] rounded-full flex items-center justify-center text-xl font-bold ring-8 ring-[#F7F3ED] shadow-sm">
                {step.number}
              </div>
              <div className="space-y-2 px-4">
                <h3 className="text-lg font-bold text-[#2A2116]">{step.title}</h3>
                <p className="text-[#5C4D3A] text-sm leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
