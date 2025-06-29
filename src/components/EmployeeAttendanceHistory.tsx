import React, { useState } from 'react';
import { Calendar, Clock, TrendingUp, Filter, Download, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { mockAttendanceRecords } from '../data/mockData';

const EmployeeAttendanceHistory: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Filter attendance records for current employee (EMP001)
  const employeeRecords = mockAttendanceRecords.filter(record => record.employeeId === 'EMP001');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'late': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'absent': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800 border-green-200';
      case 'late': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'absent': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const monthlyStats = {
    totalDays: 22,
    presentDays: 20,
    lateDays: 2,
    absentDays: 0,
    totalHours: 176,
    overtimeHours: 8
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            My Attendance History
          </h1>
          <p className="text-gray-600 mt-1">Track your attendance records and performance</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg">
          <Download className="w-4 h-4" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Filter by:</span>
          </div>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>
                {new Date(0, i).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={2024}>2024</option>
            <option value={2023}>2023</option>
          </select>
        </div>
      </div>

      {/* Monthly Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Total Days', value: monthlyStats.totalDays, color: 'blue' },
          { label: 'Present', value: monthlyStats.presentDays, color: 'green' },
          { label: 'Late', value: monthlyStats.lateDays, color: 'yellow' },
          { label: 'Absent', value: monthlyStats.absentDays, color: 'red' },
          { label: 'Total Hours', value: `${monthlyStats.totalHours}h`, color: 'purple' },
          { label: 'Overtime', value: `${monthlyStats.overtimeHours}h`, color: 'orange' }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
            <div className="text-sm text-gray-600 mb-1">{stat.label}</div>
            <div className={`text-2xl font-bold text-${stat.color}-600`}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Attendance Records */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
          <h3 className="text-xl font-bold text-gray-900">Attendance Records</h3>
          <p className="text-sm text-gray-600 mt-1">Detailed view of your daily attendance</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Check In
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Check Out
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Working Hours
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Break Time
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employeeRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">
                        {new Date(record.date).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.checkIn ? record.checkIn.toLocaleTimeString() : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.checkOut ? record.checkOut.toLocaleTimeString() : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.workingHours ? `${record.workingHours}h` : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.breaks.reduce((total, breakItem) => total + (breakItem.duration || 0), 0)}m
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(record.status)}
                      <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full border ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </div>
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

export default EmployeeAttendanceHistory;