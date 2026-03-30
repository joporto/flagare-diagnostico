interface OptionCardProps {
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

export default function OptionCard({ title, description, selected, onClick }: OptionCardProps) {
  return (
    <div
      className={`opt${selected ? ' on' : ''}`}
      onClick={onClick}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
      role="checkbox"
      aria-checked={selected}
      tabIndex={0}
      aria-label={title}
    >
      <span className="ck" aria-hidden="true">{selected ? '✓' : ''}</span>
      <div className="ot">{title}</div>
      <div className="od">{description}</div>
    </div>
  );
}
