import React, { useState } from 'react';
import { AthleteData } from '../types';

interface TrainingFormProps {
  onSubmit: (data: AthleteData) => void;
  isLoading: boolean;
}

const TrainingForm: React.FC<TrainingFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<AthleteData>({
    name: 'Atleta',
    age: 30,
    experience: 'Intermedio',
    distance: '21K',
    targetTime: '01:45:00',
    currentPace: '05:30',
    healthConditions: 'Ninguna',
    injuryHistory: 'Ninguna',
    prepWeeks: 12,
    trainingDays: 4,
    terrain: 'Mixto',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'age' || name === 'prepWeeks' || name === 'trainingDays' ? parseInt(value, 10) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClasses = "w-full bg-slate-100 border border-slate-300 text-gray-800 rounded-md p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition";
  const labelClasses = "block text-sm font-medium text-gray-600 mb-1";

  return (
    <section className="bg-white p-6 rounded-lg shadow-lg h-full">
      <h2 className="text-xl font-bold mb-6 text-center text-gray-700">Configuración del Atleta</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className={labelClasses}>Nombre</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className={inputClasses} required />
            </div>
            <div>
              <label htmlFor="age" className={labelClasses}>Edad</label>
              <input type="number" name="age" id="age" value={formData.age} onChange={handleChange} className={inputClasses} required min="12" max="100"/>
            </div>
        </div>

        <div>
            <label htmlFor="experience" className={labelClasses}>Nivel de Experiencia</label>
            <select name="experience" id="experience" value={formData.experience} onChange={handleChange} className={inputClasses} required>
                <option>Principiante</option>
                <option>Intermedio</option>
                <option>Avanzado</option>
            </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="distance" className={labelClasses}>Distancia</label>
              <select name="distance" id="distance" value={formData.distance} onChange={handleChange} className={inputClasses} required>
                <option>5K</option>
                <option>10K</option>
                <option>21K</option>
                <option>42K</option>
              </select>
            </div>
            <div>
              <label htmlFor="targetTime" className={labelClasses}>T. Objetivo</label>
              <input type="text" name="targetTime" id="targetTime" value={formData.targetTime} onChange={handleChange} className={inputClasses} placeholder="01:45:00" required />
            </div>
            <div>
              <label htmlFor="currentPace" className={labelClasses}>Ritmo Actual</label>
              <input type="text" name="currentPace" id="currentPace" value={formData.currentPace} onChange={handleChange} className={inputClasses} placeholder="5:30" required />
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="prepWeeks" className={labelClasses}>Semanas</label>
              <input type="number" name="prepWeeks" id="prepWeeks" value={formData.prepWeeks} onChange={handleChange} className={inputClasses} required min="4" max="24"/>
            </div>
            <div>
              <label htmlFor="trainingDays" className={labelClasses}>Días/Sem</label>
              <select name="trainingDays" id="trainingDays" value={formData.trainingDays} onChange={handleChange} className={inputClasses} required>
                {[...Array(5)].map((_, i) => <option key={i+3} value={i+3}>{i+3}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="terrain" className={labelClasses}>Terreno</label>
              <select name="terrain" id="terrain" value={formData.terrain} onChange={handleChange} className={inputClasses} required>
                <option>Calle</option>
                <option>Trotadora</option>
                <option>Mixto</option>
              </select>
            </div>
        </div>
        
        <div>
          <label htmlFor="healthConditions" className={labelClasses}>Condiciones de Salud</label>
          <input type="text" name="healthConditions" id="healthConditions" value={formData.healthConditions} onChange={handleChange} className={inputClasses} placeholder="Asma, hipertensión, etc." />
        </div>
        <div>
          <label htmlFor="injuryHistory" className={labelClasses}>Historial de Lesiones</label>
          <input type="text" name="injuryHistory" id="injuryHistory" value={formData.injuryHistory} onChange={handleChange} className={inputClasses} placeholder="Tendinitis, fascitis plantar, etc." />
        </div>

        <div className="text-center pt-4">
          <button type="submit" disabled={isLoading} className="w-full bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none">
            {isLoading ? 'Generando Plan...' : 'Crear mi Plan'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default TrainingForm;