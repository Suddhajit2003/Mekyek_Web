
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Calendar, 
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  Settings as SettingsIcon,
  Filter
} from 'lucide-react';

const Notifications = () => {
  const [filter, setFilter] = useState('all');

  const notifications = [
    {
      id: 1,
      type: 'interview',
      title: 'Interview Reminder',
      message: 'Interview with John Doe scheduled for today at 2:00 PM',
      time: '2 hours ago',
      status: 'unread',
      priority: 'high',
      icon: Calendar
    },
    {
      id: 2,
      type: 'application',
      title: 'New Application Received',
      message: 'Sarah Smith applied for Senior Developer position',
      time: '4 hours ago',
      status: 'read',
      priority: 'medium',
      icon: Users
    },
    {
      id: 3,
      type: 'system',
      title: 'System Alert',
      message: 'High server load detected. Performance may be affected.',
      time: '6 hours ago',
      status: 'unread',
      priority: 'high',
      icon: AlertCircle
    },
    {
      id: 4,
      type: 'approval',
      title: 'Candidate Approved',
      message: 'Mike Johnson has been approved for the next interview round',
      time: '1 day ago',
      status: 'read',
      priority: 'low',
      icon: CheckCircle
    },
  ];

  const notificationSettings = [
    { id: 'email_interviews', label: 'Interview Reminders', description: 'Get notified about upcoming interviews', type: 'email', enabled: true },
    { id: 'email_applications', label: 'New Applications', description: 'Receive alerts for new job applications', type: 'email', enabled: true },
    { id: 'email_system', label: 'System Alerts', description: 'Important system notifications', type: 'email', enabled: false },
    { id: 'push_interviews', label: 'Interview Reminders', description: 'Push notifications for interviews', type: 'push', enabled: true },
    { id: 'push_applications', label: 'New Applications', description: 'Push alerts for applications', type: 'push', enabled: false },
    { id: 'push_system', label: 'System Alerts', description: 'Critical system push notifications', type: 'push', enabled: true },
  ];

  const getNotificationIcon = (type: string) => {
    const icons = {
      interview: Calendar,
      application: Users,
      system: AlertCircle,
      approval: CheckCircle,
    };
    const IconComponent = icons[type as keyof typeof icons] || Bell;
    return <IconComponent className="h-5 w-5" />;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 hover:bg-red-100';
      case 'medium': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'low': return 'bg-green-100 text-green-800 hover:bg-green-100';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Notifications</h1>
          <p className="text-slate-600 dark:text-slate-300 mt-2">Manage your notification preferences and view alerts</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Bell className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Total Notifications</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">24</p>
              </div>
              <Bell className="h-8 w-8 text-indigo-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Unread</p>
                <p className="text-3xl font-bold text-red-600">8</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">High Priority</p>
                <p className="text-3xl font-bold text-orange-600">3</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">This Week</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">16</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="notifications" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="notifications">Recent Notifications</TabsTrigger>
          <TabsTrigger value="settings">Notification Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>Stay updated with the latest alerts and messages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-4 border rounded-lg ${
                      notification.status === 'unread' 
                        ? 'border-indigo-200 bg-indigo-50 dark:bg-indigo-950 dark:border-indigo-800' 
                        : 'border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${
                          notification.status === 'unread' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-slate-900 dark:text-white">{notification.title}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{notification.message}</p>
                          <p className="text-xs text-slate-400 mt-2">{notification.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getPriorityColor(notification.priority)}>
                          {notification.priority}
                        </Badge>
                        {notification.status === 'unread' && (
                          <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-indigo-500" />
                  <CardTitle>Email Notifications</CardTitle>
                </div>
                <CardDescription>Configure email notification preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notificationSettings.filter(setting => setting.type === 'email').map((setting) => (
                    <div key={setting.id} className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-slate-900 dark:text-white">{setting.label}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{setting.description}</p>
                      </div>
                      <Switch checked={setting.enabled} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-purple-500" />
                  <CardTitle>Push Notifications</CardTitle>
                </div>
                <CardDescription>Configure push notification preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notificationSettings.filter(setting => setting.type === 'push').map((setting) => (
                    <div key={setting.id} className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-slate-900 dark:text-white">{setting.label}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{setting.description}</p>
                      </div>
                      <Switch checked={setting.enabled} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Notifications;
