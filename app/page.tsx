"use client";

import { useEffect } from "react";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import Banner from "@/components/banner";
import StatCard from "@/components/stat-card";
import SchedulePanel from "@/components/schedule-panel";
import DashboardChart from "@/components/dashboard-chart";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkUserAndOnboarding = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      console.log("Auth user:", user);

      if (user) {
        // Check if user exists in user_table
        const { data: userData, error } = await supabase
          .from("user_table")
          .select("user_id")
          .eq("user_id", user.id)
          .single();

        console.log("User table data:", userData);

        if (error || !userData) {
          // User doesn't exist in user_table, redirect to onboarding
          console.log("User not found in user_table, redirecting to onboarding");
          router.push("/onboarding");
        } else {
          console.log("User found in user_table, staying on page");
        }
      }
    };

    checkUserAndOnboarding();
  }, [router]);
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


