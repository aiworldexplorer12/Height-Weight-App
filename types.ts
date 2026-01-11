
export type Gender = 'male' | 'female';

export interface HealthData {
  heightCm: number;
  gender: Gender;
  age: number;
}

export interface WeightCalculations {
  bmi: number;
  bmiCategory: string;
  idealWeightDevine: number;
  idealWeightRobinson: number;
  idealWeightMiller: number;
  rangeMin: number;
  rangeMax: number;
}

export interface AIInsight {
  summary: string;
  recommendations: string[];
  nutritionalTips: string[];
  activitySuggestions: string[];
}
