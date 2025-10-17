
export interface AthleteData {
  name: string;
  age: number;
  experience: 'Principiante' | 'Intermedio' | 'Avanzado';
  distance: '5K' | '10K' | '21K' | '42K';
  targetTime: string;
  currentPace: string;
  healthConditions: string;
  injuryHistory: string;
  prepWeeks: number;
  trainingDays: number;
  terrain: 'Mixto' | 'Calle' | 'Trotadora';
}

export interface TrainingDay {
  dia: string;
  tipo_sesion: string;
  descripcion_detallada: string;
}

export interface TrainingWeek {
  semana: number;
  resumen_semanal: string;
  dias: TrainingDay[];
}

export type TrainingPlan = TrainingWeek[];
