interface SidebarProps {
  currentStep: number;
  challengeCount: number;
  maturityPercent: number;
}

const steps = [
  { num: 1, label: 'Empresa' },
  { num: 2, label: 'Desafíos' },
  { num: 3, label: 'Madurez' },
  { num: 4, label: 'Prioridades' },
  { num: 5, label: 'Resultados' },
];

export default function Sidebar({ currentStep, challengeCount, maturityPercent }: SidebarProps) {
  const progress = Math.min(100, Math.round(((currentStep - 1) / 4) * 100 + challengeCount * 2));
  const hasReachedMaturity = currentStep >= 3;

  return (
    <div className="sidebar">
      <h3>Pasos</h3>
      {steps.map(s => {
        let cls = 'nav-item';
        if (s.num === currentStep) cls += ' active';
        else if (s.num < currentStep) cls += ' completed';
        return (
          <div key={s.num} className={cls}>
            <span className="nav-num">
              {s.num < currentStep ? '✓' : s.num}
            </span>
            {s.label}
          </div>
        );
      })}
      <div className="sidebar-footer">
        <div className="sidebar-stat">
          <span className="label">Desafíos</span>
          <span className="val">{challengeCount}</span>
        </div>
        <div className="sidebar-stat">
          <span className="label">Madurez</span>
          <span className="val">{hasReachedMaturity ? `${maturityPercent}%` : '—'}</span>
        </div>
        <div className="sidebar-stat">
          <span className="label">Progreso</span>
          <span className="val">{Math.min(progress, 100)}%</span>
        </div>
      </div>
    </div>
  );
}
