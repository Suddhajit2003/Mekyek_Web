
import React from 'react';
import { Monitor, Camera, Clock, AlertTriangle, Play, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

const ProofOfWork = () => {
  const activities = [
    {
      id: 1,
      employee: 'John Doe',
      project: 'Website Redesign',
      activity: 'Frontend Development',
      duration: '4h 30m',
      screenshots: 15,
      status: 'Active',
      productivity: 85,
      lastActivity: '2 minutes ago'
    },
    {
      id: 2,
      employee: 'Jane Smith',
      project: 'Mobile App',
      activity: 'UI Design',
      duration: '6h 15m',
      screenshots: 22,
      status: 'Break',
      productivity: 92,
      lastActivity: '15 minutes ago'
    },
    {
      id: 3,
      employee: 'Mike Johnson',
      project: 'Database Migration',
      activity: 'Data Analysis',
      duration: '3h 45m',
      screenshots: 12,
      status: 'Inactive',
      productivity: 78,
      lastActivity: '1 hour ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Break': return 'bg-yellow-100 text-yellow-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProductivityColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Proof of Work</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Monitor employee activity and productivity</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
            <Monitor className="w-4 h-4 mr-2" />
            Live View
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Active Users</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">8</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <Monitor className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Screenshots Today</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">324</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Camera className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Hours</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">42.5</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Avg Productivity</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">85%</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Monitor */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="w-5 h-5" />
            Real-time Activity Monitor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-slate-900 dark:text-white">{activity.employee}</h3>
                      <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
                      <span className="text-sm text-slate-500">on {activity.project}</span>
                    </div>
                    
                    <p className="text-slate-600 dark:text-slate-400 mb-3">{activity.activity}</p>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-slate-500">Duration:</span>
                        <p className="font-medium">{activity.duration}</p>
                      </div>
                      <div>
                        <span className="text-slate-500">Screenshots:</span>
                        <p className="font-medium">{activity.screenshots}</p>
                      </div>
                      <div>
                        <span className="text-slate-500">Productivity:</span>
                        <p className={`font-medium ${getProductivityColor(activity.productivity)}`}>
                          {activity.productivity}%
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-500">Last Activity:</span>
                        <p className="font-medium">{activity.lastActivity}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-500">Productivity Score</span>
                        <span className="font-medium">{activity.productivity}%</span>
                      </div>
                      <Progress value={activity.productivity} className="h-2" />
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Camera className="w-4 h-4 mr-2" />
                      Screenshots
                    </Button>
                    <Button variant="outline" size="sm">
                      <Play className="w-4 h-4 mr-2" />
                      Timelapse
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProofOfWork;
