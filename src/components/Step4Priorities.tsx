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
    <div className="step active">
      <div className="step-header">
        <div className="step-num">Paso 4 de 5</div>
        <div className="step-title">Áreas de impacto prioritarias</div>
        <div className="step-desc">¿Dónde quieres ver resultados primero? Esto define el roadmap de implementación.</div>
      </div>

      <div className="opts cols2" style={{ marginBottom: '24px' }}>
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
          <label>Horizonte de implementación</label>
          <select value={data.timeline} onChange={e => onChange({ ...data, timeline: e.target.value })}>
            {TIMELINE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div className="field">
          <label>KPI principal que te gustaría mejorar</label>
          <input value={data.kpi} onChange={e => onChange({ ...data, kpi: e.target.value })} placeholder="Ej: Tiempo de respuesta, costos operacionales..." />
        </div>
      </div>

      <div className="nav-bar">
        <button className="btn btn-s" onClick={onPrev}>← Anterior</button>
        <button className="btn btn-p btn-lg" onClick={onGenerate}>Generar diagnóstico →</button>
      </div>
    </div>
  );
}
