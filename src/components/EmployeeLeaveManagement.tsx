import React, { useState } from 'react';
import { Plus, Calendar, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { mockLeaveRequests } from '../data/mockData';
import { LeaveRequest } from '../types';

const EmployeeLeaveManagement: React.FC = () => {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(
    mockLeaveRequests.filter(request => request.employeeId === 'EMP001')
  );

  const leaveBalance = {
    vacation: { total: 20, used: 5, remaining: 15 },
    sick: { total: 10, used: 2, remaining: 8 },
    personal: { total: 5, used: 1, remaining: 4 },
    emergency: { total: 3, used: 0, remaining: 3 }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'pending': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default: return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'vacation': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'sick': return 'bg-red-100 text-red-800 border-red-200';
      case 'personal': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'emergency': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleSubmitRequest = (requestData: Partial<LeaveRequest>) => {
    const newRequest: LeaveRequest = {
      id: Date.now().toString(),
      employeeId: 'EMP001',
      employeeName: 'John Doe',
      ...requestData,
      status: 'pending'
    } as LeaveRequest;
    
    setLeaveRequests(prev => [...prev, newRequest]);
    setShowRequestModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            My Leave Requests
          </h1>
          <p className="text-gray-600 mt-1">Manage your leave requests and view balance</p>
        </div>
        <button
          onClick={() => setShowRequestModal(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Request Leave</span>
        </button>
      </div>

      {/* Leave Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(leaveBalance).map(([type, balance]) => (
          <div key={type} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 capitalize">{type} Leave</h3>
              <Calendar className="w-6 h-6 text-blue-500" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total:</span>
                <span className="font-medium">{balance.total} days</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Used:</span>
                <span className="font-medium text-red-600">{balance.used} days</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Remaining:</span>
                <span className="font-bold text-green-600">{balance.remaining} days</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(balance.remaining / balance.total) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Leave Requests */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
          <h3 className="text-xl font-bold text-gray-900">My Leave Requests</h3>
          <p className="text-sm text-gray-600 mt-1">Track the status of your leave applications</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Applied Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leaveRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full border ${getTypeColor(request.type)}`}>
                      {request.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="font-medium">
                        {request.startDate.toLocaleDateString()} - {request.endDate.toLocaleDateString()}
                      </div>
                      <div className="text-gray-500">{request.days} day{request.days > 1 ? 's' : ''}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                    <div className="truncate" title={request.reason}>
                      {request.reason}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(request.status)}
                      <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full border ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.approvedAt ? request.approvedAt.toLocaleDateString() : 'Pending'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Leave Request Modal */}
      {showRequestModal && (
        <LeaveRequestModal
          onClose={() => setShowRequestModal(false)}
          onSubmit={handleSubmitRequest}
          leaveBalance={leaveBalance}
        />
      )}
    </div>
  );
};

interface LeaveRequestModalProps {
  onClose: () => void;
  onSubmit: (data: Partial<LeaveRequest>) => void;
  leaveBalance: any;
}

const LeaveRequestModal: React.FC<LeaveRequestModalProps> = ({ onClose, onSubmit, leaveBalance }) => {
  const [formData, setFormData] = useState({
    type: 'vacation' as const,
    startDate: '',
    endDate: '',
    reason: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    onSubmit({
      ...formData,
      startDate,
      endDate,
      days
    });
  };

  const selectedBalance = leaveBalance[formData.type];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Request Leave</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Leave Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="vacation">Vacation</option>
              <option value="sick">Sick Leave</option>
              <option value="personal">Personal</option>
              <option value="emergency">Emergency</option>
            </select>
            {selectedBalance && (
              <p className="text-sm text-gray-600 mt-1">
                Available: {selectedBalance.remaining} days
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Reason</label>
            <textarea
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Please provide a reason for your leave request..."
              required
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeLeaveManagement;