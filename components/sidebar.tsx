"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutGrid,
  Dumbbell,
  Salad,
  Target,
  CalendarCheck2,
  ChartLine
} from "lucide-react";
import "./sidebar.scss";

const menu = [
  { label: "Overview", icon: LayoutGrid, href: "/" },
  { label: "Workout", icon: Dumbbell, href: "/workout" },
  { label: "Diet Plan", icon: Salad, href: "/diet" },
  { label: "Goals", icon: Target, href: "/goals" },
  { label: "Schedule", icon: CalendarCheck2, href: "/schedule" },
  { label: "Progress", icon: ChartLine, href: "/progress" }
];

export default function Sidebar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    // Check current session
    supabase.auth.getSession().then(({ data }) => {
      setIsAuthenticated(Boolean(data.session));
    });
    // Listen to auth state changes
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(Boolean(session));
    });
    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
  };
  return (
    <aside className="sidebar">
      <div className="brand">
        <Image src="/images/Logo.png" alt="Fitness" width={120} height={28} className="brand__logo" />
      </div>
      <nav className="nav">
        <ul className="nav__list">
          {menu.map(({ label, icon: Icon, href }) => (
            <li key={label} className="nav__item">
              <Link href={href} className="nav__link">
                <Icon className="nav__icon" />
                <span className="nav__label">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="sidebar__spacer" />
      <div className="sidebar__footer">
        {isAuthenticated ? (
          <Button className="w-full" variant="secondary" onClick={handleSignOut}>Log out</Button>
        ) : (
          <Link href="/auth/login" className="w-full">
            <Button className="w-full">Sign in</Button>
          </Link>
        )}
      </div>
    </aside>
  );
}


