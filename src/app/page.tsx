'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogIn, ArrowRight, Sparkles, Brain } from 'lucide-react';
import { LogoWrapper } from '@/components/logo-wrapper';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // For now, just redirect to the dashboard
    window.location.href = '/dashboard/audit/enhanced';
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Abstract blue shapes */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-blue-600/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-blue-500/15 to-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-br from-blue-300/10 to-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md mx-4 bg-gray-900 border-gray-800 shadow-2xl">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center mb-4">
            <LogoWrapper size="lg" forceDark={true} />
          </div>
          <CardTitle className="text-xl font-semibold text-white">Welcome Back</CardTitle>
          <CardDescription className="text-gray-400">
            Sign in to access your LLMO dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-300">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
            />
          </div>
          
          <Button 
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 group"
          >
            <LogIn className="mr-2 h-4 w-4" />
            Log In
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <div className="text-center pt-4">
            <p className="text-sm text-gray-400">
              Don't have an account?{' '}
              <Link href="/dashboard/audit/enhanced" className="text-blue-400 hover:text-blue-300">
                Start Free Analysis
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 