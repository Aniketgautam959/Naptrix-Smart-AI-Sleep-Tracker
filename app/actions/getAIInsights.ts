'use server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import getRecords from './getRecords';

export async function getAIInsights(): Promise<{
  insights?: string;
  error?: string;
}> {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey || apiKey === 'your_gemini_api_key_here' || apiKey.trim() === '') {
      return { error: 'Failed to generate insights. Please check your API key and try again.' };
    }

    // Get user's sleep records
    const { records, error } = await getRecords();
    
    if (error || !records || records.length === 0) {
      return { error: 'No sleep records found' };
    }

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // Prepare sleep data for analysis
    const sleepData = records.map(record => ({
      date: record.date,
      hours: record.amount,
      quality: record.text || 'No notes'
    }));

    // Calculate some basic statistics
    const totalHours = sleepData.reduce((sum, record) => sum + record.amount, 0);
    const averageHours = totalHours / sleepData.length;
    const minHours = Math.min(...sleepData.map(r => r.amount));
    const maxHours = Math.max(...sleepData.map(r => r.amount));

    const prompt = `
    Analyze the following sleep data and provide personalized insights and recommendations for better sleep:

    Sleep Records (last ${sleepData.length} entries):
    ${sleepData.map(record => 
      `Date: ${new Date(record.date).toLocaleDateString()}, Hours: ${record.amount}, Notes: ${record.quality}`
    ).join('\n')}

    Statistics:
    - Average sleep: ${averageHours.toFixed(1)} hours
    - Range: ${minHours} - ${maxHours} hours
    - Total entries: ${sleepData.length}

    Please provide:
    1. A brief analysis of the sleep patterns
    2. 3-5 specific, actionable recommendations for better sleep
    3. Any concerning patterns you notice
    4. Tips for improving sleep quality

    Keep the response concise but helpful, focusing on practical advice.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const insights = response.text();

    return { insights };
  } catch (error) {
    console.error('Error generating AI insights:', error);
    
    // Check if it's an API key related error
    if (error instanceof Error && (error.message.includes('API key') || error.message.includes('authentication'))) {
      return { error: 'Failed to generate insights. Please check your API key and try again.' };
    }
    
    return { error: 'Failed to generate insights. Please check your API key and try again.' };
  }
}
