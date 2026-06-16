import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from '@/components/AppLayout';
import DashboardPage from '@/pages/DashboardPage';
import StudentManagementPage from '@/pages/StudentManagementPage';
import StudentProfilePage from '@/pages/StudentProfilePage';
import AddStudentPage from '@/pages/AddStudentPage';
import PayoutRequestsPage from '@/pages/PayoutRequestsPage';
import TutorManagementPage from '@/pages/TutorManagementPage';
import RequestsPage from '@/pages/RequestsPage';
import RequestDetailPage from '@/pages/RequestDetailPage';
import SessionsPage from '@/pages/SessionsPage';
import EarningsPage from '@/pages/EarningsPage';
import TuitionMonitoringPage from '@/pages/TuitionMonitoringPage';
import StudentTuitionDetailPage from '@/pages/StudentTuitionDetailPage';
import AnalyticsPage from '@/pages/AnalyticsPage';
import NotificationsPage from '@/pages/NotificationsPage';
import UniversityProfilePage from '@/pages/UniversityProfilePage';
import SettingsPage from '@/pages/SettingsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/student-management" element={<StudentManagementPage />} />
          <Route path="/student-management/new" element={<AddStudentPage />} />
          <Route path="/student-management/:id" element={<StudentProfilePage />} />
          <Route path="/student-management/payouts" element={<PayoutRequestsPage />} />
          <Route path="/tutor-management" element={<TutorManagementPage />} />
          <Route path="/requests" element={<RequestsPage />} />
          <Route path="/requests/:id" element={<RequestDetailPage />} />
          <Route path="/sessions" element={<SessionsPage />} />
          <Route path="/earnings" element={<EarningsPage />} />
          <Route path="/tuition-monitoring" element={<TuitionMonitoringPage />} />
          <Route path="/tuition-monitoring/:id" element={<StudentTuitionDetailPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/university-profile" element={<UniversityProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
