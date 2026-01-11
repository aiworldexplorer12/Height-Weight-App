
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface Props {
  heightCm: number;
}

const WeightChart: React.FC<Props> = ({ heightCm }) => {
  const heightM = heightCm / 100;
  
  // Create data points for BMI range 15 to 40
  const data = Array.from({ length: 26 }, (_, i) => {
    const bmi = 15 + i;
    const weight = Math.round(bmi * (heightM * heightM));
    return {
      bmi,
      weight,
      category: bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obese'
    };
  });

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-[350px]">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Weight vs. BMI Visualization</h3>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="weight" 
            label={{ value: 'Weight (kg)', position: 'insideBottomRight', offset: -5 }} 
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            dataKey="bmi" 
            label={{ value: 'BMI', angle: -90, position: 'insideLeft', offset: 15 }}
            tick={{ fontSize: 12 }}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            formatter={(value: any, name: any) => [value, name === 'weight' ? 'Weight (kg)' : 'BMI']}
          />
          <Area 
            type="monotone" 
            dataKey="bmi" 
            stroke="#3b82f6" 
            fillOpacity={1} 
            fill="url(#colorWeight)" 
          />
          {/* Healthy Range Highlights */}
          <ReferenceLine y={18.5} stroke="#10b981" strokeDasharray="3 3" label={{ value: 'Healthy Min', position: 'right', fontSize: 10, fill: '#10b981' }} />
          <ReferenceLine y={25} stroke="#10b981" strokeDasharray="3 3" label={{ value: 'Healthy Max', position: 'right', fontSize: 10, fill: '#10b981' }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeightChart;
