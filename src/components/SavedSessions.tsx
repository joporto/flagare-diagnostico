import { useState } from 'react';
import type { DiagnosticSession } from '../types';
import { loadDiagnostics, exportDiagnosticsJSON } from '../utils/storage';

interface Props {
  onClose: () => void;
}

export default function SavedSessions({ onClose }: Props) {
  const [sessions] = useState<DiagnosticSession[]>(loadDiagnostics);

  const handleExport = () => {
    const json = exportDiagnosticsJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `flagare-diagnosticos-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
    }}>
      <div style={{
        background: 'var(--w)', borderRadius: '18px', padding: '32px',
        maxWidth: '700px', width: '90%', maxHeight: '80vh', overflow: 'auto',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '22px', fontWeight: 700 }}>
            Consultas guardadas ({sessions.length})
          </h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            {sessions.length > 0 && (
              <button className="btn btn-s" onClick={handleExport}>Exportar JSON</button>
            )}
            <button className="btn btn-s" onClick={onClose}>Cerrar</button>
          </div>
        </div>

        {sessions.length === 0 ? (
          <p style={{ color: 'var(--gt)', fontSize: '14px' }}>No hay consultas guardadas aún.</p>
        ) : (
          <div style={{ display: 'grid', gap: '12px' }}>
            {sessions.map(s => (
              <div key={s.id} style={{
                border: '1px solid var(--gl)', borderRadius: '12px', padding: '16px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <strong style={{ fontSize: '15px' }}>{s.companyInfo.company || 'Sin nombre'}</strong>
                  <span style={{ fontSize: '12px', color: 'var(--gm)' }}>
                    {new Date(s.timestamp).toLocaleDateString('es-CL')}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--gt)', flexWrap: 'wrap' }}>
                  <span>Score: <strong style={{ color: 'var(--o)' }}>{s.overallScore}%</strong></span>
                  <span>Industria: {s.companyInfo.industry || '-'}</span>
                  <span>Desafíos: {s.challenges.length}</span>
                  {s.contact.email && <span>Email: {s.contact.email}</span>}
                  {s.contact.name && <span>Contacto: {s.contact.name}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
