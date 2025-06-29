import React, { useState } from 'react';
import { Eye, Palette, Layers, Grid, Sparkles, Square, MoreHorizontal } from 'lucide-react';
import ModernDashboard from './ModernDashboard';
import MinimalistDashboard from './MinimalistDashboard';
import CardBasedDashboard from './CardBasedDashboard';
import SmartDashboard from './SmartDashboard';

const DashboardSelector: React.FC = () => {
  const [selectedDashboard, setSelectedDashboard] = useState('smart');

  const dashboardOptions = [
    {
      id: 'smart',
      name: 'Smart Dashboard',
      description: 'Dashboard cerdas dengan AI insights dan gamifikasi',
      icon: Sparkles,
      color: 'from-blue-500 to-purple-600',
      preview: '/api/placeholder/300/200'
    },
    {
      id: 'modern',
      name: 'Modern Glassmorphism',
      description: 'Desain modern dengan efek kaca dan animasi',
      icon: Eye,
      color: 'from-purple-500 to-pink-600',
      preview: '/api/placeholder/300/200'
    },
    {
      id: 'minimalist',
      name: 'Minimalist',
      description: 'Desain bersih dan sederhana dengan fokus pada konten',
      icon: Square,
      color: 'from-gray-500 to-gray-700',
      preview: '/api/placeholder/300/200'
    },
    {
      id: 'cards',
      name: 'Card-Based',
      description: 'Layout berbasis kartu dengan interaksi yang menarik',
      icon: Grid,
      color: 'from-green-500 to-emerald-600',
      preview: '/api/placeholder/300/200'
    }
  ];

  const renderDashboard = () => {
    switch (selectedDashboard) {
      case 'modern':
        return <ModernDashboard />;
      case 'minimalist':
        return <MinimalistDashboard />;
      case 'cards':
        return <CardBasedDashboard />;
      default:
        return <SmartDashboard />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Selector */}
      <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Pilih Gaya Dashboard</h2>
            <p className="text-gray-600 mt-1">Sesuaikan tampilan sesuai preferensi Anda</p>
          </div>
          <button className="p-3 hover:bg-gray-100 rounded-xl transition-colors">
            <MoreHorizontal className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => setSelectedDashboard(option.id)}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left group hover:scale-105 ${
                  selectedDashboard === option.id
                    ? 'border-blue-500 bg-blue-50 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 bg-gradient-to-r ${option.color} shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className={`font-bold mb-2 ${
                  selectedDashboard === option.id ? 'text-blue-900' : 'text-gray-900'
                }`}>
                  {option.name}
                </h3>
                
                <p className={`text-sm ${
                  selectedDashboard === option.id ? 'text-blue-700' : 'text-gray-600'
                }`}>
                  {option.description}
                </p>

                {selectedDashboard === option.id && (
                  <div className="mt-4 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-semibold text-blue-600">AKTIF</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Dashboard */}
      <div className="transition-all duration-500">
        {renderDashboard()}
      </div>
    </div>
  );
};

export default DashboardSelector;