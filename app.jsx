/* global React, ReactDOM */
const { useState: useS } = React;

function App() {
  const [view, setView] = useS("cohort");
  const [activeId, setActiveId] = useS("abhijeet_p_singh");
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
window.App = App;
