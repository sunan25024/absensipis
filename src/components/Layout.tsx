import React, { useState } from 'react';
import { 
  Home,
  Calendar,
  Scan,
  Bell,
  Settings,
  LogOut,
  Search,
  ChevronDown,
  Shield,
  User
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import NotificationCenter from './NotificationCenter';
import { mockNotifications } from '../data/mockData';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onPageChange }) => {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const unreadNotifications = mockNotifications.filter(n => !n.read).length;

  // Navigation items for employee
  const navItems = [
    { 
      id: 'dashboard', 
      label: 'Beranda', 
      icon: Home, 
      activeColor: 'text-blue-600',
      inactiveColor: 'text-gray-500'
    },
    { 
      id: 'history', 
      label: 'Jadwal', 
      icon: Calendar, 
      activeColor: 'text-purple-600',
      inactiveColor: 'text-gray-500'
    },
    { 
      id: 'attendance', 
      label: 'Absen Cepat', 
      icon: Scan, 
      activeColor: 'text-green-600',
      inactiveColor: 'text-gray-500',
      isMain: true
    },
    { 
      id: 'notifications', 
      label: 'Notifikasi', 
      icon: Bell, 
      activeColor: 'text-orange-600',
      inactiveColor: 'text-gray-500',
      badge: unreadNotifications
    },
    { 
      id: 'settings', 
      label: 'Pengaturan', 
      icon: Settings, 
      activeColor: 'text-gray-600',
      inactiveColor: 'text-gray-500'
    }
  ];

  const roleIcon = user?.role === 'admin' ? Shield : User;
  const RoleIcon = roleIcon;

  const handleNavClick = (itemId: string) => {
    if (itemId === 'notifications') {
      setShowNotifications(true);
    } else {
      onPageChange(itemId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 flex flex-col">
      {/* Top Header - Responsive */}
      <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 shadow-xl sticky top-0 z-40">
        <div className="h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"></div>
        
        <div className="px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo Section - Responsive */}
            <div className="flex items-center">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity blur-lg"></div>
                <img 
                  src="/logo.png" 
                  alt="PARA Logo" 
                  className="relative w-8 h-8 sm:w-10 sm:h-10 drop-shadow-lg"
                />
              </div>
              <div className="ml-2 sm:ml-3">
                <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent drop-shadow-sm">
                  PARA
                </span>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <span className="text-xs sm:text-sm text-blue-100 font-medium">
                    Portal Karyawan
                  </span>
                  <RoleIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-400" />
                </div>
              </div>
            </div>
            
            {/* User Menu - Responsive */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 sm:space-x-3 p-2 rounded-xl hover:bg-white/10 transition-all duration-200"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-xs sm:text-sm font-bold text-white">
                    {user?.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-semibold text-white">{user?.name}</div>
                  <div className="text-xs text-blue-200 capitalize">{user?.role === 'admin' ? 'Administrator' : 'Karyawan'}</div>
                </div>
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-blue-200" />
              </button>

              {/* User Dropdown - Responsive */}
              {showUserMenu && (
                <div className="absolute right-0 mt-3 w-48 sm:w-56 bg-white rounded-2xl shadow-2xl border py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="text-sm font-semibold text-gray-900">{user?.name}</div>
                    <div className="text-xs text-gray-500">{user?.email}</div>
                  </div>
                  <button
                    onClick={() => {
                      onPageChange('settings');
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    Pengaturan Profil
                  </button>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Keluar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Responsive */}
      <main className="flex-1 overflow-y-auto pb-20 sm:pb-24">
        <div className="p-3 sm:p-4 max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Bottom Navigation - Fully Responsive */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-2xl z-40">
        <div className="px-2 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center justify-around max-w-md mx-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              const isMainButton = item.isMain;
              
              if (isMainButton) {
                // Main Quick Check Button - Responsive Size
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className="relative group flex flex-col items-center"
                  >
                    {/* Glow Effect */}
                    <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-20 group-hover:opacity-40 blur-lg transition-opacity"></div>
                    
                    {/* Main Button - Responsive */}
                    <div className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 group-active:scale-95 shadow-xl ${
                      isActive 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                        : 'bg-gradient-to-r from-green-400 to-emerald-500'
                    }`}>
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white drop-shadow-sm" />
                      
                      {/* Pulse Ring for Active State */}
                      {isActive && (
                        <div className="absolute inset-0 rounded-full border-4 border-green-300 animate-ping opacity-30"></div>
                      )}
                    </div>
                    
                    {/* Label - Responsive */}
                    <span className={`text-xs font-bold mt-1 ${
                      isActive ? 'text-green-600' : 'text-gray-600'
                    }`}>
                      {item.label}
                    </span>
                  </button>
                );
              }
              
              // Regular Navigation Items - Responsive
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="relative flex flex-col items-center py-1 sm:py-2 px-2 sm:px-3 group transition-all duration-200"
                >
                  {/* Icon Container - Responsive */}
                  <div className={`relative p-2 sm:p-3 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-blue-100 shadow-md' 
                      : 'group-hover:bg-gray-100'
                  }`}>
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors ${
                      isActive ? item.activeColor : item.inactiveColor
                    }`} />
                    
                    {/* Badge for notifications - Responsive */}
                    {item.badge && item.badge > 0 && (
                      <div className="absolute -top-1 -right-1">
                        <span className="bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center font-bold">
                          {item.badge > 9 ? '9+' : item.badge}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Label - Responsive */}
                  <span className={`text-xs font-medium mt-1 transition-colors ${
                    isActive ? item.activeColor : item.inactiveColor
                  }`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Safe Area for iOS - Responsive */}
        <div className="h-safe-area-inset-bottom"></div>
      </nav>

      {/* Notification Center */}
      <NotificationCenter
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </div>
  );
};

export default Layout;