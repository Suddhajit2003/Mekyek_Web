
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Search, Plus, Filter, Eye, MessageSquare, Star, Calendar, MapPin, DollarSign, Briefcase, TrendingUp } from 'lucide-react';

const ATS = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const jobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'Remote',
      salary: '$120K - $150K',
      status: 'Active',
      applications: 47,
      posted: '2 days ago',
      urgent: true
    },
    {
      id: 2,
      title: 'Data Scientist',
      department: 'Analytics',
      location: 'New York',
      salary: '$130K - $160K',
      status: 'Active',
      applications: 23,
      posted: '1 week ago',
      urgent: false
    },
    {
      id: 3,
      title: 'UX Designer',
      department: 'Design',
      location: 'San Francisco',
      salary: '$100K - $130K',
      status: 'Draft',
      applications: 0,
      posted: 'Draft',
      urgent: false
    },
    {
      id: 4,
      title: 'Product Manager',
      department: 'Product',
      location: 'Remote',
      salary: '$140K - $170K',
      status: 'Active',
      applications: 31,
      posted: '5 days ago',
      urgent: true
    }
  ];

  const applications = [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'Senior Frontend Developer',
      email: 'sarah.johnson@email.com',
      status: 'In Review',
      score: 92,
      experience: '5 years',
      skills: ['React', 'TypeScript', 'Node.js'],
      appliedDate: '2024-01-15',
      avatar: 'SJ',
      location: 'New York'
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'Data Scientist',
      email: 'michael.chen@email.com',
      status: 'Shortlisted',
      score: 88,
      experience: '3 years',
      skills: ['Python', 'Machine Learning', 'SQL'],
      appliedDate: '2024-01-14',
      avatar: 'MC',
      location: 'San Francisco'
    },
    {
      id: 3,
      name: 'Emily Davis',
      position: 'UX Designer',
      email: 'emily.davis@email.com',
      status: 'Interviewed',
      score: 95,
      experience: '4 years',
      skills: ['Figma', 'User Research', 'Prototyping'],
      appliedDate: '2024-01-12',
      avatar: 'ED',
      location: 'Remote'
    },
    {
      id: 4,
      name: 'David Wilson',
      position: 'Senior Frontend Developer',
      email: 'david.wilson@email.com',
      status: 'Hired',
      score: 90,
      experience: '6 years',
      skills: ['Vue.js', 'React', 'GraphQL'],
      appliedDate: '2024-01-10',
      avatar: 'DW',
      location: 'Austin'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      case 'Closed': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'In Review': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Shortlisted': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Interviewed': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'Hired': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 dark:text-green-400';
    if (score >= 80) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Applicant Tracking System</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Manage your hiring pipeline efficiently</p>
        </div>
        <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-lg">
          <Plus className="h-4 w-4 mr-2" />
          Post New Job
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Applications</p>
                <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">101</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Active Jobs</p>
                <p className="text-3xl font-bold text-green-900 dark:text-green-100">8</p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Interviews</p>
                <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">12</p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <Calendar className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Hired This Month</p>
                <p className="text-3xl font-bold text-orange-900 dark:text-orange-100">5</p>
              </div>
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                <Star className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="applications" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-slate-100 dark:bg-slate-800">
          <TabsTrigger value="applications" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">Applications</TabsTrigger>
          <TabsTrigger value="jobs" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">Job Management</TabsTrigger>
          <TabsTrigger value="talent-pool" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">Talent Pool</TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-0 bg-slate-100 dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <Button variant="outline" className="border-slate-200 dark:border-slate-700">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Applications List */}
          <div className="grid gap-6">
            {applications.map((app) => (
              <Card key={app.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {app.avatar}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{app.name}</h3>
                        <p className="text-slate-600 dark:text-slate-400">{app.email}</p>
                        <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">Applied for {app.position}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-slate-500 dark:text-slate-400">
                          <span>{app.experience} experience</span>
                          <span>•</span>
                          <span>{app.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      <div className="flex flex-col items-start lg:items-end">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm text-slate-500 dark:text-slate-400">ATS Score:</span>
                          <span className={`font-bold text-lg ${getScoreColor(app.score)}`}>{app.score}%</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {app.skills.slice(0, 3).map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <Badge className={`${getStatusColor(app.status)} px-3 py-1`}>
                        {app.status}
                      </Badge>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="hover:bg-indigo-50 hover:border-indigo-200">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="hover:bg-purple-50 hover:border-purple-200">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="hover:bg-yellow-50 hover:border-yellow-200">
                          <Star className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="jobs" className="space-y-6">
          <div className="grid gap-6">
            {jobs.map((job) => (
              <Card key={job.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-4">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{job.title}</h3>
                        {job.urgent && (
                          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                            Urgent
                          </Badge>
                        )}
                        <Badge className={getStatusColor(job.status)}>
                          {job.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center text-slate-600 dark:text-slate-400">
                          <MapPin className="h-4 w-4 mr-2" />
                          {job.location}
                        </div>
                        <div className="flex items-center text-slate-600 dark:text-slate-400">
                          <DollarSign className="h-4 w-4 mr-2" />
                          {job.salary}
                        </div>
                        <div className="flex items-center text-slate-600 dark:text-slate-400">
                          <Calendar className="h-4 w-4 mr-2" />
                          {job.posted}
                        </div>
                        <div className="flex items-center">
                          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                            {job.applications} applications
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <Button size="sm" variant="outline" className="hover:bg-indigo-50 hover:border-indigo-200">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button size="sm" className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white">
                        Edit Job
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="talent-pool" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Build Your Talent Pool
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
                  Save promising candidates for future opportunities and build a strong talent pipeline.
                </p>
                <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-lg">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Candidate to Pool
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ATS;
