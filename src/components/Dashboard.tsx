import React from 'react';
import { Users, Clock, UserCheck, UserX, TrendingUp, Calendar, Award, Target, Zap, Star } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { mockDashboardStats, mockAttendanceRecords } from '../data/mockData';

const Dashboard: React.FC = () => {
  const stats = mockDashboardStats;
  
  const weeklyData = [
    { day: 'Mon', present: 18, absent: 2, late: 1 },
    { day: 'Tue', present: 19, absent: 1, late: 2 },
    { day: 'Wed', present: 17, absent: 3, late: 1 },
    { day: 'Thu', present: 20, absent: 0, late: 0 },
    { day: 'Fri', present: 16, absent: 4, late: 3 },
  ];

  const attendanceTrend = [
    { month: 'Jan', rate: 95 },
    { month: 'Feb', rate: 92 },
    { month: 'Mar', rate: 98 },
    { month: 'Apr', rate: 94 },
    { month: 'May', rate: 96 },
    { month: 'Jun', rate: 93 },
  ];

  const departmentData = [
    { name: 'Engineering', value: 35, color: '#3B82F6' },
    { name: 'Marketing', value: 25, color: '#10B981' },
    { name: 'Design', value: 20, color: '#F59E0B' },
    { name: 'HR', value: 12, color: '#EF4444' },
    { name: 'Finance', value: 8, color: '#8B5CF6' },
  ];

  const statCards = [
    {
      title: 'Total Employees',
      value: stats.totalEmployees,
      icon: Users,
      gradient: 'from-blue-500 to-blue-600',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      accentColor: 'border-blue-200'
    },
    {
      title: 'Present Today',
      value: stats.presentToday,
      icon: UserCheck,
      gradient: 'from-green-500 to-emerald-600',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
      accentColor: 'border-green-200'
    },
    {
      title: 'Late Today',
      value: stats.lateToday,
      icon: Clock,
      gradient: 'from-yellow-500 to-orange-600',
      textColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      accentColor: 'border-yellow-200'
    },
    {
      title: 'Absent Today',
      value: stats.absentToday,
      icon: UserX,
      gradient: 'from-red-500 to-pink-600',
      textColor: 'text-red-600',
      bgColor: 'bg-red-50',
      accentColor: 'border-red-200'
    }
  ];

  const todayAttendance = mockAttendanceRecords.filter(record => record.date === '2024-12-19');

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
          <div className="flex items-center space-x-4 mt-2">
            <p className="text-gray-600">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">AI Powered Analytics</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg border border-green-200 px-6 py-3">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-white">System Online</span>
              <Star className="w-4 h-4 text-green-200" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`bg-white rounded-3xl shadow-lg p-6 border-2 ${stat.accentColor} hover:shadow-2xl transition-all duration-300 group relative overflow-hidden`}>
              {/* Background gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
              
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-2">{stat.title}</p>
                  <p className="text-4xl font-bold text-gray-900 mb-3">{stat.value}</p>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600 font-semibold">+5.2%</span>
                    <span className="text-sm text-gray-500">vs last week</span>
                  </div>
                </div>
                <div className={`${stat.bgColor} p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg border-2 ${stat.accentColor}`}>
                  <Icon className={`w-8 h-8 ${stat.textColor}`} />
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-2 right-2">
                <Star className="w-4 h-4 text-gray-300 group-hover:text-yellow-400 transition-colors" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Enhanced Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Attendance Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Weekly Attendance</h3>
              <p className="text-sm text-gray-500 mt-1">Real-time attendance tracking</p>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2 shadow-sm"></div>
                <span className="text-gray-600 font-medium">Present</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2 shadow-sm"></div>
                <span className="text-gray-600 font-medium">Late</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2 shadow-sm"></div>
                <span className="text-gray-600 font-medium">Absent</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '16px',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Bar dataKey="present" fill="#10B981" radius={[6, 6, 0, 0]} />
              <Bar dataKey="late" fill="#F59E0B" radius={[6, 6, 0, 0]} />
              <Bar dataKey="absent" fill="#EF4444" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Department Distribution */}
        <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Department Distribution</h3>
              <p className="text-sm text-gray-500 mt-1">Employee allocation</p>
            </div>
            <Target className="w-6 h-6 text-purple-500" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-3">
            {departmentData.map((dept, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full mr-3 shadow-sm" style={{ backgroundColor: dept.color }}></div>
                  <span className="text-sm font-medium text-gray-700">{dept.name}</span>
                </div>
                <span className="text-sm font-bold text-gray-900">{dept.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Attendance Trend */}
      <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Attendance Trend</h3>
            <p className="text-sm text-gray-500 mt-1">6-month performance overview</p>
          </div>
          <div className="flex items-center space-x-3">
            <Award className="w-6 h-6 text-yellow-500" />
            <span className="text-sm font-bold text-gray-700">94.2% Average</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={attendanceTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis domain={[85, 100]} stroke="#6b7280" />
            <Tooltip 
              formatter={(value) => [`${value}%`, 'Attendance Rate']}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb', 
                borderRadius: '16px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="rate" 
              stroke="url(#colorGradient)" 
              strokeWidth={4}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, fill: '#3B82F6' }}
            />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Enhanced Today's Attendance Table */}
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Today's Attendance</h3>
              <p className="text-sm text-gray-600 mt-1">Real-time employee status</p>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Check In
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Check Out
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Hours
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {todayAttendance.map((record) => (
                <tr key={record.id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-sm font-bold text-white">
                          {record.employeeName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-gray-900">{record.employeeName}</div>
                        <div className="text-sm text-gray-500">{record.employeeId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {record.checkIn ? record.checkIn.toLocaleTimeString() : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {record.checkOut ? record.checkOut.toLocaleTimeString() : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {record.workingHours ? `${record.workingHours}h` : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full shadow-sm ${
                      record.status === 'present' ? 'bg-green-100 text-green-800 border border-green-200' :
                      record.status === 'late' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                      record.status === 'absent' ? 'bg-red-100 text-red-800 border border-red-200' :
                      'bg-gray-100 text-gray-800 border border-gray-200'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;