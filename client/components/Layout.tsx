import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Fish,
  Users,
  Building2,
  Package,
  TrendingUp,
  Menu,
  X,
  Home,
  LogOut,
  Settings,
  Bell,
  Utensils,
  Droplets,
  Heart,
  Scale,
  Monitor,
  CheckSquare,
  Archive
} from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

interface LayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Autenticação', href: '/auth', icon: Users },
  { name: 'Minha Fazenda', href: '/farm', icon: Building2 },
  { name: 'Povoamento', href: '/stocking', icon: Fish },
  { name: 'Estoque', href: '/inventory', icon: Package },
  { name: 'Arraçoamento', href: '/feeding', icon: Utensils },
  { name: 'Qualidade da Água', href: '/water-quality', icon: Droplets },
  { name: 'Saúde Animal', href: '/health', icon: Heart },
  { name: 'Biometria', href: '/biometry', icon: Scale },
  { name: 'Monitoramento', href: '/monitoring', icon: Monitor },
  { name: 'Tarefas', href: '/tasks', icon: CheckSquare },
  { name: 'Histórico de Ciclos', href: '/cycle-history', icon: Archive },
  { name: 'Relatórios', href: '/reports', icon: TrendingUp },
]

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar */}
      <div className={cn(
        "fixed inset-0 z-50 lg:hidden",
        sidebarOpen ? "block" : "hidden"
      )}>
        <div className="fixed inset-0 bg-black/20" onClick={() => setSidebarOpen(false)} />
        <div className="fixed left-0 top-0 h-full w-64 bg-white p-6 shadow-lg">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Fish className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-primary">AquaFarm</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  location.pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:w-64 lg:flex lg:flex-col">
        <div className="flex flex-col bg-white border-r border-border h-full">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-border">
            <Fish className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary">AquaFarm</span>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  location.pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="px-4 py-4 border-t border-border">
            <div className="flex items-center gap-3 px-3 py-2 text-sm">
              <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-medium">G</span>
              </div>
              <div>
                <p className="font-medium">Gestor</p>
                <p className="text-xs text-muted-foreground">gestor@fazenda.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-white border-b border-border">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-lg font-semibold text-foreground">
                {navigation.find(item => item.href === location.pathname)?.name || 'Dashboard'}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
