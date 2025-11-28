import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ApolloWrapper } from '@/lib/apollo-wrapper';
import Link from 'next/link';
import { LayoutDashboard, Calendar, Users, ClipboardList } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Roster System',
  description: 'Shift scheduling and roster management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>
          <div className="min-h-screen bg-gray-50">
            {/* Top Navigation Bar */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                  <div className="flex items-center space-x-8">
                    <Link href="/" className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xl font-bold text-gray-900">Roster</span>
                    </Link>
                    
                    <div className="hidden md:flex space-x-1">
                      <NavLink href="/" icon={<LayoutDashboard className="w-4 h-4" />}>
                        Dashboard
                      </NavLink>
                      <NavLink href="/shifts" icon={<Calendar className="w-4 h-4" />}>
                        Shifts
                      </NavLink>
                      <NavLink href="/users" icon={<Users className="w-4 h-4" />}>
                        Users
                      </NavLink>
                      <NavLink href="/assignments" icon={<ClipboardList className="w-4 h-4" />}>
                        Assignments
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
          </div>
        </ApolloWrapper>
      </body>
    </html>
  );
}

// Nav Link Component
function NavLink({ 
  href, 
  icon, 
  children 
}: { 
  href: string; 
  icon: React.ReactNode; 
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}