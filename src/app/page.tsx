'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogIn, ArrowRight, Sparkles, Brain } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // For now, just redirect to the dashboard
    window.location.href = '/dashboard/audit/enhanced';
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white flex items-center justify-center">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Abstract blue shapes */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-blue-600/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-blue-500/25 to-purple-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-br from-blue-300/20 to-cyan-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md mx-4 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-2xl">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-blue-400 font-bold text-2xl">//</span>
            <span className="text-2xl font-bold text-white">Quoted</span>
          </div>
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Welcome Back</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Sign in to access your LLMO dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-900 dark:text-white">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-900 dark:text-white">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
            />
          </div>
          
          <Button 
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            <LogIn className="mr-2 h-4 w-4" />
            Log In
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          
          <div className="text-center pt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link href="/dashboard/audit/enhanced" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
                Start Free Analysis
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 