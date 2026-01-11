
import React, { useState, useCallback } from 'react';
import { HealthData, WeightCalculations, AIInsight } from './types';
import HeightInput from './components/HeightInput';
import WeightChart from './components/WeightChart';
import HealthInsightsDisplay from './components/HealthInsightsDisplay';
import { getHealthInsights } from './services/geminiService';

const App: React.FC = () => {
  const [data, setData] = useState<HealthData>({
    heightCm: 175,
    gender: 'male',
    age: 30,
  });

  const [calculations, setCalculations] = useState<WeightCalculations | null>(null);
  const [insights, setInsights] = useState<AIInsight | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateWeightMetrics = (health: HealthData): WeightCalculations => {
    const { heightCm, gender } = health;
    const heightIn = heightCm / 2.54;
    const heightM = heightCm / 100;
    const inchesOver5ft = Math.max(0, heightIn - 60);

    // Ideal Body Weight Formulas (IBW)
    let devine, robinson, miller;
    if (gender === 'male') {
      devine = 50 + 2.3 * inchesOver5ft;
      robinson = 52 + 1.9 * inchesOver5ft;
      miller = 56.2 + 1.41 * inchesOver5ft;
    } else {
      devine = 45.5 + 2.3 * inchesOver5ft;
      robinson = 49 + 1.7 * inchesOver5ft;
      miller = 53.1 + 1.36 * inchesOver5ft;
    }

    // Normal BMI Range (18.5 to 25)
    const rangeMin = 18.5 * (heightM * heightM);
    const rangeMax = 25 * (heightM * heightM);

    return {
      bmi: 0, // Placeholder, usually calculated with current weight
      bmiCategory: "Healthy Range Focus",
      idealWeightDevine: Math.round(devine * 10) / 10,
      idealWeightRobinson: Math.round(robinson * 10) / 10,
      idealWeightMiller: Math.round(miller * 10) / 10,
      rangeMin: Math.round(rangeMin * 10) / 10,
      rangeMax: Math.round(rangeMax * 10) / 10,
    };
  };

  const handleCalculate = async () => {
    setLoading(true);
    setError(null);
    try {
      const results = calculateWeightMetrics(data);
      setCalculations(results);
      
      const aiResponse = await getHealthInsights(data);
      setInsights(aiResponse);
    } catch (err) {
      console.error(err);
      setError("Failed to generate insights. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              VitalWeight Pro
            </h1>
          </div>
          <div className="hidden md:block text-sm text-slate-500 font-medium">
            AI-Powered Precision Health
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pt-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column: Input */}
          <div className="lg:col-span-4 space-y-6">
            <HeightInput 
              data={data} 
              onChange={setData} 
              onCalculate={handleCalculate}
              loading={loading}
            />
            
            {calculations && (
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl text-white shadow-xl shadow-blue-100">
                <h3 className="text-lg font-semibold mb-4 opacity-90">Healthy Weight Range</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">{calculations.rangeMin} - {calculations.rangeMax}</span>
                  <span className="text-xl opacity-80 font-medium">kg</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed opacity-80">
                  This range corresponds to a BMI of 18.5 to 25, widely considered the medical standard for optimal health.
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Results & Analysis */}
          <div className="lg:col-span-8 space-y-8">
            {!calculations && !loading && (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-white rounded-2xl border-2 border-dashed border-slate-200">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-700 mb-2">Ready to Analyze</h2>
                <p className="text-slate-500 max-w-sm">
                  Enter your height and demographic details to generate a comprehensive weight analysis and AI-driven health roadmap.
                </p>
              </div>
            )}

            {loading && (
              <div className="space-y-6 animate-pulse">
                <div className="h-[350px] bg-white rounded-2xl"></div>
                <div className="h-32 bg-white rounded-2xl"></div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="h-40 bg-white rounded-2xl"></div>
                  <div className="h-40 bg-white rounded-2xl"></div>
                  <div className="h-40 bg-white rounded-2xl"></div>
                </div>
              </div>
            )}

            {calculations && !loading && (
              <>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm text-center">
                    <span className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-1 block">Devine Formula</span>
                    <div className="text-2xl font-bold text-slate-800">{calculations.idealWeightDevine} kg</div>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm text-center">
                    <span className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-1 block">Robinson Formula</span>
                    <div className="text-2xl font-bold text-slate-800">{calculations.idealWeightRobinson} kg</div>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm text-center">
                    <span className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-1 block">Miller Formula</span>
                    <div className="text-2xl font-bold text-slate-800">{calculations.idealWeightMiller} kg</div>
                  </div>
                </div>

                <WeightChart heightCm={data.heightCm} />
                
                {insights && <HealthInsightsDisplay insights={insights} />}
                
                {error && (
                  <div className="p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl text-sm flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <footer className="mt-20 border-t border-slate-200 py-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm">
            Disclaimer: This application provides health estimates based on standardized formulas. 
            Consult with a medical professional for personalized health advice.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
