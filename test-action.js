// Test the getAIInsights action directly
const { getAIInsights } = require('./app/actions/getAIInsights.ts');

async function testAction() {
  try {
    console.log('Testing getAIInsights action...');
    const result = await getAIInsights();
    console.log('Result:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

testAction();
