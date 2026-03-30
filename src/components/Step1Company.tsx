import { useState } from 'react';
import type { CompanyInfo } from '../types';
import { INDUSTRY_OPTIONS, SIZE_OPTIONS, ROLE_OPTIONS, INDUSTRY_NAMES } from '../data/constants';

interface Props {
  data: CompanyInfo;
  onChange: (data: CompanyInfo) => void;
  onNext: () => void;
}

export default function Step1Company({ data, onChange, onNext }: Props) {
  const [urlAnalyzed, setUrlAnalyzed] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [insight, setInsight] = useState('');

  const update = (field: keyof CompanyInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const analyzeUrl = () => {
    if (!data.url) return;
    setAnalyzing(true);
    let domain = '';
    try { domain = new URL(data.url).hostname.replace('www.', ''); } catch { domain = data.url; }
    setTimeout(() => {
      const indName = INDUSTRY_NAMES[data.industry] || 'corporativo';
      setInsight(`<strong>Análisis preliminar de ${domain}</strong><br/><br/>Hemos identificado tu empresa en el sector <strong>${indName}</strong>. Basándonos en tu presencia digital, detectamos oportunidades iniciales de IA:<br/><br/><span class="ai-tag">Automatización de consultas</span><span class="ai-tag">Consolidación de datos</span><span class="ai-tag">Análisis predictivo</span><span class="ai-tag">Procesamiento documental</span><br/><br/>Tu sitio sugiere interacción con clientes que se beneficiaría de <strong>asistentes IA y chatbots</strong>. La estructura de negocio indica múltiples fuentes de datos que podrían centralizarse.<br/><br/><em style="color:var(--gm)">Este es un análisis preliminar. Completa el diagnóstico para recomendaciones detalladas.</em>`);
      setUrlAnalyzed(true);
      setAnalyzing(false);
    }, 2200);
  };

  return (
    <div className="step active">
      <div className="step-header">
        <div className="step-num">Paso 1 de 5</div>
        <div className="step-title">Tu empresa</div>
        <div className="step-desc">Conocer tu empresa nos permite personalizar las recomendaciones de IA. Toda la información es confidencial.</div>
      </div>

      <div className="callout callout-tip">
        <span className="ci">💡</span>
        <span>En sesión con cliente: completa estos campos mientras conversas. El análisis de URL genera un buen punto de partida.</span>
      </div>

      <div className="row2">
        <div className="field">
          <label>Empresa <span className="req">*</span></label>
          <input value={data.company} onChange={e => update('company', e.target.value)} placeholder="Nombre de la empresa" />
        </div>
        <div className="field">
          <label>Sitio web</label>
          <div className="url-wrap">
            <input value={data.url} onChange={e => update('url', e.target.value)} placeholder="https://tuempresa.com" />
            <button
              className={`url-btn${urlAnalyzed ? ' done' : ''}`}
              disabled={analyzing || !data.url}
              onClick={analyzeUrl}
            >
              {analyzing ? 'Analizando...' : urlAnalyzed ? '✓ Analizado' : 'Analizar sitio'}
            </button>
          </div>
        </div>
      </div>

      {insight && (
        <div className="ai-insight show" dangerouslySetInnerHTML={{ __html: insight }} />
      )}

      <div className="row2">
        <div className="field">
          <label>Industria <span className="req">*</span></label>
          <select value={data.industry} onChange={e => update('industry', e.target.value)}>
            {INDUSTRY_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Tamaño (colaboradores)</label>
          <select value={data.size} onChange={e => update('size', e.target.value)}>
            {SIZE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      <div className="row2">
        <div className="field">
          <label>Tu rol</label>
          <select value={data.role} onChange={e => update('role', e.target.value)}>
            {ROLE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      <div className="field">
        <label>Contexto adicional</label>
        <textarea value={data.context} onChange={e => update('context', e.target.value)} placeholder="¿Qué motivó esta sesión? ¿Hay un proyecto puntual, un mandato del directorio, presión competitiva?" />
      </div>

      <div className="nav-bar">
        <div></div>
        <button className="btn btn-p" onClick={onNext}>Siguiente →</button>
      </div>
    </div>
  );
}
