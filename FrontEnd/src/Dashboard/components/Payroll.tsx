
import React from 'react';
import { DollarSign, Download, Calendar, Users, TrendingUp, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const Payroll = () => {
  const payrollData = [
    {
      id: 1,
      employee: 'John Doe',
      position: 'Senior Developer',
      baseSalary: 5000,
      overtime: 250,
      bonus: 500,
      deductions: 150,
      netPay: 5600,
      status: 'Paid'
    },
    {
      id: 2,
      employee: 'Jane Smith',
      position: 'UI/UX Designer',
      baseSalary: 4000,
      overtime: 180,
      bonus: 300,
      deductions: 120,
      netPay: 4360,
      status: 'Pending'
    },
    {
      id: 3,
      employee: 'Mike Johnson',
      position: 'Project Manager',
      baseSalary: 4500,
      overtime: 200,
      bonus: 400,
      deductions: 135,
      netPay: 4965,
      status: 'Paid'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Payroll & HR</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage payroll, attendance, and HR operations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Payroll
          </Button>
          <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
            <DollarSign className="w-4 h-4 mr-2" />
            Process Payroll
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Payroll</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">$42,500</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Employees</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">24</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Avg Attendance</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">94%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Overtime Hours</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">156</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="payroll" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="payroll" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Monthly Payroll - January 2024
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="text-left p-3 font-medium text-slate-900 dark:text-white">Employee</th>
                      <th className="text-left p-3 font-medium text-slate-900 dark:text-white">Position</th>
                      <th className="text-right p-3 font-medium text-slate-900 dark:text-white">Base Salary</th>
                      <th className="text-right p-3 font-medium text-slate-900 dark:text-white">Overtime</th>
                      <th className="text-right p-3 font-medium text-slate-900 dark:text-white">Bonus</th>
                      <th className="text-right p-3 font-medium text-slate-900 dark:text-white">Deductions</th>
                      <th className="text-right p-3 font-medium text-slate-900 dark:text-white">Net Pay</th>
                      <th className="text-center p-3 font-medium text-slate-900 dark:text-white">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payrollData.map((item) => (
                      <tr key={item.id} className="border-b border-slate-100 dark:border-slate-800">
                        <td className="p-3">
                          <div className="font-medium text-slate-900 dark:text-white">{item.employee}</div>
                        </td>
                        <td className="p-3 text-slate-600 dark:text-slate-400">{item.position}</td>
                        <td className="p-3 text-right font-medium">${item.baseSalary.toLocaleString()}</td>
                        <td className="p-3 text-right text-green-600">${item.overtime}</td>
                        <td className="p-3 text-right text-blue-600">${item.bonus}</td>
                        <td className="p-3 text-right text-red-600">-${item.deductions}</td>
                        <td className="p-3 text-right font-bold text-slate-900 dark:text-white">${item.netPay.toLocaleString()}</td>
                        <td className="p-3 text-center">
                          <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Attendance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Calendar className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600 dark:text-slate-400">Attendance tracking coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                HR Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600 dark:text-slate-400">HR reports coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Payroll;
