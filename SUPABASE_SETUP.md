# Supabase Authentication Setup Guide

This guide will walk you through setting up Supabase authentication for your Golden Hearts application.

## 🚀 Step 1: Create a Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project" or "Sign Up"
3. Create an account using GitHub, Google, or email

## 🏗️ Step 2: Create a New Project

1. Click "New Project"
2. Choose your organization (or create one)
3. Fill in project details:
   - **Name**: `golden-hearts` (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users
4. Click "Create new project"
5. Wait for project setup (usually 2-3 minutes)

## 🔑 Step 3: Get Your API Keys

1. In your project dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (e.g., `https://abcdefghijklmnop.supabase.co`)
   - **anon public** key (starts with `eyJ...`)
   - **service_role** key (starts with `eyJ...`)

## ⚙️ Step 4: Configure Environment Variables

1. In your project root, create a `.env.local` file:
   ```bash
   touch .env.local
   ```

2. Add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   ```

3. **Important**: Never commit `.env.local` to version control!

## 🗄️ Step 5: Set Up Database Tables

1. In Supabase dashboard, go to **SQL Editor**
2. Run this SQL to create the required tables:

```sql
-- Create users table
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  location TEXT NOT NULL,
  date_of_birth DATE,
  availability TEXT NOT NULL,
  experience TEXT NOT NULL,
  interests TEXT[] DEFAULT '{}',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create organizations table
CREATE TABLE organizations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  mission TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  website TEXT,
  logo_url TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create opportunities table
CREATE TABLE opportunities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  duration TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  requirements TEXT[] DEFAULT '{}',
  benefits TEXT[] DEFAULT '{}',
  skills TEXT[] DEFAULT '{}',
  max_volunteers INTEGER NOT NULL,
  organization_id UUID REFERENCES organizations(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only see and edit their own profile
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Anyone can view organizations and opportunities
CREATE POLICY "Anyone can view organizations" ON organizations
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view opportunities" ON opportunities
  FOR SELECT USING (true);

-- Only authenticated users can create organizations and opportunities
CREATE POLICY "Authenticated users can create organizations" ON organizations
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can create opportunities" ON opportunities
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
```

## 🔐 Step 6: Configure Authentication

1. In Supabase dashboard, go to **Authentication** → **Settings**
2. Configure email templates (optional but recommended)
3. Set up email confirmation settings
4. Configure social providers if needed (Google, GitHub, etc.)

## 🧪 Step 7: Test Your Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Go to `/register` and create a test account
3. Check the Supabase dashboard → **Authentication** → **Users** to see the new user
4. Check **Table Editor** → **users** to see the user profile

## 🚨 Troubleshooting

### Common Issues:

1. **"Missing Supabase environment variables"**
   - Make sure `.env.local` exists and has the correct values
   - Restart your development server after adding environment variables

2. **"Invalid API key"**
   - Double-check your API keys in `.env.local`
   - Ensure you're using the correct project

3. **"Table doesn't exist"**
   - Run the SQL commands in Step 5
   - Check that the tables were created in **Table Editor**

4. **"RLS policy violation"**
   - Ensure RLS policies are set up correctly
   - Check that users are authenticated before accessing protected data

### Getting Help:

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- [GitHub Issues](https://github.com/supabase/supabase/issues)

## 🔒 Security Notes

- **Never expose** your `SUPABASE_SERVICE_ROLE_KEY` in client-side code
- **Always use** Row Level Security (RLS) policies
- **Validate** user input on both client and server
- **Regularly review** your RLS policies

## 📱 Next Steps

Once authentication is working:

1. Add user profile management
2. Implement organization creation
3. Add opportunity posting
4. Set up real-time subscriptions
5. Add file uploads for avatars/logos
6. Implement search and filtering

## 🎉 You're All Set!

Your Golden Hearts application now has:
- ✅ User registration and login
- ✅ Secure authentication
- ✅ User profiles
- ✅ Database structure
- ✅ Row Level Security

Happy coding! 🚀
