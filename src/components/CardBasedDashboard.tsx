import React, { useState } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  Clock, 
  Target, 
  Heart, 
  Zap,
  Calendar,
  Users,
  Award,
  Coffee,
  Brain,
  Activity,
  ChevronRight,
  Plus,
  MoreVertical,
  Play,
  Pause,
  RotateCcw,
  Star,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

const CardBasedDashboard: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  // Card Component dengan Hover Effects
  const InteractiveCard: React.FC<{ 
    children: React.ReactNode; 
    className?: string; 
    expandable?: boolean;
    cardId?: string;
  }> = ({ children, className = "", expandable = false, cardId }) => (
    <div 
      className={`bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 ${className} ${
        expandable ? 'cursor-pointer' : ''
      }`}
      onClick={() => expandable && cardId && setExpandedCard(expandedCard === cardId ? null : cardId)}
    >
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-6">
      {/* Header Card */}
      <InteractiveCard className="p-8 mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Halo, John! 👋</h1>
              <p className="text-blue-100 text-lg">Siap untuk hari yang produktif?</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-5xl font-bold mb-2">09:47</div>
            <div className="text-blue-200">Rabu, 19 Desember</div>
          </div>
        </div>
      </InteractiveCard>

      {/* Quick Actions Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <InteractiveCard className="p-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Absen Cepat</h3>
              <p className="text-green-100">Gunakan wajah atau suara</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>
          </div>
          <button className="w-full mt-4 bg-white/20 hover:bg-white/30 rounded-2xl py-3 font-semibold transition-colors">
            Mulai Absen
          </button>
        </InteractiveCard>

        <InteractiveCard className="p-6 bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Jadwal Hari Ini</h3>
              <p className="text-blue-100">5 acara terjadwal</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <Calendar className="w-8 h-8" />
            </div>
          </div>
          <button className="w-full mt-4 bg-white/20 hover:bg-white/30 rounded-2xl py-3 font-semibold transition-colors">
            Lihat Jadwal
          </button>
        </InteractiveCard>

        <InteractiveCard className="p-6 bg-gradient-to-br from-purple-500 to-pink-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">AI Insights</h3>
              <p className="text-purple-100">Rekomendasi personal</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <Brain className="w-8 h-8" />
            </div>
          </div>
          <button className="w-full mt-4 bg-white/20 hover:bg-white/30 rounded-2xl py-3 font-semibold transition-colors">
            Lihat Insights
          </button>
        </InteractiveCard>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { 
            title: 'Produktivitas', 
            value: '94%', 
            change: '+5%', 
            icon: Target, 
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            borderColor: 'border-green-200'
          },
          { 
            title: 'Fokus Score', 
            value: '87/100', 
            change: '+12', 
            icon: Brain, 
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200'
          },
          { 
            title: 'Energi Level', 
            value: '82%', 
            change: '+3%', 
            icon: Zap, 
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-50',
            borderColor: 'border-yellow-200'
          },
          { 
            title: 'Wellness', 
            value: '91%', 
            change: '+8%', 
            icon: Heart, 
            color: 'text-pink-600',
            bgColor: 'bg-pink-50',
            borderColor: 'border-pink-200'
          }
        ].map((metric, index) => {
          const Icon = metric.icon;
          return (
            <InteractiveCard key={index} className={`p-6 border-2 ${metric.borderColor} ${metric.bgColor}`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 ${metric.bgColor} rounded-2xl flex items-center justify-center border ${metric.borderColor}`}>
                  <Icon className={`w-7 h-7 ${metric.color}`} />
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-semibold text-green-600">{metric.change}</span>
                  </div>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</div>
              <div className="text-gray-600 font-medium">{metric.title}</div>
            </InteractiveCard>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Timeline Card */}
        <InteractiveCard className="lg:col-span-2 p-8" expandable cardId="timeline">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Timeline Hari Ini</h3>
            <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <MoreVertical className="w-6 h-6 text-gray-500" />
            </button>
          </div>
          
          <div className="space-y-6">
            {[
              { time: '09:00', activity: 'Check In', status: 'completed', color: 'green', icon: CheckCircle },
              { time: '10:30', activity: 'Meeting Tim', status: 'current', color: 'blue', icon: Users },
              { time: '12:00', activity: 'Istirahat Makan Siang', status: 'upcoming', color: 'orange', icon: Coffee },
              { time: '14:00', activity: 'Deep Work Session', status: 'upcoming', color: 'purple', icon: Brain },
              { time: '17:00', activity: 'Check Out', status: 'upcoming', color: 'gray', icon: Clock }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    item.status === 'completed' ? 'bg-green-100 text-green-600' :
                    item.status === 'current' ? 'bg-blue-100 text-blue-600' :
                    'bg-gray-100 text-gray-500'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{item.activity}</div>
                    <div className="text-sm text-gray-500">{item.time}</div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    item.status === 'completed' ? 'bg-green-100 text-green-800' :
                    item.status === 'current' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {item.status === 'completed' ? 'Selesai' :
                     item.status === 'current' ? 'Berlangsung' : 'Mendatang'}
                  </div>
                </div>
              );
            })}
          </div>
        </InteractiveCard>

        {/* Side Cards */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <InteractiveCard className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Statistik Cepat</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Jam Kerja Hari Ini</span>
                <span className="font-bold text-gray-900">7.5j</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Streak Absensi</span>
                <span className="font-bold text-green-600">15 hari</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Poin Minggu Ini</span>
                <span className="font-bold text-blue-600">2,450</span>
              </div>
            </div>
          </InteractiveCard>

          {/* Achievement Card */}
          <InteractiveCard className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-bold text-yellow-800">Achievement Unlocked!</h3>
                <p className="text-sm text-yellow-600">Perfect Week</p>
              </div>
            </div>
            <p className="text-sm text-yellow-700">
              Anda telah absen tepat waktu selama seminggu penuh! 🎉
            </p>
          </InteractiveCard>

          {/* Team Activity */}
          <InteractiveCard className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Aktivitas Tim</h3>
            <div className="space-y-3">
              {[
                { name: 'Sarah', action: 'baru saja check in', time: '2m', avatar: '👩' },
                { name: 'Mike', action: 'menyelesaikan task', time: '15m', avatar: '👨' },
                { name: 'Lisa', action: 'mulai meeting', time: '30m', avatar: '👩‍💼' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm">
                    {activity.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      <span className="font-semibold">{activity.name}</span> {activity.action}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time} yang lalu</p>
                  </div>
                </div>
              ))}
            </div>
          </InteractiveCard>
        </div>
      </div>
    </div>
  );
};

export default CardBasedDashboard;