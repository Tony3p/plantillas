import FirestoreService from './FirestoreService.js';

// 2. Datos de tus plantillas de Excel
const plantillas =  [
  {
    id: 'sheet-001',
    name: 'Dashboard financiero mensual',
    categoryId: 'finances',
    priceUsd: 19,
    priceArs: 19900,
    image:
      'https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=1200',
    highlight: 'Ideal para freelancers y pequeños negocios',
    accent: 'Incluye gráficos listos para usar',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 'sheet-002',
    name: 'Control de gastos personales',
    categoryId: 'personal-expenses',
    priceUsd: 12,
    priceArs: 12900,
    image:
      'https://images.pexels.com/photos/4386324/pexels-photo-4386324.jpeg?auto=compress&cs=tinysrgb&w=1200',
    highlight: 'Perfecto para entender a dónde va tu dinero',
    accent: 'Alertas visuales por categoría',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 'sheet-003',
    name: 'Planificador semanal premium',
    categoryId: 'planning',
    priceUsd: 9,
    priceArs: 9900,
    image:
      'https://images.pexels.com/photos/4144222/pexels-photo-4144222.jpeg?auto=compress&cs=tinysrgb&w=1200',
    highlight: 'Diseñado para creadores y estudiantes',
    accent: 'Vista limpia y minimalista',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 'sheet-004',
    name: 'Control de suscripciones',
    categoryId: 'personal-expenses',
    priceUsd: 8,
    priceArs: 8900,
    image:
      'https://images.pexels.com/photos/6303684/pexels-photo-6303684.jpeg?auto=compress&cs=tinysrgb&w=1200',
    highlight: 'Evita pagos sorpresa cada mes',
    accent: 'Recordatorios de renovación',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
]

// 3. Función para subir los datos
async function subirDatos() {
  console.log('subiendo plantillas')
  const service =  FirestoreService
  
  for (const doc of plantillas) {
    try {
      const res = await service.createWithCustomId("sheets", doc.id, doc)
      console.log(`✅ Subido: ${doc.nombre} (ID: ${res.id})`);
    } catch (error) {
      console.error(`❌ Error en ${doc.nombre}:`, error);
    }
  }
}

subirDatos().then(() => console.log("Proceso terminado"));