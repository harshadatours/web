import Link from 'next/link';
import { logout } from '@/actions/auth';
import { Button } from '@/components/ui/button';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-gray-50">
      <aside className="w-full md:w-64 bg-white border-r p-6 flex flex-col justify-between">
        <div>
          <div className="mb-8 font-bold text-xl tracking-tight text-gray-900">
            Admin Panel
          </div>
          <nav className="space-y-2">
            <Link 
              href="/admin"
              className="block rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              href="/admin/feedbacks/create"
              className="block rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              Add Feedback
            </Link>
            <Link 
              href="/"
              target="_blank"
              className="block rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              View Site
            </Link>
          </nav>
        </div>
        <div>
          <form action={logout}>
            <Button variant="outline" className="w-full" type="submit">
              Log out
            </Button>
          </form>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
