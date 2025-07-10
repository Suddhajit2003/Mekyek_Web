
import React from 'react';
import { Puzzle, Plus, Settings, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';

const Integrations = () => {
  const integrations = [
    {
      id: 1,
      name: 'Google Workspace',
      description: 'Single sign-on and calendar integration',
      category: 'Authentication',
      status: 'Connected',
      icon: '🔐',
      features: ['SSO', 'Calendar Sync', 'Email Integration']
    },
    {
      id: 2,
      name: 'LinkedIn',
      description: 'Post jobs and source candidates',
      category: 'Job Boards',
      status: 'Connected',
      icon: '💼',
      features: ['Job Posting', 'Candidate Sourcing', 'Profile Import']
    },
    {
      id: 3,
      name: 'Slack',
      description: 'Team communication and notifications',
      category: 'Communication',
      status: 'Available',
      icon: '💬',
      features: ['Notifications', 'Team Chat', 'File Sharing']
    },
    {
      id: 4,
      name: 'Zoom',
      description: 'Video interviews and meetings',
      category: 'Video Conferencing',
      status: 'Connected',
      icon: '📹',
      features: ['Video Interviews', 'Meeting Scheduling', 'Recording']
    },
    {
      id: 5,
      name: 'Indeed',
      description: 'Post jobs to Indeed job board',
      category: 'Job Boards',
      status: 'Available',
      icon: '🔍',
      features: ['Job Posting', 'Application Tracking', 'Analytics']
    },
    {
      id: 6,
      name: 'Calendly',
      description: 'Interview scheduling automation',
      category: 'Scheduling',
      status: 'Available',
      icon: '📅',
      features: ['Auto Scheduling', 'Calendar Sync', 'Reminders']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Connected': return 'bg-green-100 text-green-800';
      case 'Available': return 'bg-blue-100 text-blue-800';
      case 'Error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Connected': return <CheckCircle className="w-4 h-4" />;
      case 'Error': return <AlertCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const categories = ['All', 'Authentication', 'Job Boards', 'Communication', 'Video Conferencing', 'Scheduling'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Integrations</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Connect third-party tools and services</p>
        </div>
        <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
          <Plus className="w-4 h-4 mr-2" />
          Browse All
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Integrations</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">25</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Puzzle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Connected</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">8</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Available</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">17</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <Plus className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Categories</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">6</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button 
                key={category} 
                variant={category === 'All' ? 'default' : 'outline'}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {integrations.map((integration) => (
          <Card key={integration.id} className="hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{integration.icon}</div>
                  <div>
                    <CardTitle className="text-lg">{integration.name}</CardTitle>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{integration.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(integration.status)}
                  <Badge className={getStatusColor(integration.status)}>
                    {integration.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600 dark:text-slate-400">{integration.description}</p>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-900 dark:text-white">Features:</p>
                <div className="flex flex-wrap gap-1">
                  {integration.features.map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-2">
                {integration.status === 'Connected' ? (
                  <div className="flex items-center gap-2">
                    <Switch defaultChecked />
                    <span className="text-sm text-slate-600 dark:text-slate-400">Enabled</span>
                  </div>
                ) : (
                  <div />
                )}
                
                <div className="flex gap-2">
                  {integration.status === 'Connected' ? (
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Configure
                    </Button>
                  ) : (
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Connect
                    </Button>
                  )}
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Integrations;
