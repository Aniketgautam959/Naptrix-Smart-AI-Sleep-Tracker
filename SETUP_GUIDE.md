# 🚀 Sleep Tracker Setup Guide

## Internal Server Error Fix

The Internal Server Error is occurring because the required environment variables are missing. Follow these steps to fix it:

## 1. Database Setup

### Option A: Use Neon (Recommended - Free PostgreSQL)

1. Go to [Neon Console](https://console.neon.tech/)
2. Sign up/Login with GitHub
3. Create a new project
4. Copy the connection string from the dashboard
5. Replace the `DATABASE_URL` in your `.env` file

### Option B: Use Local PostgreSQL

1. Install PostgreSQL locally
2. Create a database named `sleep_tracker_db`
3. Update the `DATABASE_URL` in your `.env` file with your local credentials

## 2. Clerk Authentication Setup

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Sign up/Login
3. Create a new application
4. Go to "API Keys" section
5. Copy the following keys:
   - **Publishable Key** → `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - **Secret Key** → `CLERK_SECRET_KEY`

## 3. Update Environment Variables

Edit your `.env` file with the actual values:

```env
# Database (Replace with your actual database URL)
DATABASE_URL="postgresql://username:password@localhost:5432/sleep_tracker_db"

# Clerk Authentication (Replace with your actual keys)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# These can stay as they are
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL="/"
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL="/"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## 4. Database Migration

After setting up the database URL, run:

```bash
npm run build
```

This will:
- Generate Prisma client
- Push the schema to your database
- Create the necessary tables

## 5. Start the Application

```bash
npm run dev
```

## 6. Test the Application

1. Open [http://localhost:3000](http://localhost:3000)
2. You should see the sleep tracker homepage
3. Try signing up for a new account
4. Add some sleep records to test the functionality

## Common Issues & Solutions

### Issue: "Database connection failed"
**Solution**: Check your `DATABASE_URL` is correct and the database is accessible

### Issue: "Clerk authentication error"
**Solution**: Verify your Clerk keys are correct and the application is properly configured

### Issue: "Prisma client not generated"
**Solution**: Run `npx prisma generate` manually

### Issue: "Tables don't exist"
**Solution**: Run `npx prisma db push` to create the database schema

## Quick Start with Neon (Easiest Option)

1. Go to [Neon Console](https://console.neon.tech/)
2. Create account and new project
3. Copy the connection string
4. Replace `DATABASE_URL` in `.env`
5. Get Clerk keys from [Clerk Dashboard](https://dashboard.clerk.com/)
6. Replace Clerk keys in `.env`
7. Run `npm run build`
8. Run `npm run dev`

## Need Help?

If you're still getting errors:
1. Check the terminal/console for specific error messages
2. Verify all environment variables are set correctly
3. Ensure your database is accessible
4. Make sure Clerk application is properly configured

---

**Note**: The `.env` file should never be committed to version control. It's already in `.gitignore`.
