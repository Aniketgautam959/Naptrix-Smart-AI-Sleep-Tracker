import Link from 'next/link';

const AboutPage = () => {
  return (
    <div className='min-h-screen bg-background'>
      {/* Hero Section */}
      <section className='pt-20 pb-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h1 className='text-4xl md:text-6xl font-bold mb-6 text-foreground'>
            About Naptrix
          </h1>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
            Your ultimate companion for tracking sleep and improving your health. 
            We're revolutionizing sleep wellness through technology.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className='py-20 bg-muted/30'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-foreground mb-6'>
              Our Mission
            </h2>
            <p className='text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed'>
              At Naptrix, we aim to help individuals achieve better sleep and
              overall well-being by providing insights into their sleep patterns.
              Better sleep leads to a healthier, happier life, and we're here to
              guide you every step of the way.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='card p-8 text-center'>
              <div className='w-16 h-16 bg-foreground rounded-2xl flex items-center justify-center mx-auto mb-6'>
                <svg className='w-8 h-8 text-background' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-foreground mb-4'>Innovation</h3>
              <p className='text-muted-foreground'>
                We leverage cutting-edge technology to provide the most accurate sleep insights.
              </p>
            </div>

            <div className='card p-8 text-center'>
              <div className='w-16 h-16 bg-foreground rounded-2xl flex items-center justify-center mx-auto mb-6'>
                <svg className='w-8 h-8 text-background' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-foreground mb-4'>Care</h3>
              <p className='text-muted-foreground'>
                Your sleep health is our priority. We provide personalized care and support.
              </p>
            </div>

            <div className='card p-8 text-center'>
              <div className='w-16 h-16 bg-foreground rounded-2xl flex items-center justify-center mx-auto mb-6'>
                <svg className='w-8 h-8 text-background' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-foreground mb-4'>Results</h3>
              <p className='text-muted-foreground'>
                Proven results with thousands of users experiencing better sleep quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-20 bg-muted/50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-foreground mb-6'>
              Why Choose Naptrix?
            </h2>
            <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
              We combine advanced technology with user-friendly design to deliver 
              the best sleep tracking experience.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            <div className='card p-8 group hover:scale-105 transition-all duration-200'>
              <div className='w-12 h-12 bg-foreground rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200'>
                <svg className='w-6 h-6 text-background' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-foreground mb-4'>Comprehensive Tracking</h3>
              <p className='text-muted-foreground'>
                Monitor your sleep patterns, analyze sleep stages, and identify areas for improvement with detailed insights.
              </p>
            </div>

            <div className='card p-8 group hover:scale-105 transition-all duration-200'>
              <div className='w-12 h-12 bg-foreground rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200'>
                <svg className='w-6 h-6 text-background' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-foreground mb-4'>AI-Powered Insights</h3>
              <p className='text-muted-foreground'>
                Receive personalized recommendations and smart insights powered by advanced AI algorithms.
              </p>
            </div>

            <div className='card p-8 group hover:scale-105 transition-all duration-200'>
              <div className='w-12 h-12 bg-foreground rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200'>
                <svg className='w-6 h-6 text-background' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-foreground mb-4'>Mobile-First Design</h3>
              <p className='text-muted-foreground'>
                Enjoy an intuitive and seamless experience across all devices with our responsive design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className='py-20 bg-muted/30'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-foreground mb-6'>
              Our Story
            </h2>
            <p className='text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed'>
              Naptrix was created to address the growing need for better sleep
              management tools. Our team of sleep experts and technologists
              developed a platform that combines cutting-edge technology with
              actionable insights. Since our launch, we've helped countless users
              achieve better sleep and improve their overall health.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
            <div>
              <h3 className='text-2xl font-bold text-foreground mb-6'>The Problem</h3>
              <p className='text-muted-foreground mb-6 leading-relaxed'>
                Poor sleep quality affects millions of people worldwide, leading to 
                decreased productivity, health issues, and reduced quality of life. 
                Traditional sleep tracking methods were either too complex or not 
                accurate enough to provide meaningful insights.
              </p>
              <h3 className='text-2xl font-bold text-foreground mb-6'>Our Solution</h3>
              <p className='text-muted-foreground leading-relaxed'>
                We created Naptrix to bridge this gap by combining advanced sleep 
                science with modern technology, making sleep tracking accessible, 
                accurate, and actionable for everyone.
              </p>
            </div>
            <div className='card p-8'>
              <div className='space-y-6'>
                <div className='flex items-center space-x-4'>
                  <div className='w-12 h-12 bg-foreground rounded-full flex items-center justify-center text-background font-bold'>
                    1
                  </div>
                  <div>
                    <h4 className='font-semibold text-foreground'>Research & Development</h4>
                    <p className='text-sm text-muted-foreground'>Extensive sleep science research</p>
                  </div>
                </div>
                <div className='flex items-center space-x-4'>
                  <div className='w-12 h-12 bg-foreground rounded-full flex items-center justify-center text-background font-bold'>
                    2
                  </div>
                  <div>
                    <h4 className='font-semibold text-foreground'>Technology Integration</h4>
                    <p className='text-sm text-muted-foreground'>Advanced AI and machine learning</p>
                  </div>
                </div>
                <div className='flex items-center space-x-4'>
                  <div className='w-12 h-12 bg-foreground rounded-full flex items-center justify-center text-background font-bold'>
                    3
                  </div>
                  <div>
                    <h4 className='font-semibold text-foreground'>User Testing</h4>
                    <p className='text-sm text-muted-foreground'>Rigorous testing with real users</p>
                  </div>
                </div>
                <div className='flex items-center space-x-4'>
                  <div className='w-12 h-12 bg-foreground rounded-full flex items-center justify-center text-background font-bold'>
                    4
                  </div>
                  <div>
                    <h4 className='font-semibold text-foreground'>Launch & Growth</h4>
                    <p className='text-sm text-muted-foreground'>Continuous improvement and scaling</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className='py-20 bg-foreground'>
        <div className='max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8'>
          <h2 className='text-3xl md:text-4xl font-bold text-background mb-6'>
            Ready to Sleep Better?
          </h2>
          <p className='text-xl text-muted-foreground mb-8 max-w-2xl mx-auto'>
            Join Naptrix today and take the first step towards better sleep
            and a healthier life. Start your journey to better sleep now.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link
              href='/sign-up'
              className='btn-secondary text-lg px-8 py-4'
            >
              Get Started Free
            </Link>
            <Link
              href='/tech-stack'
              className='border-2 border-background text-background hover:bg-background hover:text-foreground font-semibold px-8 py-4 rounded-lg transition-all duration-200'
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
