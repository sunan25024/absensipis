import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Video, 
  Coffee, 
  Briefcase, 
  Plus,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  Bell,
  CheckCircle,
  AlertCircle,
  User,
  MessageSquare
} from 'lucide-react';

const AdvancedSchedule: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week');
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  // Sample events data
  const events = [
    {
      id: 1,
      title: 'Standup Tim',
      time: '09:00 - 09:30',
      type: 'meeting',
      location: 'Ruang Konferensi A',
      attendees: ['Sarah', 'Mike', 'Lisa'],
      status: 'confirmed',
      color: 'bg-blue-500',
      isRecurring: true
    },
    {
      id: 2,
      title: 'Review Proyek',
      time: '10:30 - 11:30',
      type: 'meeting',
      location: 'Virtual - Zoom',
      attendees: ['John', 'Manager'],
      status: 'pending',
      color: 'bg-purple-500',
      isRecurring: false
    },
    {
      id: 3,
      title: 'Istirahat Makan Siang',
      time: '12:00 - 13:00',
      type: 'break',
      location: 'Kantin',
      attendees: [],
      status: 'confirmed',
      color: 'bg-green-500',
      isRecurring: true
    },
    {
      id: 4,
      title: 'Presentasi Klien',
      time: '14:00 - 15:00',
      type: 'presentation',
      location: 'Ruang Konferensi Utama',
      attendees: ['Tim Klien', 'Tim Sales'],
      status: 'confirmed',
      color: 'bg-red-500',
      isRecurring: false
    },
    {
      id: 5,
      title: 'Review Kode',
      time: '15:30 - 16:30',
      type: 'work',
      location: 'Ruang Dev',
      attendees: ['Tim Dev'],
      status: 'confirmed',
      color: 'bg-indigo-500',
      isRecurring: false
    }
  ];

  const teamMembers = [
    { name: 'Sarah M.', status: 'available', avatar: '👩', location: 'Kantor' },
    { name: 'Mike J.', status: 'busy', avatar: '👨', location: 'Remote' },
    { name: 'Lisa K.', status: 'away', avatar: '👩‍💼', location: 'Ruang Meeting' },
    { name: 'Tom R.', status: 'available', avatar: '👨‍💻', location: 'Kantor' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'busy': return 'bg-red-500';
      case 'away': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'meeting': return <Users className="w-4 h-4" />;
      case 'break': return <Coffee className="w-4 h-4" />;
      case 'presentation': return <Video className="w-4 h-4" />;
      case 'work': return <Briefcase className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Jadwal Cerdas
          </h1>
          <p className="text-gray-600 mt-1">Optimisasi jadwal bertenaga AI</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg">
          <Plus className="w-4 h-4" />
          <span>Tambah Acara</span>
        </button>
      </div>

      {/* Calendar Controls */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-gray-900">
              {currentDate.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
            </h2>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex bg-gray-100 rounded-lg p-1">
              {[
                { id: 'day', label: 'Hari' },
                { id: 'week', label: 'Minggu' },
                { id: 'month', label: 'Bulan' }
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setViewMode(mode.id as any)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === mode.id 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Week View */}
        <div className="grid grid-cols-7 gap-4">
          {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((day, index) => (
            <div key={day} className="text-center">
              <div className="text-sm font-medium text-gray-600 mb-2">{day}</div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium mx-auto ${
                index === 2 ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}>
                {17 + index}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Jadwal Hari Ini</h3>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">5 acara</span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {events.map((event) => (
              <div 
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className="flex items-center space-x-4 p-4 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer group"
              >
                <div className={`w-12 h-12 ${event.color} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                  {getEventIcon(event.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-gray-900">{event.title}</h4>
                    {event.isRecurring && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{event.location}</span>
                    </div>
                    {event.attendees.length > 0 && (
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>{event.attendees.length} peserta</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {event.status === 'confirmed' ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                  )}
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                    <Bell className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Availability */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Ketersediaan Tim</h3>
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            Lihat Semua
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-lg">
                  {member.avatar}
                </div>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(member.status)} rounded-full border-2 border-white`}></div>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 text-sm">{member.name}</div>
                <div className="text-xs text-gray-600 capitalize">
                  {member.status === 'available' ? 'Tersedia' : 
                   member.status === 'busy' ? 'Sibuk' : 'Tidak Ada'}
                </div>
                <div className="text-xs text-gray-500">{member.location}</div>
              </div>
              <button className="p-2 hover:bg-white rounded-lg transition-colors">
                <MessageSquare className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* AI Schedule Suggestions */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl shadow-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold">Optimisasi Jadwal AI</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <div className="font-semibold mb-2">🎯 Waktu Meeting Optimal</div>
            <p className="text-sm opacity-90">
              Waktu terbaik untuk meeting tim: 10:00 pagi saat energi semua orang sedang tinggi.
            </p>
          </div>
          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <div className="font-semibold mb-2">⚡ Saran Blok Fokus</div>
            <p className="text-sm opacity-90">
              Jadwalkan blok fokus 2 jam antara 14:00-16:00 untuk kerja mendalam berdasarkan pola produktivitas Anda.
            </p>
          </div>
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">{selectedEvent.title}</h3>
              <button 
                onClick={() => setSelectedEvent(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">{selectedEvent.time}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">{selectedEvent.location}</span>
              </div>
              {selectedEvent.attendees.length > 0 && (
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">{selectedEvent.attendees.join(', ')}</span>
                </div>
              )}
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                Gabung Meeting
              </button>
              <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
                Edit Acara
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSchedule;