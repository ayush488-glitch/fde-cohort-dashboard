/* global React */
const { useRef, useEffect, useState } = React;

// ── Top nav (slim, near-invisible) ─────────────────────────────────────────
function TopNav({ view, onView, activeId, onSelect, cohort }) {
  const [open, setOpen] = useState(false);
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "rgba(0,0,0,0.92)", backdropFilter: "saturate(180%) blur(20px)",
      color: "var(--on-dark)", height: 44,
      display: "flex", alignItems: "center", padding: "0 22px",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
    }}>
      <div className="wordmark" style={{ fontSize: 18, color: "var(--on-dark)" }}>Antern</div>
      <nav style={{ display: "flex", gap: 24, marginLeft: 32, fontSize: 12, color: "var(--on-dark-muted)" }}>
        <NavLink active={view === "cohort"} onClick={() => onView("cohort")}>Cohort</NavLink>
        <NavLink active={view === "report"} onClick={() => onView("report")}>Reports</NavLink>
        <NavLink>Campaigns</NavLink>
        <NavLink>Insights</NavLink>
      </nav>
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 14, fontSize: 12, color: "var(--on-dark-muted)" }}>
        <span>FDE Cohort · Apr 1 – May 6, 2026</span>
        <button onClick={() => setOpen(!open)} style={{
          background: "transparent", color: "var(--on-dark)", border: "1px solid rgba(255,255,255,0.18)",
          padding: "5px 12px", borderRadius: 6, fontSize: 12,
        }}>Switch student ↓</button>
      </div>
      {open && (
        <StudentSwitcher cohort={cohort} activeId={activeId}
          onSelect={(id) => { setOpen(false); onSelect(id); }}
          onClose={() => setOpen(false)} />
      )}
    </header>
  );
}
function NavLink({ active, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      background: "transparent", border: "none",
      color: active ? "var(--on-dark)" : "var(--on-dark-muted)",
      fontSize: 12, padding: 0, letterSpacing: "-0.005em",
    }}>{children}</button>
  );
}

function StudentSwitcher({ cohort, activeId, onSelect, onClose }) {
  const [q, setQ] = useState("");
  const filtered = cohort.filter(s => s.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 100 }}>
      <div onClick={e => e.stopPropagation()} style={{
        position: "absolute", top: 60, right: 22, width: 380, maxHeight: "70vh",
        background: "var(--canvas)", color: "var(--ink)", borderRadius: 14,
        boxShadow: "0 30px 80px -20px rgba(0,0,0,0.4)", overflow: "hidden",
        display: "flex", flexDirection: "column",
      }}>
        <div style={{ padding: 14, borderBottom: "1px solid var(--hairline-soft)" }}>
          <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="Search 33 students"
            style={{ width: "100%", border: "none", outline: "none", fontSize: 15, fontFamily: "var(--font-text)", letterSpacing: "-0.01em" }}/>
        </div>
        <div className="thin-scroll" style={{ overflowY: "auto", padding: 8 }}>
          {filtered.map(s => (
            <button key={s.id} onClick={() => onSelect(s.id)} disabled={!s.hasReport}
              style={{
                width: "100%", textAlign: "left", padding: "10px 12px", border: "none",
                background: s.id === activeId ? "var(--canvas-parchment)" : "transparent",
                borderRadius: 8, display: "flex", alignItems: "center", gap: 12,
                opacity: s.hasReport ? 1 : 0.5, cursor: s.hasReport ? "pointer" : "default",
                fontFamily: "var(--font-text)",
              }}>
              <Initials name={s.name} size={28}/>
              <div style={{ flex: 1, fontSize: 14, letterSpacing: "-0.01em" }}>{s.name}</div>
              <span style={{ fontSize: 11, color: "var(--ink-muted-48)" }}>#{s.rankPos}</span>
              {!s.hasReport && <span style={{ fontSize: 10, color: "var(--ink-muted-48)" }}>Pending</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Initials avatar
function Initials({ name, size = 40, tone = "light" }) {
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();
  const dark = tone === "dark";
  return (
    <div style={{
      width: size, height: size, borderRadius: "9999px",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: dark ? "rgba(255,255,255,0.06)" : "var(--canvas-parchment)",
      color: dark ? "var(--on-dark)" : "var(--ink)",
      border: dark ? "1px solid rgba(255,255,255,0.10)" : "1px solid var(--hairline-soft)",
      fontFamily: "var(--font-display)", fontWeight: 500,
      fontSize: size * 0.36, letterSpacing: "-0.02em", flexShrink: 0,
    }}>{initials}</div>
  );
}

window.TopNav = TopNav;
window.Initials = Initials;
