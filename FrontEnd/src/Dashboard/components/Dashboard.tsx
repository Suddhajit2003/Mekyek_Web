
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { Users, FileText, Calendar, TrendingUp, Clock, CheckCircle, AlertTriangle, DollarSign, Target, Award } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Candidates',
      value: '2,847',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950'
    },
    {
      title: 'Active Jobs',
      value: '24',
      change: '+3%',
      trend: 'up',
      icon: FileText,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950'
    },
    {
      title: 'Interviews Scheduled',
      value: '18',
      change: '+8%',
      trend: 'up',
      icon: Calendar,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-950'
    },
    {
      title: 'Monthly Revenue',
      value: '$12,450',
      change: '+15%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50 dark:bg-orange-950'
    }
  ];

  const applicationData = [
    { month: 'Jan', applications: 120, hired: 15, interviews: 45 },
    { month: 'Feb', applications: 135, hired: 18, interviews: 52 },
    { month: 'Mar', applications: 148, hired: 22, interviews: 48 },
    { month: 'Apr', applications: 162, hired: 19, interviews: 61 },
    { month: 'May', applications: 181, hired: 25, interviews: 58 },
    { month: 'Jun', applications: 203, hired: 28, interviews: 65 }
  ];

  const pieData = [
    { name: 'New Applications', value: 35, color: '#6366f1' },
    { name: 'In Review', value: 28, color: '#8b5cf6' },
    { name: 'Interviewed', value: 22, color: '#06b6d4' },
    { name: 'Hired', value: 15, color: '#10b981' }
  ];

  const recentActivity = [
    { 
      type: 'application', 
      message: 'New application from Sarah Johnson for Frontend Developer',
      time: '2 minutes ago',
      status: 'new'
    },
    { 
      type: 'interview', 
      message: 'Interview scheduled with Michael Chen for tomorrow at 2 PM',
      time: '15 minutes ago',
      status: 'scheduled'
    },
    { 
      type: 'hire', 
      message: 'Emily Davis has been hired as UX Designer',
      time: '1 hour ago',
      status: 'success'
    },
    { 
      type: 'review', 
      message: 'Application review completed for David Wilson',
      time: '2 hours ago',
      status: 'completed'
    }
  ];

  const topJobs = [
    { title: 'Senior Frontend Developer', applications: 47, status: 'Active', urgency: 'High' },
    { title: 'Data Scientist', applications: 23, status: 'Active', urgency: 'Medium' },
    { title: 'UX Designer', applications: 31, status: 'Active', urgency: 'Low' },
    { title: 'Product Manager', applications: 19, status: 'Draft', urgency: 'High' }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, Admin!</h1>
            <p className="text-indigo-100 text-lg">Here's what's happening with your recruitment today</p>
          </div>
          <div className="hidden md:block">
            <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
              <Target size={48} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="relative overflow-hidden border-0 shadow-lg">
              <div className={`absolute inset-0 ${stat.bgColor} opacity-50`}></div>
              <CardContent className="relative p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                      {stat.value}
                    </p>
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600 font-medium">
                        {stat.change} from last month
                      </span>
                    </div>
                  </div>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Applications Chart */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Recruitment Trends</CardTitle>
            <p className="text-slate-500 dark:text-slate-400">Applications and hiring over time</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={applicationData}>
                <defs>
                  <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorHired" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="applications" 
                  stroke="#6366f1" 
                  fillOpacity={1} 
                  fill="url(#colorApplications)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="hired" 
                  stroke="#10b981" 
                  fillOpacity={1} 
                  fill="url(#colorHired)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Application Status</CardTitle>
            <p className="text-slate-500 dark:text-slate-400">Current pipeline distribution</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'new' ? 'bg-blue-500' :
                    activity.status === 'scheduled' ? 'bg-purple-500' :
                    activity.status === 'success' ? 'bg-green-500' : 'bg-orange-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {activity.message}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Jobs */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Active Job Positions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topJobs.map((job, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <div className="flex-1">
                    <h3 className="font-medium text-slate-900 dark:text-white">{job.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {job.applications} applications
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={job.status === 'Active' ? 'default' : 'secondary'}>
                      {job.status}
                    </Badge>
                    <Badge 
                      variant="outline"
                      className={
                        job.urgency === 'High' ? 'border-red-200 text-red-700' :
                        job.urgency === 'Medium' ? 'border-yellow-200 text-yellow-700' :
                        'border-green-200 text-green-700'
                      }
                    >
                      {job.urgency}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
