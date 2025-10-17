
import { GoogleGenAI, Type } from "@google/genai";
import { AthleteData, TrainingPlan } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

function createPrompt(data: AthleteData): string {
  return `
    **Persona:** Eres un entrenador de running de élite, 'Coach IA', experto en planes de resistencia personalizados basados en ciencia.

    **Objetivo:** Generar un plan de entrenamiento detallado para un atleta con los siguientes datos.

    **Datos del Atleta:**
    - Nombre: ${data.name}
    - Edad: ${data.age} años
    - Nivel de Experiencia: ${data.experience}
    - Objetivo de Distancia: ${data.distance}
    - Tiempo Objetivo: ${data.targetTime}
    - Ritmo Actual (aproximado): ${data.currentPace} min/km
    - Semanas de Preparación: ${data.prepWeeks}
    - Días de Entrenamiento por Semana: ${data.trainingDays}
    - Terreno Habitual: ${data.terrain}
    - Condiciones de Salud / Lesiones: ${data.healthConditions}, ${data.injuryHistory}

    **Reglas Cruciales de Progresión y Estructura:**
    1.  **Regla del 10%:** Aumenta el volumen total de carrera semanal en no más del 10% respecto a la semana anterior para prevenir sobrecargas.
    2.  **Periodización:** Estructura el plan con fases de base, construcción, pico y descarga (tapering) si las semanas lo permiten.
    3.  **Descanso:** Asigna al menos 1-2 días de descanso total o descanso activo (caminata, estiramientos) por semana. Son OBLIGATORIOS.
    4.  **Variedad de Sesiones:** Incluye una mezcla de:
        - **Fondos Largos:** Carreras a ritmo suave (Zona 2) para construir resistencia.
        - **Entrenamientos de Tempo/Umbral:** Ritmos controlados y exigentes (Zona 3-4) para mejorar la eficiencia.
        - **Intervalos de Velocidad (Series):** Esfuerzos cortos y rápidos (Zona 4-5) para aumentar la velocidad máxima.
        - **Trote de Recuperación:** Carreras muy suaves (Zona 1-2) para facilitar la recuperación activa.
    5.  **Prescripción:** Describe cada sesión en términos de distancia o tiempo, y especifica el ritmo objetivo en min/km y/o la Zona de Frecuencia Cardíaca (ej. Z1 a Z5).
    6.  **Consideraciones Médicas:** Adapta la intensidad y sugiere precauciones basadas en las condiciones de salud y lesiones reportadas.

    **Formato de Salida Obligatorio:**
    Tu respuesta DEBE SER EXCLUSIVAMENTE un bloque de código JSON válido, sin texto introductorio, explicaciones, ni markdown. El JSON debe ser un array de objetos, donde cada objeto representa una semana del plan.
  `;
}

export async function generatePlan(data: AthleteData): Promise<TrainingPlan> {
  const prompt = createPrompt(data);

  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        semana: { type: Type.INTEGER, description: "Número de la semana de entrenamiento." },
                        resumen_semanal: { type: Type.STRING, description: "Un breve resumen de los objetivos y el enfoque de la semana." },
                        dias: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    dia: { type: Type.STRING, description: "El día de la semana (Ej: 'Lunes', 'Martes')." },
                                    tipo_sesion: { type: Type.STRING, description: "Tipo de entrenamiento (Ej: 'Fondo Largo', 'Intervalos', 'Descanso')." },
                                    descripcion_detallada: { type: Type.STRING, description: "Descripción completa del entrenamiento, incluyendo calentamiento, series, ritmos, enfriamiento, etc." }
                                },
                                required: ["dia", "tipo_sesion", "descripcion_detallada"]
                            }
                        }
                    },
                    required: ["semana", "resumen_semanal", "dias"]
                }
            }
        }
    });

    const jsonText = response.text.trim();
    const plan = JSON.parse(jsonText) as TrainingPlan;
    return plan;
  } catch (error) {
    console.error("Error en la llamada a la API de Gemini:", error);
    throw new Error("No se pudo generar el plan desde la API de Gemini.");
  }
}
