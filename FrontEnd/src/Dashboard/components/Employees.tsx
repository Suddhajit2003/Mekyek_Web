
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, Plus, Filter, Mail, Phone, MapPin, Calendar, Clock, Award, Users, TrendingUp } from 'lucide-react';

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const employees = [
    {
      id: 1,
      name: 'Alex Thompson',
      email: 'alex.thompson@company.com',
      phone: '+1 (555) 123-4567',
      position: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'New York, NY',
      status: 'Active',
      joinDate: '2023-01-15',
      attendance: 95,
      avatar: 'AT',
      projects: 8,
      skills: ['React', 'TypeScript', 'Node.js'],
      salary: '$125,000'
    },
    {
      id: 2,
      name: 'Sarah Mitchell',
      email: 'sarah.mitchell@company.com',
      phone: '+1 (555) 987-6543',
      position: 'Product Manager',
      department: 'Product',
      location: 'San Francisco, CA',
      status: 'Active',
      joinDate: '2022-08-20',
      attendance: 98,
      avatar: 'SM',
      projects: 12,
      skills: ['Product Strategy', 'Agile', 'Analytics'],
      salary: '$140,000'
    },
    {
      id: 3,
      name: 'Michael Rodriguez',
      email: 'michael.rodriguez@company.com',
      phone: '+1 (555) 456-7890',
      position: 'UX Designer',
      department: 'Design',
      location: 'Remote',
      status: 'Active',
      joinDate: '2023-03-10',
      attendance: 92,
      avatar: 'MR',
      projects: 6,
      skills: ['Figma', 'User Research', 'Prototyping'],
      salary: '$110,000'
    },
    {
      id: 4,
      name: 'Emily Chen',
      email: 'emily.chen@company.com',
      phone: '+1 (555) 234-5678',
      position: 'Data Scientist',
      department: 'Analytics',
      location: 'Austin, TX',
      status: 'On Leave',
      joinDate: '2022-11-05',
      attendance: 88,
      avatar: 'EC',
      projects: 4,
      skills: ['Python', 'Machine Learning', 'SQL'],
      salary: '$135,000'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'On Leave': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Inactive': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 95) return 'text-green-600 dark:text-green-400';
    if (attendance >= 90) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Employee Directory</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Manage your team and employee information</p>
        </div>
        <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-lg">
          <Plus className="h-4 w-4 mr-2" />
          Add Employee
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder="Search employees..."
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

      {/* Employee Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Employees</p>
                <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">248</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Active</p>
                <p className="text-3xl font-bold text-green-900 dark:text-green-100">235</p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">On Leave</p>
                <p className="text-3xl font-bold text-yellow-900 dark:text-yellow-100">8</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                <Calendar className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Avg Attendance</p>
                <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">94%</p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <Award className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Employee Cards */}
      <div className="grid gap-6">
        {filteredEmployees.map((employee) => (
          <Card key={employee.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {employee.avatar}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{employee.name}</h3>
                      <Badge className={getStatusColor(employee.status)}>
                        {employee.status}
                      </Badge>
                    </div>
                    
                    <p className="text-indigo-600 dark:text-indigo-400 font-semibold mb-2">{employee.position}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{employee.department} • {employee.salary}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="truncate">{employee.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>{employee.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>{employee.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      {employee.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col lg:items-end gap-4">
                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Attendance</p>
                      <p className={`text-xl font-bold ${getAttendanceColor(employee.attendance)}`}>
                        {employee.attendance}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Projects</p>
                      <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                        {employee.projects}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="hover:bg-indigo-50 hover:border-indigo-200">
                      View Profile
                    </Button>
                    <Button size="sm" className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white">
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Employees;
