import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  X, 
  Check, 
  AlertCircle, 
  Info, 
  CheckCircle, 
  AlertTriangle,
  Star,
  Gift,
  Users,
  Calendar,
  Clock,
  Zap,
  Heart,
  Trophy,
  MessageSquare,
  Settings,
  Filter,
  Search
} from 'lucide-react';

interface SmartNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success' | 'achievement' | 'social' | 'reminder' | 'ai';
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  actionable?: boolean;
  actions?: Array<{ label: string; action: string; style?: string }>;
  avatar?: string;
  progress?: number;
}

interface SmartNotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

const SmartNotificationCenter: React.FC<SmartNotificationCenterProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<SmartNotification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'important'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Initialize with smart notifications
    const smartNotifications: SmartNotification[] = [
      {
        id: '1',
        title: '🎉 Achievement Unlocked!',
        message: 'Perfect attendance streak - 15 days! You\'re on fire!',
        type: 'achievement',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        read: false,
        priority: 'high',
        category: 'Gamification',
        actionable: true,
        actions: [
          { label: 'Share Achievement', action: 'share', style: 'primary' },
          { label: 'View Progress', action: 'view', style: 'secondary' }
        ],
        progress: 100
      },
      {
        id: '2',
        title: '🤖 AI Productivity Insight',
        message: 'Your focus peaks at 3 PM today. Schedule important tasks then for 23% better performance.',
        type: 'ai',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        read: false,
        priority: 'medium',
        category: 'AI Insights',
        actionable: true,
        actions: [
          { label: 'Schedule Task', action: 'schedule', style: 'primary' },
          { label: 'Learn More', action: 'learn', style: 'secondary' }
        ]
      },
      {
        id: '3',
        title: '👥 Team Update',
        message: 'Sarah just completed the project milestone! Send congratulations?',
        type: 'social',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        read: false,
        priority: 'medium',
        category: 'Team',
        actionable: true,
        actions: [
          { label: 'Congratulate', action: 'congratulate', style: 'primary' },
          { label: 'View Project', action: 'view_project', style: 'secondary' }
        ],
        avatar: '👩'
      },
      {
        id: '4',
        title: '⏰ Smart Break Reminder',
        message: 'You\'ve been focused for 2 hours. Time for a 15-minute break to maintain peak performance.',
        type: 'reminder',
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        read: true,
        priority: 'medium',
        category: 'Wellness',
        actionable: true,
        actions: [
          { label: 'Start Break', action: 'break', style: 'primary' },
          { label: 'Snooze 15min', action: 'snooze', style: 'secondary' }
        ]
      },
      {
        id: '5',
        title: '🎯 Weekly Goal Progress',
        message: 'You\'re 80% towards your weekly attendance goal. Just 1 more day!',
        type: 'info',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: true,
        priority: 'low',
        category: 'Goals',
        progress: 80
      },
      {
        id: '6',
        title: '🚨 System Alert',
        message: 'Unusual login detected from new device. Please verify if this was you.',
        type: 'warning',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
        read: false,
        priority: 'urgent',
        category: 'Security',
        actionable: true,
        actions: [
          { label: 'Verify', action: 'verify', style: 'primary' },
          { label: 'Report Issue', action: 'report', style: 'danger' }
        ]
      },
      {
        id: '7',
        title: '💝 Reward Available',
        message: 'You\'ve earned 500 points! Redeem for coffee voucher or extra break time.',
        type: 'achievement',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        read: false,
        priority: 'medium',
        category: 'Rewards',
        actionable: true,
        actions: [
          { label: 'Redeem Now', action: 'redeem', style: 'primary' },
          { label: 'Save Points', action: 'save', style: 'secondary' }
        ]
      }
    ];

    setNotifications(smartNotifications);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'achievement': return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 'social': return <Users className="w-5 h-5 text-blue-500" />;
      case 'reminder': return <Clock className="w-5 h-5 text-purple-500" />;
      case 'ai': return <Zap className="w-5 h-5 text-indigo-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'border-l-red-500 bg-red-50';
      case 'high': return 'border-l-orange-500 bg-orange-50';
      case 'medium': return 'border-l-blue-500 bg-blue-50';
      default: return 'border-l-gray-300 bg-gray-50';
    }
  };

  const getActionButtonStyle = (style?: string) => {
    switch (style) {
      case 'primary': return 'bg-blue-600 text-white hover:bg-blue-700';
      case 'danger': return 'bg-red-600 text-white hover:bg-red-700';
      case 'secondary': return 'bg-gray-200 text-gray-700 hover:bg-gray-300';
      default: return 'bg-gray-200 text-gray-700 hover:bg-gray-300';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const handleAction = (notificationId: string, action: string) => {
    console.log(`Action ${action} for notification ${notificationId}`);
    // Handle specific actions
    switch (action) {
      case 'share':
        alert('Achievement shared to team!');
        break;
      case 'schedule':
        alert('Task scheduled for 3 PM!');
        break;
      case 'congratulate':
        alert('Congratulations sent to Sarah!');
        break;
      case 'break':
        alert('Break timer started - 15 minutes!');
        break;
      case 'verify':
        alert('Security verification initiated');
        break;
      case 'redeem':
        alert('Reward redeemed successfully!');
        break;
      default:
        alert(`Action: ${action}`);
    }
    markAsRead(notificationId);
  };

  const filteredNotifications = notifications.filter(notif => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'unread' && !notif.read) ||
                         (filter === 'important' && ['high', 'urgent'].includes(notif.priority));
    
    const matchesSearch = searchTerm === '' || 
                         notif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notif.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-end pt-16 pr-4">
      <div className="bg-white rounded-3xl shadow-2xl w-96 max-h-[80vh] overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Smart Notifications</h3>
                <p className="text-sm text-gray-600">AI-powered insights & updates</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center justify-between">
            <div className="flex bg-gray-100 rounded-lg p-1">
              {[
                { id: 'all', label: 'All' },
                { id: 'unread', label: 'Unread' },
                { id: 'important', label: 'Important' }
              ].map((filterOption) => (
                <button
                  key={filterOption.id}
                  onClick={() => setFilter(filterOption.id as any)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                    filter === filterOption.id 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {filterOption.label}
                </button>
              ))}
            </div>
            
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium"
              >
                Mark all read
              </button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-h-96 overflow-y-auto">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p>No notifications found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 transition-colors border-l-4 ${
                    !notification.read ? getPriorityColor(notification.priority) : 'border-l-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {notification.avatar ? (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm">
                          {notification.avatar}
                        </div>
                      ) : (
                        getIcon(notification.type)
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {notification.title}
                        </p>
                        <div className="flex items-center space-x-1">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-blue-600 hover:text-blue-800 p-1"
                              title="Mark as read"
                            >
                              <Check className="w-3 h-3" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="text-gray-400 hover:text-red-600 p-1"
                            title="Delete"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                        {notification.message}
                      </p>
                      
                      {/* Progress Bar */}
                      {notification.progress !== undefined && (
                        <div className="mb-3">
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Progress</span>
                            <span>{notification.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${notification.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      {/* Action Buttons */}
                      {notification.actionable && notification.actions && (
                        <div className="flex space-x-2 mb-3">
                          {notification.actions.map((action, index) => (
                            <button
                              key={index}
                              onClick={() => handleAction(notification.id, action.action)}
                              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${getActionButtonStyle(action.style)}`}
                            >
                              {action.label}
                            </button>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>{notification.timestamp.toLocaleString()}</span>
                        <span className="bg-gray-200 px-2 py-1 rounded-full">
                          {notification.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">
              {unreadCount} unread of {notifications.length} total
            </div>
            <button className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-800">
              <Settings className="w-3 h-3" />
              <span>Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartNotificationCenter;