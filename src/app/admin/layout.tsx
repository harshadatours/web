'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '@/actions/auth';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, MessageSquarePlus, Globe, LogOut, MapPin, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Tours & Services', href: '/admin/services', icon: MapPin },
    { name: 'Add Feedback', href: '/admin/feedbacks/create', icon: MessageSquarePlus },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col justify-between hidden md:flex sticky top-0 h-screen shadow-sm">
        <div>
          <Link href="/admin" className="flex items-center gap-3 mb-10">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-sm">
              <Image src="/logo.png" alt="Logo" fill className="object-cover" />
            </div>
            <div className="font-bold text-lg tracking-tight text-gray-900 leading-tight">
              Harshada <br/> <span className="text-indigo-600 font-extrabold text-sm uppercase tracking-wider">Admin</span>
            </div>
          </Link>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                    isActive 
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20" 
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-gray-400")} />
                  {item.name}
                </Link>
              );
            })}
            
            <div className="pt-6 mt-6 border-t border-gray-200">
              <Link 
                href="/"
                target="_blank"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"
              >
                <Globe className="w-5 h-5 text-gray-400" />
                View Website
              </Link>
            </div>
          </nav>
        </div>
        
        <div className="pb-4">
          <form action={logout}>
            <Button 
              variant="outline" 
              className="w-full justify-start gap-3 rounded-xl border-gray-200 text-gray-700 hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-all duration-200" 
              type="submit"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
          <Link href="/admin" className="font-bold text-gray-900">Harshada Admin</Link>
          <form action={logout}>
            <button type="submit" className="p-2 text-gray-500 hover:text-red-600"><LogOut className="w-5 h-5" /></button>
          </form>
        </div>
        <div className="p-6 md:p-10 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
