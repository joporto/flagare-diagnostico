interface Props {
  height?: number;
  variant?: 'full' | 'icon';
  dark?: boolean;
}

export default function FlagareLogo({ height = 36, variant = 'full', dark = false }: Props) {
  const iconHeight = height;
  const iconWidth = iconHeight * 0.6;
  const gradId = dark ? 'flameGradDark' : 'flameGrad';

  const flame = (
    <svg viewBox="0 0 120 200" width={iconWidth} height={iconHeight} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gradId} x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#E68B2B" />
          <stop offset="45%" stopColor="#EB6A2C" />
          <stop offset="100%" stopColor="#E43A3C" />
        </linearGradient>
      </defs>
      {/* Outer flame shape */}
      <path
        d="M60 0C60 0 95 45 100 90C105 135 85 170 60 190C35 170 15 135 20 90C25 45 60 0 60 0Z"
        fill={`url(#${gradId})`}
      />
      {/* Inner white cutout - the swoosh */}
      <path
        d="M55 65C55 65 35 95 38 125C41 150 55 165 60 170C50 155 45 140 48 120C51 100 65 80 70 70C60 85 50 100 52 115C54 130 60 142 65 148C62 135 63 118 70 105C77 92 85 82 85 82C75 95 68 108 66 122C64 136 68 148 72 155C65 145 60 130 62 112C64 94 75 75 75 75L55 65Z"
        fill={dark ? '#2A2A2A' : 'white'}
      />
      {/* Small dot */}
      <circle cx="72" cy="172" r="6" fill={`url(#${gradId})`} />
    </svg>
  );

  if (variant === 'icon') return flame;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {flame}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
        <span style={{
          fontFamily: "'Lato', sans-serif",
          fontWeight: 900,
          fontSize: `${height * 0.55}px`,
          color: dark ? '#ffffff' : '#333333',
          letterSpacing: '-0.5px',
        }}>
          flagare
        </span>
        <span style={{
          fontFamily: "'Open Sans', sans-serif",
          fontWeight: 400,
          fontSize: `${height * 0.28}px`,
          color: dark ? 'rgba(255,255,255,0.6)' : '#999',
          letterSpacing: '0.5px',
        }}>
          Consultores TI
        </span>
      </div>
    </div>
  );
}
