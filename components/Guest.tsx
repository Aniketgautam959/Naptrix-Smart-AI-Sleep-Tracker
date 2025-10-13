import { SignInButton } from '@clerk/nextjs';
import Image from 'next/image';
import EnvCheck from './EnvCheck';

const Guest = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
      {/* Environment Check - Only show in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8'>
          <EnvCheck />
        </div>
      )}

      {/* Hero Section */}
      <section className='pt-24 pb-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
            {/* Left Column */}
            <div className='space-y-8 animate-fade-in'>
              <div className='space-y-6'>
                <h1 className='text-5xl md:text-7xl font-bold leading-tight text-slate-800'>
                  Sleep Better,
                  <br />
                  <span className='text-slate-600'>Live Better</span>
                </h1>
                <p className='text-xl text-slate-600 leading-relaxed max-w-lg'>
                  Track your sleep patterns with precision. Get insights, improve your rest, 
                  and wake up refreshed every morning.
                </p>
              </div>

              <div className='flex flex-col sm:flex-row gap-4'>
                <SignInButton>
                  <button className='btn-primary text-lg px-8 py-4'>
                    Get Started
                  </button>
                </SignInButton>
                <button className='btn-secondary text-lg px-8 py-4'>
                  Learn More
                </button>
              </div>

              {/* Stats */}
              <div className='grid grid-cols-3 gap-8 pt-8 border-t border-slate-200'>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-slate-800'>1K+</div>
                  <div className='text-sm text-slate-600'>Users</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-slate-800'>1M+</div>
                  <div className='text-sm text-slate-600'>Hours Tracked</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-slate-800'>95%</div>
                  <div className='text-sm text-slate-600'>Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className='relative animate-slide-up'>
              <div className='relative'>
                <Image
                  src='/sleep-tracker.png'
                  alt='Naptrix Dashboard Preview'
                  width={600}
                  height={400}
                  className='w-full max-w-lg mx-auto rounded-2xl shadow-lg border border-border'
                />
                {/* Floating elements */}
                <div className='absolute -top-4 -right-4 card p-4'>
                  <div className='flex items-center gap-2'>
                    <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                    <span className='text-sm font-medium text-foreground'>Sleep Quality: Excellent</span>
                  </div>
                </div>
                <div className='absolute -bottom-4 -left-4 card p-4'>
                  <div className='text-center'>
                    <div className='text-xl font-bold text-foreground'>8h 32m</div>
                    <div className='text-xs text-muted-foreground'>Last Night</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-20 bg-muted/30'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-foreground mb-4'>
              Why Choose Naptrix?
            </h2>
            <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
              Simple, powerful sleep tracking designed for modern life.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='card p-8 text-center group hover:scale-105 transition-all duration-200'>
              <div className='w-12 h-12 bg-foreground rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200'>
                <svg className='w-6 h-6 text-background' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-foreground mb-4'>Smart Analytics</h3>
              <p className='text-muted-foreground'>
                AI-powered insights analyze your sleep patterns and provide personalized recommendations.
              </p>
            </div>

            <div className='card p-8 text-center group hover:scale-105 transition-all duration-200'>
              <div className='w-12 h-12 bg-foreground rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200'>
                <svg className='w-6 h-6 text-background' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-foreground mb-4'>Real-time Tracking</h3>
              <p className='text-muted-foreground'>
                Monitor your sleep in real-time with detailed sleep stage analysis.
              </p>
            </div>

            <div className='card p-8 text-center group hover:scale-105 transition-all duration-200'>
              <div className='w-12 h-12 bg-foreground rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200'>
                <svg className='w-6 h-6 text-background' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-foreground mb-4'>Personalized Care</h3>
              <p className='text-muted-foreground'>
                Get customized sleep plans and recommendations based on your unique sleep profile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className='py-20 bg-slate-100/50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-slate-800 mb-4'>
              Loved by Users
            </h2>
            <p className='text-xl text-slate-600'>
              Join thousands of users who have improved their sleep with Naptrix.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='card p-8'>
              <div className='flex items-center mb-4'>
                <div className='flex text-yellow-400'>
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className='w-4 h-4 fill-current' viewBox='0 0 20 20'>
                      <path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
                    </svg>
                  ))}
                </div>
              </div>
              <p className='text-slate-800 mb-6 italic'>
                &ldquo;Naptrix has completely transformed my sleep schedule. I feel more energized every day! 
                The insights are incredibly detailed and helpful.&rdquo;
              </p>
              <div className='flex items-center'>
                <div className='w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-white font-semibold mr-3'>
                  SL
                </div>
                <div>
                  <div className='font-semibold text-slate-800'>Sarah L.</div>
                  <div className='text-sm text-slate-600'>Marketing Manager</div>
                </div>
              </div>
            </div>

            <div className='card p-8'>
              <div className='flex items-center mb-4'>
                <div className='flex text-yellow-400'>
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className='w-4 h-4 fill-current' viewBox='0 0 20 20'>
                      <path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
                    </svg>
                  ))}
                </div>
              </div>
              <p className='text-slate-800 mb-6 italic'>
                &ldquo;The insights from Naptrix have helped me identify and fix my sleep issues. 
                Highly recommend it to anyone serious about improving their sleep quality.&rdquo;
              </p>
              <div className='flex items-center'>
                <div className='w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-white font-semibold mr-3'>
                  JD
                </div>
                <div>
                  <div className='font-semibold text-slate-800'>John D.</div>
                  <div className='text-sm text-slate-600'>Software Engineer</div>
                </div>
              </div>
            </div>

            <div className='card p-8'>
              <div className='flex items-center mb-4'>
                <div className='flex text-yellow-400'>
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className='w-4 h-4 fill-current' viewBox='0 0 20 20'>
                      <path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
                    </svg>
                  ))}
                </div>
              </div>
              <p className='text-slate-800 mb-6 italic'>
                &ldquo;Naptrix is so easy to use and provides accurate data. It&apos;s a must-have for anyone 
                looking to improve their sleep and overall well-being.&rdquo;
              </p>
              <div className='flex items-center'>
                <div className='w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-white font-semibold mr-3'>
                  ER
                </div>
                <div>
                  <div className='font-semibold text-slate-800'>Emily R.</div>
                  <div className='text-sm text-slate-600'>Health Coach</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 bg-foreground'>
        <div className='max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8'>
          <h2 className='text-3xl md:text-4xl font-bold text-background mb-6'>
            Ready to Transform Your Sleep?
          </h2>
          <p className='text-xl text-muted-foreground mb-8 max-w-2xl mx-auto'>
            Join thousands of users who have already improved their sleep quality with Naptrix. 
            Start your journey to better sleep today.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <SignInButton>
              <button className='btn-secondary text-lg px-8 py-4'>
                Get Started Free
              </button>
            </SignInButton>
            <button className='border-2 border-background text-background hover:bg-background hover:text-foreground font-semibold px-8 py-4 rounded-lg transition-all duration-200'>
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Guest;
