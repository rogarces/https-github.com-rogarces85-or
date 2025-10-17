import React, { forwardRef } from 'react';
import { TrainingPlan } from '../types';
import AccordionItem from './AccordionItem';

interface PlanDisplayProps {
  plan: TrainingPlan;
  onExportPDF: () => void;
}

const PlanDisplay = forwardRef<HTMLDivElement, PlanDisplayProps>(({ plan, onExportPDF }, ref) => {
  return (
    <section className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-gray-700">Tu Plan de Entrenamiento Personalizado</h2>
        <button
          onClick={onExportPDF}
          className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors flex items-center justify-center sm:w-auto w-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
             <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Exportar a PDF
        </button>
      </div>
      <div className="space-y-3" ref={ref}>
        {plan.map((week) => (
          <AccordionItem key={week.semana} week={week} />
        ))}
      </div>
    </section>
  );
});

export default PlanDisplay;