import type { PriorityData } from '../types';
import { PRIORITY_OPTIONS, TIMELINE_OPTIONS } from '../data/constants';
import OptionCard from './OptionCard';

interface Props {
  data: PriorityData;
  onToggle: (id: string) => void;
  onChange: (data: PriorityData) => void;
  onPrev: () => void;
  onGenerate: () => void;
}

export default function Step4Priorities({ data, onToggle, onChange, onPrev, onGenerate }: Props) {
  return (
    <div className="step active" role="form" aria-label="Áreas de impacto prioritarias">
      <div className="step-header">
        <div className="step-num">Paso 4 de 5</div>
        <h1 className="step-title">Áreas de impacto prioritarias</h1>
        <p className="step-desc">¿Dónde quieres ver resultados primero? Esto define el roadmap de implementación.</p>
      </div>

      <div className="opts cols2" role="group" aria-label="Selecciona áreas prioritarias" style={{ marginBottom: '24px' }}>
        {PRIORITY_OPTIONS.map(item => (
          <OptionCard
            key={item.id}
            title={item.title}
            description={item.desc}
            selected={data.areas.includes(item.id)}
            onClick={() => onToggle(item.id)}
          />
        ))}
      </div>

      <div className="row2">
        <div className="field">
          <label htmlFor="fTimeline">Horizonte de implementación</label>
          <select id="fTimeline" value={data.timeline} onChange={e => onChange({ ...data, timeline: e.target.value })}>
            {TIMELINE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="fKpi">KPI principal que te gustaría mejorar</label>
          <input id="fKpi" value={data.kpi} onChange={e => onChange({ ...data, kpi: e.target.value })} placeholder="Ej: Tiempo de respuesta, costos operacionales..." />
        </div>
      </div>

      <nav className="nav-bar" aria-label="Navegación del wizard">
        <button className="btn btn-s" onClick={onPrev}>← Anterior</button>
        <button className="btn btn-p btn-lg" onClick={onGenerate}>Generar diagnóstico →</button>
      </nav>
    </div>
  );
}
