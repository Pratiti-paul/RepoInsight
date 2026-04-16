import React from 'react';
import { Target, Zap, TrendingUp } from 'lucide-react';

export default function Features() {
  const specs = [
    {
      title: "Deep Repo Analysis",
      description: "We don't just look at stars. We analyze tech stacks, code quality, and project impact.",
      icon: <Target className="w-6 h-6 text-blue-500" />
    },
    {
      title: "Smart Scoring",
      description: "Get evaluated on a professional scale from Beginner to Strong with tailored action points.",
      icon: <Zap className="w-6 h-6 text-amber-500" />
    },
    {
      title: "Actionable Insights",
      description: "Receive exact steps on how to improve your projects to catch a recruiter's eye.",
      icon: <TrendingUp className="w-6 h-6 text-green-500" />
    }
  ];

  return (
    <section className="max-w-6xl mx-auto pt-8">
      <div className="grid md:grid-cols-3 gap-6 md:gap-8">
        {specs.map((feature, idx) => (
          <div key={idx} className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
            <p className="text-slate-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
