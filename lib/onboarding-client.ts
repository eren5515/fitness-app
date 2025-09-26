import { createClient } from "@/lib/supabase/client";

export async function checkOnboardingStatusClient(): Promise<boolean> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return false;
  }
  
  const { data, error } = await supabase
    .from("user_table")
    .select("onboarding_completed")
    .eq("user_id", user.id)
    .single();

  if (error || !data) {
    return false;
  }

  return data.onboarding_completed || false;
}

export async function createUserProfileClient(userData: {
  name: string;
  age: number;
  fitness_goal: string;
  experience_level: string;
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("User not authenticated");
  }
  
  const { data, error } = await supabase
    .from("user_table")
    .upsert({
      user_id: user.id,
      ...userData,
      onboarding_completed: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create user profile: ${error.message}`);
  }

  return data;
}
