import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tech Stack - Naptrix',
  description: 'Discover the modern technologies powering Naptrix sleep tracking application.',
};

const TechStackPage = () => {
  const technologies = [
    {
      category: 'Frontend',
      color: 'from-blue-500 to-cyan-500',
      icon: '🎨',
      items: [
        { name: 'Next.js 14', description: 'React framework with App Router', version: '14.x' },
        { name: 'React 18', description: 'UI library with hooks and concurrent features', version: '18.x' },
        { name: 'TypeScript', description: 'Type-safe JavaScript development', version: '5.x' },
        { name: 'Tailwind CSS', description: 'Utility-first CSS framework', version: '3.x' },
        { name: 'Framer Motion', description: 'Animation library for React', version: '10.x' },
      ]
    },
    {
      category: 'Backend & Database',
      color: 'from-green-500 to-emerald-500',
      icon: '⚙️',
      items: [
        { name: 'Next.js API Routes', description: 'Serverless API endpoints', version: '14.x' },
        { name: 'Prisma', description: 'Modern database ORM', version: '5.x' },
        { name: 'PostgreSQL', description: 'Reliable relational database', version: '15.x' },
        { name: 'Clerk', description: 'Authentication and user management', version: '4.x' },
        { name: 'Vercel', description: 'Deployment and hosting platform', version: 'Latest' },
      ]
    },
    {
      category: 'UI/UX',
      color: 'from-purple-500 to-pink-500',
      icon: '✨',
      items: [
        { name: 'Radix UI', description: 'Headless UI components', version: '1.x' },
        { name: 'Lucide React', description: 'Beautiful icon library', version: '0.x' },
        { name: 'React Hook Form', description: 'Form state management', version: '7.x' },
        { name: 'Zod', description: 'Schema validation', version: '3.x' },
        { name: 'React Query', description: 'Data fetching and caching', version: '5.x' },
      ]
    },
    {
      category: 'Development Tools',
      color: 'from-orange-500 to-red-500',
      icon: '🛠️',
      items: [
        { name: 'ESLint', description: 'Code linting and formatting', version: '8.x' },
        { name: 'Prettier', description: 'Code formatting', version: '3.x' },
        { name: 'Husky', description: 'Git hooks for quality checks', version: '8.x' },
        { name: 'GitHub Actions', description: 'CI/CD pipeline', version: 'Latest' },
        { name: 'VS Code', description: 'Primary development environment', version: 'Latest' },
      ]
    },
    {
      category: 'Analytics & Monitoring',
      color: 'from-indigo-500 to-purple-500',
      icon: '📊',
      items: [
        { name: 'Vercel Analytics', description: 'Performance monitoring', version: '1.x' },
        { name: 'Sentry', description: 'Error tracking and monitoring', version: '7.x' },
        { name: 'PostHog', description: 'Product analytics', version: '1.x' },
        { name: 'Google Analytics', description: 'Website traffic analysis', version: '4.x' },
      ]
    },
    {
      category: 'Testing',
      color: 'from-teal-500 to-cyan-500',
      icon: '🧪',
      items: [
        { name: 'Jest', description: 'JavaScript testing framework', version: '29.x' },
        { name: 'React Testing Library', description: 'React component testing', version: '14.x' },
        { name: 'Playwright', description: 'End-to-end testing', version: '1.x' },
        { name: 'Storybook', description: 'Component development', version: '7.x' },
      ]
    }
  ];

  const features = [
    {
      title: 'Modern Architecture',
      description: 'Built with the latest web technologies and best practices for scalability and performance.',
      icon: '🏗️'
    },
    {
      title: 'Type Safety',
      description: 'Full TypeScript implementation ensures type safety across the entire application.',
      icon: '🔒'
    },
    {
      title: 'Responsive Design',
      description: 'Mobile-first approach with Tailwind CSS for beautiful, responsive user interfaces.',
      icon: '📱'
    },
    {
      title: 'Performance Optimized',
      description: 'Optimized for speed with Next.js features like Image Optimization and Code Splitting.',
      icon: '⚡'
    },
    {
      title: 'Developer Experience',
      description: 'Excellent developer experience with hot reloading, TypeScript, and modern tooling.',
      icon: '👨‍💻'
    },
    {
      title: 'Production Ready',
      description: 'Deployed on Vercel with monitoring, analytics, and error tracking.',
      icon: '🚀'
    }
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'>
      {/* Hero Section */}
      <section className='pt-20 pb-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h1 className='text-4xl md:text-6xl font-display font-bold mb-6'>
              <span className='gradient-text'>Tech Stack</span>
            </h1>
            <p className='text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed'>
              Built with modern technologies and best practices to deliver a fast, 
              secure, and scalable sleep tracking experience.
            </p>
          </div>

          {/* Features Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20'>
            {features.map((feature, index) => (
              <div key={index} className='card p-6 text-center group hover:scale-105 transition-all duration-300'>
                <div className='text-4xl mb-4'>{feature.icon}</div>
                <h3 className='text-xl font-semibold text-slate-800 mb-3'>{feature.title}</h3>
                <p className='text-slate-600'>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className='py-20 bg-white/50 backdrop-blur-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-display font-bold text-slate-800 mb-4'>
              Technologies We Use
            </h2>
            <p className='text-xl text-slate-600 max-w-2xl mx-auto'>
              A comprehensive overview of the tools and technologies powering Naptrix.
            </p>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {technologies.map((tech, categoryIndex) => (
              <div key={categoryIndex} className='card p-8'>
                <div className='flex items-center mb-6'>
                  <div className={`w-12 h-12 bg-gradient-to-r ${tech.color} rounded-xl flex items-center justify-center text-2xl mr-4`}>
                    {tech.icon}
                  </div>
                  <h3 className='text-2xl font-bold text-slate-800'>{tech.category}</h3>
                </div>
                
                <div className='space-y-4'>
                  {tech.items.map((item, itemIndex) => (
                    <div key={itemIndex} className='flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors duration-200'>
                      <div className='flex-1'>
                        <div className='flex items-center space-x-3'>
                          <h4 className='font-semibold text-slate-800'>{item.name}</h4>
                          <span className='px-2 py-1 bg-slate-200 text-slate-600 text-xs rounded-full'>
                            {item.version}
                          </span>
                        </div>
                        <p className='text-sm text-slate-600 mt-1'>{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className='py-20 bg-gradient-to-r from-primary-50 to-secondary-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-display font-bold text-slate-800 mb-4'>
              Architecture Overview
            </h2>
            <p className='text-xl text-slate-600 max-w-2xl mx-auto'>
              How all the pieces work together to create a seamless sleep tracking experience.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='card p-8 text-center'>
              <div className='w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6'>
                <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-slate-800 mb-4'>Frontend Layer</h3>
              <p className='text-slate-600'>
                React components with TypeScript, styled with Tailwind CSS, 
                and enhanced with modern UI libraries for the best user experience.
              </p>
            </div>

            <div className='card p-8 text-center'>
              <div className='w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6'>
                <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4a2 2 0 11-4 0 2 2 0 014 0z' />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-slate-800 mb-4'>Backend Layer</h3>
              <p className='text-slate-600'>
                Next.js API routes with Prisma ORM connecting to PostgreSQL, 
                secured with Clerk authentication and deployed on Vercel.
              </p>
            </div>

            <div className='card p-8 text-center'>
              <div className='w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6'>
                <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-slate-800 mb-4'>Data Layer</h3>
              <p className='text-slate-600'>
                PostgreSQL database with Prisma ORM for type-safe database operations, 
                with comprehensive data validation and error handling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 bg-gradient-to-r from-primary-600 to-secondary-600'>
        <div className='max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8'>
          <h2 className='text-3xl md:text-4xl font-display font-bold text-white mb-6'>
            Interested in the Code?
          </h2>
          <p className='text-xl text-primary-100 mb-8 max-w-2xl mx-auto'>
            Check out our open-source repository on GitHub to see how we built Naptrix 
            with modern web technologies.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <a
              href='https://github.com/yourusername/naptrix'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-white text-primary-600 hover:bg-primary-50 font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2'
            >
              <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'/>
              </svg>
              <span>View on GitHub</span>
            </a>
            <a
              href='/'
              className='border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold px-8 py-4 rounded-xl transition-all duration-300'
            >
              Back to Home
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TechStackPage;
