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
    <div className="step active" role="group" aria-label="Selección de desafíos">
      <div className="step-header">
        <div className="step-num">Paso 2 de 5</div>
        <h1 className="step-title">Desafíos actuales</h1>
        <p className="step-desc">Selecciona los problemas que más te resuenan hoy. Esto determina qué casos de uso IA priorizar.</p>
      </div>

      <div className="callout callout-tip" role="note">
        <span className="ci" aria-hidden="true">💡</span>
        <span>En sesión con cliente: recorre cada dolor y profundiza en los seleccionados. ¿Cuánto tiempo/dinero les cuesta? ¿Quién se ve afectado?</span>
      </div>

      {selected.length > 0 && (
        <div role="status" className="sr-only">{selected.length} desafíos seleccionados</div>
      )}

      {CHALLENGE_GROUPS.map(group => (
        <fieldset key={group.label} style={{ border: 'none', padding: 0, margin: 0 }}>
          <legend style={{ fontSize: '13px', fontWeight: 600, color: 'var(--d)', marginBottom: '10px', display: 'block' }}>
            {group.label}
          </legend>
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
        </fieldset>
      ))}

      <nav className="nav-bar" aria-label="Navegación del wizard">
        <button className="btn btn-s" onClick={onPrev}>← Anterior</button>
        <button className="btn btn-p" onClick={onNext}>Siguiente →</button>
      </nav>
    </div>
  );
}
