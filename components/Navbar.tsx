import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

import Link from 'next/link';

import { checkUser } from '@/lib/checkUser';
import NavLinks from '@/components/NavLinks';
import ThemeToggle from '@/components/ThemeToggle';

export default async function Navbar() {
  const user = await checkUser();

  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                Naptrix
              </span>
            </Link>
          </div>

          <NavLinks isLoggedIn={!!user} />

          {/* Auth Section */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <SignedOut>
              <div className="flex items-center gap-2">
                <SignUpButton>
                  <button className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-5 py-2 rounded-lg transition-colors duration-150 text-sm">
                    Sign Up
                  </button>
                </SignUpButton>
                <SignInButton>
                  <button className="border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold px-5 py-2 rounded-lg transition-colors duration-150 text-sm">
                    Sign In
                  </button>
                </SignInButton>
              </div>
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
