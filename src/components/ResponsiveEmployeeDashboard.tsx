import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Calendar, 
  CheckCircle, 
  TrendingUp, 
  Award, 
  Target, 
  User, 
  MapPin, 
  Phone, 
  Activity, 
  FileText, 
  Coffee,
  Wifi,
  Battery,
  Smartphone,
  Star,
  CreditCard,
  Plane,
  Receipt,
  ClipboardList,
  Users,
  Settings,
  Bell,
  Heart,
  Zap,
  Gift,
  BookOpen,
  Car,
  Home,
  Shield,
  Camera,
  MessageSquare,
  Briefcase,
  DollarSign,
  PlusCircle,
  MoreHorizontal,
  Menu,
  X
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from 'recharts';

const ResponsiveEmployeeDashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [isOnline, setIsOnline] = useState(true);
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('landscape');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Detect device type and orientation
  useEffect(() => {
    const detectDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      if (width < 768) {
        setDeviceType('mobile');
      } else if (width < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
      
      setOrientation(width > height ? 'landscape' : 'portrait');
    };

    detectDevice();
    window.addEventListener('resize', detectDevice);
    window.addEventListener('orientationchange', detectDevice);
    
    return () => {
      window.removeEventListener('resize', detectDevice);
      window.removeEventListener('orientationchange', detectDevice);
    };
  }, []);

  // Motivational quotes
  const motivationalQuotes = [
    "Hari ini adalah kesempatan baru untuk berprestasi! 🌟",
    "Setiap langkah kecil membawa Anda lebih dekat ke tujuan! 💪",
    "Produktivitas dimulai dari semangat pagi yang positif! ☀️",
    "Jadilah versi terbaik dari diri Anda hari ini! ✨",
    "Kesuksesan adalah hasil dari konsistensi dan dedikasi! 🎯"
  ];

  const [currentQuote] = useState(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);

  // Menu items - responsive grid
  const quickMenuItems = [
    { 
      id: 'paylater', 
      label: 'PayLater', 
      icon: CreditCard, 
      color: 'from-blue-500 to-blue-600', 
      bgColor: 'bg-blue-50',
      description: 'Pinjaman cepat'
    },
    { 
      id: 'cuti', 
      label: 'Cuti', 
      icon: Plane, 
      color: 'from-green-500 to-green-600', 
      bgColor: 'bg-green-50',
      description: 'Pengajuan cuti'
    },
    { 
      id: 'reimburse', 
      label: 'Reimburse', 
      icon: Receipt, 
      color: 'from-purple-500 to-purple-600', 
      bgColor: 'bg-purple-50',
      description: 'Klaim penggantian'
    },
    { 
      id: 'laporan', 
      label: 'Laporan', 
      icon: ClipboardList, 
      color: 'from-orange-500 to-orange-600', 
      bgColor: 'bg-orange-50',
      description: 'Laporan kegiatan'
    },
    { 
      id: 'tim', 
      label: 'Tim', 
      icon: Users, 
      color: 'from-pink-500 to-pink-600', 
      bgColor: 'bg-pink-50',
      description: 'Kolaborasi tim'
    },
    { 
      id: 'training', 
      label: 'Training', 
      icon: BookOpen, 
      color: 'from-indigo-500 to-indigo-600', 
      bgColor: 'bg-indigo-50',
      description: 'Pelatihan & kursus'
    },
    { 
      id: 'transport', 
      label: 'Transport', 
      icon: Car, 
      color: 'from-yellow-500 to-yellow-600', 
      bgColor: 'bg-yellow-50',
      description: 'Transportasi'
    },
    { 
      id: 'lainnya', 
      label: 'Lainnya', 
      icon: MoreHorizontal, 
      color: 'from-gray-500 to-gray-600', 
      bgColor: 'bg-gray-50',
      description: 'Menu lainnya'
    }
  ];

  const employeeStats = {
    totalWorkingDays: 22,
    presentDays: 20,
    lateDays: 2,
    absentDays: 0,
    avgWorkingHours: 8.2,
    overtimeHours: 5.5,
    attendanceRate: 95.5,
    currentStreak: 15
  };

  const weeklyAttendance = [
    { day: 'Sen', hours: 8.5, status: 'present' },
    { day: 'Sel', hours: 8.2, status: 'present' },
    { day: 'Rab', hours: 8.0, status: 'late' },
    { day: 'Kam', hours: 8.7, status: 'present' },
    { day: 'Jum', hours: 8.3, status: 'present' },
  ];

  const monthlyTrend = [
    { month: 'Jul', rate: 96 },
    { month: 'Agu', rate: 94 },
    { month: 'Sep', rate: 98 },
    { month: 'Okt', rate: 95 },
    { month: 'Nov', rate: 97 },
    { month: 'Des', rate: 95 },
  ];

  const todaySchedule = [
    { time: '09:00', activity: 'Check In', status: 'completed', icon: CheckCircle },
    { time: '10:30', activity: 'Meeting Tim', status: 'upcoming', icon: User },
    { time: '12:00', activity: 'Istirahat Makan Siang', status: 'upcoming', icon: Coffee },
    { time: '14:00', activity: 'Review Proyek', status: 'upcoming', icon: FileText },
    { time: '17:00', activity: 'Check Out', status: 'pending', icon: Clock },
  ];

  const statCards = [
    {
      title: 'Tingkat Kehadiran',
      value: `${employeeStats.attendanceRate}%`,
      icon: Target,
      color: 'text-green-600',
      bg: 'bg-green-50',
      change: '+2.1%'
    },
    {
      title: 'Hari Hadir',
      value: employeeStats.presentDays,
      icon: CheckCircle,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      change: '+1 hari'
    },
    {
      title: 'Jam Kerja',
      value: `${employeeStats.avgWorkingHours}j`,
      icon: Clock,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      change: '+0.3j'
    },
    {
      title: 'Streak Saat Ini',
      value: `${employeeStats.currentStreak} hari`,
      icon: Award,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
      change: '+3 hari'
    }
  ];

  const handleMenuClick = (menuId: string) => {
    console.log(`Menu clicked: ${menuId}`);
    switch (menuId) {
      case 'paylater':
        alert('Fitur PayLater akan segera hadir!');
        break;
      case 'cuti':
        alert('Navigasi ke halaman pengajuan cuti');
        break;
      case 'reimburse':
        alert('Navigasi ke halaman reimbursement');
        break;
      case 'laporan':
        alert('Navigasi ke halaman laporan kegiatan');
        break;
      default:
        alert(`Membuka ${menuId}`);
    }
  };

  // Responsive grid classes
  const getGridClasses = () => {
    if (deviceType === 'mobile') {
      return orientation === 'portrait' 
        ? 'grid-cols-2 gap-3' 
        : 'grid-cols-4 gap-2';
    } else if (deviceType === 'tablet') {
      return orientation === 'portrait' 
        ? 'grid-cols-3 gap-4' 
        : 'grid-cols-4 gap-4';
    } else {
      return 'grid-cols-4 md:grid-cols-8 gap-6';
    }
  };

  // Responsive padding and spacing
  const getContainerClasses = () => {
    if (deviceType === 'mobile') {
      return 'p-3 space-y-4';
    } else if (deviceType === 'tablet') {
      return 'p-4 space-y-5';
    } else {
      return 'p-6 space-y-6';
    }
  };

  // Responsive card size
  const getMainCardClasses = () => {
    if (deviceType === 'mobile') {
      return orientation === 'portrait' 
        ? 'p-4 rounded-2xl' 
        : 'p-3 rounded-xl';
    } else if (deviceType === 'tablet') {
      return 'p-6 rounded-3xl';
    } else {
      return 'p-8 rounded-3xl';
    }
  };

  // Responsive text sizes
  const getHeaderTextClasses = () => {
    if (deviceType === 'mobile') {
      return orientation === 'portrait' 
        ? 'text-2xl' 
        : 'text-xl';
    } else if (deviceType === 'tablet') {
      return 'text-3xl';
    } else {
      return 'text-4xl';
    }
  };

  const getTimeTextClasses = () => {
    if (deviceType === 'mobile') {
      return orientation === 'portrait' 
        ? 'text-3xl' 
        : 'text-2xl';
    } else if (deviceType === 'tablet') {
      return 'text-4xl';
    } else {
      return 'text-6xl';
    }
  };

  return (
    <div className={getContainerClasses()}>
      {/* CARD UTAMA RESPONSIF */}
      <div className={`bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 shadow-2xl text-white relative overflow-hidden ${getMainCardClasses()}`}>
        {/* Background Decorative Elements - Responsive */}
        <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-white/10 rounded-full -translate-y-16 md:-translate-y-32 translate-x-16 md:translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 md:w-48 md:h-48 bg-white/5 rounded-full translate-y-12 md:translate-y-24 -translate-x-12 md:-translate-x-24"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 md:w-32 md:h-32 bg-yellow-400/20 rounded-full blur-xl"></div>
        
        <div className="relative z-10">
          {/* Header Section - Responsive Layout */}
          <div className={`flex ${deviceType === 'mobile' && orientation === 'portrait' ? 'flex-col space-y-4' : 'items-start justify-between'} mb-6 md:mb-8`}>
            {/* Bagian Kiri: Profile + Ucapan */}
            <div className="flex items-center space-x-3 md:space-x-6">
              {/* Profile Photo dengan Status Online - Responsive Size */}
              <div className="relative">
                <div className={`${deviceType === 'mobile' ? 'w-16 h-16' : 'w-20 h-20 md:w-24 md:h-24'} bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 md:border-4 border-white/30 shadow-xl overflow-hidden`}>
                  <img 
                    src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Status Online Indicator - Responsive */}
                <div className={`absolute -bottom-1 -right-1 ${deviceType === 'mobile' ? 'w-5 h-5' : 'w-6 h-6 md:w-7 md:h-7'} bg-green-500 rounded-full border-2 md:border-4 border-white flex items-center justify-center shadow-lg`}>
                  <div className={`${deviceType === 'mobile' ? 'w-2 h-2' : 'w-2.5 h-2.5 md:w-3 md:h-3'} bg-white rounded-full animate-pulse`}></div>
                </div>
              </div>
              
              {/* Ucapan dan Motivasi - Responsive Text */}
              <div className="flex-1">
                <h1 className={`${getHeaderTextClasses()} font-bold mb-2 md:mb-3`}>
                  Selamat Pagi, John! 👋
                </h1>
                <p className={`text-blue-100 ${deviceType === 'mobile' ? 'text-sm' : 'text-base md:text-lg'} mb-2 md:mb-4 leading-relaxed`}>
                  {deviceType === 'mobile' && orientation === 'portrait' 
                    ? "Siap untuk hari produktif?" 
                    : currentQuote}
                </p>
                
                {/* Status Icons Row - Responsive */}
                <div className={`flex items-center ${deviceType === 'mobile' ? 'space-x-3 text-xs' : 'space-x-4 md:space-x-6 text-sm'}`}>
                  <div className="flex items-center space-x-1">
                    <Wifi className={`${deviceType === 'mobile' ? 'w-3 h-3' : 'w-4 h-4'} ${isOnline ? 'text-green-300' : 'text-red-300'}`} />
                    <span className="font-medium">{isOnline ? 'Online' : 'Offline'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Battery className={`${deviceType === 'mobile' ? 'w-3 h-3' : 'w-4 h-4'} text-green-300`} />
                    <span className="font-medium">{batteryLevel}%</span>
                  </div>
                  {deviceType !== 'mobile' && (
                    <>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4 text-blue-300" />
                        <span className="font-medium">Kantor Pusat</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Smartphone className="w-4 h-4 text-purple-300" />
                        <span className="font-medium">Perangkat Resmi</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {/* Bagian Kanan: Jam dan Tanggal - Responsive */}
            <div className={`${deviceType === 'mobile' && orientation === 'portrait' ? 'text-center' : 'text-right'}`}>
              <div className={`${getTimeTextClasses()} font-bold mb-1 md:mb-2 drop-shadow-lg`}>
                {currentTime.toLocaleTimeString('id-ID', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
              <div className={`text-blue-200 ${deviceType === 'mobile' ? 'text-sm' : 'text-lg md:text-xl'} mb-1 md:mb-2`}>
                {currentTime.toLocaleDateString('id-ID', { 
                  weekday: deviceType === 'mobile' ? 'short' : 'long', 
                  day: 'numeric', 
                  month: deviceType === 'mobile' ? 'short' : 'long',
                  year: deviceType === 'desktop' ? 'numeric' : undefined
                })}
              </div>
              <div className="flex items-center justify-end space-x-2 mt-2 md:mt-3">
                <Star className={`${deviceType === 'mobile' ? 'w-4 h-4' : 'w-5 h-5'} text-yellow-400`} />
                <span className={`${deviceType === 'mobile' ? 'text-xs' : 'text-sm'} text-blue-200 font-medium`}>
                  Hari ke-{employeeStats.currentStreak} streak!
                </span>
              </div>
            </div>
          </div>

          {/* Menu Icons Section - Responsive Grid */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 border border-white/20 shadow-inner">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h3 className={`${deviceType === 'mobile' ? 'text-lg' : 'text-xl md:text-2xl'} font-bold flex items-center`}>
                <Zap className={`${deviceType === 'mobile' ? 'w-5 h-5' : 'w-6 h-6 md:w-7 md:h-7'} mr-2 md:mr-3 text-yellow-400`} />
                Menu Cepat
              </h3>
              {deviceType !== 'mobile' && (
                <button className="text-white/80 hover:text-white transition-colors">
                  <PlusCircle className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              )}
            </div>
            
            {/* Grid Menu Icons - Fully Responsive */}
            <div className={`grid ${getGridClasses()}`}>
              {quickMenuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    className={`group flex flex-col items-center ${deviceType === 'mobile' ? 'p-2' : 'p-3 md:p-4'} rounded-2xl md:rounded-3xl bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-white/20 hover:border-white/40 hover:shadow-xl`}
                  >
                    {/* Icon Container - Responsive Size */}
                    <div className={`${deviceType === 'mobile' ? 'w-10 h-10' : 'w-12 h-12 md:w-16 md:h-16'} bg-gradient-to-r ${item.color} rounded-2xl md:rounded-3xl flex items-center justify-center mb-2 md:mb-4 shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110`}>
                      <Icon className={`${deviceType === 'mobile' ? 'w-5 h-5' : 'w-6 h-6 md:w-8 md:h-8'} text-white drop-shadow-sm`} />
                    </div>
                    
                    {/* Label - Responsive Text */}
                    <span className={`${deviceType === 'mobile' ? 'text-xs' : 'text-sm'} font-bold text-white text-center leading-tight mb-1`}>
                      {item.label}
                    </span>
                    
                    {/* Description - Hide on mobile portrait */}
                    {!(deviceType === 'mobile' && orientation === 'portrait') && (
                      <span className={`${deviceType === 'mobile' ? 'text-xs' : 'text-xs'} text-blue-200 text-center leading-tight opacity-80`}>
                        {item.description}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Status Kerja Hari Ini - Responsive Grid */}
          <div className={`mt-6 md:mt-8 grid grid-cols-1 ${deviceType === 'mobile' ? 'gap-3' : 'md:grid-cols-3 gap-4 md:gap-6'}`}>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/20 text-center">
              <div className={`${deviceType === 'mobile' ? 'w-12 h-12' : 'w-14 h-14 md:w-16 md:h-16'} bg-green-500 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg`}>
                <CheckCircle className={`${deviceType === 'mobile' ? 'w-6 h-6' : 'w-7 h-7 md:w-8 md:h-8'} text-white`} />
              </div>
              <div className={`${deviceType === 'mobile' ? 'text-xl' : 'text-2xl md:text-3xl'} font-bold mb-1`}>09:00</div>
              <div className={`text-blue-200 ${deviceType === 'mobile' ? 'text-xs' : 'text-sm'}`}>Check In Berhasil</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/20 text-center">
              <div className={`${deviceType === 'mobile' ? 'w-12 h-12' : 'w-14 h-14 md:w-16 md:h-16'} bg-white/20 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 border-2 border-white/30`}>
                <Clock className={`${deviceType === 'mobile' ? 'w-6 h-6' : 'w-7 h-7 md:w-8 md:h-8'} text-white`} />
              </div>
              <div className={`${deviceType === 'mobile' ? 'text-xl' : 'text-2xl md:text-3xl'} font-bold mb-1`}>7.5j</div>
              <div className={`text-blue-200 ${deviceType === 'mobile' ? 'text-xs' : 'text-sm'}`}>Jam Kerja Hari Ini</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/20 text-center">
              <div className={`${deviceType === 'mobile' ? 'w-12 h-12' : 'w-14 h-14 md:w-16 md:h-16'} bg-yellow-500 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg`}>
                <Award className={`${deviceType === 'mobile' ? 'w-6 h-6' : 'w-7 h-7 md:w-8 md:h-8'} text-white`} />
              </div>
              <div className={`${deviceType === 'mobile' ? 'text-xl' : 'text-2xl md:text-3xl'} font-bold mb-1`}>2,450</div>
              <div className={`text-blue-200 ${deviceType === 'mobile' ? 'text-xs' : 'text-sm'}`}>Poin Minggu Ini</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards - Responsive Grid */}
      <div className={`grid ${deviceType === 'mobile' ? 'grid-cols-2 gap-3' : 'grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'}`}>
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`bg-white rounded-xl md:rounded-2xl shadow-lg ${deviceType === 'mobile' ? 'p-3' : 'p-4 md:p-6'} border border-gray-100 hover:shadow-xl transition-all duration-300`}>
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <div className={`${stat.bg} ${deviceType === 'mobile' ? 'p-2' : 'p-3'} rounded-lg md:rounded-xl`}>
                  <Icon className={`${deviceType === 'mobile' ? 'w-4 h-4' : 'w-5 h-5 md:w-6 md:h-6'} ${stat.color}`} />
                </div>
              </div>
              <div>
                <p className={`${deviceType === 'mobile' ? 'text-xs' : 'text-xs'} font-semibold text-gray-600 mb-1 md:mb-2`}>{stat.title}</p>
                <p className={`${deviceType === 'mobile' ? 'text-lg' : 'text-xl md:text-2xl'} font-bold text-gray-900 mb-1 md:mb-2`}>{stat.value}</p>
                <div className="flex items-center space-x-1 md:space-x-2">
                  <TrendingUp className={`${deviceType === 'mobile' ? 'w-3 h-3' : 'w-4 h-4'} text-green-500`} />
                  <span className={`${deviceType === 'mobile' ? 'text-xs' : 'text-sm'} text-green-600 font-semibold`}>{stat.change}</span>
                  <span className={`${deviceType === 'mobile' ? 'text-xs' : 'text-sm'} text-gray-500`}>bulan ini</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts - Responsive Layout */}
      <div className={`grid grid-cols-1 ${deviceType !== 'mobile' ? 'lg:grid-cols-2' : ''} gap-4 md:gap-6`}>
        {/* Weekly Performance */}
        <div className={`bg-white rounded-xl md:rounded-2xl shadow-lg ${deviceType === 'mobile' ? 'p-4' : 'p-6'} border border-gray-100`}>
          <h3 className={`${deviceType === 'mobile' ? 'text-base' : 'text-lg'} font-bold text-gray-900 mb-4 md:mb-6`}>Performa Minggu Ini</h3>
          <ResponsiveContainer width="100%" height={deviceType === 'mobile' ? 150 : 200}>
            <BarChart data={weeklyAttendance}>
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Bar dataKey="hours" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Attendance Trend */}
        <div className={`bg-white rounded-xl md:rounded-2xl shadow-lg ${deviceType === 'mobile' ? 'p-4' : 'p-6'} border border-gray-100`}>
          <h3 className={`${deviceType === 'mobile' ? 'text-base' : 'text-lg'} font-bold text-gray-900 mb-4 md:mb-6`}>Tren Kehadiran 6 Bulan</h3>
          <ResponsiveContainer width="100%" height={deviceType === 'mobile' ? 150 : 200}>
            <LineChart data={monthlyTrend}>
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis domain={[90, 100]} stroke="#6b7280" />
              <Line 
                type="monotone" 
                dataKey="rate" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Today's Schedule - Responsive */}
      <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-gray-100">
        <div className={`${deviceType === 'mobile' ? 'p-4' : 'p-6'} border-b border-gray-100`}>
          <h3 className={`${deviceType === 'mobile' ? 'text-base' : 'text-lg'} font-bold text-gray-900`}>Jadwal Hari Ini</h3>
          <p className={`${deviceType === 'mobile' ? 'text-xs' : 'text-sm'} text-gray-600 mt-1`}>
            {currentTime.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>
        <div className={`${deviceType === 'mobile' ? 'p-4' : 'p-6'}`}>
          <div className={`space-y-${deviceType === 'mobile' ? '3' : '4'}`}>
            {todaySchedule.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className={`flex items-center space-x-3 md:space-x-4 ${deviceType === 'mobile' ? 'p-3' : 'p-4'} rounded-xl md:rounded-2xl transition-all duration-200 ${
                  item.status === 'completed' ? 'bg-green-50 border border-green-200' :
                  item.status === 'upcoming' ? 'bg-blue-50 border border-blue-200' :
                  'bg-gray-50 border border-gray-200'
                }`}>
                  <div className={`${deviceType === 'mobile' ? 'w-8 h-8' : 'w-10 h-10 md:w-12 md:h-12'} rounded-full flex items-center justify-center ${
                    item.status === 'completed' ? 'bg-green-500' :
                    item.status === 'upcoming' ? 'bg-blue-500' :
                    'bg-gray-400'
                  }`}>
                    <Icon className={`${deviceType === 'mobile' ? 'w-4 h-4' : 'w-5 h-5 md:w-6 md:h-6'} text-white`} />
                  </div>
                  <div className="flex-1">
                    <div className={`font-semibold text-gray-900 ${deviceType === 'mobile' ? 'text-sm' : 'text-base'}`}>{item.activity}</div>
                    <div className={`${deviceType === 'mobile' ? 'text-xs' : 'text-sm'} text-gray-500`}>{item.time}</div>
                  </div>
                  <div className={`px-2 md:px-3 py-1 rounded-full ${deviceType === 'mobile' ? 'text-xs' : 'text-xs'} font-semibold ${
                    item.status === 'completed' ? 'bg-green-100 text-green-800' :
                    item.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {item.status === 'completed' ? 'Selesai' :
                     item.status === 'upcoming' ? 'Mendatang' : 'Menunggu'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveEmployeeDashboard;