import React, { useState, useRef, useCallback } from 'react';
import { AthleteData, TrainingPlan } from './types';
import { generatePlan } from './services/geminiService';
import TrainingForm from './components/TrainingForm';
import PlanDisplay from './components/PlanDisplay';
import Spinner from './components/Spinner';
import ErrorMessage from './components/ErrorMessage';
import Header from './components/Header';

// Declaring jsPDF and html2canvas from global scope
declare const jspdf: any;
declare const html2canvas: any;

const App: React.FC = () => {
  const [trainingPlan, setTrainingPlan] = useState<TrainingPlan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const planRef = useRef<HTMLDivElement>(null);

  const handleFormSubmit = async (data: AthleteData) => {
    setIsLoading(true);
    setError(null);
    setTrainingPlan(null);

    try {
      const plan = await generatePlan(data);
      setTrainingPlan(plan);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error al generar el plan: ", err);
        if (err.message.includes('API key not valid')) {
            setError('Error de API: La clave de API no es válida. Por favor, verifique su configuración.');
        } else if (err.message.includes('Quota')) {
            setError('Error de Cuota: Se ha excedido la cuota de la API. Por favor, intente de nuevo más tarde.');
        } else if (err.message.includes('CORS')) {
            setError('Error de CORS: La solicitud fue bloqueada por la política CORS. Asegúrese de ejecutar esto desde un entorno de servidor si es necesario.');
        }
        else {
            setError(`Se produjo un error al generar el plan: ${err.message}`);
        }
      } else {
        setError('Se produjo un error desconocido.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportPDF = useCallback(() => {
    if (planRef.current) {
        const buttons = planRef.current.querySelectorAll('button[aria-expanded="false"]');
        buttons.forEach(button => (button as HTMLElement).click());
        
        setTimeout(() => {
            html2canvas(planRef.current, { 
                scale: 2,
                backgroundColor: '#ffffff' // Use a white background for the PDF
            }).then((canvas: HTMLCanvasElement) => {
                const imgData = canvas.toDataURL('image/png');
                const { jsPDF } = jspdf;
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'px',
                    format: [canvas.width, canvas.height]
                });
                
                pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
                pdf.save('plan-entrenamiento-running.pdf');

                const openButtons = planRef.current.querySelectorAll('button[aria-expanded="true"]');
                openButtons.forEach(button => (button as HTMLElement).click());
            });
        }, 500);
    }
  }, []);

  return (
    <div className="bg-slate-100 text-gray-800 min-h-screen font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-1">
            <TrainingForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          </div>

          <div className="lg:col-span-2">
            <div className="space-y-6">
              {isLoading && <Spinner />}
              {error && <ErrorMessage message={error} />}
              {trainingPlan && (
                <PlanDisplay 
                  plan={trainingPlan} 
                  onExportPDF={handleExportPDF}
                  ref={planRef}
                />
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;