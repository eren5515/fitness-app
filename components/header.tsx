"use client";

import Image from "next/image";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import "./header.scss";

export default function Header() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? null);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
    });
    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);

  return (
    <header className="header">
      <div className="header__left">
        <h2 className="header__title">
          {userEmail ? `Welcome Back, ${userEmail}` : "Welcome Back!"}
        </h2>
      </div>
      <div className="header__right">
        <div className="header__search">
          <Search className="header__searchIcon" />
          <input
            className="header__input"
            placeholder="Search"
            aria-label="Search"
          />
        </div>
        <div className="header__avatar" aria-label="Profile" />
      </div>
    </header>
  );
}


