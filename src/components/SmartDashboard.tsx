import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Target, 
  Trophy, 
  Zap, 
  TrendingUp, 
  Heart, 
  Clock, 
  MapPin,
  Wifi,
  Battery,
  Smartphone,
  Star,
  Award,
  Gift,
  Users,
  MessageCircle,
  Camera,
  Mic,
  CheckCircle2,
  Timer,
  Coffee,
  Focus,
  BarChart3,
  Calendar,
  Bell,
  Settings
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from 'recharts';

const SmartDashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mood, setMood] = useState<'😊' | '😐' | '😔' | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [focusMode, setFocusMode] = useState(false);
  const [voiceCommand, setVoiceCommand] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // AI Predictions Data
  const aiInsights = {
    predictedProductivity: 92,
    optimalBreakTime: '14:30',
    recommendedLeaveTime: '17:15',
    energyLevel: 78,
    stressLevel: 23
  };

  // Gamification Data
  const achievements = [
    { id: 1, name: 'Burung Pagi', icon: '🌅', unlocked: true, description: '5 hari masuk pagi' },
    { id: 2, name: 'Minggu Sempurna', icon: '⭐', unlocked: true, description: 'Tidak terlambat minggu ini' },
    { id: 3, name: 'Pemain Tim', icon: '🤝', unlocked: false, description: 'Bantu 10 rekan kerja' },
    { id: 4, name: 'Pejuang Kesehatan', icon: '💪', unlocked: false, description: 'Istirahat teratur' }
  ];

  const leaderboard = [
    { rank: 1, name: 'Anda', score: 2450, avatar: '👤' },
    { rank: 2, name: 'Sarah M.', score: 2380, avatar: '👩' },
    { rank: 3, name: 'Mike J.', score: 2320, avatar: '👨' },
    { rank: 4, name: 'Lisa K.', score: 2280, avatar: '👩‍💼' }
  ];

  // Productivity Data
  const productivityData = [
    { time: '09:00', focus: 85, energy: 90 },
    { time: '10:00', focus: 92, energy: 88 },
    { time: '11:00', focus: 88, energy: 85 },
    { time: '12:00', focus: 70, energy: 75 },
    { time: '13:00', focus: 60, energy: 80 },
    { time: '14:00', focus: 85, energy: 85 },
    { time: '15:00', focus: 90, energy: 82 },
    { time: '16:00', focus: 88, energy: 78 }
  ];

  const handleVoiceCommand = () => {
    setVoiceCommand(true);
    // Simulate voice recognition
    setTimeout(() => {
      setVoiceCommand(false);
      alert('Perintah suara: "Absen masuk" - Memproses...');
    }, 2000);
  };

  const handleMoodSelect = (selectedMood: '😊' | '😐' | '😔') => {
    setMood(selectedMood);
    // Save mood to analytics
  };

  return (
    <div className="space-y-6 pb-6">
      {/* Smart Header with Real-time Info */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Selamat Pagi, John! 🌟</h1>
              <p className="text-indigo-200">Siap untuk hari yang produktif?</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{currentTime.toLocaleTimeString()}</div>
              <div className="text-sm text-indigo-200">
                {currentTime.toLocaleDateString('id-ID', { weekday: 'long', month: 'short', day: 'numeric' })}
              </div>
            </div>
          </div>
          
          {/* System Status */}
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Wifi className={`w-4 h-4 ${isOnline ? 'text-green-300' : 'text-red-300'}`} />
              <span>{isOnline ? 'Online' : 'Offline'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Battery className="w-4 h-4 text-green-300" />
              <span>{batteryLevel}%</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4 text-blue-300" />
              <span>Kantor Pusat</span>
            </div>
            <div className="flex items-center space-x-1">
              <Smartphone className="w-4 h-4 text-purple-300" />
              <span>Perangkat Resmi</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights Panel */}
      <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Wawasan AI Cerdas</h2>
            <p className="text-sm text-gray-600">Rekomendasi personal untuk Anda</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
            <div className="flex items-center space-x-3 mb-3">
              <Target className="w-6 h-6 text-green-600" />
              <span className="font-semibold text-green-800">Prediksi Produktivitas</span>
            </div>
            <div className="text-2xl font-bold text-green-900 mb-1">{aiInsights.predictedProductivity}%</div>
            <p className="text-sm text-green-700">Puncak diperkirakan jam 15:00</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-200">
            <div className="flex items-center space-x-3 mb-3">
              <Coffee className="w-6 h-6 text-blue-600" />
              <span className="font-semibold text-blue-800">Waktu Istirahat Optimal</span>
            </div>
            <div className="text-2xl font-bold text-blue-900 mb-1">{aiInsights.optimalBreakTime}</div>
            <p className="text-sm text-blue-700">Waktu sempurna untuk istirahat</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-200">
            <div className="flex items-center space-x-3 mb-3">
              <Heart className="w-6 h-6 text-purple-600" />
              <span className="font-semibold text-purple-800">Skor Kesehatan</span>
            </div>
            <div className="text-2xl font-bold text-purple-900 mb-1">{aiInsights.energyLevel}/100</div>
            <p className="text-sm text-purple-700">Tingkat energi yang bagus!</p>
          </div>
        </div>
      </div>

      {/* Quick Actions with Voice Command */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button 
          onClick={handleVoiceCommand}
          className={`bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 group ${
            voiceCommand ? 'ring-4 ring-red-300 bg-red-50' : ''
          }`}
        >
          <div className="flex flex-col items-center text-center">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${
              voiceCommand 
                ? 'bg-gradient-to-r from-red-500 to-pink-600 animate-pulse' 
                : 'bg-gradient-to-r from-red-500 to-pink-600'
            }`}>
              <Mic className="w-8 h-8 text-white" />
            </div>
            <span className="text-sm font-bold text-gray-900">
              {voiceCommand ? 'Mendengarkan...' : 'Absen Suara'}
            </span>
          </div>
        </button>

        <button className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 group">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Camera className="w-8 h-8 text-white" />
            </div>
            <span className="text-sm font-bold text-gray-900">Absen Wajah</span>
          </div>
        </button>

        <button 
          onClick={() => setFocusMode(!focusMode)}
          className={`bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 group ${
            focusMode ? 'ring-4 ring-orange-300 bg-orange-50' : ''
          }`}
        >
          <div className="flex flex-col items-center text-center">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${
              focusMode 
                ? 'bg-gradient-to-r from-orange-500 to-red-600' 
                : 'bg-gradient-to-r from-orange-500 to-yellow-600'
            }`}>
              <Focus className="w-8 h-8 text-white" />
            </div>
            <span className="text-sm font-bold text-gray-900">
              {focusMode ? 'Mode Fokus AKTIF' : 'Mode Fokus'}
            </span>
          </div>
        </button>

        <button className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 group">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Timer className="w-8 h-8 text-white" />
            </div>
            <span className="text-sm font-bold text-gray-900">Pencatat Waktu</span>
          </div>
        </button>
      </div>

      {/* Mood Tracking */}
      <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Bagaimana perasaan Anda hari ini?</h3>
        <div className="flex items-center space-x-4">
          {['😊', '😐', '😔'].map((emoji) => (
            <button
              key={emoji}
              onClick={() => handleMoodSelect(emoji as any)}
              className={`w-16 h-16 rounded-2xl text-3xl transition-all duration-300 hover:scale-110 ${
                mood === emoji 
                  ? 'bg-blue-100 ring-4 ring-blue-300 shadow-lg' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
        {mood && (
          <p className="text-sm text-gray-600 mt-3">
            Terima kasih telah berbagi! Ini membantu kami memahami pola kesehatan Anda.
          </p>
        )}
      </div>

      {/* Productivity Chart */}
      <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Alur Produktivitas Hari Ini</h3>
            <p className="text-sm text-gray-600">Pelacakan fokus dan energi real-time</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Fokus</span>
            <div className="w-3 h-3 bg-green-500 rounded-full ml-4"></div>
            <span className="text-xs text-gray-600">Energi</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={productivityData}>
            <XAxis dataKey="time" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Area type="monotone" dataKey="focus" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
            <Area type="monotone" dataKey="energy" stackId="2" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Gamification Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Achievements */}
        <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
          <div className="flex items-center space-x-3 mb-6">
            <Trophy className="w-6 h-6 text-yellow-600" />
            <h3 className="text-lg font-bold text-gray-900">Pencapaian</h3>
          </div>
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className={`flex items-center space-x-4 p-4 rounded-2xl transition-all ${
                achievement.unlocked 
                  ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200' 
                  : 'bg-gray-50 border border-gray-200'
              }`}>
                <div className={`text-2xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <div className={`font-semibold ${achievement.unlocked ? 'text-yellow-800' : 'text-gray-500'}`}>
                    {achievement.name}
                  </div>
                  <div className={`text-sm ${achievement.unlocked ? 'text-yellow-600' : 'text-gray-400'}`}>
                    {achievement.description}
                  </div>
                </div>
                {achievement.unlocked && (
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
          <div className="flex items-center space-x-3 mb-6">
            <Star className="w-6 h-6 text-purple-600" />
            <h3 className="text-lg font-bold text-gray-900">Papan Peringkat Tim</h3>
          </div>
          <div className="space-y-3">
            {leaderboard.map((person) => (
              <div key={person.rank} className={`flex items-center space-x-4 p-4 rounded-2xl transition-all ${
                person.name === 'Anda' 
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200' 
                  : 'bg-gray-50'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  person.rank === 1 ? 'bg-yellow-500 text-white' :
                  person.rank === 2 ? 'bg-gray-400 text-white' :
                  person.rank === 3 ? 'bg-orange-500 text-white' :
                  'bg-gray-300 text-gray-700'
                }`}>
                  {person.rank}
                </div>
                <div className="text-2xl">{person.avatar}</div>
                <div className="flex-1">
                  <div className={`font-semibold ${person.name === 'Anda' ? 'text-blue-800' : 'text-gray-900'}`}>
                    {person.name}
                  </div>
                  <div className="text-sm text-gray-600">{person.score} poin</div>
                </div>
                {person.name === 'Anda' && (
                  <Award className="w-6 h-6 text-blue-500" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Collaboration */}
      <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Users className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-bold text-gray-900">Aktivitas Tim</h3>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-colors">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Chat Tim</span>
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-2xl border border-green-200">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
              S
            </div>
            <div className="flex-1">
              <div className="font-semibold text-green-800">Sarah baru saja absen masuk</div>
              <div className="text-sm text-green-600">2 menit lalu • Kantor Pusat</div>
            </div>
            <button className="px-3 py-1 bg-green-200 text-green-800 rounded-lg text-xs font-medium hover:bg-green-300 transition-colors">
              Sapa 👋
            </button>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-2xl border border-blue-200">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              M
            </div>
            <div className="flex-1">
              <div className="font-semibold text-blue-800">Mike menyelesaikan milestone proyek</div>
              <div className="text-sm text-blue-600">15 menit lalu • Remote</div>
            </div>
            <button className="px-3 py-1 bg-blue-200 text-blue-800 rounded-lg text-xs font-medium hover:bg-blue-300 transition-colors">
              Selamat 🎉
            </button>
          </div>
        </div>
      </div>

      {/* Smart Recommendations */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl shadow-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <Zap className="w-6 h-6" />
          <h3 className="text-lg font-bold">Rekomendasi Cerdas</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <div className="font-semibold mb-2">💡 Tips Produktivitas</div>
            <p className="text-sm opacity-90">
              Fokus Anda memuncak pada jam 15:00. Jadwalkan tugas penting di sekitar waktu ini untuk efisiensi maksimal.
            </p>
          </div>
          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <div className="font-semibold mb-2">🎯 Saran Tujuan</div>
            <p className="text-sm opacity-90">
              Anda tinggal 3 hari lagi untuk absensi sempurna bulan ini! Pertahankan kerja bagus Anda.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartDashboard;