
import React from 'react';
import { AIInsight } from '../types.ts';

interface Props {
  insights: AIInsight;
}

const HealthInsightsDisplay: React.FC<Props> = ({ insights }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
          <span className="bg-purple-100 text-purple-600 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </span>
          AI Profile Summary
        </h3>
        <p className="text-slate-600 leading-relaxed italic">"{insights.summary}"</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100">
          <h4 className="font-bold text-blue-800 mb-3">Nutritional Focus</h4>
          <ul className="space-y-2">
            {insights.nutritionalTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-blue-700">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0"></span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-green-50 p-5 rounded-2xl border border-green-100">
          <h4 className="font-bold text-green-800 mb-3">Activity Plan</h4>
          <ul className="space-y-2">
            {insights.activitySuggestions.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-green-700">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-400 shrink-0"></span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-amber-50 p-5 rounded-2xl border border-amber-100">
          <h4 className="font-bold text-amber-800 mb-3">Key Recommendations</h4>
          <ul className="space-y-2">
            {insights.recommendations.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-amber-700">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0"></span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HealthInsightsDisplay;
