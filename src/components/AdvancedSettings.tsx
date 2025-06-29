import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Shield, 
  Bell, 
  Palette, 
  Brain,
  Gamepad2,
  Users,
  Clock,
  Smartphone,
  Wifi,
  Battery,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Zap,
  Heart,
  Target,
  Award,
  MessageSquare,
  Camera,
  Mic,
  MapPin,
  Download,
  Upload,
  Trash2,
  RefreshCw,
  Calendar
} from 'lucide-react';

const AdvancedSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [darkMode, setDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [faceRecognition, setFaceRecognition] = useState(true);
  const [voiceCommands, setVoiceCommands] = useState(true);
  const [locationTracking, setLocationTracking] = useState(true);
  const [aiInsights, setAiInsights] = useState(true);
  const [gamification, setGamification] = useState(true);
  const [teamFeatures, setTeamFeatures] = useState(true);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User, color: 'blue' },
    { id: 'security', label: 'Security', icon: Shield, color: 'red' },
    { id: 'notifications', label: 'Notifications', icon: Bell, color: 'yellow' },
    { id: 'ai', label: 'AI Features', icon: Brain, color: 'purple' },
    { id: 'gamification', label: 'Gamification', icon: Gamepad2, color: 'green' },
    { id: 'team', label: 'Team & Social', icon: Users, color: 'indigo' },
    { id: 'appearance', label: 'Appearance', icon: Palette, color: 'pink' },
    { id: 'privacy', label: 'Privacy', icon: Eye, color: 'gray' },
    { id: 'data', label: 'Data & Backup', icon: Download, color: 'orange' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab />;
      case 'security':
        return <SecurityTab />;
      case 'notifications':
        return <NotificationsTab notificationsEnabled={notificationsEnabled} setNotificationsEnabled={setNotificationsEnabled} />;
      case 'ai':
        return <AIFeaturesTab aiInsights={aiInsights} setAiInsights={setAiInsights} />;
      case 'gamification':
        return <GamificationTab gamification={gamification} setGamification={setGamification} />;
      case 'team':
        return <TeamSocialTab teamFeatures={teamFeatures} setTeamFeatures={setTeamFeatures} />;
      case 'appearance':
        return <AppearanceTab darkMode={darkMode} setDarkMode={setDarkMode} soundEnabled={soundEnabled} setSoundEnabled={setSoundEnabled} />;
      case 'privacy':
        return <PrivacyTab faceRecognition={faceRecognition} setFaceRecognition={setFaceRecognition} voiceCommands={voiceCommands} setVoiceCommands={setVoiceCommands} locationTracking={locationTracking} setLocationTracking={setLocationTracking} />;
      case 'data':
        return <DataBackupTab />;
      default:
        return <ProfileTab />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Advanced Settings ⚙️
        </h1>
        <p className="text-gray-600">Customize your PARA experience</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-80">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                      activeTab === tab.id
                        ? `bg-${tab.color}-50 text-${tab.color}-700 border-2 border-${tab.color}-200 shadow-md`
                        : 'text-gray-700 hover:bg-gray-50 border-2 border-transparent'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      activeTab === tab.id 
                        ? `bg-${tab.color}-100` 
                        : 'bg-gray-100'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        activeTab === tab.id 
                          ? `text-${tab.color}-600` 
                          : 'text-gray-600'
                      }`} />
                    </div>
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

// Profile Tab Component
const ProfileTab: React.FC = () => (
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
    <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h2>
    
    <div className="space-y-6">
      {/* Profile Picture */}
      <div className="flex items-center space-x-6">
        <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
          JD
        </div>
        <div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
            Change Photo
          </button>
          <p className="text-sm text-gray-500 mt-1">JPG, PNG or GIF. Max size 2MB.</p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
          <input
            type="text"
            defaultValue="John"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
          <input
            type="text"
            defaultValue="Doe"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
          <input
            type="email"
            defaultValue="john.doe@para.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            defaultValue="+1234567890"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold">
        Save Changes
      </button>
    </div>
  </div>
);

// Security Tab Component
const SecurityTab: React.FC = () => (
  <div className="space-y-6">
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Security Settings</h2>
      
      <div className="space-y-6">
        {/* Password Change */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Current Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="border-t pt-6">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
            <div>
              <h4 className="font-semibold text-green-800">Two-Factor Authentication</h4>
              <p className="text-sm text-green-600">Add an extra layer of security</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Notifications Tab Component
const NotificationsTab: React.FC<{notificationsEnabled: boolean, setNotificationsEnabled: (value: boolean) => void}> = ({ notificationsEnabled, setNotificationsEnabled }) => (
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
    <h2 className="text-xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
    
    <div className="space-y-4">
      {[
        { title: 'Push Notifications', description: 'Receive real-time notifications', enabled: notificationsEnabled, setter: setNotificationsEnabled },
        { title: 'Email Notifications', description: 'Get updates via email' },
        { title: 'Smart Reminders', description: 'AI-powered break and task reminders' },
        { title: 'Team Updates', description: 'Notifications about team activities' },
        { title: 'Achievement Alerts', description: 'Celebrate your accomplishments' },
        { title: 'Productivity Insights', description: 'AI insights and recommendations' }
      ].map((item, index) => (
        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
          <div>
            <h4 className="font-semibold text-gray-900">{item.title}</h4>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              defaultChecked={item.enabled !== false}
              onChange={(e) => item.setter && item.setter(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      ))}
    </div>
  </div>
);

// AI Features Tab Component
const AIFeaturesTab: React.FC<{aiInsights: boolean, setAiInsights: (value: boolean) => void}> = ({ aiInsights, setAiInsights }) => (
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
    <h2 className="text-xl font-bold text-gray-900 mb-6">AI & Smart Features</h2>
    
    <div className="space-y-4">
      {[
        { title: 'AI Productivity Insights', description: 'Get personalized productivity recommendations', icon: Brain, enabled: aiInsights, setter: setAiInsights },
        { title: 'Smart Schedule Optimization', description: 'AI-powered schedule suggestions', icon: Clock },
        { title: 'Predictive Analytics', description: 'Forecast your performance trends', icon: Target },
        { title: 'Wellness Monitoring', description: 'Track and improve work-life balance', icon: Heart },
        { title: 'Voice Commands', description: 'Control PARA with voice commands', icon: Mic },
        { title: 'Smart Break Reminders', description: 'Optimal break timing suggestions', icon: Zap }
      ].map((item, index) => {
        const Icon = item.icon;
        return (
          <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Icon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                defaultChecked={item.enabled !== false}
                onChange={(e) => item.setter && item.setter(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        );
      })}
    </div>
  </div>
);

// Gamification Tab Component
const GamificationTab: React.FC<{gamification: boolean, setGamification: (value: boolean) => void}> = ({ gamification, setGamification }) => (
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
    <h2 className="text-xl font-bold text-gray-900 mb-6">Gamification & Rewards</h2>
    
    <div className="space-y-4">
      {[
        { title: 'Achievement System', description: 'Unlock badges and achievements', icon: Award, enabled: gamification, setter: setGamification },
        { title: 'Leaderboards', description: 'Compete with your team', icon: Target },
        { title: 'Point System', description: 'Earn points for good attendance', icon: Zap },
        { title: 'Streak Challenges', description: 'Maintain attendance streaks', icon: Clock },
        { title: 'Team Challenges', description: 'Participate in team competitions', icon: Users },
        { title: 'Reward Redemption', description: 'Redeem points for rewards', icon: Award }
      ].map((item, index) => {
        const Icon = item.icon;
        return (
          <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Icon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                defaultChecked={item.enabled !== false}
                onChange={(e) => item.setter && item.setter(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
        );
      })}
    </div>
  </div>
);

// Team & Social Tab Component
const TeamSocialTab: React.FC<{teamFeatures: boolean, setTeamFeatures: (value: boolean) => void}> = ({ teamFeatures, setTeamFeatures }) => (
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
    <h2 className="text-xl font-bold text-gray-900 mb-6">Team & Social Features</h2>
    
    <div className="space-y-4">
      {[
        { title: 'Team Chat', description: 'Communicate with your team', icon: MessageSquare, enabled: teamFeatures, setter: setTeamFeatures },
        { title: 'Status Sharing', description: 'Share your work status', icon: Users },
        { title: 'Peer Recognition', description: 'Appreciate team members', icon: Heart },
        { title: 'Team Calendar', description: 'View team schedules', icon: Calendar },
        { title: 'Collaboration Tools', description: 'Work together effectively', icon: Users },
        { title: 'Social Feed', description: 'See team activities and updates', icon: MessageSquare }
      ].map((item, index) => {
        const Icon = item.icon;
        return (
          <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Icon className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                defaultChecked={item.enabled !== false}
                onChange={(e) => item.setter && item.setter(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        );
      })}
    </div>
  </div>
);

// Appearance Tab Component
const AppearanceTab: React.FC<{darkMode: boolean, setDarkMode: (value: boolean) => void, soundEnabled: boolean, setSoundEnabled: (value: boolean) => void}> = ({ darkMode, setDarkMode, soundEnabled, setSoundEnabled }) => (
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
    <h2 className="text-xl font-bold text-gray-900 mb-6">Appearance & Interface</h2>
    
    <div className="space-y-6">
      {/* Theme Selection */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Theme</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { id: 'light', label: 'Light', icon: Sun, active: !darkMode },
            { id: 'dark', label: 'Dark', icon: Moon, active: darkMode },
            { id: 'auto', label: 'Auto', icon: Smartphone, active: false }
          ].map((theme) => {
            const Icon = theme.icon;
            return (
              <button
                key={theme.id}
                onClick={() => theme.id === 'dark' ? setDarkMode(true) : setDarkMode(false)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  theme.active 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Icon className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                <div className="text-sm font-medium">{theme.label}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sound Settings */}
      <div className="border-t pt-6">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center space-x-3">
            {soundEnabled ? <Volume2 className="w-6 h-6 text-blue-600" /> : <VolumeX className="w-6 h-6 text-gray-400" />}
            <div>
              <h4 className="font-semibold text-gray-900">Sound Effects</h4>
              <p className="text-sm text-gray-600">Play sounds for notifications and actions</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={soundEnabled}
              onChange={(e) => setSoundEnabled(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  </div>
);

// Privacy Tab Component
const PrivacyTab: React.FC<{faceRecognition: boolean, setFaceRecognition: (value: boolean) => void, voiceCommands: boolean, setVoiceCommands: (value: boolean) => void, locationTracking: boolean, setLocationTracking: (value: boolean) => void}> = ({ faceRecognition, setFaceRecognition, voiceCommands, setVoiceCommands, locationTracking, setLocationTracking }) => (
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
    <h2 className="text-xl font-bold text-gray-900 mb-6">Privacy & Data</h2>
    
    <div className="space-y-4">
      {[
        { title: 'Face Recognition Data', description: 'Store and use facial recognition data', icon: Camera, enabled: faceRecognition, setter: setFaceRecognition },
        { title: 'Voice Command Data', description: 'Process and store voice commands', icon: Mic, enabled: voiceCommands, setter: setVoiceCommands },
        { title: 'Location Tracking', description: 'Track location for attendance verification', icon: MapPin, enabled: locationTracking, setter: setLocationTracking },
        { title: 'Usage Analytics', description: 'Collect anonymous usage data', icon: SettingsIcon },
        { title: 'Performance Metrics', description: 'Track productivity and performance', icon: Target },
        { title: 'Data Sharing', description: 'Share anonymized data for improvements', icon: Users }
      ].map((item, index) => {
        const Icon = item.icon;
        return (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <Icon className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={item.enabled !== false}
                onChange={(e) => item.setter && item.setter(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
            </label>
          </div>
        );
      })}
    </div>
  </div>
);

// Data & Backup Tab Component
const DataBackupTab: React.FC = () => (
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
    <h2 className="text-xl font-bold text-gray-900 mb-6">Data Management & Backup</h2>
    
    <div className="space-y-6">
      {/* Data Export */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Your Data</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-blue-50 rounded-xl border border-blue-200 hover:bg-blue-100 transition-colors">
            <Download className="w-6 h-6 text-blue-600" />
            <div className="text-left">
              <div className="font-semibold text-blue-800">Export Attendance Data</div>
              <div className="text-sm text-blue-600">Download your attendance history</div>
            </div>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-green-50 rounded-xl border border-green-200 hover:bg-green-100 transition-colors">
            <Download className="w-6 h-6 text-green-600" />
            <div className="text-left">
              <div className="font-semibold text-green-800">Export All Data</div>
              <div className="text-sm text-green-600">Complete data export</div>
            </div>
          </button>
        </div>
      </div>

      {/* Data Import */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Import Data</h3>
        <button className="flex items-center space-x-3 p-4 bg-purple-50 rounded-xl border border-purple-200 hover:bg-purple-100 transition-colors">
          <Upload className="w-6 h-6 text-purple-600" />
          <div className="text-left">
            <div className="font-semibold text-purple-800">Import Previous Data</div>
            <div className="text-sm text-purple-600">Upload data from another system</div>
          </div>
        </button>
      </div>

      {/* Data Management */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Management</h3>
        <div className="space-y-3">
          <button className="w-full flex items-center space-x-3 p-4 bg-orange-50 rounded-xl border border-orange-200 hover:bg-orange-100 transition-colors">
            <RefreshCw className="w-6 h-6 text-orange-600" />
            <div className="text-left">
              <div className="font-semibold text-orange-800">Sync Data</div>
              <div className="text-sm text-orange-600">Synchronize with cloud backup</div>
            </div>
          </button>
          <button className="w-full flex items-center space-x-3 p-4 bg-red-50 rounded-xl border border-red-200 hover:bg-red-100 transition-colors">
            <Trash2 className="w-6 h-6 text-red-600" />
            <div className="text-left">
              <div className="font-semibold text-red-800">Clear All Data</div>
              <div className="text-sm text-red-600">Permanently delete all local data</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default AdvancedSettings;