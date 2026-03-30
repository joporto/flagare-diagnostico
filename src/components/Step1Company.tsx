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
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (field: keyof CompanyInfo, value: string) => {
    onChange({ ...data, [field]: value });
    if (errors[field]) setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!data.company.trim()) e.company = 'El nombre de la empresa es requerido';
    if (!data.industry) e.industry = 'Selecciona una industria';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
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
    <div className="step active" role="form" aria-label="Información de la empresa">
      <div className="step-header">
        <div className="step-num">Paso 1 de 5</div>
        <h1 className="step-title">Tu empresa</h1>
        <p className="step-desc">Conocer tu empresa nos permite personalizar las recomendaciones de IA. Toda la información es confidencial.</p>
      </div>

      <div className="callout callout-tip" role="note">
        <span className="ci" aria-hidden="true">💡</span>
        <span>En sesión con cliente: completa estos campos mientras conversas. El análisis de URL genera un buen punto de partida.</span>
      </div>

      <div className="row2">
        <div className={`field${errors.company ? ' field-error' : ''}`}>
          <label htmlFor="fCompany">Empresa <span className="req" aria-label="requerido">*</span></label>
          <input id="fCompany" value={data.company} onChange={e => update('company', e.target.value)} placeholder="Nombre de la empresa" aria-required="true" aria-invalid={!!errors.company} />
          {errors.company && <div className="field-error-msg" role="alert">{errors.company}</div>}
        </div>
        <div className="field">
          <label htmlFor="fUrl">Sitio web</label>
          <div className="url-wrap">
            <input id="fUrl" value={data.url} onChange={e => update('url', e.target.value)} placeholder="https://tuempresa.com" type="url" />
            <button
              className={`url-btn${urlAnalyzed ? ' done' : ''}`}
              disabled={analyzing || !data.url}
              onClick={analyzeUrl}
              aria-label={analyzing ? 'Analizando sitio web' : urlAnalyzed ? 'Sitio analizado' : 'Analizar sitio web'}
            >
              {analyzing ? 'Analizando...' : urlAnalyzed ? '✓ Analizado' : 'Analizar sitio'}
            </button>
          </div>
        </div>
      </div>

      {insight && (
        <div className="ai-insight show" role="status" dangerouslySetInnerHTML={{ __html: insight }} />
      )}

      <div className="row2">
        <div className={`field${errors.industry ? ' field-error' : ''}`}>
          <label htmlFor="fIndustry">Industria <span className="req" aria-label="requerido">*</span></label>
          <select id="fIndustry" value={data.industry} onChange={e => update('industry', e.target.value)} aria-required="true" aria-invalid={!!errors.industry}>
            {INDUSTRY_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          {errors.industry && <div className="field-error-msg" role="alert">{errors.industry}</div>}
        </div>
        <div className="field">
          <label htmlFor="fSize">Tamaño (colaboradores)</label>
          <select id="fSize" value={data.size} onChange={e => update('size', e.target.value)}>
            {SIZE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      <div className="row2">
        <div className="field">
          <label htmlFor="fRole">Tu rol</label>
          <select id="fRole" value={data.role} onChange={e => update('role', e.target.value)}>
            {ROLE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="fContext">Contexto adicional</label>
        <textarea id="fContext" value={data.context} onChange={e => update('context', e.target.value)} placeholder="¿Qué motivó esta sesión? ¿Hay un proyecto puntual, un mandato del directorio, presión competitiva?" />
      </div>

      <nav className="nav-bar" aria-label="Navegación del wizard">
        <div></div>
        <button className="btn btn-p" onClick={handleNext}>Siguiente →</button>
      </nav>
    </div>
  );
}
