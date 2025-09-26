import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import Banner from "@/components/banner";
import StatCard from "@/components/stat-card";
import SchedulePanel from "@/components/schedule-panel";
import DashboardChart from "@/components/dashboard-chart";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="flex min-h-screen">
        <Sidebar />
        <section className="flex-1">
          <Header />
          <div className="p-8 space-y-6">
            <Banner />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard type="workout" title="Workout" value="4 hrs" subtitle="This week" />
              <StatCard type="calories" title="Calories" value="1800 kcal" subtitle="Today" />
              <StatCard type="steps" title="Steps" value="2200" subtitle="Today" />
            </div>
            <DashboardChart />
          </div>
        </section>
        <SchedulePanel />
      </div>
    </main>
  );
}


