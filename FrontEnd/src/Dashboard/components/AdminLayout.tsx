
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  FolderOpen, 
  Monitor, 
  DollarSign, 
  BarChart3, 
  Settings, 
  Puzzle, 
  Megaphone, 
  Shield, 
  Bell,
  Menu,
  X,
  Search,
  User,
  ArrowLeft
} from 'lucide-react';
import { cn } from '../lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
  onBackToMain?: () => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/', category: 'main' },
  { id: 'ats', label: 'ATS', icon: FileText, path: '/ats', category: 'main' },
  { id: 'employees', label: 'Employees', icon: Users, path: '/employees', category: 'main' },
  { id: 'projects', label: 'Projects', icon: FolderOpen, path: '/projects', category: 'main' },
  { id: 'proof-of-work', label: 'Proof of Work', icon: Monitor, path: '/proof-of-work', category: 'operations' },
  { id: 'payroll', label: 'Payroll & HR', icon: DollarSign, path: '/payroll', category: 'operations' },
  { id: 'reports', label: 'Reports', icon: BarChart3, path: '/reports', category: 'analytics' },
  { id: 'integrations', label: 'Integrations', icon: Puzzle, path: '/integrations', category: 'system' },
  { id: 'promotions', label: 'Promotions', icon: Megaphone, path: '/promotions', category: 'system' },
  { id: 'user-management', label: 'User Management', icon: Shield, path: '/user-management', category: 'system' },
  { id: 'notifications', label: 'Notifications', icon: Bell, path: '/notifications', category: 'system' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/settings', category: 'system' },
];

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, onBackToMain }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarMinimized, setSidebarMinimized] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleSidebarMinimized = () => setSidebarMinimized((v) => !v);

  const groupedNavigation = navigationItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof navigationItems>);

  const categoryLabels = {
    main: 'Core',
    operations: 'Operations',
    analytics: 'Analytics',
    system: 'System'
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed top-0 left-0 h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-50 transform transition-all duration-300 ease-in-out",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        sidebarMinimized ? "w-20" : "w-72"
      )}>
        {/* Minimize Button (Desktop only) */}
        <div className="hidden lg:flex justify-end p-2">
          <button
            onClick={toggleSidebarMinimized}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={sidebarMinimized ? "Expand sidebar" : "Minimize sidebar"}
          >
            {sidebarMinimized ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>
        {/* Sidebar Header */}
        <div className={sidebarMinimized ? "p-2 flex flex-col items-center" : "p-6 border-b border-slate-200 dark:border-slate-800"}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            {!sidebarMinimized && (
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">Mekyek</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">Admin Panel</p>
              </div>
            )}
          </div>
        </div>
        {/* Navigation */}
        <nav className={sidebarMinimized ? "p-2 space-y-6 overflow-y-auto h-full pb-20" : "p-4 space-y-6 overflow-y-auto h-full pb-20"}>
          {Object.entries(groupedNavigation).map(([category, items]) => (
            <div key={category}>
              {!sidebarMinimized && (
                <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-3 mb-3">
                  {categoryLabels[category as keyof typeof categoryLabels]}
                </h3>
              )}
              <div className="space-y-2">
                {items.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        "flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
                        isActive 
                          ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/25" 
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white",
                        sidebarMinimized ? "justify-center px-2" : ""
                      )}
                    >
                      <Icon size={20} className={cn(
                        "transition-transform duration-200",
                        isActive ? "text-white" : "group-hover:scale-110"
                      )} />
                      {!sidebarMinimized && <span className="font-medium">{item.label}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className={
        sidebarMinimized
          ? "lg:ml-20"
          : "lg:ml-72"
      }>
        {/* Back to Main App Button (sticky at top of content) */}
        {onBackToMain && (
          <div className={
            `sticky top-0 z-50 transition-all duration-300 mb-4 flex` +
            (sidebarMinimized ? ' ml-4' : ' ml-0')
          }>
            <button
              onClick={onBackToMain}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors duration-200 flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back to Main App
            </button>
          </div>
        )}
        {/* Desktop Header */}
        <header className="hidden lg:flex bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 py-4 items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {navigationItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-80 bg-slate-100 dark:bg-slate-800 border-0 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-700 transition-all duration-200"
              />
            </div>
            <button className="relative p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
              <User size={18} className="text-white" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
