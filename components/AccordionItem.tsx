import React, { useState } from 'react';
import { TrainingWeek } from '../types';

interface AccordionItemProps {
  week: TrainingWeek;
}

const getIconForSession = (sessionType: string) => {
    const type = sessionType.toLowerCase();
    if (type.includes('descanso')) return <span title="Descanso">😴</span>;
    if (type.includes('fondo') || type.includes('largo')) return <span title="Fondo Largo">🛣️</span>;
    if (type.includes('intervalos') || type.includes('series')) return <span title="Intervalos/Series">⚡️</span>;
    if (type.includes('tempo') || type.includes('umbral')) return <span title="Tempo/Umbral">⏱️</span>;
    if (type.includes('recuperación') || type.includes('suave')) return <span title="Trote de Recuperación">🧘‍♂️</span>;
    if (type.includes('fartlek')) return <span title="Fartlek">🏞️</span>;
    return <span title="Carrera">🏃‍♂️</span>;
};


const AccordionItem: React.FC<AccordionItemProps> = ({ week }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 text-left hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-red-500"
        aria-expanded={isOpen}
      >
        <span className="font-bold text-md text-gray-800">
          Semana {week.semana}: <span className="text-gray-600 font-normal">{week.resumen_semanal}</span>
        </span>
        <svg
          className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="p-4 border-t border-slate-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                    Icono
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Día
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo de Sesión
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descripción Detallada
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {week.dias.map((day, index) => (
                  <tr key={index} className="hover:bg-slate-50">
                    <td className="px-4 py-4 text-xl text-center">{getIconForSession(day.tipo_sesion)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{day.dia}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">{day.tipo_sesion}</td>
                    <td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-600">{day.descripcion_detallada}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;