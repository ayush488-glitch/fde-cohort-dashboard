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
      background: "#111", color: "#fff", padding: "14px 24px",
      fontSize: 14, lineHeight: 1.5, textAlign: "center",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
    }}>
      <strong style={{ letterSpacing: "-0.01em" }}>Student names on this page are masked.</strong>{" "}
      We changed this because some visitors were using student identities here to cold-message them
      directly — including people with no real intent beyond spamming or chasing pirated course
      material. To protect our students, we no longer publish their names.{" "}
      <span style={{ color: "#9ad" }}>
        If you genuinely want to connect with a student, please reach out to your Antern counselor.
        The counselor will verify your intent and then personally introduce you to the relevant
        student(s) from our cohort.
      </span>
    </div>
  );
}

window.App = App;
