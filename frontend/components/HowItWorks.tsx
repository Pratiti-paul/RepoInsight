import React from 'react';

export default function HowItWorks() {
  const steps = [
    {
      step: "1",
      title: "Enter GitHub username",
      desc: "Just drop in any public GitHub handle. No authentication required."
    },
    {
      step: "2",
      title: "We analyze top repositories",
      desc: "Our AI pulls the most relevant projects based on stars, forks, and recency."
    },
    {
      step: "3",
      title: "Get structured insights",
      desc: "Read a complete matrix of technical strengths, weaknesses, and hireability."
    }
  ];

  return (
    <section className="max-w-5xl mx-auto py-12 md:py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">How It Works</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative px-4">
        {/* Connection line for desktop */}
        <div className="hidden md:block absolute top-[28px] left-[15%] right-[15%] h-px bg-slate-200 -z-10"></div>
        
        {steps.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-blue-600 text-white font-bold text-xl flex items-center justify-center mb-6 ring-8 ring-white shadow-sm">
              {item.step}
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-[250px]">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
