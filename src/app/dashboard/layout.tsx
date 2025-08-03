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
        <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50 dark:bg-gray-900/80 dark:border-gray-700">
          <div className="flex h-16 items-center justify-between px-4 lg:px-6">
            {/* Left side - Menu and Logo */}
            <div className="flex items-center gap-4">
              <SidebarTrigger className="md:hidden hover:bg-primary/10 rounded-lg" />
              <Link href="/" className="hover:opacity-80 transition-opacity">
                <LogoWrapper size="md" />
              </Link>
            </div>
            
            {/* Right side - Actions */}
            <div className="flex items-center gap-2">
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-primary/10 rounded-xl">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Notifications</span>
              </Button>
              
              {/* Theme Toggle */}
              <ThemeToggle />
              
              {/* Settings */}
              <Button variant="outline" size="icon" className="h-9 w-9 hover:bg-primary/10 border-border/50 rounded-xl">
                <Settings className="h-4 w-4" />
                <span className="sr-only">Settings</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar - Below Top Banner */}
        <Sidebar className="border-r-0 bg-gradient-to-b from-sidebar-background to-sidebar-background/50 backdrop-blur-xl dark:from-gray-900 dark:to-gray-800 mt-16" collapsible="icon">
          {/* Collapse Button - Middle of Sidebar */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 z-10">
            <SidebarTrigger className="h-8 w-8 bg-background border border-border/50 rounded-full shadow-lg hover:bg-primary/10 hover:border-primary/50 transition-all duration-200 flex items-center justify-center">
              <PanelLeft className="h-4 w-4" />
            </SidebarTrigger>
          </div>
          
          <SidebarContent className="px-3 py-4">
            <SidebarMenu className="space-y-2">
              {navigationItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild className="group hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-xl p-3 h-auto">
                    <Link href={item.href} prefetch={true}>
                      <div className="flex items-center gap-3 w-full">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-muted to-muted/50 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-200">
                          <item.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">{item.title}</span>
                            {item.badge && (
                              <Badge variant="secondary" className="text-xs px-2 py-0 bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5 truncate">
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
          
          <SidebarFooter className="border-t border-border/50 p-3 dark:border-gray-700">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-xl p-3 h-auto">
                  <Link href="/dashboard/settings" prefetch={true}>
                    <div className="flex items-center gap-3 w-full">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-muted to-muted/50">
                        <Settings className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <span className="font-medium text-sm">Settings</span>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Preferences & config
                        </p>
                      </div>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            
            {/* User Profile Section */}
            <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-muted/50 to-muted/30 border border-border/50 dark:from-gray-800 dark:to-gray-700 dark:border-gray-600">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Demo User</p>
                  <p className="text-xs text-muted-foreground">Free Plan</p>
                </div>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset className="mt-16">
          <div className="relative min-h-screen">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none dark:from-gray-900/50" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-primary/10 to-transparent rounded-full blur-3xl pointer-events-none dark:from-blue-500/10" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-secondary/10 to-transparent rounded-full blur-3xl pointer-events-none dark:from-purple-500/10" />
            
            <div className="relative z-10">
              {children}
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
