interface OptionCardProps {
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

export default function OptionCard({ title, description, selected, onClick }: OptionCardProps) {
  return (
    <div className={`opt${selected ? ' on' : ''}`} onClick={onClick}>
      <span className="ck">{selected ? '✓' : ''}</span>
      <div className="ot">{title}</div>
      <div className="od">{description}</div>
    </div>
  );
}
