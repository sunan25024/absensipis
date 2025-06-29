import React, { useState } from 'react';
import { 
  Circle, 
  Square, 
  Triangle, 
  Minus,
  Plus,
  ArrowRight,
  Dot,
  Clock,
  Calendar,
  Target,
  Activity
} from 'lucide-react';

const MinimalistDashboard: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState('productivity');

  // Minimalist Card Component
  const MinimalCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
    <div className={`bg-white border border-gray-200 rounded-none shadow-sm hover:shadow-md transition-shadow ${className}`}>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-mono">
      {/* Header Minimalis */}
      <header className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-black"></div>
            <div>
              <h1 className="text-2xl font-bold text-black">PARA</h1>
              <p className="text-sm text-gray-600">Sistem Absensi</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-8">
            <div className="text-right">
              <div className="text-lg font-bold text-black">09:47:23</div>
              <div className="text-sm text-gray-600">Rabu, 19 Des</div>
            </div>
            <button className="w-8 h-8 border border-black hover:bg-black hover:text-white transition-colors">
              <Plus className="w-4 h-4 mx-auto" />
            </button>
          </div>
        </div>
      </header>

      <div className="px-8 py-8 space-y-8">
        {/* Status Sederhana */}
        <MinimalCard className="p-8">
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 mx-auto mb-4"></div>
              <div className="text-2xl font-bold text-black">MASUK</div>
              <div className="text-sm text-gray-600">09:00</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 border-2 border-gray-300 mx-auto mb-4"></div>
              <div className="text-2xl font-bold text-gray-400">KELUAR</div>
              <div className="text-sm text-gray-600">--:--</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 mx-auto mb-4"></div>
              <div className="text-2xl font-bold text-black">7.5J</div>
              <div className="text-sm text-gray-600">Hari ini</div>
            </div>
          </div>
        </MinimalCard>

        {/* Metrik Grid */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { id: 'productivity', label: 'PRODUKTIVITAS', value: '94', unit: '%', shape: 'circle' },
            { id: 'focus', label: 'FOKUS', value: '87', unit: '/100', shape: 'square' },
            { id: 'energy', label: 'ENERGI', value: '82', unit: '%', shape: 'triangle' },
            { id: 'wellness', label: 'WELLNESS', value: '91', unit: '%', shape: 'circle' }
          ].map((metric) => (
            <MinimalCard 
              key={metric.id}
              className={`p-6 cursor-pointer transition-all ${
                selectedMetric === metric.id ? 'bg-black text-white' : 'hover:bg-gray-100'
              }`}
              onClick={() => setSelectedMetric(metric.id)}
            >
              <div className="space-y-4">
                <div className={`w-8 h-8 ${
                  selectedMetric === metric.id ? 'bg-white' : 'bg-black'
                } ${metric.shape === 'circle' ? 'rounded-full' : metric.shape === 'triangle' ? 'clip-triangle' : ''}`}></div>
                <div>
                  <div className={`text-2xl font-bold ${selectedMetric === metric.id ? 'text-white' : 'text-black'}`}>
                    {metric.value}{metric.unit}
                  </div>
                  <div className={`text-xs ${selectedMetric === metric.id ? 'text-gray-300' : 'text-gray-600'}`}>
                    {metric.label}
                  </div>
                </div>
              </div>
            </MinimalCard>
          ))}
        </div>

        {/* Timeline Minimalis */}
        <MinimalCard className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-black">JADWAL</h3>
            <button className="text-black hover:text-gray-600">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-6">
            {[
              { time: '09:00', task: 'CHECK IN', status: 'done' },
              { time: '10:30', task: 'MEETING TIM', status: 'current' },
              { time: '12:00', task: 'ISTIRAHAT', status: 'pending' },
              { time: '14:00', task: 'DEEP WORK', status: 'pending' },
              { time: '17:00', task: 'CHECK OUT', status: 'pending' }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-6">
                <div className="w-16 text-sm font-mono text-gray-600">{item.time}</div>
                <div className={`w-4 h-4 ${
                  item.status === 'done' ? 'bg-black' :
                  item.status === 'current' ? 'bg-blue-500' :
                  'border border-gray-300'
                }`}></div>
                <div className={`flex-1 text-sm font-bold ${
                  item.status === 'current' ? 'text-blue-500' : 'text-black'
                }`}>
                  {item.task}
                </div>
                {item.status === 'current' && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                )}
              </div>
            ))}
          </div>
        </MinimalCard>

        {/* Data Visualization Minimalis */}
        <MinimalCard className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-black">PERFORMA MINGGU INI</h3>
            <div className="flex space-x-2">
              <button className="w-8 h-8 bg-black text-white">
                <Minus className="w-4 h-4 mx-auto" />
              </button>
              <button className="w-8 h-8 border border-black">
                <Plus className="w-4 h-4 mx-auto" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-4">
            {['S', 'S', 'R', 'K', 'J', 'S', 'M'].map((day, index) => {
              const height = Math.random() * 100 + 20;
              return (
                <div key={index} className="text-center">
                  <div className="h-32 flex items-end mb-2">
                    <div 
                      className="w-full bg-black transition-all hover:bg-gray-700"
                      style={{ height: `${height}%` }}
                    ></div>
                  </div>
                  <div className="text-xs font-mono text-gray-600">{day}</div>
                </div>
              );
            })}
          </div>
        </MinimalCard>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-4">
          <button className="bg-black text-white p-6 hover:bg-gray-800 transition-colors">
            <div className="text-center">
              <div className="text-lg font-bold">ABSEN</div>
              <div className="text-xs">Wajah / Suara</div>
            </div>
          </button>
          
          <button className="border border-black p-6 hover:bg-black hover:text-white transition-colors">
            <div className="text-center">
              <div className="text-lg font-bold">JADWAL</div>
              <div className="text-xs">Lihat Kalender</div>
            </div>
          </button>
          
          <button className="border border-black p-6 hover:bg-black hover:text-white transition-colors">
            <div className="text-center">
              <div className="text-lg font-bold">LAPORAN</div>
              <div className="text-xs">Analisis Data</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MinimalistDashboard;