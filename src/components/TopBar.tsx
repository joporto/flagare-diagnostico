export default function TopBar() {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <span className="brand">FLAGARE</span>
        <span className="brand-sub">Consultores TI</span>
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
