import { createClient } from "@/lib/supabase/server";

export async function checkOnboardingStatus(userId: string): Promise<boolean> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("user_table")
    .select("onboarding_completed")
    .eq("user_id", userId)
    .single();

  if (error || !data) {
    return false;
  }

  return data.onboarding_completed || false;
}

export async function createUserProfile(userId: string, userData: {
  name: string;
  age: number;
  fitness_goal: string;
  experience_level: string;
}) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("user_table")
    .upsert({
      user_id: userId,
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
