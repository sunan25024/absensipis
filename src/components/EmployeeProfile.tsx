import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Clock, Shield, Edit, Save, X } from 'lucide-react';

const EmployeeProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@para.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, City, State 12345',
    emergencyContact: '+1 (555) 987-6543',
    department: 'Engineering',
    position: 'Senior Developer',
    employeeId: 'EMP001',
    joinDate: '2024-01-15',
    workSchedule: {
      monday: '09:00 - 17:00',
      tuesday: '09:00 - 17:00',
      wednesday: '09:00 - 17:00',
      thursday: '09:00 - 17:00',
      friday: '09:00 - 17:00',
      saturday: 'Off',
      sunday: 'Off'
    }
  });

  const handleSave = () => {
    // Here you would typically save to backend
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            My Profile
          </h1>
          <p className="text-gray-600 mt-1">Manage your personal information and settings</p>
        </div>
        <div className="flex space-x-3">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              <Edit className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl font-bold text-white">
                  {profileData.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900">{profileData.name}</h2>
              <p className="text-gray-600">{profileData.position}</p>
              <p className="text-sm text-gray-500 mt-1">{profileData.employeeId}</p>
              
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {new Date(profileData.joinDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4" />
                  <span>Employee Access</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-xl">
                    <User className="w-4 h-4 text-gray-400" />
                    <span>{profileData.name}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-xl">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>{profileData.email}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-xl">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{profileData.phone}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.emergencyContact}
                    onChange={(e) => setProfileData({ ...profileData, emergencyContact: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-xl">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{profileData.emergencyContact}</span>
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                {isEditing ? (
                  <textarea
                    value={profileData.address}
                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-start space-x-2 p-3 bg-gray-50 rounded-xl">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <span>{profileData.address}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Work Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Work Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-xl">
                  <span className="font-medium">{profileData.department}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-xl">
                  <span className="font-medium">{profileData.position}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-xl">
                  <span className="font-medium">{profileData.employeeId}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Join Date</label>
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-xl">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{new Date(profileData.joinDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Work Schedule */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Work Schedule</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(profileData.workSchedule).map(([day, hours]) => (
                <div key={day} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="font-medium capitalize">{day}</span>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className={hours === 'Off' ? 'text-red-600' : 'text-green-600'}>
                      {hours}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;