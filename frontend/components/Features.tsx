import React from 'react';
import { Target, Zap, TrendingUp } from 'lucide-react';

export default function Features() {
  const features = [
    {
      title: 'Precision Targeting',
      description: 'Our AI looks specifically for high-signal repositories that demonstrate deep problem-solving and architectural thinking.',
      icon: <Target className="w-6 h-6 text-[#8B6F47]" />,
    },
    {
      title: 'Instant Calibration',
      description: 'Get an immediate hireability score and seniority assessment based on real-world engineering benchmarks.',
      icon: <Zap className="w-6 h-6 text-[#8B6F47]" />,
    },
    {
      title: 'Strategic Growth',
      description: 'Identify exactly which professional skills are missing from your public profile to maximize your recruiter impact.',
      icon: <TrendingUp className="w-6 h-6 text-[#4A7C40]" />,
    },
  ];

  return (
    <div className="py-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="group bg-white border border-[#E2D9CC] p-8 rounded-2xl shadow-sm hover:shadow-md hover:border-[#D9CEBD] transition-all duration-300"
          >
            <div className="w-12 h-12 bg-[#EDE6DC] rounded-xl flex items-center justify-center mb-6 shadow-sm">
              {feature.icon}
            </div>
            <h3 className="text-lg font-bold text-[#2A2116] mb-3 leading-tight">{feature.title}</h3>
            <p className="text-[#5C4D3A] text-sm leading-relaxed font-medium">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
