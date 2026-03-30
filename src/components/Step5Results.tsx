import { useEffect, useState } from 'react';
import type { CompanyInfo, MaturityData, ContactInfo } from '../types';
import { calculateOverallScore, getDimensions, getMaturityLevel, getFindings, getScoredCards, groupCardsByCategory } from '../utils/scoring';
import ContactForm from './ContactForm';
import FlagareLogo from './FlagareLogo';

interface Props {
  companyInfo: CompanyInfo;
  challenges: string[];
  maturity: MaturityData;
  priorities: string[];
  contact: ContactInfo;
  onContactChange: (c: ContactInfo) => void;
  onSaveSession: () => void;
  onRestart: () => void;
}

export default function Step5Results({ companyInfo, challenges, maturity, priorities, contact, onContactChange, onSaveSession, onRestart }: Props) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [saved, setSaved] = useState(false);

  const overall = calculateOverallScore(maturity);
  const dims = getDimensions(maturity);
  const level = getMaturityLevel(overall);
  const findings = getFindings(challenges);
  const scored = getScoredCards(challenges, priorities, companyInfo.industry);
  const grouped = groupCardsByCategory(scored);

  useEffect(() => {
    let c = 0;
    const interval = setInterval(() => {
      c += 2;
      if (c >= overall) { c = overall; clearInterval(interval); }
      setAnimatedScore(c);
    }, 20);
    return () => clearInterval(interval);
  }, [overall]);

  const qw = scored.slice(0, 3);
  const mp = scored.slice(3, 7);
  const lp = scored.slice(7, 10);

  const handleSave = () => {
    onSaveSession();
    setSaved(true);
  };

  return (
    <div className="step active">
      <div className="results active">
        <div className="res-hero">
          <div className="company-name">{companyInfo.company || 'Empresa'}</div>
          <h2>Diagnóstico de IA</h2>
          <div className="sub">Resultados personalizados de tu AI Discovery Session</div>
        </div>

        <div className="score-ring">
          <div className="ring" style={{ '--deg': `${(animatedScore / 100) * 360}deg` } as React.CSSProperties}>
            <div className="ring-inner">
              <div className="ring-score">{animatedScore}</div>
              <div className="ring-label">AI Readiness</div>
            </div>
          </div>
        </div>

        <div className="maturity-level">
          <span className={`ml-badge ${level.cls}`}>{level.label}</span>
          <p style={{ fontSize: '13px', color: 'var(--gt)', marginTop: '8px' }}>{level.desc}</p>
        </div>

        <div className="dims">
          {dims.map(dim => (
            <div key={dim.label} className="dim">
              <div className="dv" style={{ color: dim.color }}>{dim.value}%</div>
              <div className="dl">{dim.label}</div>
              <div className="db">
                <div className="df" style={{ width: `${dim.value}%`, background: dim.color }} />
              </div>
            </div>
          ))}
        </div>

        <div className="res-section">
          <h3>Hallazgos clave</h3>
          <div className="rs-sub">Basados en los desafíos que identificaste</div>
          <div className="findings">
            {findings.map((f, idx) => (
              <div key={idx} className="finding">
                <div className="fi">{f.i}</div>
                <div>
                  <div className="ft">{f.t}</div>
                  <div className="fd">{f.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="res-section">
          <h3>Casos de uso recomendados</h3>
          <div className="rs-sub">Priorizados según tu industria, desafíos y áreas de impacto</div>
          {Object.entries(grouped).map(([cat, g]) => (
            <div key={cat}>
              <span className={`cat-label ${g.cc}`}>{cat}</span>
              <div className="cards-grid">
                {g.items.map(c => (
                  <div key={c.id} className="acard">
                    <div className="atop" style={{ background: 'var(--fire)' }} />
                    <span className={`abadge ${c.rel >= 5 ? 'badge-h' : 'badge-m'}`}>
                      {c.rel >= 5 ? 'Alta relevancia' : 'Relevante'}
                    </span>
                    <div className="aicon">{c.i}</div>
                    <h4>{c.t}</h4>
                    <div className="adesc">{c.d}</div>
                    <div className="aex">Ej: {c.ex}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="res-section">
          <h3>Roadmap sugerido</h3>
          <div className="rs-sub">Plan de implementación en tres fases</div>
          <div className="roadmap">
            <div className="rm-phase">
              <div className="rm-tag" style={{ color: 'var(--g)' }}>Fase 1 · Mes 1-3</div>
              <h4>Quick wins</h4>
              <ul>{qw.map(c => <li key={c.id}>{c.t}</li>)}</ul>
            </div>
            <div className="rm-phase">
              <div className="rm-tag" style={{ color: 'var(--cy)' }}>Fase 2 · Mes 3-6</div>
              <h4>Consolidación</h4>
              <ul>{mp.map(c => <li key={c.id}>{c.t}</li>)}</ul>
            </div>
            <div className="rm-phase">
              <div className="rm-tag" style={{ color: 'var(--pu)' }}>Fase 3 · Mes 6-12</div>
              <h4>Escalamiento</h4>
              <ul>
                {lp.length > 0 ? lp.map(c => <li key={c.id}>{c.t}</li>) : (
                  <>
                    <li>Optimización continua</li>
                    <li>Expansión a nuevas áreas</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>

        <ContactForm contact={contact} onChange={onContactChange} />

        <div className="res-cta">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <FlagareLogo height={44} variant="full" dark />
          </div>
          <h3>¿Listo para dar el siguiente paso?</h3>
          <p>Agenda una sesión estratégica con nuestro equipo para profundizar en estas recomendaciones y diseñar tu roadmap personalizado.</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-cta" onClick={handleSave} disabled={saved}>
              {saved ? '✓ Consulta guardada' : 'Guardar consulta'}
            </button>
            <button className="btn-cta" onClick={onRestart} style={{ background: 'rgba(255,255,255,0.1)', boxShadow: 'none' }}>
              Nuevo diagnóstico
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
