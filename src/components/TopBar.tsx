import FlagareLogo from './FlagareLogo';

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <FlagareLogo height={38} variant="full" dark />
      </div>
      <div className="topbar-right">
        <div className="session-badge">
          <span className="dot"></span>
          AI Discovery Session
        </div>
      </div>
    </div>
  );
}
