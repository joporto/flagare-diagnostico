interface Props {
  height?: number;
}

export default function FlagareLogo({ height = 36 }: Props) {
  return (
    <img
      src="/flagare-logo.png"
      alt="Flagare Consultores TI"
      style={{ height: `${height}px`, width: 'auto' }}
    />
  );
}
