import type { Finding, MaturityLevel } from '../types';

export const INDUSTRY_OPTIONS = [
  { value: '', label: 'Selecciona industria' },
  { value: 'retail', label: 'Retail / Comercio' },
  { value: 'banca', label: 'Banca / Finanzas' },
  { value: 'salud', label: 'Salud' },
  { value: 'manufactura', label: 'Manufactura' },
  { value: 'logistica', label: 'Logística / Transporte' },
  { value: 'telecom', label: 'Telecomunicaciones' },
  { value: 'energia', label: 'Energía / Minería' },
  { value: 'gobierno', label: 'Gobierno / Público' },
  { value: 'servicios', label: 'Servicios Profesionales' },
  { value: 'tecnologia', label: 'Tecnología' },
  { value: 'inmobiliaria', label: 'Inmobiliaria' },
];

export const SIZE_OPTIONS = [
  { value: '', label: 'Selecciona' },
  { value: 'xs', label: '1 – 50' },
  { value: 's', label: '11 – 50' },
  { value: 'm', label: '51 – 200' },
  { value: 'l', label: '201 – 1.000' },
  { value: 'xl', label: '1.001 – 5.000' },
  { value: 'xxl', label: 'Más de 5.000' },
];

export const ROLE_OPTIONS = [
  { value: '', label: 'Selecciona' },
  { value: 'cto', label: 'CTO / CIO' },
  { value: 'ti', label: 'Gerente de TI' },
  { value: 'ops', label: 'Gerente de Operaciones' },
  { value: 'com', label: 'Gerente Comercial' },
  { value: 'srv', label: 'Gerente Servicio al Cliente' },
  { value: 'fin', label: 'CFO / Finanzas' },
  { value: 'ceo', label: 'Gerente General / CEO' },
  { value: 'mkt', label: 'Marketing' },
  { value: 'otro', label: 'Otro' },
];

export const EXPERIENCE_OPTIONS = [
  { value: '0', label: 'Sin implementaciones' },
  { value: '1', label: 'Explorando opciones' },
  { value: '2', label: 'Piloto o POC en curso' },
  { value: '3', label: 'Al menos 1 solución en producción' },
  { value: '4', label: 'Escalando a múltiples procesos' },
];

export const BUDGET_OPTIONS = [
  { value: '0', label: 'No definido aún' },
  { value: '1', label: '< USD 20K' },
  { value: '2', label: 'USD 20K – 100K' },
  { value: '3', label: 'USD 100K – 500K' },
  { value: '4', label: '> USD 500K' },
];

export const TIMELINE_OPTIONS = [
  { value: '0-3', label: '0 – 3 meses' },
  { value: '3-6', label: '3 – 6 meses' },
  { value: '6-12', label: '6 – 12 meses' },
  { value: '12+', label: 'Más de 12 meses' },
];

export const CHALLENGE_GROUPS = [
  {
    label: 'Datos e información',
    items: [
      { id: 'data-scattered', title: 'Datos dispersos en múltiples sistemas', desc: 'Sin vista unificada entre ERP, CRM, Excel y otros.' },
      { id: 'reports-slow', title: 'Reportes que tardan días en generarse', desc: 'Consolidar información para decisiones toma demasiado.' },
      { id: 'data-quality', title: 'Problemas de calidad de datos', desc: 'Datos duplicados, incompletos o desactualizados.' },
      { id: 'no-patterns', title: 'No extraemos insights de nuestros datos', desc: 'Tenemos datos pero no logramos sacar valor de ellos.' },
    ],
  },
  {
    label: 'Atención al cliente y operaciones',
    items: [
      { id: 'slow-response', title: 'Clientes esperan demasiado por respuestas', desc: 'Consultas que podrían ser automáticas toman minutos.' },
      { id: 'manual-tasks', title: 'Tareas repetitivas que consumen horas', desc: 'Procesos manuales que se podrían automatizar.' },
      { id: 'no-prediction', title: 'No podemos anticipar la demanda', desc: 'Sin capacidad predictiva para planificar recursos.' },
      { id: 'churn-risk', title: 'Perdemos clientes sin alertas tempranas', desc: 'Sin herramientas proactivas de retención.' },
    ],
  },
  {
    label: 'Competitividad y eficiencia',
    items: [
      { id: 'competitive-gap', title: 'La competencia nos lleva ventaja con IA', desc: 'Ya cotizan, atienden y personalizan más rápido.' },
      { id: 'no-personalization', title: 'No personalizamos la experiencia', desc: 'Ofrecemos lo mismo a todos sin segmentar.' },
      { id: 'fraud-risk', title: 'Riesgo de fraude o anomalías no detectadas', desc: 'Patrones inusuales que no identificamos a tiempo.' },
      { id: 'content-overload', title: 'Volumen alto de documentos y formularios', desc: 'Procesamiento manual de facturas, contratos, etc.' },
    ],
  },
];

export const PRIORITY_OPTIONS = [
  { id: 'customer-service', title: 'Servicio al cliente', desc: 'Chatbots, consolidación de info, respuestas automáticas.' },
  { id: 'operations', title: 'Eficiencia operacional', desc: 'Automatización, flujos de trabajo, reducción de manuales.' },
  { id: 'sales', title: 'Ventas y marketing', desc: 'Personalización, predicción, estrategia comercial.' },
  { id: 'analytics', title: 'Analytics e insights', desc: 'Dashboards IA, detección de patrones, reportes auto.' },
  { id: 'risk', title: 'Gestión de riesgos', desc: 'Fraude, anomalías, compliance, ciberseguridad.' },
  { id: 'documents', title: 'Procesamiento de documentos', desc: 'OCR, extracción de facturas, contratos, formularios.' },
  { id: 'content', title: 'Generación de contenido', desc: 'Reportes, propuestas, comunicaciones asistidas por IA.' },
  { id: 'supply-chain', title: 'Cadena de suministro', desc: 'Demanda, inventario, logística inteligente.' },
];

export const INDUSTRY_NAMES: Record<string, string> = {
  retail: 'Retail/Comercio',
  banca: 'Banca/Finanzas',
  salud: 'Salud',
  manufactura: 'Manufactura',
  logistica: 'Logística',
  telecom: 'Telecomunicaciones',
  energia: 'Energía/Minería',
  gobierno: 'Gobierno',
  servicios: 'Servicios Profesionales',
  tecnologia: 'Tecnología',
  inmobiliaria: 'Inmobiliaria',
};

export const FINDINGS_MAP: Record<string, Finding> = {
  'data-scattered': { i: '📊', t: 'Datos fragmentados', d: 'Tus datos están dispersos entre múltiples sistemas. Consolidarlos con IA puede reducir el tiempo de generación de reportes en un 70%.' },
  'reports-slow': { i: '⏱️', t: 'Reportería lenta', d: 'Los reportes manuales consumen días. Con IA puedes generar dashboards en tiempo real y consultas en lenguaje natural.' },
  'slow-response': { i: '💬', t: 'Atención al cliente lenta', d: 'El 80% de las consultas rutinarias puede automatizarse. Tu equipo podría ahorrar 2+ horas diarias.' },
  'manual-tasks': { i: '🔄', t: 'Procesos manuales intensivos', d: 'Las tareas repetitivas son candidatas ideales para automatización con IA. ROI típico: 3-6 meses.' },
  'churn-risk': { i: '📉', t: 'Riesgo de fuga de clientes', d: 'Sin predicción de churn, pierdes clientes que podrías retener. La IA puede detectar señales 30-60 días antes.' },
  'competitive-gap': { i: '🏃', t: 'Brecha competitiva', d: 'Tu competencia ya usa IA. Cada mes sin actuar aumenta la brecha. Los quick wins pueden cerrarse en 60-90 días.' },
  'fraud-risk': { i: '🛡️', t: 'Exposición a fraude', d: 'Sin detección de anomalías en tiempo real, tu empresa está expuesta. La IA reduce el fraude en 40-60%.' },
  'content-overload': { i: '📋', t: 'Sobrecarga documental', d: 'El procesamiento manual de documentos es costoso y propenso a errores. OCR con IA tiene 95%+ de precisión.' },
  'no-prediction': { i: '🔮', t: 'Sin capacidad predictiva', d: 'No poder anticipar demanda o resultados limita la planificación. Los modelos predictivos mejoran la precisión en 30-50%.' },
  'no-personalization': { i: '✨', t: 'Experiencia genérica', d: 'Personalizar con IA puede aumentar conversiones en 15-30% y mejorar satisfacción del cliente significativamente.' },
};

export const MATURITY_LEVELS: MaturityLevel[] = [
  { max: 25, label: 'Inicial — Exploración', cls: 'ml-1', desc: 'Tu empresa está en las primeras etapas. Hay mucho potencial para quick wins.' },
  { max: 45, label: 'Emergente — Primeros pasos', cls: 'ml-2', desc: 'Hay conciencia del valor de IA pero falta estructura para escalar.' },
  { max: 65, label: 'En desarrollo — Pilotos activos', cls: 'ml-3', desc: 'Existen iniciativas pero necesitan un framework para pasar a producción.' },
  { max: 85, label: 'Avanzado — Producción', cls: 'ml-4', desc: 'Buena base. El foco debe estar en escalar y gobernar.' },
  { max: 100, label: 'Líder — Escalamiento', cls: 'ml-5', desc: 'Madurez alta. Oportunidad de optimizar y liderar en tu industria.' },
];
