import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Tech Stack - Naptrix',
  description: 'Technologies powering the Naptrix sleep tracking application.',
};

const categories = [
  {
    name: 'Frontend',
    items: [
      { name: 'Next.js 14', version: '14.x', desc: 'React framework with App Router & server components' },
      { name: 'React 18', version: '18.x', desc: 'UI library with hooks and concurrent features' },
      { name: 'TypeScript', version: '5.x', desc: 'Type-safe JavaScript development' },
      { name: 'Tailwind CSS', version: '3.x', desc: 'Utility-first CSS framework' },
    ],
  },
  {
    name: 'Backend & Database',
    items: [
      { name: 'Next.js API Routes', version: '14.x', desc: 'Serverless API endpoints' },
      { name: 'Prisma', version: '5.x', desc: 'Modern type-safe database ORM' },
      { name: 'PostgreSQL', version: '15.x', desc: 'Reliable relational database' },
      { name: 'Clerk', version: '4.x', desc: 'Authentication and user management' },
    ],
  },
  {
    name: 'UI & Components',
    items: [
      { name: 'Radix UI', version: '1.x', desc: 'Accessible headless UI primitives' },
      { name: 'Lucide React', version: '0.x', desc: 'Clean, consistent icon library' },
      { name: 'React Hook Form', version: '7.x', desc: 'Performant form state management' },
      { name: 'Zod', version: '3.x', desc: 'TypeScript-first schema validation' },
    ],
  },
  {
    name: 'Dev Tools',
    items: [
      { name: 'ESLint', version: '8.x', desc: 'Code linting and static analysis' },
      { name: 'Prettier', version: '3.x', desc: 'Opinionated code formatter' },
      { name: 'Husky', version: '8.x', desc: 'Git hooks for pre-commit checks' },
      { name: 'GitHub Actions', version: 'Latest', desc: 'Automated CI/CD pipeline' },
    ],
  },
];

const TechStackPage = () => {
  return (
    <div className='min-h-screen bg-slate-50'>
      <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>

        {/* Header */}
        <div className='mb-14'>
          <span className='text-xs font-semibold tracking-widest text-slate-400 uppercase'>Stack</span>
          <h1 className='text-5xl font-bold text-slate-900 mt-3 tracking-tight'>Tech Stack</h1>
          <p className='text-slate-500 mt-4 max-w-lg text-base leading-relaxed'>
            Built with modern, production-ready technologies for performance, reliability and developer experience.
          </p>
        </div>

        {/* Category Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {categories.map((cat) => (
            <div key={cat.name} className='bg-white border border-slate-100 rounded-xl overflow-hidden'>
              {/* Category header */}
              <div className='px-6 py-4 border-b border-slate-100 bg-slate-50'>
                <h2 className='text-xs font-semibold tracking-widest text-slate-500 uppercase'>{cat.name}</h2>
              </div>

              {/* Items */}
              <div className='divide-y divide-slate-50'>
                {cat.items.map((item) => (
                  <div key={item.name} className='px-6 py-4 flex items-start justify-between gap-4 hover:bg-slate-50/60 transition-colors duration-100'>
                    <div className='flex-1 min-w-0'>
                      <div className='flex items-center gap-2 flex-wrap'>
                        <span className='text-sm font-semibold text-slate-900'>{item.name}</span>
                        <span className='text-[11px] text-slate-400 font-medium bg-slate-100 px-1.5 py-0.5 rounded'>{item.version}</span>
                      </div>
                      <p className='text-xs text-slate-400 mt-0.5 leading-relaxed'>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className='mt-14 pt-8 border-t border-slate-100 flex items-center justify-between'>
          <Link href='/' className='text-sm text-slate-400 hover:text-slate-700 transition-colors'>
            Back to home
          </Link>
          <a
            href='https://github.com/Aniketgautam959/Naptrix-Smart-AI-Sleep-Tracker'
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-slate-500 transition-colors'
          >
            <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
            </svg>
            View Source on GitHub
          </a>
        </div>

      </div>
    </div>
  );
};

export default TechStackPage;
