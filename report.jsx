/* global React */

// ── Report card (individual student) ───────────────────────────────────────
function ReportCard({ report, onBack }) {
  const rootRef = React.useRef(null);
  useReveal(rootRef);
  const r = report;
  const isLeanFix = r.bucket === "lean_fixes";

  return (
    <div ref={rootRef}>
      {/* ── Hero — true black gallery ─────────────────────────────────── */}
      <section style={{ background: "var(--surface-black)", color: "var(--on-dark)", padding: "96px 64px 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-20%", left: "-10%", width: 700, height: 700,
          background: "radial-gradient(circle, rgba(41,151,255,0.08) 0%, transparent 60%)", pointerEvents: "none" }}/>
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
          <button className="rise" onClick={onBack} style={{
            background: "transparent", border: "none", color: "var(--on-dark-muted)",
            fontSize: 13, padding: 0, marginBottom: 32, letterSpacing: "-0.005em",
          }}>← Cohort overview</button>

          <div className="rise rise-d1 eyebrow eyebrow-on-dark">Individual Report · {r.window.weeks}-week window</div>

          <div style={{ display: "flex", gap: 32, alignItems: "center", marginTop: 28 }} className="rise rise-d2">
            <Initials name={r.student.name} size={88} tone="dark"/>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <h1 style={{ fontSize: "clamp(56px, 7vw, 96px)", letterSpacing: "-0.04em" }}>{r.student.name}</h1>
                <CaveatBadge caveats={r.caveats}/>
              </div>
              <div style={{ marginTop: 12, fontSize: 17, color: "var(--on-dark-muted)" }}>
                {r.window.start} — {r.window.end} · {r.geography.join(" · ")}
              </div>
            </div>
          </div>

          <p className="rise rise-d3 display-300" style={{
            marginTop: 36, fontSize: 22, fontWeight: 300, lineHeight: 1.5, color: "var(--on-dark-muted)", maxWidth: 760,
          }}>{r.campaign}.</p>

          {/* Hero stats — non-comparative */}
          <div className="rise rise-d4" style={{
            marginTop: 64, display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
            borderTop: "1px solid var(--hairline-on-dark)", borderBottom: "1px solid var(--hairline-on-dark)",
          }}>
            <HeroFact label="Acceptance rate" val={`${r.rates.acceptance}%`} sub={`${r.funnel.accepted} of ${r.funnel.requests_sent} requests accepted`}/>
            <HeroFact label="Opportunities created" val={r.funnel.positive} sub="conversations near closing" highlight border/>
            <HeroFact label="Median first reply" val={`${r.response.medianDays}d`} sub={`${r.response.threadsAnalyzed} threads analyzed`} last/>
          </div>
        </div>
      </section>

      {isLeanFix && (
        <>
          <section style={{ background: "var(--canvas-parchment)", padding: "112px 64px" }}>
            <div style={{ maxWidth: 880, margin: "0 auto", textAlign: "center" }}>
              <div className="eyebrow">Coaching session in progress</div>
              <h2 style={{ fontSize: "clamp(36px, 4.5vw, 56px)", marginTop: 18, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                Holding the report until lean fixes land.
              </h2>
              <p style={{ marginTop: 22, fontSize: 18, color: "var(--ink-muted-60)", lineHeight: 1.55 }}>
                {r.student.name} is in a coaching pass on LinkedIn presence and messaging.
                The full report — funnel, conversations, projections — will publish after the session.
              </p>
            </div>
          </section>
          {r.caveats && r.caveats.length > 0 && (
            <section style={{ background: "var(--canvas)", padding: "72px 64px", borderTop: "1px solid var(--hairline-soft)" }}>
              <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                <div className="eyebrow">About these numbers</div>
                <h3 style={{ fontSize: 24, marginTop: 12, fontWeight: 500, letterSpacing: "-0.02em" }}>A floor, not a ceiling.</h3>
                <ul style={{ marginTop: 24, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12, maxWidth: 880 }}>
                  {r.caveats.map((c, i) => (
                    <li key={i} style={{ display: "flex", gap: 14, fontSize: 14, color: "var(--ink-muted-80)", lineHeight: 1.55 }}>
                      <span style={{ color: "var(--ink-muted-30)", flexShrink: 0 }}>·</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}
          <footer style={{ background: "var(--canvas)", padding: "48px 64px", borderTop: "1px solid var(--hairline-soft)" }}>
            <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", gap: 32, alignItems: "center" }}>
              <div style={{ fontSize: 12, color: "var(--ink-muted-48)" }}>
                Numbers reflect activity captured inside Antern.
              </div>
              <div className="wordmark" style={{ fontSize: 14, color: "var(--ink-muted-48)" }}>Antern</div>
            </div>
          </footer>
        </>
      )}

      {!isLeanFix && (<>
      {/* Funnel + cadence — parchment */}
      <section style={{ background: "var(--canvas-parchment)", padding: "112px 64px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="reveal-on-scroll">
            <SectionHead eyebrow="Conversion" title="The funnel, end to end." sub={`${r.funnel.leads_targeted.toLocaleString()} leads in, ${r.funnel.positive} active conversations out.`}/>
          </div>
          <div className="reveal-on-scroll" style={{ marginTop: 56 }}><Funnel funnel={r.funnel}/></div>

          <div style={{ height: 96 }}/>

          <div className="reveal-on-scroll">
            <SectionHead eyebrow="Cadence" title="Weekly volume." sub="Inbound replies overlaid on outbound AI message volume."/>
          </div>
          <div className="reveal-on-scroll" style={{ marginTop: 56 }}><Timeline weekly={r.weekly}/></div>
        </div>
      </section>

      {/* Pipeline — black */}
      <section style={{ background: "var(--surface-tile-1)", color: "var(--on-dark)", padding: "112px 64px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="reveal-on-scroll">
            <div className="eyebrow eyebrow-on-dark">Opportunity</div>
            <h2 style={{ fontSize: "clamp(40px, 5vw, 64px)", marginTop: 14, color: "var(--on-dark)" }}>Active conversations, valued.</h2>
            <p style={{ marginTop: 18, fontSize: 19, color: "var(--on-dark-muted)", maxWidth: 720, lineHeight: 1.5 }}>
              At $1K–$2K monthly over a 3-month minimum, each conversation near closing represents
              $3K–$6K in potential US engagement.
            </p>
          </div>
          <div className="reveal-on-scroll" style={{ marginTop: 64 }}><Pipeline pipeline={r.pipeline}/></div>
          <div className="reveal-on-scroll" style={{
            marginTop: 32, fontSize: 12, color: "var(--on-dark-muted-2)",
            letterSpacing: "0.04em", textTransform: "uppercase",
          }}>
            At current pace · extrapolation, not prediction
          </div>
        </div>
      </section>

      {/* Reply intelligence — white */}
      <section style={{ background: "var(--canvas)", padding: "112px 64px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="reveal-on-scroll">
            <SectionHead eyebrow="Reply intelligence" title="What came back." sub={`${r.response.threadsAnalyzed} threads classified by LLM. Median first reply in ${r.response.medianDays} days, average ${r.response.avgFollowUps.toFixed(1)} follow-ups.`}/>
          </div>
          <div className="reveal-on-scroll"><ReplyIntel report={r}/></div>
        </div>
      </section>

      {/* Insights — parchment */}
      <section style={{ background: "var(--canvas-parchment)", padding: "112px 64px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="reveal-on-scroll">
            <SectionHead eyebrow="Patterns" title="What worked, what didn't." sub="LLM pattern extraction across this student's classified threads."/>
          </div>
          <div className="reveal-on-scroll" style={{ marginTop: 56 }}><Insights report={r}/></div>
        </div>
      </section>

      {r.caveats && r.caveats.length > 0 && (
        <section style={{ background: "var(--canvas)", padding: "72px 64px", borderTop: "1px solid var(--hairline-soft)" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div className="eyebrow">About these numbers</div>
            <h3 style={{ fontSize: 24, marginTop: 12, fontWeight: 500, letterSpacing: "-0.02em" }}>A floor, not a ceiling.</h3>
            <ul style={{ marginTop: 24, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12, maxWidth: 880 }}>
              {r.caveats.map((c, i) => (
                <li key={i} style={{ display: "flex", gap: 14, fontSize: 14, color: "var(--ink-muted-80)", lineHeight: 1.55 }}>
                  <span style={{ color: "var(--ink-muted-30)", flexShrink: 0 }}>·</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <footer style={{ background: "var(--canvas)", padding: "48px 64px", borderTop: "1px solid var(--hairline-soft)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", gap: 32, alignItems: "center" }}>
          <div style={{ fontSize: 12, color: "var(--ink-muted-48)", maxWidth: 720, lineHeight: 1.6 }}>
            Numbers reflect activity captured inside Antern. Replies sent or received directly on LinkedIn outside the platform are not included.
          </div>
          <div className="wordmark" style={{ fontSize: 14, color: "var(--ink-muted-48)" }}>Antern</div>
        </div>
      </footer>
      </>)}
    </div>
  );
}

function CaveatBadge({ caveats }) {
  const [open, setOpen] = React.useState(false);
  if (!caveats || caveats.length === 0) return null;
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button onClick={() => setOpen(o => !o)} aria-label="Data caveats" style={{
        width: 28, height: 28, borderRadius: "50%",
        border: "1px solid var(--hairline-on-dark)", background: "transparent",
        color: "var(--on-dark-muted)", fontSize: 14, cursor: "pointer",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--font-display)", fontStyle: "italic",
      }}>i</button>
      {open && (
        <div style={{
          position: "absolute", top: 36, left: 0, zIndex: 50, width: 380,
          background: "var(--surface-tile-1)", border: "1px solid var(--hairline-on-dark)",
          borderRadius: 12, padding: 18, color: "var(--on-dark-muted)", fontSize: 12,
          lineHeight: 1.55, boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
        }}>
          <div className="eyebrow eyebrow-on-dark" style={{ marginBottom: 10 }}>About these numbers</div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
            {caveats.map((c, i) => <li key={i} style={{ display: "flex", gap: 8 }}><span style={{ color: "var(--on-dark-muted-2)" }}>·</span><span>{c}</span></li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

function HeroFact({ label, val, sub, highlight, last, border }) {
  return (
    <div style={{
      padding: "32px 32px 32px 0",
      borderRight: last ? "none" : "1px solid var(--hairline-on-dark)",
      borderLeft: border ? "1px solid var(--hairline-on-dark)" : "none",
      paddingLeft: border ? 32 : 0,
    }}>
      <div className="eyebrow eyebrow-on-dark">{label}</div>
      <div className="hero-numeral" style={{ fontSize: 72, marginTop: 14, color: highlight ? "var(--primary-on-dark)" : "var(--on-dark)", lineHeight: 1 }}>{val}</div>
      <div style={{ marginTop: 16, fontSize: 14, color: "var(--on-dark-muted)" }}>{sub}</div>
    </div>
  );
}

function SectionHead({ eyebrow, title, sub }) {
  return (
    <div>
      <div className="eyebrow">{eyebrow}</div>
      <h2 style={{ fontSize: "clamp(40px, 5vw, 64px)", marginTop: 14 }}>{title}</h2>
      {sub && <p style={{ marginTop: 18, fontSize: 19, color: "var(--ink-muted-60)", maxWidth: 720, lineHeight: 1.5 }}>{sub}</p>}
    </div>
  );
}

// ── Funnel ─────────────────────────────────────────────────────────────────
function Funnel({ funnel }) {
  const stages = [
    { label: "Leads targeted", value: funnel.leads_targeted },
    { label: "Requests sent", value: funnel.requests_sent },
    { label: "Connections accepted", value: funnel.accepted },
    { label: "Inbound replies", value: funnel.replied },
    { label: "Conversations opened", value: funnel.positive },
  ];
  const max = stages[0].value;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {stages.map((s, i) => {
        const pct = (s.value / max) * 100;
        return (
          <div key={s.label} style={{ display: "grid", gridTemplateColumns: "220px 1fr 110px 110px", alignItems: "center", gap: 16 }}>
            <div style={{ fontSize: 14, color: "var(--ink-muted-80)" }}>{s.label}</div>
            <div style={{ height: 32, background: "var(--canvas)", border: "1px solid var(--hairline-soft)", borderRadius: 4, overflow: "hidden" }}>
              <div style={{
                width: `${pct}%`, height: "100%",
                background: i === stages.length - 1 ? "var(--primary)" : "var(--ink)",
                opacity: i === stages.length - 1 ? 1 : 1 - i * 0.06,
                transition: "width 1.2s cubic-bezier(.2,.7,.2,1)",
              }}/>
            </div>
            <div className="tabular hero-numeral" style={{ fontSize: 22 }}>{s.value.toLocaleString()}</div>
            <div className="tabular" style={{ fontSize: 12, color: "var(--ink-muted-48)", textAlign: "right" }}>
              {i === 0 ? "—" : `${((s.value / stages[i-1].value) * 100).toFixed(1)}% step`}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Timeline ────────────────────────────────────────────────────────────────
function Timeline({ weekly }) {
  const ref = React.useRef(null);
  const W = 1180, H = 280, PL = 50, PR = 30, PT = 30, PB = 50;
  const innerW = W - PL - PR, innerH = H - PT - PB;
  const maxR = Math.max(...weekly.map(w => w.replies)) || 1;
  const maxA = Math.max(...weekly.map(w => w.ai)) || 1;
  const x = i => PL + (i / (weekly.length - 1)) * innerW;
  const yR = v => PT + innerH - (v / maxR) * innerH;
  const yA = v => PT + innerH - (v / maxA) * innerH;
  const repliesPath = weekly.map((w, i) => `${i === 0 ? "M" : "L"}${x(i)},${yR(w.replies)}`).join(" ");
  const aiPath = weekly.map((w, i) => `${i === 0 ? "M" : "L"}${x(i)},${yA(w.ai)}`).join(" ");

  React.useEffect(() => {
    const svg = ref.current; if (!svg) return;
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) {
        svg.querySelectorAll(".draw").forEach(p => {
          const len = p.getTotalLength();
          p.style.strokeDasharray = len; p.style.strokeDashoffset = len;
          p.getBoundingClientRect();
          p.style.transition = "stroke-dashoffset 1.4s cubic-bezier(.2,.7,.2,1)";
          p.style.strokeDashoffset = 0;
        });
        io.disconnect();
      }
    }), { threshold: 0.3 });
    io.observe(svg); return () => io.disconnect();
  }, []);

  return (
    <div style={{ background: "var(--canvas)", border: "1px solid var(--hairline-soft)", borderRadius: 18, padding: 32 }}>
      <div style={{ display: "flex", gap: 32, marginBottom: 16, fontSize: 13, color: "var(--ink-muted-60)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ width: 12, height: 12, background: "var(--ink-muted-30)", borderRadius: 2 }}/>Outbound AI messages</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ width: 12, height: 12, background: "var(--primary)", borderRadius: 2 }}/>Inbound replies</div>
      </div>
      <svg ref={ref} viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }}>
        {[0,0.25,0.5,0.75,1].map(t => <line key={t} x1={PL} x2={W-PR} y1={PT + innerH * t} y2={PT + innerH * t} stroke="var(--hairline-soft)"/>)}
        {weekly.map((w, i) => <text key={i} x={x(i)} y={H - 14} fontSize="12" fill="var(--ink-muted-48)" textAnchor="middle">{w.week}</text>)}
        <path className="draw" d={aiPath} fill="none" stroke="var(--ink-muted-30)" strokeWidth="1.5"/>
        {weekly.map((w, i) => <circle key={i} cx={x(i)} cy={yA(w.ai)} r="3" fill="var(--ink-muted-30)"/>)}
        <path className="draw" d={repliesPath} fill="none" stroke="var(--primary)" strokeWidth="2.5"/>
        {weekly.map((w, i) => (
          <g key={i}>
            <circle cx={x(i)} cy={yR(w.replies)} r="5" fill="var(--canvas)" stroke="var(--primary)" strokeWidth="2.5"/>
            <text x={x(i)} y={yR(w.replies) - 14} fontSize="12" fill="var(--primary)" fontWeight="600" textAnchor="middle">{w.replies}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// ── Pipeline ────────────────────────────────────────────────────────────────
function Pipeline({ pipeline }) {
  const fmt = n => n >= 1e6 ? `$${(n/1e6).toFixed(2)}M` : `$${(n/1000).toFixed(n >= 100000 ? 0 : 1)}K`;
  return (
    <div>
      <div style={{ paddingBottom: 56, borderBottom: "1px solid var(--hairline-on-dark)" }}>
        <div className="eyebrow eyebrow-on-dark">Opportunity in active conversation</div>
        <div style={{ marginTop: 18 }}>
          <span className="hero-numeral-thin" style={{ fontSize: "clamp(72px, 8vw, 120px)" }}>{fmt(pipeline.currentLow)}</span>
          <span style={{ color: "var(--on-dark-muted-2)", fontSize: 28, margin: "0 18px", fontWeight: 200 }}>—</span>
          <span className="hero-numeral-thin" style={{ fontSize: "clamp(72px, 8vw, 120px)" }}>{fmt(pipeline.currentHigh)}</span>
        </div>
        <div style={{ marginTop: 16, fontSize: 14, color: "var(--on-dark-muted)", maxWidth: 720 }} title={pipeline.basis}>{pipeline.basis || "—"}</div>
      </div>
      <div style={{ marginTop: 48 }}>
        <div className="eyebrow eyebrow-on-dark" style={{ marginBottom: 24 }}>If conversation pace holds</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {pipeline.projections.map(p => (
            <div key={p.label} style={{ background: "var(--surface-tile-2)", border: "1px solid var(--hairline-on-dark)", borderRadius: 18, padding: 28 }}>
              <div className="eyebrow eyebrow-on-dark" style={{ fontSize: 11 }}>{p.label}</div>
              <div className="hero-numeral" style={{ marginTop: 18, fontSize: 28, color: "var(--on-dark)" }}>{fmt(p.low)}–{fmt(p.high)}</div>
              <div style={{ marginTop: 14, fontSize: 12, color: "var(--on-dark-muted-2)" }}>
                <span><b style={{ color: "var(--on-dark)" }}>+{p.positive}</b> new conversations</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Reply intelligence ─────────────────────────────────────────────────────
function ReplyIntel({ report }) {
  const sentTotal = report.sentiment.reduce((a, b) => a + b.count, 0);
  return (
    <div style={{ marginTop: 56 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 24 }}>
        <div style={{ background: "var(--surface-pearl)", border: "1px solid var(--hairline-soft)", borderRadius: 18, padding: 36 }}>
          <h3 style={{ fontSize: 22, marginBottom: 28 }}>Sentiment</h3>
          <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
            <Donut data={report.sentiment} total={sentTotal}/>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
              {report.sentiment.map(s => (
                <div key={s.key} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 2, background: toneColor(s.tone) }}/>
                  <span style={{ flex: 1, color: "var(--ink-muted-80)" }}>{s.label}</span>
                  <span className="tabular" style={{ fontWeight: 600 }}>{s.count}</span>
                  <span className="tabular" style={{ color: "var(--ink-muted-48)", width: 42, textAlign: "right" }}>{((s.count / sentTotal) * 100).toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ background: "var(--surface-pearl)", border: "1px solid var(--hairline-soft)", borderRadius: 18, padding: 36 }}>
          <h3 style={{ fontSize: 22, marginBottom: 28 }}>Intent</h3>
          <BarList items={report.intent}/>
        </div>
      </div>
      <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <PersonaCard title="Replier seniority" items={report.personaSeniority}/>
        <PersonaCard title="Replier function" items={report.personaFunction}/>
      </div>
    </div>
  );
}
function toneColor(t) { return t === "positive" ? "var(--positive)" : t === "negative" ? "var(--negative)" : "var(--neutral)"; }
function Donut({ data, total }) {
  const size = 200, stroke = 28, r = (size - stroke) / 2, c = 2 * Math.PI * r;
  let off = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--canvas-parchment)" strokeWidth={stroke}/>
      {data.map((d, i) => {
        const len = (d.count / total) * c;
        const seg = <circle key={i} cx={size/2} cy={size/2} r={r} fill="none" stroke={toneColor(d.tone)} strokeWidth={stroke} strokeDasharray={`${len} ${c - len}`} strokeDashoffset={-off}/>;
        off += len; return seg;
      })}
    </svg>
  );
}
function BarList({ items }) {
  const max = Math.max(...items.map(i => i.count));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {items.map(i => (
        <div key={i.label} style={{ display: "grid", gridTemplateColumns: "180px 1fr 32px", alignItems: "center", gap: 12, fontSize: 13 }}>
          <span style={{ color: "var(--ink-muted-80)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{i.label}</span>
          <div style={{ height: 8, background: "var(--canvas-parchment)", borderRadius: 999 }}>
            <div style={{ width: `${(i.count / max) * 100}%`, height: "100%", background: "var(--ink)", borderRadius: 999, transition: "width 1.2s cubic-bezier(.2,.7,.2,1)" }}/>
          </div>
          <span className="tabular" style={{ textAlign: "right", fontWeight: 600 }}>{i.count}</span>
        </div>
      ))}
    </div>
  );
}
function PersonaCard({ title, items }) {
  const known = items.filter(i => i.label !== "Unknown");
  const unknown = items.find(i => i.label === "Unknown")?.count || 0;
  return (
    <div style={{ background: "var(--surface-pearl)", border: "1px solid var(--hairline-soft)", borderRadius: 18, padding: 36 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
        <h3 style={{ fontSize: 22 }}>{title}</h3>
        {unknown > 0 && <span style={{ fontSize: 12, color: "var(--ink-muted-48)" }}>{unknown} unknown</span>}
      </div>
      <BarList items={known.length ? known : [{ label: "No labelled data", count: 1 }]}/>
    </div>
  );
}

// ── Insights ────────────────────────────────────────────────────────────────
function Insights({ report }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
      <InsightCard title="What worked" items={report.worked} tone="positive"/>
      <InsightCard title="What didn't" items={report.didnt} tone="negative"/>
    </div>
  );
}
function InsightCard({ title, items, tone }) {
  const color = tone === "positive" ? "var(--positive)" : "var(--negative)";
  const empty = !items || items.length === 0;
  return (
    <div style={{ background: "var(--canvas)", border: "1px solid var(--hairline-soft)", borderRadius: 18, padding: 36 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: color }}/>
        <span className="eyebrow" style={{ color, fontWeight: 600 }}>{title}</span>
      </div>
      {empty && (
        <div style={{ fontSize: 14, color: "var(--ink-muted-48)", fontStyle: "italic" }}>
          No clear patterns surfaced from this student's threads.
        </div>
      )}
      <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 18 }}>
        {(items || []).map((t, i) => (
          <li key={i} style={{ display: "flex", gap: 18, fontSize: 15, color: "var(--ink-muted-80)", lineHeight: 1.55 }}>
            <span className="tabular" style={{ fontFamily: "var(--font-display)", color: "var(--ink-muted-30)", fontWeight: 500, width: 24, flexShrink: 0 }}>{String(i+1).padStart(2,"0")}</span>
            <span>{t}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

window.ReportCard = ReportCard;
