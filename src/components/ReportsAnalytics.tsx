import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import { Calendar, Download, Filter, TrendingUp, Users, Clock, DollarSign } from 'lucide-react';

const ReportsAnalytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const attendanceData = [
    { month: 'Jan', present: 95, absent: 5, late: 8 },
    { month: 'Feb', present: 92, absent: 8, late: 12 },
    { month: 'Mar', present: 98, absent: 2, late: 5 },
    { month: 'Apr', present: 94, absent: 6, late: 9 },
    { month: 'May', present: 96, absent: 4, late: 7 },
    { month: 'Jun', present: 93, absent: 7, late: 11 },
  ];

  const departmentData = [
    { name: 'Engineering', value: 35, color: '#3B82F6' },
    { name: 'Marketing', value: 25, color: '#10B981' },
    { name: 'Design', value: 20, color: '#F59E0B' },
    { name: 'HR', value: 12, color: '#EF4444' },
    { name: 'Finance', value: 8, color: '#8B5CF6' },
  ];

  const productivityData = [
    { day: 'Mon', hours: 8.2, productivity: 87 },
    { day: 'Tue', hours: 8.5, productivity: 92 },
    { day: 'Wed', hours: 8.1, productivity: 85 },
    { day: 'Thu', hours: 8.7, productivity: 95 },
    { day: 'Fri', hours: 7.9, productivity: 82 },
  ];

  const overtimeData = [
    { month: 'Jan', overtime: 45, cost: 12500 },
    { month: 'Feb', overtime: 52, cost: 14200 },
    { month: 'Mar', overtime: 38, cost: 10800 },
    { month: 'Apr', overtime: 61, cost: 16900 },
    { month: 'May', overtime: 43, cost: 11700 },
    { month: 'Jun', overtime: 55, cost: 15200 },
  ];

  const kpiCards = [
    {
      title: 'Average Attendance Rate',
      value: '94.2%',
      change: '+2.1%',
      trend: 'up',
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'Average Working Hours',
      value: '8.3h',
      change: '+0.2h',
      trend: 'up',
      icon: Clock,
      color: 'text-blue-600'
    },
    {
      title: 'Productivity Score',
      value: '88.2',
      change: '+3.5',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-purple-600'
    },
    {
      title: 'Overtime Cost',
      value: '$13,550',
      change: '-8.2%',
      trend: 'down',
      icon: DollarSign,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Period:</span>
          </div>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Departments</option>
            <option value="engineering">Engineering</option>
            <option value="marketing">Marketing</option>
            <option value="design">Design</option>
            <option value="hr">HR</option>
            <option value="finance">Finance</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
                  <div className="flex items-center mt-2">
                    <span className={`text-sm font-medium ${
                      kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {kpi.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">vs last period</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg bg-gray-50`}>
                  <Icon className={`w-6 h-6 ${kpi.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Trends */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="present" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
              <Area type="monotone" dataKey="late" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
              <Area type="monotone" dataKey="absent" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Department Distribution */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Productivity Analysis */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Productivity Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={productivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="hours" fill="#3B82F6" name="Working Hours" />
              <Line yAxisId="right" type="monotone" dataKey="productivity" stroke="#10B981" strokeWidth={3} name="Productivity Score" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Overtime Analysis */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Overtime Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={overtimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="overtime" fill="#F59E0B" name="Overtime Hours" />
              <Line yAxisId="right" type="monotone" dataKey="cost" stroke="#EF4444" strokeWidth={3} name="Cost ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Reports Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Detailed Employee Reports</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attendance Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg Hours/Day
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Overtime Hours
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Productivity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { name: 'John Doe', id: 'EMP001', attendance: 96, avgHours: 8.2, overtime: 12, productivity: 92, performance: 'Excellent' },
                { name: 'Jane Smith', id: 'EMP002', attendance: 94, avgHours: 8.1, overtime: 8, productivity: 89, performance: 'Good' },
                { name: 'Mike Johnson', id: 'EMP003', attendance: 98, avgHours: 8.5, overtime: 15, productivity: 95, performance: 'Excellent' },
              ].map((employee, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                    <div className="text-sm text-gray-500">{employee.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">{employee.attendance}%</div>
                      <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${employee.attendance}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.avgHours}h
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.overtime}h
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">{employee.productivity}</div>
                      <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${employee.productivity}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      employee.performance === 'Excellent' ? 'bg-green-100 text-green-800' :
                      employee.performance === 'Good' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {employee.performance}
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

export default ReportsAnalytics;