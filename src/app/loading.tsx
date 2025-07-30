import { Sparkles } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="relative">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg mx-auto w-fit animate-pulse">
            <Sparkles className="h-12 w-12" />
          </div>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 opacity-20 blur-xl animate-pulse"></div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold gradient-text">Loading Quoted</h2>
          <p className="text-muted-foreground">Preparing your LLMO platform...</p>
        </div>
        <div className="flex items-center justify-center space-x-1">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
} 