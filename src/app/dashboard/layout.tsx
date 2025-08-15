import { 
  Settings, 
  PanelLeft, 
  FileText, 
  Sparkles, 
  BarChart, 
  Zap,
  ChartNoAxesColumnIncreasing,
  User,
  Bell
} from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/theme-toggle';
import { LogoWrapper } from '@/components/logo-wrapper';
import Link from 'next/link';

const navigationItems = [
  {
    title: 'Enhanced Audit',
    href: '/dashboard/audit/enhanced',
    icon: Zap,
    description: 'Advanced technical analysis',
    badge: null
  },
  {
    title: 'Optimize',
    href: '/dashboard/optimize',
    icon: Sparkles,
    description: 'Implementation guides',
    badge: null
  },
  {
    title: 'Analytics',
    href: '/dashboard/analytics',
    icon: ChartNoAxesColumnIncreasing,
    description: 'Performance tracking',
    badge: null
  }
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        {/* Top Banner - Full Width */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/30 dark:bg-gray-950/95 dark:border-gray-600/50 shadow-lg dark:shadow-gray-900/20">
          <div className="flex h-16 items-center justify-between px-3 sm:px-4 lg:px-6">
            {/* Left side - Menu and Logo */}
            <div className="flex items-center gap-2 sm:gap-4">
              <SidebarTrigger className="md:hidden hover:bg-primary/10 dark:hover:bg-gray-700/50 rounded-lg transition-colors p-2" />
              <Link href="/" className="hover:opacity-80 transition-opacity">
                <LogoWrapper size="sm" className="sm:hidden" />
                <LogoWrapper size="md" className="hidden sm:block" />
              </Link>
            </div>
            
            {/* Right side - Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Notifications - Hidden on very small screens */}
              <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9 hover:bg-primary/10 dark:hover:bg-gray-700/50 rounded-xl transition-colors hidden sm:flex">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Notifications</span>
              </Button>
              
              {/* Theme Toggle */}
              <ThemeToggle />
              
              {/* Settings */}
              <Button variant="outline" size="icon" className="h-8 w-8 sm:h-9 sm:w-9 hover:bg-primary/10 dark:hover:bg-gray-700/50 border-border/50 dark:border-gray-600/50 rounded-xl transition-colors">
                <Settings className="h-4 w-4" />
                <span className="sr-only">Settings</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar - Below Top Banner */}
        <Sidebar className="border-r border-border/30 dark:border-gray-600/50 bg-gradient-to-b from-sidebar-background to-sidebar-background/50 backdrop-blur-xl dark:from-gray-950/90 dark:to-gray-900/80 mt-16 shadow-xl dark:shadow-gray-900/30 flex flex-col" collapsible="icon">
          {/* Collapse Button - Middle of Sidebar - Hidden on mobile */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 z-10 hidden md:block">
            <SidebarTrigger className="h-12 w-12 bg-background dark:bg-gray-800 border border-border/50 dark:border-gray-600/70 rounded-full shadow-lg dark:shadow-gray-900/40 hover:bg-muted dark:hover:bg-gray-700/70 hover:border-border dark:hover:border-gray-500 transition-all duration-200">
              <div className="absolute inset-0 flex items-center justify-center">
                <PanelLeft className="h-5 w-5 text-foreground dark:text-gray-300" />
              </div>
            </SidebarTrigger>
          </div>
          
          <SidebarContent className="px-2 sm:px-3 py-4 flex-1 overflow-y-auto">
            <SidebarMenu className="space-y-2 sm:space-y-3">
              {navigationItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild className="group hover:bg-muted dark:hover:bg-gray-800/60 transition-all duration-200 rounded-xl p-2 sm:p-3 h-auto border border-transparent hover:border-border/50 dark:hover:border-gray-700/80">
                    <Link href={item.href} prefetch={true}>
                      <div className="flex items-center gap-2 sm:gap-3 w-full">
                        <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-r from-muted to-muted/50 dark:from-gray-800/60 dark:to-gray-700/40 group-hover:from-muted/80 group-hover:to-muted/60 dark:group-hover:from-gray-700/60 dark:group-hover:to-gray-600/40 transition-all duration-200 shadow-sm dark:shadow-gray-900/20">
                          <item.icon className="h-4 w-4 text-foreground dark:text-gray-300" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm text-foreground dark:text-gray-200">{item.title}</span>
                            {item.badge && (
                              <Badge variant="secondary" className="text-xs px-2 py-0 bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-sm">
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground dark:text-gray-400 mt-0.5 truncate">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter className="border-t border-border/30 dark:border-gray-600/50 p-2 sm:p-3 bg-gradient-to-r from-background/50 to-background/30 dark:from-gray-900/50 dark:to-gray-800/30 mt-auto">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="hover:bg-muted dark:hover:bg-gray-800/60 transition-all duration-200 rounded-xl p-2 sm:p-3 h-auto border border-transparent hover:border-border/50 dark:hover:border-gray-700/80">
                  <Link href="/dashboard/settings" prefetch={true}>
                    <div className="flex items-center gap-2 sm:gap-3 w-full">
                      <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-r from-muted to-muted/50 dark:from-gray-800/60 dark:to-gray-700/40 shadow-sm dark:shadow-gray-900/20">
                        <Settings className="h-4 w-4 text-foreground dark:text-gray-300" />
                      </div>
                      <div className="flex-1">
                        <span className="font-medium text-sm text-foreground dark:text-gray-200">Settings</span>
                        <p className="text-xs text-muted-foreground dark:text-gray-400 mt-0.5">
                          Preferences & config
                        </p>
                      </div>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            
            {/* User Profile Section */}
            <div className="mt-3 sm:mt-4 p-2 sm:p-3 rounded-xl bg-gradient-to-r from-muted/50 to-muted/30 dark:from-gray-800/60 dark:to-gray-700/40 border border-border/50 dark:border-gray-600/70 shadow-lg dark:shadow-gray-900/30 backdrop-blur-sm">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-primary to-primary/80 dark:from-blue-600 dark:to-blue-500 flex items-center justify-center shadow-md dark:shadow-blue-900/30">
                  <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary-foreground dark:text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate text-foreground dark:text-gray-200">Demo User</p>
                  <p className="text-xs text-muted-foreground dark:text-gray-400">Free Plan</p>
                </div>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset className="mt-16 bg-background dark:bg-gray-950/90">
          <div className="relative min-h-screen">
            {/* Enhanced Background decoration - Reduced on mobile */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none dark:from-gray-900/70 dark:via-gray-950/50 dark:to-gray-900/70" />
            <div className="absolute top-0 right-0 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-l from-primary/10 to-transparent rounded-full blur-2xl sm:blur-3xl pointer-events-none dark:from-blue-500/20 dark:to-transparent" />
            <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-r from-secondary/10 to-transparent rounded-full blur-2xl sm:blur-3xl pointer-events-none dark:from-purple-500/20 dark:to-transparent" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-64 sm:h-64 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-full blur-xl sm:blur-2xl pointer-events-none dark:from-emerald-500/10 dark:to-teal-500/10" />
            
            <div className="relative z-10">
              {children}
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
