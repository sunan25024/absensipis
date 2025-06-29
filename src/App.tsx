import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import SplashScreen from './components/SplashScreen';
import LandingPage from './components/LandingPage';
import LoginForm from './components/LoginForm';
import LoadingScreen from './components/LoadingScreen';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ResponsiveEmployeeDashboard from './components/ResponsiveEmployeeDashboard';
import DashboardSelector from './components/DashboardSelector';
import AdvancedSchedule from './components/AdvancedSchedule';
import QuickCheckIn from './components/QuickCheckIn';
import SmartNotificationCenter from './components/SmartNotifications';
import AdvancedSettings from './components/AdvancedSettings';
import EmployeeAttendanceHistory from './components/EmployeeAttendanceHistory';
import EmployeeLeaveManagement from './components/EmployeeLeaveManagement';
import EmployeeProfile from './components/EmployeeProfile';
import AttendanceCamera from './components/AttendanceCamera';
import EmployeeManagement from './components/EmployeeManagement';
import LeaveManagement from './components/LeaveManagement';
import ReportsAnalytics from './components/ReportsAnalytics';
import Settings from './components/Settings';

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showSplash, setShowSplash] = useState(true);
  const [showLanding, setShowLanding] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // Show splash screen for first-time visitors
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setShowLanding(true);
      localStorage.setItem('hasVisited', 'true');
    } else {
      setShowSplash(false);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleGetStarted = () => {
    setShowLanding(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (showLanding) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  if (isLoading) {
    return <LoadingScreen message="Initializing PARA system..." />;
  }

  if (!user) {
    return <LoginForm />;
  }

  const renderCurrentPage = () => {
    if (user.role === 'admin') {
      switch (currentPage) {
        case 'dashboard':
          return <Dashboard />;
        case 'attendance':
          return <AttendanceCamera />;
        case 'employees':
          return <EmployeeManagement />;
        case 'leave':
          return <LeaveManagement />;
        case 'reports':
          return <ReportsAnalytics />;
        case 'settings':
          return <Settings />;
        default:
          return <Dashboard />;
      }
    } else {
      // Employee role - menggunakan ResponsiveEmployeeDashboard yang baru
      switch (currentPage) {
        case 'dashboard':
          return <ResponsiveEmployeeDashboard />;
        case 'history':
          return <AdvancedSchedule />;
        case 'attendance':
          return <QuickCheckIn />;
        case 'notifications':
          return <ResponsiveEmployeeDashboard />; // Will show notifications in dashboard
        case 'settings':
          return <AdvancedSettings />;
        case 'leave':
          return <EmployeeLeaveManagement />;
        case 'profile':
          return <EmployeeProfile />;
        default:
          return <ResponsiveEmployeeDashboard />;
      }
    }
  };

  return (
    <>
      <Layout 
        currentPage={currentPage} 
        onPageChange={(page) => {
          if (page === 'notifications') {
            setShowNotifications(true);
          } else {
            setCurrentPage(page);
          }
        }}
      >
        {renderCurrentPage()}
      </Layout>
      
      {/* Smart Notification Center */}
      <SmartNotificationCenter
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;