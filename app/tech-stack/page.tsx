import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Tech Stack - Naptrix',
  description: 'Technologies powering the Naptrix sleep tracking application.',
};

const categories = [
  {
    name: 'Frontend',
    accent: 'from-blue-500/10 to-transparent',
    dot: 'bg-blue-500',
    items: [
      { abbr: 'N', name: 'Next.js', version: '15.x', desc: 'App Router, server components, server actions' },
      { abbr: 'R', name: 'React', version: '19.x', desc: 'UI with hooks and concurrent features' },
      { abbr: 'TS', name: 'TypeScript', version: '5.x', desc: 'End-to-end type safety' },
      { abbr: 'TW', name: 'Tailwind CSS', version: '3.x', desc: 'Utility-first styling with dark mode' },
    ],
  },
  {
    name: 'Backend & Data',
    accent: 'from-emerald-500/10 to-transparent',
    dot: 'bg-emerald-500',
    items: [
      { abbr: 'SA', name: 'Server Actions', version: 'Next 15', desc: 'Type-safe server mutations' },
      { abbr: 'P', name: 'Prisma', version: '6.x', desc: 'Type-safe ORM with PostgreSQL' },
      { abbr: 'PG', name: 'PostgreSQL', version: '15+', desc: 'Relational database' },
      { abbr: 'C', name: 'Clerk', version: '6.x', desc: 'Authentication & user management' },
    ],
  },
  {
    name: 'Features',
    accent: 'from-violet-500/10 to-transparent',
    dot: 'bg-violet-500',
    items: [
      { abbr: 'CJ', name: 'Chart.js', version: '4.x', desc: 'Sleep data visualizations' },
      { abbr: 'AI', name: 'Google Gemini', version: '2.5', desc: 'AI-powered sleep insights' },
      { abbr: 'T', name: 'next-themes', version: '0.x', desc: 'Dark / light mode toggle' },
    ],
  },
  {
    name: 'Dev Tools',
    accent: 'from-amber-500/10 to-transparent',
    dot: 'bg-amber-500',
    items: [
      { abbr: 'E', name: 'ESLint', version: '9.x', desc: 'Code linting' },
      { abbr: 'Pr', name: 'Prettier', version: '3.x', desc: 'Code formatting' },
      { abbr: 'M', name: 'Prisma Migrate', version: '6.x', desc: 'Database schema management' },
    ],
  },
];

const totalTech = categories.reduce((n, c) => n + c.items.length, 0);

const TechStackPage = () => {
  return (
    <div className='min-h-screen bg-slate-50 dark:bg-slate-950'>
      <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14'>
        {/* Header */}
        <div className='text-center mb-14'>
          <p className='text-xs font-medium text-slate-400 uppercase tracking-widest mb-3'>
            Under the hood
          </p>
          <h1 className='text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-100 tracking-tight'>
            Tech Stack
          </h1>
          <p className='text-slate-500 dark:text-slate-400 mt-3 max-w-md mx-auto text-sm leading-relaxed'>
            {totalTech} technologies powering Naptrix — built for performance, type safety, and a great developer experience.
          </p>

          <div className='flex items-center justify-center gap-6 mt-8'>
            {categories.map((cat) => (
              <div key={cat.name} className='flex items-center gap-2'>
                <span className={`w-2 h-2 rounded-full ${cat.dot}`} />
                <span className='text-xs text-slate-500 dark:text-slate-400 hidden sm:inline'>
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          {categories.map((cat) => (
            <div
              key={cat.name}
              className='bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 transition-colors'
            >
              <div className={`px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r ${cat.accent}`}>
                <div className='flex items-center gap-2.5'>
                  <span className={`w-2 h-2 rounded-full ${cat.dot}`} />
                  <h2 className='text-sm font-semibold text-slate-900 dark:text-slate-100'>
                    {cat.name}
                  </h2>
                  <span className='text-xs text-slate-400 ml-auto'>
                    {cat.items.length} tools
                  </span>
                </div>
              </div>

              <div className='p-2'>
                {cat.items.map((item) => (
                  <div
                    key={item.name}
                    className='flex items-start gap-3.5 px-4 py-3.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group'
                  >
                    <div className='w-9 h-9 shrink-0 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 flex items-center justify-center'>
                      <span className='text-[10px] font-bold text-slate-600 dark:text-slate-300 tracking-tight'>
                        {item.abbr}
                      </span>
                    </div>
                    <div className='min-w-0 flex-1'>
                      <div className='flex items-center gap-2 flex-wrap'>
                        <span className='text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-slate-700 dark:group-hover:text-white transition-colors'>
                          {item.name}
                        </span>
                        <span className='text-[10px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full border border-slate-200/60 dark:border-slate-700'>
                          {item.version}
                        </span>
                      </div>
                      <p className='text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed'>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className='mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-200 dark:border-slate-800'>
          <Link
            href='/'
            className='text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors'
          >
            ← Back to dashboard
          </Link>
          <a
            href='https://github.com/Aniketgautam959/Naptrix-Smart-AI-Sleep-Tracker'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors'
          >
            <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
            </svg>
            View source on GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default TechStackPage;
