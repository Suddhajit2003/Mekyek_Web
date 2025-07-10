import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ATSPage from "./pages/ATSPage";
import EmployeesPage from "./pages/EmployeesPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProofOfWorkPage from "./pages/ProofOfWorkPage";
import PayrollPage from "./pages/PayrollPage";
import ReportsPage from "./pages/ReportsPage";
import IntegrationsPage from "./pages/IntegrationsPage";
import UserManagementPage from "./pages/UserManagementPage";
import NotificationsPage from "./pages/NotificationsPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

interface DashboardAppProps {
  onBackToMain?: () => void;
}

const DashboardApp: React.FC<DashboardAppProps> = ({ onBackToMain }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index onBackToMain={onBackToMain} />} />
          <Route path="/ats" element={<ATSPage onBackToMain={onBackToMain} />} />
          <Route path="/employees" element={<EmployeesPage onBackToMain={onBackToMain} />} />
          <Route path="/projects" element={<ProjectsPage onBackToMain={onBackToMain} />} />
          <Route path="/proof-of-work" element={<ProofOfWorkPage onBackToMain={onBackToMain} />} />
          <Route path="/payroll" element={<PayrollPage onBackToMain={onBackToMain} />} />
          <Route path="/reports" element={<ReportsPage onBackToMain={onBackToMain} />} />
          <Route path="/integrations" element={<IntegrationsPage onBackToMain={onBackToMain} />} />
          <Route path="/user-management" element={<UserManagementPage onBackToMain={onBackToMain} />} />
          <Route path="/notifications" element={<NotificationsPage onBackToMain={onBackToMain} />} />
          <Route path="/settings" element={<SettingsPage onBackToMain={onBackToMain} />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound onBackToMain={onBackToMain} />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default DashboardApp; 