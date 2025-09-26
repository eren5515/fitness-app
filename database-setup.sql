-- Create user_table for storing user profile information and onboarding status
-- Run this in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS user_table (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255),
  age INTEGER,
  fitness_goal VARCHAR(100),
  experience_level VARCHAR(50),
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_table_user_id ON user_table(user_id);

-- Create an index on onboarding_completed for faster onboarding status checks
CREATE INDEX IF NOT EXISTS idx_user_table_onboarding_completed ON user_table(onboarding_completed);

-- Enable Row Level Security (RLS)
ALTER TABLE user_table ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only access their own data
CREATE POLICY "Users can view own profile" ON user_table
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON user_table
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON user_table
  FOR UPDATE USING (auth.uid() = user_id);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_user_table_updated_at
  BEFORE UPDATE ON user_table
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
