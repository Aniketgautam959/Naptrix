import { SignInButton } from '@clerk/nextjs';

const Guest = () => {
  return (
    <div className='min-h-screen bg-white'>
      {/* Hero Section */}
      <section className='pt-20 pb-20 border-b border-slate-100'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-20 items-center'>
            {/* Left Column */}
            <div className='space-y-10'>
              <div className='space-y-5'>
                <span className='text-xs font-semibold tracking-widest text-slate-400 uppercase'>
                  AI-Powered Sleep Intelligence
                </span>
                <h1 className='text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight text-slate-900'>
                  Sleep
                  <br />
                  <span className='text-slate-400'>Better.</span>
                  <br />
                  Live Better.
                </h1>
                <p className='text-lg text-slate-500 leading-relaxed max-w-md'>
                  Track your sleep patterns with precision. Get insights,
                  improve your rest, and wake up refreshed every morning.
                </p>
              </div>

              <div className='flex flex-col sm:flex-row gap-3'>
                <SignInButton>
                  <button className='bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors duration-150 text-sm'>
                    Get Started
                  </button>
                </SignInButton>
                <button className='border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-medium px-8 py-3.5 rounded-lg transition-colors duration-150 text-sm'>
                  Learn More
                </button>
              </div>

              {/* Stats */}
              <div className='grid grid-cols-3 gap-6 pt-8 border-t border-slate-100'>
                <div>
                  <div className='text-3xl font-bold text-slate-900 tabular-nums'>50+</div>
                  <div className='text-sm text-slate-500 mt-1'>Users</div>
                </div>
                <div>
                  <div className='text-3xl font-bold text-slate-900 tabular-nums'>600+</div>
                  <div className='text-sm text-slate-500 mt-1'>Hours Tracked</div>
                </div>
                <div>
                  <div className='text-3xl font-bold text-slate-900 tabular-nums'>88%</div>
                  <div className='text-sm text-slate-500 mt-1'>Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Right Column — Visual Block */}
            <div className='relative hidden lg:block'>
              <div className='bg-slate-950 rounded-2xl p-8 space-y-4'>
                {/* Mock Dashboard Card */}
                <div className='flex items-center justify-between mb-6'>
                  <span className='text-slate-400 text-xs font-medium tracking-wide uppercase'>Last 7 Nights</span>
                  <div className='flex items-center gap-1.5'>
                    <div className='w-2 h-2 bg-emerald-400 rounded-full'></div>
                    <span className='text-emerald-400 text-xs font-medium'>Excellent</span>
                  </div>
                </div>

                {/* Sleep bars */}
                <div className='flex items-end gap-2 h-24'>
                  {[65, 80, 55, 90, 70, 85, 95].map((h, i) => (
                    <div key={i} className='flex-1 flex flex-col items-center gap-1'>
                      <div
                        className='w-full rounded-sm'
                        style={{
                          height: `${h}%`,
                          background: i === 6 ? '#34d399' : '#334155',
                        }}
                      ></div>
                      <span className='text-slate-600 text-xs'>
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className='border-t border-slate-800 pt-4 mt-4'>
                  <div className='grid grid-cols-3 gap-4'>
                    <div>
                      <div className='text-white font-bold text-lg tabular-nums'>8h 32m</div>
                      <div className='text-slate-500 text-xs mt-0.5'>Avg. Duration</div>
                    </div>
                    <div>
                      <div className='text-white font-bold text-lg tabular-nums'>92</div>
                      <div className='text-slate-500 text-xs mt-0.5'>Sleep Score</div>
                    </div>
                    <div>
                      <div className='text-white font-bold text-lg tabular-nums'>22:45</div>
                      <div className='text-slate-500 text-xs mt-0.5'>Bedtime</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subtle side label */}
              <div className='absolute -right-6 top-1/2 -translate-y-1/2 rotate-90'>
                <span className='text-slate-200 text-xs tracking-widest font-medium uppercase'>Dashboard</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-24'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='mb-16'>
            <span className='text-xs font-semibold tracking-widest text-slate-400 uppercase'>Features</span>
            <h2 className='text-4xl font-bold text-slate-900 mt-3 max-w-md leading-tight'>
              Why Choose Naptrix?
            </h2>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-100 border border-slate-100 rounded-xl overflow-hidden'>
            <div className='bg-white p-8 hover:bg-slate-50 transition-colors duration-150'>
              <div className='w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center mb-6'>
                <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' />
                </svg>
              </div>
              <h3 className='text-lg font-semibold text-slate-900 mb-3'>Smart Analytics</h3>
              <p className='text-slate-500 text-sm leading-relaxed'>
                AI-powered insights analyze your sleep patterns and provide personalized recommendations.
              </p>
            </div>

            <div className='bg-white p-8 hover:bg-slate-50 transition-colors duration-150'>
              <div className='w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center mb-6'>
                <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
              </div>
              <h3 className='text-lg font-semibold text-slate-900 mb-3'>Real-time Tracking</h3>
              <p className='text-slate-500 text-sm leading-relaxed'>
                Monitor your sleep in real-time with detailed sleep stage analysis and trend history.
              </p>
            </div>

            <div className='bg-white p-8 hover:bg-slate-50 transition-colors duration-150'>
              <div className='w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center mb-6'>
                <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
                </svg>
              </div>
              <h3 className='text-lg font-semibold text-slate-900 mb-3'>Personalized Care</h3>
              <p className='text-slate-500 text-sm leading-relaxed'>
                Get customized sleep plans and recommendations based on your unique sleep profile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className='py-24 bg-slate-50 border-t border-slate-100'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='mb-16'>
            <span className='text-xs font-semibold tracking-widest text-slate-400 uppercase'>Testimonials</span>
            <h2 className='text-4xl font-bold text-slate-900 mt-3'>
              Loved by Early Users
            </h2>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {[
              {
                initials: 'SL',
                name: 'Sarah L.',
                role: 'Marketing Manager',
                quote: 'Naptrix has completely transformed my sleep schedule. I feel more energized every day. The insights are incredibly detailed and helpful.',
              },
              {
                initials: 'JD',
                name: 'John D.',
                role: 'Software Engineer',
                quote: 'The insights from Naptrix helped me identify and fix my sleep issues. Highly recommend it to anyone serious about improving their sleep quality.',
              },
              {
                initials: 'ER',
                name: 'Emily R.',
                role: 'Health Coach',
                quote: 'Naptrix is easy to use and provides accurate data. A must-have for anyone looking to improve their sleep and overall well-being.',
              },
            ].map((t) => (
              <div key={t.name} className='bg-white border border-slate-100 rounded-xl p-7 hover:border-slate-200 transition-colors duration-150'>
                {/* Stars */}
                <div className='flex gap-0.5 mb-5'>
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className='w-4 h-4 text-slate-900 fill-current' viewBox='0 0 20 20'>
                      <path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
                    </svg>
                  ))}
                </div>
                <p className='text-slate-700 text-sm leading-relaxed mb-6'>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className='flex items-center gap-3'>
                  <div className='w-9 h-9 bg-slate-900 rounded-full flex items-center justify-center text-white text-xs font-semibold tracking-wide'>
                    {t.initials}
                  </div>
                  <div>
                    <div className='font-semibold text-slate-900 text-sm'>{t.name}</div>
                    <div className='text-xs text-slate-500 mt-0.5'>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-24 bg-slate-950'>
        <div className='max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8'>
          <span className='text-xs font-semibold tracking-widest text-slate-500 uppercase'>Get Started</span>
          <h2 className='text-4xl md:text-5xl font-bold text-white mt-4 mb-5 leading-tight'>
            Ready to Transform Your Sleep?
          </h2>
          <p className='text-slate-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed'>
            Join 50+ users who are already improving their sleep quality with Naptrix.
          </p>
          <div className='flex flex-col sm:flex-row gap-3 justify-center'>
            <SignInButton>
              <button className='bg-white hover:bg-slate-100 text-slate-900 font-semibold px-8 py-3.5 rounded-lg transition-colors duration-150 text-sm'>
                Get Started Free
              </button>
            </SignInButton>
            <button className='border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-medium px-8 py-3.5 rounded-lg transition-colors duration-150 text-sm'>
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Guest;
