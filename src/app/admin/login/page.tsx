'use client';

import { useState } from 'react';
import { login } from '@/actions/auth';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Lock, User, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const result = await login(formData);
    
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gray-50 overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px]"></div>
        <div className="absolute bottom-[0%] -left-[10%] w-[60%] h-[60%] rounded-full bg-purple-500/10 blur-[120px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 sm:p-10 shadow-2xl shadow-gray-200/50">
          
          <div className="mb-10 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/30 mb-6">
              <ShieldCheck className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Admin Portal</h2>
            <p className="mt-3 text-sm text-gray-500 font-medium">
              Enter your credentials to access the dashboard
            </p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="flex items-center gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-600 border border-red-100">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>{error}</p>
              </div>
            )}
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-semibold text-gray-700">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
                    <User className="h-5 w-5" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    placeholder="Enter your username"
                    className="flex h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 py-2 text-gray-900 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 transition-all shadow-sm"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</label>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="Enter your password"
                    className="flex h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 py-2 text-gray-900 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base shadow-lg shadow-indigo-500/25 transition-all duration-300"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-indigo-200 border-t-white rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </div>
        
        <p className="mt-8 text-center text-xs text-gray-500 font-medium">
          Secure access restricted to authorized personnel only.
        </p>
      </div>
    </div>
  );
}
