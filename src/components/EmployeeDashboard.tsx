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
  MoreHorizontal
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const EmployeeDashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
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

  // Menu items untuk quick access - sesuai permintaan
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
    // Handle navigation atau action sesuai menu
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

  return (
    <div className="space-y-6">
      {/* CARD UTAMA BESAR - Sesuai Permintaan */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl"></div>
        
        <div className="relative z-10">
          {/* Header Section - Ucapan, Jam, dan Status */}
          <div className="flex items-start justify-between mb-8">
            {/* Bagian Kiri: Profile + Ucapan */}
            <div className="flex items-center space-x-6">
              {/* Profile Photo dengan Status Online */}
              <div className="relative">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-4 border-white/30 shadow-xl overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Status Online Indicator */}
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
              
              {/* Ucapan dan Motivasi */}
              <div>
                <h1 className="text-4xl font-bold mb-3">
                  Selamat Pagi, John! 👋
                </h1>
                <p className="text-blue-100 text-lg mb-4 max-w-md leading-relaxed">
                  {currentQuote}
                </p>
                
                {/* Status Icons Row */}
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <Wifi className={`w-4 h-4 ${isOnline ? 'text-green-300' : 'text-red-300'}`} />
                    <span className="font-medium">{isOnline ? 'Online' : 'Offline'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Battery className="w-4 h-4 text-green-300" />
                    <span className="font-medium">{batteryLevel}%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-blue-300" />
                    <span className="font-medium">Kantor Pusat</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Smartphone className="w-4 h-4 text-purple-300" />
                    <span className="font-medium">Perangkat Resmi</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bagian Kanan: Jam dan Tanggal */}
            <div className="text-right">
              <div className="text-6xl font-bold mb-2 drop-shadow-lg">
                {currentTime.toLocaleTimeString('id-ID', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
              <div className="text-blue-200 text-xl mb-2">
                {currentTime.toLocaleDateString('id-ID', { 
                  weekday: 'long', 
                  day: 'numeric', 
                  month: 'long',
                  year: 'numeric'
                })}
              </div>
              <div className="flex items-center justify-end space-x-2 mt-3">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-sm text-blue-200 font-medium">
                  Hari ke-{employeeStats.currentStreak} streak!
                </span>
              </div>
            </div>
          </div>

          {/* Menu Icons Section - Di Dalam Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-inner">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold flex items-center">
                <Zap className="w-7 h-7 mr-3 text-yellow-400" />
                Menu Cepat
              </h3>
              <button className="text-white/80 hover:text-white transition-colors">
                <PlusCircle className="w-6 h-6" />
              </button>
            </div>
            
            {/* Grid Menu Icons */}
            <div className="grid grid-cols-4 md:grid-cols-8 gap-6">
              {quickMenuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    className="group flex flex-col items-center p-4 rounded-3xl bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-white/20 hover:border-white/40 hover:shadow-xl"
                  >
                    {/* Icon Container */}
                    <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-3xl flex items-center justify-center mb-4 shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110`}>
                      <Icon className="w-8 h-8 text-white drop-shadow-sm" />
                    </div>
                    
                    {/* Label */}
                    <span className="text-sm font-bold text-white text-center leading-tight mb-1">
                      {item.label}
                    </span>
                    
                    {/* Description */}
                    <span className="text-xs text-blue-200 text-center leading-tight opacity-80">
                      {item.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Status Kerja Hari Ini - Di Bawah Menu */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold mb-1">09:00</div>
              <div className="text-blue-200 text-sm">Check In Berhasil</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 border-white/30">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold mb-1">7.5j</div>
              <div className="text-blue-200 text-sm">Jam Kerja Hari Ini</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold mb-1">2,450</div>
              <div className="text-blue-200 text-sm">Poin Minggu Ini</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards - Di Bawah Card Utama */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.bg} p-3 rounded-xl`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-600 mb-2">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</p>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600 font-semibold">{stat.change}</span>
                  <span className="text-sm text-gray-500">bulan ini</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Performance */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Performa Minggu Ini</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyAttendance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Bar dataKey="hours" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Attendance Trend */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Tren Kehadiran 6 Bulan</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis domain={[90, 100]} stroke="#6b7280" />
              <Tooltip formatter={(value) => [`${value}%`, 'Tingkat Kehadiran']} />
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

      {/* Today's Schedule */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Jadwal Hari Ini</h3>
          <p className="text-sm text-gray-600 mt-1">
            {currentTime.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {todaySchedule.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-200 ${
                  item.status === 'completed' ? 'bg-green-50 border border-green-200' :
                  item.status === 'upcoming' ? 'bg-blue-50 border border-blue-200' :
                  'bg-gray-50 border border-gray-200'
                }`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    item.status === 'completed' ? 'bg-green-500' :
                    item.status === 'upcoming' ? 'bg-blue-500' :
                    'bg-gray-400'
                  }`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{item.activity}</div>
                    <div className="text-sm text-gray-500">{item.time}</div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
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

export default EmployeeDashboard;