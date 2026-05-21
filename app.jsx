/* global React, ReactDOM */
const { useState: useS } = React;

function App() {
  const [view, setView] = useS("cohort");
  const [activeId, setActiveId] = useS("student_01");
  const cohort = window.COHORT;
  const totals = window.COHORT_TOTALS;
  const weekly = window.COHORT_WEEKLY;
  const report = window.REPORTS[activeId];

  const openStudent = (id) => {
    if (window.REPORTS[id]) {
      setActiveId(id);
      setView("report");
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };
  const goCohort = () => { setView("cohort"); window.scrollTo({ top: 0, behavior: "instant" }); };

  return (
    <div>
      <PrivacyBanner/>
      <TopNav view={view} onView={(v) => v === "cohort" ? goCohort() : setView("report")}
        activeId={activeId} onSelect={openStudent} cohort={cohort}/>
      <main data-screen-label={view === "cohort" ? "Cohort" : "Report"}>
        {view === "cohort"
          ? <CohortDashboard cohort={cohort} totals={totals} weekly={weekly} onOpenStudent={openStudent}/>
          : <ReportCard report={report} onBack={goCohort}/>}
      </main>
    </div>
  );
}
function PrivacyBanner() {
  return (
    <div style={{
      background: "#111", color: "#fff", padding: "18px 24px",
      fontSize: 14, lineHeight: 1.6, textAlign: "left",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 12, marginBottom: 10 }}>
          <strong style={{ letterSpacing: "-0.01em", fontSize: 15 }}>
            Student names on this page are masked.
          </strong>
          <span style={{ color: "#888", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Updated through Week 6 of the cohort
          </span>
        </div>
        <p style={{ margin: "0 0 10px" }}>
          We published this dashboard in the spirit of full transparency — to show, openly and
          honestly, what kind of opportunities our students are generating. We assumed visitors
          would meet that openness with the same generosity we extend to our students. That has
          not been the case.
        </p>
        <p style={{ margin: "0 0 10px" }}>
          Names were being lifted from this page and used to cold-message students directly —
          spam, repeated unsolicited questions, and even requests for pirated course material.
          One of our students recently came to us, exhausted, saying they are genuinely tired of
          answering the same questions again and again. <strong>That is not a cost we are willing
          to pass on to them.</strong> Whether a student lands a role or not, we will publish that
          outcome here ourselves — there is no reason for anyone to chase them privately to find out.
        </p>
        <p style={{ margin: "0 0 10px" }}>
          We think extraordinarily highly of every student in this cohort. They earned their place
          here through work, not by signing up to be a public inbox. If the only way to protect
          them from being spammed is to mask their identities, the responsibility for that sits
          squarely with the people who abused the trust — not with us, and certainly not with them.
        </p>
        <p style={{ margin: 0, color: "#9ad" }}>
          If you have a genuine reason to connect with a student, please contact your Antern
          counselor. The counselor will verify intent and personally introduce you to the
          relevant student(s) from our cohort. That is the only route.
        </p>
      </div>
    </div>
  );
}

window.App = App;
