import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

import Link from 'next/link';

import { checkUser } from '@/lib/checkUser';

export default async function Navbar() {
  const user = await checkUser();
  console.log('Current User:', user);

  return (
    <nav className='bg-white border-b border-slate-100 sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <div className='flex items-center'>
            <Link href='/' className='flex items-center'>
              <span className='text-xl font-bold text-slate-900 tracking-tight'>
                Naptrix
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className='hidden md:flex items-center space-x-1'>
            <Link
              href='/'
              className='px-3 py-2 text-slate-600 hover:text-slate-900 font-medium rounded-md hover:bg-slate-50 transition-colors duration-150 text-sm'
            >
              {user ? 'Dashboard' : 'Home'}
            </Link>

            <Link
              href='/about'
              className='px-3 py-2 text-slate-600 hover:text-slate-900 font-medium rounded-md hover:bg-slate-50 transition-colors duration-150 text-sm'
            >
              About
            </Link>

            <Link
              href='/tech-stack'
              className='px-3 py-2 text-slate-600 hover:text-slate-900 font-medium rounded-md hover:bg-slate-50 transition-colors duration-150 text-sm'
            >
              Tech Stack
            </Link>

            <a
              href='https://github.com/Aniketgautam959/Naptrix-Smart-AI-Sleep-Tracker'
              target='_blank'
              rel='noopener noreferrer'
              className='px-3 py-2 text-slate-600 hover:text-slate-900 font-medium rounded-md hover:bg-slate-50 transition-colors duration-150 flex items-center gap-2 text-sm'
            >
              <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
              </svg>
              <span>GitHub</span>
            </a>
          </div>

          {/* Auth Section */}
          <div className='flex items-center space-x-3'>
            <SignedOut>
              <SignInButton>
                <button className='bg-slate-900 hover:bg-slate-800 text-white font-semibold px-5 py-2 rounded-lg transition-colors duration-150 text-sm'>
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: 'w-8 h-8',
                    userButtonPopoverCard: 'shadow-lg border border-slate-200',
                    userButtonPopoverActionButton: 'hover:bg-slate-50',
                    userButtonPopoverActionButtonText: 'text-slate-700',
                    userButtonPopoverFooter: 'hidden',
                  },
                }}
              />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
}
