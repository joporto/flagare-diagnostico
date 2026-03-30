import type { MaturityData } from '../types';
import { EXPERIENCE_OPTIONS, BUDGET_OPTIONS } from '../data/constants';

interface Props {
  data: MaturityData;
  onChange: (data: MaturityData) => void;
  onPrev: () => void;
  onNext: () => void;
}

function SliderGroup({ label, value, min, max, leftLabel, rightLabel, onChange }: {
  label: string; value: number; min: number; max: number; leftLabel: string; rightLabel: string; onChange: (v: number) => void;
}) {
  return (
    <div className="slider-group">
      <label>{label}</label>
      <div className="slider-row">
        <input type="range" min={min} max={max} value={value} onChange={e => onChange(+e.target.value)} />
        <span className="slider-val">{value}</span>
      </div>
      <div className="slider-labels">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  );
}

export default function Step3Maturity({ data, onChange, onPrev, onNext }: Props) {
  const update = (field: keyof MaturityData, value: number | string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="step active">
      <div className="step-header">
        <div className="step-num">Paso 3 de 5</div>
        <div className="step-title">Evaluación de madurez</div>
        <div className="step-desc">Calibremos las recomendaciones al estado real de tu empresa. Sé honesto: esto no es una nota, es un punto de partida.</div>
      </div>

      <div className="callout callout-tip">
        <span className="ci">🎯</span>
        <span>En sesión: usa cada slider como conversación. "¿Dónde te ubicarías del 1 al 5 en calidad de datos?" genera insights valiosos.</span>
      </div>

      <SliderGroup label="Calidad y accesibilidad de datos" value={data.dataQuality} min={1} max={5}
        leftLabel="Dispersos / sin estructura" rightLabel="Centralizados y gobernados"
        onChange={v => update('dataQuality', v)} />
      <SliderGroup label="Preparación del equipo para IA" value={data.teamReadiness} min={1} max={5}
        leftLabel="Sin experiencia en IA" rightLabel="Equipo capacitado con proyectos"
        onChange={v => update('teamReadiness', v)} />
      <SliderGroup label="Infraestructura tecnológica" value={data.infrastructure} min={1} max={5}
        leftLabel="Legacy sin APIs" rightLabel="Cloud-native con APIs"
        onChange={v => update('infrastructure', v)} />
      <SliderGroup label="Estrategia de IA definida" value={data.strategy} min={1} max={5}
        leftLabel="No existe" rightLabel="Roadmap con KPIs y governance"
        onChange={v => update('strategy', v)} />

      <div className="row2">
        <div className="field">
          <label>Experiencia actual con IA</label>
          <select value={data.experience} onChange={e => update('experience', e.target.value)}>
            {EXPERIENCE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Presupuesto estimado para IA</label>
          <select value={data.budget} onChange={e => update('budget', e.target.value)}>
            {BUDGET_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      <div className="nav-bar">
        <button className="btn btn-s" onClick={onPrev}>← Anterior</button>
        <button className="btn btn-p" onClick={onNext}>Siguiente →</button>
      </div>
    </div>
  );
}
