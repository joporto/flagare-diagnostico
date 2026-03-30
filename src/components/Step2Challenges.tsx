import { CHALLENGE_GROUPS } from '../data/constants';
import OptionCard from './OptionCard';

interface Props {
  selected: string[];
  onToggle: (id: string) => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Step2Challenges({ selected, onToggle, onPrev, onNext }: Props) {
  return (
    <div className="step active">
      <div className="step-header">
        <div className="step-num">Paso 2 de 5</div>
        <div className="step-title">Desafíos actuales</div>
        <div className="step-desc">Selecciona los problemas que más te resuenan hoy. Esto determina qué casos de uso IA priorizar.</div>
      </div>

      <div className="callout callout-tip">
        <span className="ci">💡</span>
        <span>En sesión con cliente: recorre cada dolor y profundiza en los seleccionados. ¿Cuánto tiempo/dinero les cuesta? ¿Quién se ve afectado?</span>
      </div>

      {CHALLENGE_GROUPS.map(group => (
        <div key={group.label}>
          <label className="form-label" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--d)', marginBottom: '10px', display: 'block' }}>
            {group.label}
          </label>
          <div className="opts cols2" style={{ marginBottom: '20px' }}>
            {group.items.map(item => (
              <OptionCard
                key={item.id}
                title={item.title}
                description={item.desc}
                selected={selected.includes(item.id)}
                onClick={() => onToggle(item.id)}
              />
            ))}
          </div>
        </div>
      ))}

      <div className="nav-bar">
        <button className="btn btn-s" onClick={onPrev}>← Anterior</button>
        <button className="btn btn-p" onClick={onNext}>Siguiente →</button>
      </div>
    </div>
  );
}
