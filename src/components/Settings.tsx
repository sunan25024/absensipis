import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Shield, Bell, Clock, Building, Palette, Database } from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'attendance', label: 'Attendance', icon: Clock },
    { id: 'company', label: 'Company', icon: Building },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'system', label: 'System', icon: Database },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralSettings />;
      case 'profile':
        return <ProfileSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'attendance':
        return <AttendanceSettings />;
      case 'company':
        return <CompanySettings />;
      case 'appearance':
        return <AppearanceSettings />;
      case 'system':
        return <SystemSettings />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>

      <div className="flex space-x-6">
        {/* Sidebar */}
        <div className="w-64 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

const GeneralSettings: React.FC = () => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h2 className="text-lg font-semibold text-gray-900 mb-6">General Settings</h2>
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
        <select className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
          <option>German</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
        <select className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option>UTC-8 (Pacific Time)</option>
          <option>UTC-5 (Eastern Time)</option>
          <option>UTC+0 (GMT)</option>
          <option>UTC+1 (Central European Time)</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
        <select className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option>MM/DD/YYYY</option>
          <option>DD/MM/YYYY</option>
          <option>YYYY-MM-DD</option>
        </select>
      </div>
    </div>
  </div>
);

const ProfileSettings: React.FC = () => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h2 className="text-lg font-semibold text-gray-900 mb-6">Profile Settings</h2>
    <div className="space-y-6">
      <div className="flex items-center space-x-6">
        <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
          <User className="w-8 h-8 text-gray-600" />
        </div>
        <div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Change Photo
          </button>
          <p className="text-sm text-gray-500 mt-1">JPG, PNG or GIF. Max size 2MB.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <input
            type="text"
            defaultValue="John"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <input
            type="text"
            defaultValue="Doe"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            defaultValue="john.doe@company.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            defaultValue="+1234567890"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  </div>
);

const SecuritySettings: React.FC = () => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h2 className="text-lg font-semibold text-gray-900 mb-6">Security Settings</h2>
    <div className="space-y-6">
      <div>
        <h3 className="text-md font-medium text-gray-900 mb-4">Change Password</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <input
              type="password"
              className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-md font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <p className="font-medium text-gray-900">Enable 2FA</p>
            <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  </div>
);

const NotificationSettings: React.FC = () => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h2 className="text-lg font-semibold text-gray-900 mb-6">Notification Settings</h2>
    <div className="space-y-4">
      {[
        { title: 'Email Notifications', description: 'Receive notifications via email' },
        { title: 'Push Notifications', description: 'Receive push notifications in browser' },
        { title: 'Attendance Reminders', description: 'Get reminded to check in/out' },
        { title: 'Leave Request Updates', description: 'Notifications about leave request status' },
        { title: 'System Announcements', description: 'Important system updates and news' },
      ].map((item, index) => (
        <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <p className="font-medium text-gray-900">{item.title}</p>
            <p className="text-sm text-gray-500">{item.description}</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      ))}
    </div>
  </div>
);

const AttendanceSettings: React.FC = () => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h2 className="text-lg font-semibold text-gray-900 mb-6">Attendance Settings</h2>
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Working Hours</label>
        <div className="grid grid-cols-2 gap-4 max-w-md">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Start Time</label>
            <input
              type="time"
              defaultValue="09:00"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">End Time</label>
            <input
              type="time"
              defaultValue="17:00"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Late Threshold (minutes)</label>
        <input
          type="number"
          defaultValue="15"
          className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Break Duration (minutes)</label>
        <input
          type="number"
          defaultValue="60"
          className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  </div>
);

const CompanySettings: React.FC = () => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h2 className="text-lg font-semibold text-gray-900 mb-6">Company Settings</h2>
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
        <input
          type="text"
          defaultValue="TechCorp Inc."
          className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
        <textarea
          rows={3}
          defaultValue="123 Business St, Suite 100, City, State 12345"
          className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
        <input
          type="email"
          defaultValue="contact@techcorp.com"
          className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  </div>
);

const AppearanceSettings: React.FC = () => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h2 className="text-lg font-semibold text-gray-900 mb-6">Appearance Settings</h2>
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
        <div className="grid grid-cols-3 gap-4 max-w-md">
          {['Light', 'Dark', 'Auto'].map((theme) => (
            <label key={theme} className="relative">
              <input type="radio" name="theme" value={theme.toLowerCase()} className="sr-only peer" defaultChecked={theme === 'Light'} />
              <div className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-500 peer-checked:bg-blue-50">
                <div className="text-center">
                  <div className={`w-8 h-8 mx-auto mb-2 rounded ${
                    theme === 'Light' ? 'bg-white border-2 border-gray-300' :
                    theme === 'Dark' ? 'bg-gray-800' : 'bg-gradient-to-r from-white to-gray-800'
                  }`}></div>
                  <span className="text-sm font-medium">{theme}</span>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
        <div className="flex space-x-2">
          {['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'].map((color) => (
            <button
              key={color}
              className="w-8 h-8 rounded-full border-2 border-gray-300"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const SystemSettings: React.FC = () => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h2 className="text-lg font-semibold text-gray-900 mb-6">System Settings</h2>
    <div className="space-y-6">
      <div>
        <h3 className="text-md font-medium text-gray-900 mb-4">Data Management</h3>
        <div className="space-y-3">
          <button className="w-full max-w-xs px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Export Data
          </button>
          <button className="w-full max-w-xs px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
            Backup System
          </button>
          <button className="w-full max-w-xs px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            Clear Cache
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-md font-medium text-gray-900 mb-4">System Information</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Version:</span>
            <span className="font-medium">2.1.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Last Update:</span>
            <span className="font-medium">Dec 19, 2024</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Database Size:</span>
            <span className="font-medium">2.4 GB</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Settings;