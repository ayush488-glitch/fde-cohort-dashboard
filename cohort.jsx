/* global React */
const { useRef: useR1, useEffect } = React;

// ── Cohort Dashboard ───────────────────────────────────────────────────────
function CohortDashboard({ cohort, totals, weekly, highlights, onOpenStudent }) {
  const rootRef = useR1(null);
  useReveal(rootRef);

  const fmt$ = n => n >= 1e6 ? `$${(n/1e6).toFixed(2)}M` : `$${(n/1000).toFixed(0)}K`;

  return (
    <div ref={rootRef}>
      {/* ── Hero — true black, photographic gallery feel ─────────────────── */}
      <section style={{
        background: "var(--surface-black)", color: "var(--on-dark)",
        padding: "120px 64px 96px", position: "relative", overflow: "hidden",
      }}>
        {/* Subtle ambient light, not gradient chrome */}
        <div style={{
          position: "absolute", top: "-30%", right: "-10%", width: 700, height: 700,
          background: "radial-gradient(circle, rgba(41,151,255,0.10) 0%, transparent 60%)",
          pointerEvents: "none",
        }}/>
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
          <div className="rise eyebrow eyebrow-on-dark">FDE Cohort · Week 10 Report · Spring 2026</div>
          <h1 className="rise rise-d1" style={{
            fontSize: "clamp(56px, 7vw, 104px)", marginTop: 24,
            letterSpacing: "-0.04em", lineHeight: 1.02, maxWidth: 1100,
          }}>
            Thirty-three students.<br/>
            <span style={{ color: "var(--on-dark-muted)" }}>Ten weeks. </span>
            <span style={{ color: "var(--primary-on-dark)" }}>{totals.positive} live conversations.</span>
          </h1>
          <p className="rise rise-d2 display-300" style={{
            marginTop: 36, fontSize: 24, lineHeight: 1.5, fontWeight: 300,
            color: "var(--on-dark-muted)", maxWidth: 760, letterSpacing: "-0.005em",
          }}>
            What the cohort built between {totals.window.start} and {totals.window.end} —
            measured honestly, in conversations opened with US decision-makers who responded with intent.
          </p>

          {/* Hero numerals row */}
          <div className="rise rise-d3" style={{
            marginTop: 96, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0,
            borderTop: "1px solid var(--hairline-on-dark)",
            borderBottom: "1px solid var(--hairline-on-dark)",
          }}>
            {(() => {
              const b = totals.week5Baseline || {};
              const pct = (cur, old) => old ? `+${Math.round((cur - old) / old * 100)}%` : null;
              return (<>
                <HeroStat eyebrow="Requests sent" value={<CountUp to={totals.requestsSent} className="hero-numeral" />} delta={pct(totals.requestsSent, b.requestsSent)} sub="across LinkedIn outreach"/>
                <HeroStat eyebrow="Connections accepted" value={<CountUp to={totals.accepted} className="hero-numeral" />} delta={pct(totals.accepted, b.accepted)} sub={`${(totals.accepted/totals.requestsSent*100).toFixed(1)}% acceptance`}/>
                <HeroStat eyebrow="Opportunities created" value={<CountUp to={totals.positive} className="hero-numeral" />} delta={pct(totals.positive, b.positive)} accent sub="positive replies — interest or meeting-intent"/>
                <HeroStat eyebrow="Students in conversation" value={<CountUp to={totals.studentsInConversation} className="hero-numeral" />} sub={`of ${totals.students} — actively dialoguing with US leads`} last/>
              </>);
            })()}
          </div>

          {/* Pipeline pull-quote */}
          <div className="rise rise-d4" style={{
            marginTop: 80, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 48,
          }}>
            <div>
              <div className="eyebrow eyebrow-on-dark">Opportunity created</div>
              <div style={{ marginTop: 18 }}>
                <span className="hero-numeral-thin" style={{ fontSize: "clamp(72px, 9vw, 140px)" }}>
                  {fmt$(totals.pipelineLow)}
                </span>
                <span style={{ color: "var(--on-dark-muted-2)", fontSize: 36, margin: "0 18px", fontWeight: 200 }}>—</span>
                <span className="hero-numeral-thin" style={{ fontSize: "clamp(72px, 9vw, 140px)" }}>
                  {fmt$(totals.pipelineHigh)}
                </span>
              </div>
              <div style={{ marginTop: 18, fontSize: 15, color: "var(--on-dark-muted)", maxWidth: 600, lineHeight: 1.5 }}>
                {totals.positive} live conversations × $3K–$6K per US engagement
                {totals.week5Baseline ? ` — up from $${Math.round(totals.week5Baseline.positive * 3 / 1000)}K–$${Math.round(totals.week5Baseline.positive * 6 / 1000)}K at week 5` : ""}.
                A floor, not a ceiling — every figure counts only what was captured inside Antern.
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
              <button className="btn-pill" onClick={() => document.getElementById("conversations").scrollIntoView({ behavior: "smooth" })}>See the conversations →</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Week highlights ───────────────────────────────────────────────── */}
      {highlights && <WeekHighlights h={highlights} />}

      {/* ── Cadence chart — parchment ─────────────────────────────────────── */}
      <section style={{ background: "var(--canvas-parchment)", padding: "120px 64px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="reveal-on-scroll">
            <div className="eyebrow">Activity</div>
            <h2 style={{ fontSize: "clamp(40px, 5vw, 64px)", marginTop: 14 }}>Weekly cadence, all {totals.students} students.</h2>
            <p style={{ marginTop: 18, fontSize: 19, color: "var(--ink-muted-60)", maxWidth: 660, lineHeight: 1.5 }}>
              Inbound replies climbed steadily as the cohort tuned messaging in week three and four.
            </p>
          </div>
          <div className="reveal-on-scroll" style={{ marginTop: 64 }}>
            <CohortCadence weekly={weekly} />
          </div>
        </div>
      </section>

      {/* ── Conversation directory — pure white ────────────────────────── */}
      <ConversationDirectory cohort={cohort} totals={totals} onOpenStudent={onOpenStudent}/>

      {/* ── Funnel — parchment ─────────────────────────────────────────── */}
      <section style={{ background: "var(--canvas-parchment)", padding: "120px 64px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="reveal-on-scroll" style={{ maxWidth: 720 }}>
            <div className="eyebrow">The funnel</div>
            <h2 style={{ fontSize: "clamp(40px, 5vw, 64px)", marginTop: 14, letterSpacing: "-0.028em" }}>{totals.requestsSent.toLocaleString()} in. {totals.positive} conversations open.</h2>
            <p style={{ marginTop: 16, fontSize: 17, color: "var(--ink-muted-60)" }}>
              Every step retains a meaningful share. The narrowing happens at intent, not delivery.
            </p>
          </div>
          <div className="reveal-on-scroll" style={{ marginTop: 56, maxWidth: 980 }}>
            <CohortFunnel totals={totals} />
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer style={{ background: "var(--canvas)", padding: "48px 64px", borderTop: "1px solid var(--hairline-soft)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", gap: 32, alignItems: "center" }}>
          <div style={{ fontSize: 12, color: "var(--ink-muted-48)", maxWidth: 720, lineHeight: 1.6 }}>
            Numbers reflect activity captured inside Antern. Replies sent or received directly on LinkedIn
            outside the platform are not included — true positive replies are likely higher than shown.
          </div>
          <div className="wordmark" style={{ fontSize: 14, color: "var(--ink-muted-48)" }}>Antern</div>
        </div>
      </footer>
    </div>
  );
}

// ── Week Highlights ────────────────────────────────────────────────────────
function WeekHighlights({ h }) {
  const S = {
    section: {
      background: "linear-gradient(160deg, #06080F 0%, #0C1020 60%, #080C18 100%)",
      borderTop: "1px solid rgba(41,151,255,0.18)",
      padding: "96px 64px",
    },
    wrap: { maxWidth: 1280, margin: "0 auto" },
    tag: {
      display: "inline-block", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em",
      textTransform: "uppercase", color: "var(--primary-on-dark)",
      background: "rgba(41,151,255,0.12)", border: "1px solid rgba(41,151,255,0.25)",
      borderRadius: 4, padding: "3px 8px", marginBottom: 20,
    },
    headline: {
      fontSize: "clamp(34px, 4vw, 56px)", fontWeight: 300, color: "var(--on-dark)",
      letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 64,
    },
    statsGrid: {
      display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
      borderTop: "1px solid rgba(255,255,255,0.08)",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      marginBottom: 56,
    },
    statCell: {
      padding: "40px 32px 40px 0",
      borderRight: "1px solid rgba(255,255,255,0.08)",
    },
    statCellLast: { padding: "40px 0 40px 32px" },
    statNum: { fontSize: "clamp(52px, 6vw, 88px)", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 0.95 },
    statLabel: { marginTop: 14, fontSize: 13, fontWeight: 600, color: "var(--on-dark)", letterSpacing: "0.01em" },
    statSub: { marginTop: 6, fontSize: 12, color: "rgba(255,255,255,0.40)", lineHeight: 1.5 },
    cardsGrid: {
      display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 24,
    },
    card: {
      padding: "28px 32px",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 10,
      background: "rgba(255,255,255,0.03)",
    },
    cardTag: { fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)", marginBottom: 10 },
    cardHead: { fontSize: 17, fontWeight: 400, color: "var(--on-dark)", lineHeight: 1.35, marginBottom: 8 },
    cardBody: { fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 },
    banner: {
      padding: "22px 32px",
      border: "1px solid rgba(41,151,255,0.25)",
      borderRadius: 10,
      background: "rgba(41,151,255,0.06)",
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32,
    },
    bannerLeft: { display: "flex", alignItems: "center", gap: 16 },
    dot: { width: 8, height: 8, borderRadius: "50%", background: "var(--primary-on-dark)", flexShrink: 0, animation: "pulse 2s infinite" },
    bannerTag: { fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--primary-on-dark)", marginBottom: 4 },
    bannerText: { fontSize: 16, color: "var(--on-dark)", fontWeight: 400 },
  };

  const cards = [
    {
      tag: "Social proof",
      head: `Posts liked & shared by ${h.social.join(" and ")}`,
      body: "Student content reached top-tier tech communities through organic engagement from some of the most influential voices in the industry.",
    },
    {
      tag: "Executive engagement",
      head: h.ceoEngagement,
      body: "Direct inbound from a billion-dollar company founder — proving the outreach quality is matching the right decision-makers.",
    },
    {
      tag: "Full-time placements",
      head: "Moving beyond contracts — full-time roles now in play",
      body: "The cohort's 10-week track record is opening doors to full-time opportunities alongside consulting engagements.",
    },
    {
      tag: "Deep conversations",
      head: `One student has ${h.deepConversations}+ prospects asking to revisit after a delay`,
      body: "Warm pipelines extending beyond the initial 10 weeks — conversations that paused are picking back up.",
    },
  ];

  return (
    <section style={S.section}>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
      <div style={S.wrap}>
        <div style={S.tag}>Week {h.week} · Highlights</div>
        <h2 style={S.headline}>The momentum is real.</h2>

        {/* 3 big stats */}
        <div style={S.statsGrid}>
          <div style={S.statCell}>
            <div style={{ ...S.statNum, color: "var(--primary-on-dark)" }}>{h.contracts}</div>
            <div style={S.statLabel}>First contracts landed</div>
            <div style={S.statSub}>Students closed their first paid US engagement</div>
          </div>
          <div style={{ ...S.statCell, paddingLeft: 32 }}>
            <div style={{ ...S.statNum, color: "var(--on-dark)" }}>+{h.weekOverWeekJump}%</div>
            <div style={S.statLabel}>Positive conversations since week {h.baselineWeek}</div>
            <div style={S.statSub}>{h.students5PlusPositive} students now have 5+ positive replies</div>
          </div>
          <div style={S.statCellLast}>
            <div style={{ ...S.statNum, color: "var(--on-dark)" }}>{h.students5PlusPositive}</div>
            <div style={S.statLabel}>Students with 5+ positive replies</div>
            <div style={S.statSub}>Active conversations with US decision-makers</div>
          </div>
        </div>

        {/* Highlight cards */}
        <div style={S.cardsGrid}>
          {cards.map((c, i) => (
            <div key={i} style={S.card}>
              <div style={S.cardTag}>{c.tag}</div>
              <div style={S.cardHead}>{c.head}</div>
              <div style={S.cardBody}>{c.body}</div>
            </div>
          ))}
        </div>

        {/* Times Square teaser */}
        {h.timesSquare && (
          <div style={{ ...S.card, marginBottom: 16, borderColor: "rgba(255,200,40,0.20)", background: "rgba(255,200,40,0.04)" }}>
            <div style={{ ...S.cardTag, color: "rgba(255,200,40,0.7)" }}>Times Square</div>
            <div style={S.cardHead}>Top performers will be on a Times Square billboard</div>
            <div style={S.cardBody}>The best of the cohort goes public. A physical showcase of what 10 weeks of elite execution looks like.</div>
          </div>
        )}

        {/* Coming soon banner */}
        {h.videoComingSoon && (
          <div style={S.banner}>
            <div style={S.bannerLeft}>
              <div style={S.dot} />
              <div>
                <div style={S.bannerTag}>Coming soon</div>
                <div style={S.bannerText}>Full story — detailed video dropping with every highlight, conversation, and outcome from Week 10.</div>
              </div>
            </div>
            <div style={{ fontSize: 13, color: "var(--primary-on-dark)", fontWeight: 600, whiteSpace: "nowrap" }}>Watch →</div>
          </div>
        )}
      </div>
    </section>
  );
}

// ── Hero stat ───────────────────────────────────────────────────────────────
function HeroStat({ eyebrow, value, sub, accent, last, delta }) {
  return (
    <div style={{
      padding: "32px 32px 32px 0",
      borderRight: last ? "none" : "1px solid var(--hairline-on-dark)",
      paddingLeft: 0, paddingRight: 32,
    }}>
      <div className="eyebrow eyebrow-on-dark">{eyebrow}</div>
      <div style={{
        marginTop: 18, fontSize: "clamp(56px, 6vw, 88px)",
        color: accent ? "var(--primary-on-dark)" : "var(--on-dark)",
        lineHeight: 0.95,
      }}>{value}</div>
      {delta && (
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 5, marginTop: 10,
          background: "rgba(41,151,255,0.15)", border: "1px solid rgba(41,151,255,0.30)",
          borderRadius: 6, padding: "3px 9px",
        }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--primary-on-dark)", letterSpacing: "-0.01em" }}>↑ {delta}</span>
          <span style={{ fontSize: 11, color: "var(--on-dark-muted)", letterSpacing: "0.04em", textTransform: "uppercase" }}>vs week 5</span>
        </div>
      )}
      <div style={{ marginTop: delta ? 8 : 12, fontSize: 13, color: "var(--on-dark-muted-2)" }}>{sub}</div>
    </div>
  );
}

// ── Cohort cadence (line chart, animated stroke) ───────────────────────────
function CohortCadence({ weekly }) {
  const ref = useR1(null);
  const W = 1180, H = 320, PL = 60, PR = 30, PT = 30, PB = 50;
  const innerW = W - PL - PR, innerH = H - PT - PB;
  const maxR = Math.max(...weekly.map(w => w.replies)) || 1;
  const maxA = Math.max(...weekly.map(w => w.ai)) || 1;
  const x = i => PL + (i / (weekly.length - 1)) * innerW;
  const yR = v => PT + innerH - (v / maxR) * innerH;
  const yA = v => PT + innerH - (v / maxA) * innerH;

  const repliesPath = weekly.map((w, i) => `${i === 0 ? "M" : "L"}${x(i)},${yR(w.replies)}`).join(" ");
  const aiPath = weekly.map((w, i) => `${i === 0 ? "M" : "L"}${x(i)},${yA(w.ai)}`).join(" ");

  // animate stroke draw on intersect
  useEffect(() => {
    const svg = ref.current; if (!svg) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          svg.querySelectorAll(".draw").forEach(p => {
            const len = p.getTotalLength();
            p.style.strokeDasharray = len;
            p.style.strokeDashoffset = len;
            p.getBoundingClientRect();
            p.style.transition = "stroke-dashoffset 1.6s cubic-bezier(.2,.7,.2,1)";
            p.style.strokeDashoffset = 0;
          });
          io.disconnect();
        }
      });
    }, { threshold: 0.3 });
    io.observe(svg);
    return () => io.disconnect();
  }, []);

  return (
    <div style={{ background: "var(--canvas)", borderRadius: 18, border: "1px solid var(--hairline-soft)", padding: 32 }}>
      <div style={{ display: "flex", gap: 32, marginBottom: 16, fontSize: 13, color: "var(--ink-muted-60)" }}>
        <Legend swatch="var(--ink-muted-30)" label={`Outbound AI messages · ${weekly.reduce((a,b)=>a+b.ai,0).toLocaleString()} total`}/>
        <Legend swatch="var(--primary)" label={`Inbound replies · ${weekly.reduce((a,b)=>a+b.replies,0).toLocaleString()} total`}/>
      </div>
      <svg ref={ref} viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}>
        {/* gridlines */}
        {[0,0.25,0.5,0.75,1].map(t => (
          <line key={t} x1={PL} x2={W-PR} y1={PT + innerH * t} y2={PT + innerH * t} stroke="var(--hairline-soft)" strokeWidth="1"/>
        ))}
        {/* x labels */}
        {weekly.map((w, i) => (
          <text key={i} x={x(i)} y={H - 14} fontSize="12" fill="var(--ink-muted-48)" textAnchor="middle" fontFamily="var(--font-text)">{w.week}</text>
        ))}
        {/* AI faint line */}
        <path className="draw" d={aiPath} fill="none" stroke="var(--ink-muted-30)" strokeWidth="1.5"/>
        {weekly.map((w, i) => <circle key={i} cx={x(i)} cy={yA(w.ai)} r="3" fill="var(--ink-muted-30)"/>)}
        {/* Replies blue line */}
        <path className="draw" d={repliesPath} fill="none" stroke="var(--primary)" strokeWidth="2.5"/>
        {weekly.map((w, i) => (
          <g key={i}>
            <circle cx={x(i)} cy={yR(w.replies)} r="5" fill="var(--canvas)" stroke="var(--primary)" strokeWidth="2.5"/>
            <text x={x(i)} y={yR(w.replies) - 14} fontSize="12" fill="var(--primary)" fontWeight="600" textAnchor="middle" fontFamily="var(--font-text)">{w.replies}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}
function Legend({ swatch, label }) {
  return <div style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ width: 12, height: 12, borderRadius: 2, background: swatch }}/>{label}</div>;
}

// ── Conversation directory ─────────────────────────────────────────────────
function ConversationDirectory({ cohort, totals, onOpenStudent }) {
  // Cohort is pre-sorted by build-data.js: in-conversation by positive desc, then lean-fixes.
  const inConv = cohort.filter(s => s.bucket === "in_conversation");
  const fixes = cohort.filter(s => s.bucket === "lean_fixes");
  return (
    <section id="conversations" style={{ background: "var(--canvas)", padding: "120px 64px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="reveal-on-scroll">
          <div className="eyebrow">The cohort, in conversation</div>
          <h2 style={{ fontSize: "clamp(40px, 5vw, 64px)", marginTop: 14 }}>{inConv.length} students, in active dialogue.</h2>
          <p style={{ marginTop: 18, fontSize: 19, color: "var(--ink-muted-60)", maxWidth: 720, lineHeight: 1.5 }}>
            Each card below is a student already in conversation with US decision-makers — qualified replies
            that signal real intent. The number on each card is the count of active conversations near closing.
          </p>
        </div>
        <div className="reveal-on-scroll" style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {inConv.map(s => <ConversationCard key={s.id} s={s} onOpen={onOpenStudent}/>)}
        </div>
        {fixes.length > 0 && (
          <div className="reveal-on-scroll" style={{ marginTop: 96 }}>
            <div className="eyebrow">Lean fixes recommended</div>
            <h3 style={{ fontSize: 28, marginTop: 12, letterSpacing: "-0.02em", fontWeight: 500 }}>Coaching session in progress.</h3>
            <p style={{ marginTop: 14, fontSize: 16, color: "var(--ink-muted-60)", maxWidth: 720, lineHeight: 1.5 }}>
              These students are tightening their LinkedIn presence and messaging with the team. Reports
              will land after the coaching pass is complete.
            </p>
            <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
              {fixes.map(s => <LeanFixCard key={s.id} s={s}/>)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ConversationCard({ s, onOpen }) {
  return (
    <button onClick={() => onOpen(s.id)} style={{
      textAlign: "left", padding: 24, borderRadius: 18,
      background: "var(--canvas)", border: "1px solid var(--hairline-soft)",
      cursor: "pointer", fontFamily: "inherit", display: "flex", flexDirection: "column", gap: 18,
      transition: "all 0.2s ease",
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--primary)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--hairline-soft)"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <Initials name={s.name} size={44}/>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 16, fontWeight: 500, letterSpacing: "-0.01em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.name}</div>
          <div style={{ fontSize: 11, color: "var(--primary)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", marginTop: 4 }}>In conversation</div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: "auto" }}>
        <span className="hero-numeral" style={{ fontSize: 40, color: "var(--ink)" }}>{s.positive}</span>
        <span style={{ fontSize: 13, color: "var(--ink-muted-60)" }}>{s.positive === 1 ? "active conversation" : "active conversations"}</span>
      </div>
      <div style={{ fontSize: 12, color: "var(--ink-muted-48)", display: "flex", justifyContent: "space-between" }}>
        <span>{s.accept?.toFixed(1) ?? "—"}% acceptance</span>
        <span style={{ color: "var(--primary)" }}>Open →</span>
      </div>
    </button>
  );
}

function LeanFixCard({ s }) {
  return (
    <div style={{
      padding: 24, borderRadius: 18,
      background: "var(--surface-pearl)", border: "1px dashed var(--hairline-soft)",
      display: "flex", flexDirection: "column", gap: 14,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <Initials name={s.name} size={44}/>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 500, letterSpacing: "-0.01em" }}>{s.name}</div>
          <div style={{ fontSize: 11, color: "var(--ink-muted-60)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", marginTop: 4 }}>Lean fixes in progress</div>
        </div>
      </div>
      <div style={{ fontSize: 13, color: "var(--ink-muted-60)", lineHeight: 1.5 }}>
        Report holding for coaching pass on LinkedIn presence and messaging.
      </div>
    </div>
  );
}

// ── Cohort funnel ──────────────────────────────────────────────────────────
function CohortFunnel({ totals }) {
  const stages = [
    { label: "Requests sent", value: totals.requestsSent },
    { label: "Connections accepted", value: totals.accepted },
    { label: "Conversations opened", value: totals.positive },
  ];
  const max = stages[0].value;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {stages.map((s, i) => {
        const w = (s.value / max) * 100;
        return (
          <div key={s.label} style={{ display: "grid", gridTemplateColumns: "1fr 130px", gap: 16, alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--ink-muted-60)", marginBottom: 6 }}>
                <span>{s.label}</span>
                {i > 0 && <span className="tabular">{((s.value / stages[i-1].value) * 100).toFixed(1)}% of prior</span>}
              </div>
              <div style={{ height: 36, background: "var(--canvas)", border: "1px solid var(--hairline-soft)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{
                  width: `${w}%`, height: "100%",
                  background: i === stages.length - 1 ? "var(--primary)" : "var(--ink)",
                  transition: "width 1.4s cubic-bezier(.2,.7,.2,1)",
                }}/>
              </div>
            </div>
            <div className="tabular hero-numeral" style={{ fontSize: 28, textAlign: "right" }}>{s.value.toLocaleString()}</div>
          </div>
        );
      })}
    </div>
  );
}

window.CohortDashboard = CohortDashboard;
