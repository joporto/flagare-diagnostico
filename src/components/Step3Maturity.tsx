import type { MaturityData } from '../types';
import { EXPERIENCE_OPTIONS, BUDGET_OPTIONS } from '../data/constants';

interface Props {
  data: MaturityData;
  onChange: (data: MaturityData) => void;
  onPrev: () => void;
  onNext: () => void;
}

function SliderGroup({ id, label, value, min, max, leftLabel, rightLabel, onChange }: {
  id: string; label: string; value: number; min: number; max: number; leftLabel: string; rightLabel: string; onChange: (v: number) => void;
}) {
  return (
    <div className="slider-group">
      <label htmlFor={id} id={`${id}-label`}>{label}</label>
      <div className="slider-row">
        <input type="range" id={id} min={min} max={max} value={value} onChange={e => onChange(+e.target.value)} aria-labelledby={`${id}-label`} aria-valuemin={min} aria-valuemax={max} aria-valuenow={value} />
        <span className="slider-val" aria-hidden="true">{value}</span>
      </div>
      <div className="slider-labels" aria-hidden="true">
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
    <div className="step active" role="form" aria-label="Evaluación de madurez">
      <div className="step-header">
        <div className="step-num">Paso 3 de 5</div>
        <h1 className="step-title">Evaluación de madurez</h1>
        <p className="step-desc">Calibremos las recomendaciones al estado real de tu empresa. Sé honesto: esto no es una nota, es un punto de partida.</p>
      </div>

      <div className="callout callout-tip" role="note">
        <span className="ci" aria-hidden="true">🎯</span>
        <span>En sesión: usa cada slider como conversación. "¿Dónde te ubicarías del 1 al 5 en calidad de datos?" genera insights valiosos.</span>
      </div>

      <SliderGroup id="rData" label="Calidad y accesibilidad de datos" value={data.dataQuality} min={1} max={5}
        leftLabel="Dispersos / sin estructura" rightLabel="Centralizados y gobernados"
        onChange={v => update('dataQuality', v)} />
      <SliderGroup id="rTeam" label="Preparación del equipo para IA" value={data.teamReadiness} min={1} max={5}
        leftLabel="Sin experiencia en IA" rightLabel="Equipo capacitado con proyectos"
        onChange={v => update('teamReadiness', v)} />
      <SliderGroup id="rInfra" label="Infraestructura tecnológica" value={data.infrastructure} min={1} max={5}
        leftLabel="Legacy sin APIs" rightLabel="Cloud-native con APIs"
        onChange={v => update('infrastructure', v)} />
      <SliderGroup id="rStrat" label="Estrategia de IA definida" value={data.strategy} min={1} max={5}
        leftLabel="No existe" rightLabel="Roadmap con KPIs y governance"
        onChange={v => update('strategy', v)} />

      <div className="row2">
        <div className="field">
          <label htmlFor="fExp">Experiencia actual con IA</label>
          <select id="fExp" value={data.experience} onChange={e => update('experience', e.target.value)}>
            {EXPERIENCE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="fBudget">Presupuesto estimado para IA</label>
          <select id="fBudget" value={data.budget} onChange={e => update('budget', e.target.value)}>
            {BUDGET_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      <nav className="nav-bar" aria-label="Navegación del wizard">
        <button className="btn btn-s" onClick={onPrev}>← Anterior</button>
        <button className="btn btn-p" onClick={onNext}>Siguiente →</button>
      </nav>
    </div>
  );
}
