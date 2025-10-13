'use client';

export default function EnvCheck() {
  const envVars = {
    'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY': process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    'CLERK_SECRET_KEY': process.env.CLERK_SECRET_KEY ? 'Set' : 'Not Set',
    'DATABASE_URL': process.env.DATABASE_URL ? 'Set' : 'Not Set',
  };

  return (
    <div className="bg-yellow-100 border border-yellow-300 rounded-md p-4 mb-4">
      <h3 className="text-lg font-semibold text-yellow-800 mb-2">Environment Variables Check</h3>
      <div className="space-y-1 text-sm">
        {Object.entries(envVars).map(([key, value]) => (
          <div key={key} className="flex justify-between">
            <span className="font-medium">{key}:</span>
            <span className={value === 'Not Set' ? 'text-red-600' : 'text-green-600'}>
              {value === 'Not Set' ? '❌ Not Set' : '✅ Set'}
            </span>
          </div>
        ))}
      </div>
      <p className="text-xs text-yellow-700 mt-2">
        If any variables show &quot;Not Set&quot;, add them to your Vercel environment variables.
      </p>
    </div>
  );
}
