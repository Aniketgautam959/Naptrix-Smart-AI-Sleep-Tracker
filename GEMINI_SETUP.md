# Gemini API Setup Guide

This guide will help you set up the Gemini API for the AI Insights feature in your sleep tracker.

## Step 1: Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

## Step 2: Configure Environment Variables

1. Create a `.env.local` file in your project root (if it doesn't exist)
2. Add your Gemini API key:

```bash
GEMINI_API_KEY=your_actual_api_key_here
```

**Important:** Replace `your_actual_api_key_here` with your actual API key from Step 1.

## Step 3: Restart Your Development Server

After adding the API key, restart your Next.js development server:

```bash
npm run dev
```

## Step 4: Test the AI Insights

1. Open your sleep tracker dashboard
2. Make sure you have some sleep records in your database
3. Look for the "AI Sleep Insights" section on your dashboard
4. Click "Refresh" to generate personalized sleep recommendations

## Features

The AI Insights component will:

- Analyze your sleep patterns from the last 10 records
- Calculate average sleep hours and identify patterns
- Provide personalized recommendations for better sleep
- Suggest specific actions based on your data
- Update insights when you click the refresh button

## Troubleshooting

### "Gemini API key not configured" Error
- Make sure you've added the `GEMINI_API_KEY` to your `.env.local` file
- Restart your development server after adding the key

### "No sleep records found" Error
- Add some sleep records using the "Add New Record" form
- Make sure you're logged in and have records in your database

### "Failed to generate insights" Error
- Check your internet connection
- Verify your API key is correct
- Check the browser console for detailed error messages

## API Usage

The Gemini API is used to:
- Analyze sleep data patterns
- Generate personalized recommendations
- Provide actionable sleep improvement tips
- Identify concerning sleep patterns

The component automatically fetches your latest sleep records and sends them to Gemini for analysis, ensuring your data is processed securely and privately.
