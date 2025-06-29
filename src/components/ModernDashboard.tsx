import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  Zap, 
  Heart, 
  Target, 
  Clock, 
  Calendar,
  Users,
  Award,
  Coffee,
  Brain,
  Activity,
  Sun,
  Moon,
  Star,
  CheckCircle2,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  Settings,
  Bell,
  Search,
  Filter,
  MoreHorizontal
} from 'lucide-react';

const ModernDashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isWorkingTime, setIsWorkingTime] = useState(false);
  const [workSession, setWorkSession] = useState({ start: null, duration: 0 });
  const [focusMode, setFocusMode] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Glassmorphism Card Component
  const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
    <div className={`backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl ${className}`}>
      {children}
    </div>
  );

  // Neumorphism Card Component
  const NeumorphCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
    <div className={`bg-gray-100 rounded-3xl shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] ${className}`}>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-yellow-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 p-6 space-y-8">
        {/* Header dengan Glassmorphism */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Selamat Pagi, John! ✨</h1>
                <p className="text-blue-200">Hari yang sempurna untuk produktivitas</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right text-white">
                <div className="text-3xl font-bold">{currentTime.toLocaleTimeString()}</div>
                <div className="text-sm text-blue-200">
                  {currentTime.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center hover:bg-white/30 transition-all">
                  <Bell className="w-6 h-6 text-white" />
                </button>
                <button className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center hover:bg-white/30 transition-all">
                  <Settings className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Status Kerja dengan Animasi */}
        <GlassCard className="p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 ${
                isWorkingTime 
                  ? 'bg-gradient-to-r from-green-400 to-emerald-500 animate-pulse' 
                  : 'bg-gradient-to-r from-gray-400 to-gray-500'
              }`}>
                {isWorkingTime ? (
                  <Pause className="w-10 h-10 text-white" />
                ) : (
                  <Play className="w-10 h-10 text-white" />
                )}
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  {isWorkingTime ? 'Sedang Bekerja' : 'Belum Mulai'}
                </h2>
                <p className="text-blue-200">
                  {isWorkingTime ? 'Sesi kerja dimulai 09:00' : 'Klik untuk memulai sesi kerja'}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-4xl font-bold text-white mb-2">7.5j</div>
              <div className="text-blue-200">Hari ini</div>
              <div className="w-32 h-2 bg-white/20 rounded-full mt-3">
                <div className="w-3/4 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Grid Kartu Metrik dengan Neumorphism */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Produktivitas', value: '94%', icon: Target, color: 'from-green-400 to-emerald-500', trend: '+5%' },
            { title: 'Fokus Score', value: '87', icon: Brain, color: 'from-blue-400 to-cyan-500', trend: '+12%' },
            { title: 'Energi Level', value: '82%', icon: Zap, color: 'from-yellow-400 to-orange-500', trend: '+3%' },
            { title: 'Wellness', value: '91%', icon: Heart, color: 'from-pink-400 to-rose-500', trend: '+8%' }
          ].map((metric, index) => {
            const Icon = metric.icon;
            return (
              <NeumorphCard key={index} className="p-6 hover:shadow-[25px_25px_75px_#bebebe,-25px_-25px_75px_#ffffff] transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-green-600 font-semibold">{metric.trend}</div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">{metric.value}</div>
                <div className="text-sm text-gray-600">{metric.title}</div>
              </NeumorphCard>
            );
          })}
        </div>

        {/* Floating Action Buttons */}
        <div className="fixed bottom-8 right-8 flex flex-col space-y-4">
          <button className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </button>
          <button className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform">
            <Calendar className="w-6 h-6 text-white" />
          </button>
          <button className="w-14 h-14 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform">
            <Coffee className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Timeline Aktivitas */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Timeline Hari Ini</h3>
            <button className="text-blue-200 hover:text-white transition-colors">
              <MoreHorizontal className="w-6 h-6" />
            </button>
          </div>
          
          <div className="space-y-4">
            {[
              { time: '09:00', activity: 'Check In', status: 'completed', color: 'green' },
              { time: '10:30', activity: 'Meeting Tim', status: 'current', color: 'blue' },
              { time: '12:00', activity: 'Istirahat', status: 'upcoming', color: 'yellow' },
              { time: '14:00', activity: 'Deep Work', status: 'upcoming', color: 'purple' }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className={`w-4 h-4 rounded-full ${
                  item.status === 'completed' ? 'bg-green-400' :
                  item.status === 'current' ? 'bg-blue-400 animate-pulse' :
                  'bg-gray-400'
                }`}></div>
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">{item.activity}</div>
                    <div className="text-blue-200 text-sm">{item.time}</div>
                  </div>
                  {item.status === 'current' && (
                    <div className="px-3 py-1 bg-blue-500/30 rounded-full text-blue-200 text-xs">
                      Sedang Berlangsung
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* AI Insights dengan Animasi */}
        <GlassCard className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center animate-pulse">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">AI Insights</h3>
              <p className="text-blue-200">Rekomendasi personal untuk Anda</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
              <div className="flex items-center space-x-2 mb-3">
                <Target className="w-5 h-5 text-green-400" />
                <span className="text-white font-semibold">Waktu Optimal</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">15:00</div>
              <p className="text-blue-200 text-sm">Puncak produktivitas Anda</p>
            </div>
            
            <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
              <div className="flex items-center space-x-2 mb-3">
                <Coffee className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-semibold">Break Time</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">14:30</div>
              <p className="text-blue-200 text-sm">Waktu istirahat ideal</p>
            </div>
            
            <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
              <div className="flex items-center space-x-2 mb-3">
                <Heart className="w-5 h-5 text-pink-400" />
                <span className="text-white font-semibold">Wellness</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">Baik</div>
              <p className="text-blue-200 text-sm">Kondisi kesehatan optimal</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default ModernDashboard;