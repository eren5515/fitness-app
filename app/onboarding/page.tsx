"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti"
import { AuroraText } from "@/components/ui/aurora-text"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function OnboardingPage() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [goal, setGoal] = useState("");
  const [activity, setActivity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const triggerSideCannons = () => {
    const end = Date.now() + 1 * 1000 // 1 second
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"]

    const frame = () => {
      if (Date.now() > end) return

      confetti({
        particleCount: 1,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      })
      confetti({
        particleCount: 1,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      })

      requestAnimationFrame(frame)
    }

    frame()
  }
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated and already has profile
    const checkAuthAndProfile = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      console.log(user);
      if (!user) {
        router.push("/auth/login");
        return;
      }

      // Check if user already exists in user_table
      const { data: userData, error } = await supabase
        .from("user_table")
        .select("user_id")
        .eq("user_id", user.id)
        .single();

      if (userData && !error) {
        // User already has a profile, redirect to dashboard
        console.log("User already has profile, redirecting to dashboard");
        router.push("/");
        return;
      }
    };

    checkAuthAndProfile();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setError("User not authenticated");
      setIsLoading(false);
      return;
    }

    try {
      // Insert user data into user_table
      const { error } = await supabase
        .from("user_table")
        .insert({
          user_id: user.id,
          name: name,
          surname: surname,
          age: parseInt(age),
          weight: parseInt(weight),
          height: parseFloat(height),
          goal: [goal], // Array of text
          activity: [activity], // Array of text
        });

      if (error) throw error;

      // Show side cannons confetti for 3 seconds before redirecting
      triggerSideCannons();
      setTimeout(() => {
        router.push("/");
      }, 1500);

    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
      setIsLoading(false);
    }
  };

    return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-6">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <Image
              src="/images/Logo.png"
              alt="Fitness App Logo"
              width={120}
              height={120}
              className="object-contain"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Welcome to <AuroraText colors={["#222222", "#FF8C00", "#FFA500"]}>Fitmego</AuroraText> let&apos;s get you started!</CardTitle>
              <CardDescription className="text-center">
                Help us get to know you better to personalize your fitness journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="surname">Surname</Label>
                      <Input
                        id="surname"
                        type="text"
                        placeholder="Enter your surname"
                        required
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="Age"
                        required
                        min="13"
                        max="120"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        placeholder="Weight"
                        required
                        min="30"
                        max="300"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="Enter your height"
                      required
                      min="100"
                      max="250"
                      step="0.1"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="goal">Fitness Goal</Label>
                    <select
                      id="goal"
                      className={cn(
                        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      )}
                      required
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                    >
                      <option value="">Select your fitness goal</option>
                      <option value="Lose weight and fat">Lose weight and fat</option>
                      <option value="Gain weight and muscle">Gain weight and muscle</option>
                      <option value="Maintain weight">Maintain weight</option>
                    </select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="activity">Activity Level</Label>
                    <select
                      id="activity"
                      className={cn(
                        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      )}
                      required
                      value={activity}
                      onChange={(e) => setActivity(e.target.value)}
                    >
                      <option value="">Select your activity level</option>
                      <option value="Sedentary (0 days)">Sedentary (0 days)</option>
                      <option value="Low Activity (1-3 days)">Low Activity (1-3 days)</option>
                      <option value="Moderate Activity (3-5 days)">Moderate Activity (3-5 days)</option>
                      <option value="High Activity (6-7 days)">High Activity (6-7 days)</option>
                      <option value="Very High Activity (Athlete level)">Very High Activity (Athlete level)</option>
                    </select>
                  </div>

                  {error && <p className="text-sm text-red-500">{error}</p>}
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                     {isLoading ? "Setting up your profile..." : "Complete Onboarding"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
