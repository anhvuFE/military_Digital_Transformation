import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "@/features/auth/pages/LoginPage";
import AdminDashboardPage from "@/features/dashboard/pages/AdminDashboardPage";
import SoldierDashboardPage from "@/features/dashboard/pages/SoldierDashboardPage";
import CourseListPage from "@/features/courses/pages/CourseListPage";
import SessionListPage from "@/features/sessions/pages/SessionListPage";
import PersonalResultsPage from "@/features/results/pages/PersonalResultsPage";
import ReportPage from "@/features/reports/pages/ReportPage";
import CommendationPage from "@/features/commendations/pages/CommendationPage";
import UserProfilePage from "@/features/profile/pages/UserProfilePage";
import UserTrainingHistoryPage from "@/features/training/pages/UserTrainingHistoryPage";
import RoleGuard from "@/components/common/RoleGuard";
import { useAuthStore } from "@/store/authStore";

function Router() {
  const user = useAuthStore((s) => s.user);
  const defaultDashboard =
    user?.role === "ADMIN" ? (
      <RoleGuard allow={["ADMIN"]}>
        <AdminDashboardPage />
      </RoleGuard>
    ) : (
      <RoleGuard allow={["SOLDIER"]}>
        <SoldierDashboardPage />
      </RoleGuard>
    );

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={defaultDashboard} />
      <Route
        path="/courses"
        element={
          <RoleGuard allow={["ADMIN"]}>
            <CourseListPage />
          </RoleGuard>
        }
      />
      <Route
        path="/sessions"
        element={
          <RoleGuard allow={["ADMIN"]}>
            <SessionListPage />
          </RoleGuard>
        }
      />
      <Route
        path="/results"
        element={
          <RoleGuard allow={["SOLDIER"]}>
            <PersonalResultsPage />
          </RoleGuard>
        }
      />
      <Route
        path="/reports"
        element={
          <RoleGuard allow={["ADMIN"]}>
            <ReportPage />
          </RoleGuard>
        }
      />
      <Route
        path="/commendations"
        element={
          <RoleGuard allow={["ADMIN"]}>
            <CommendationPage />
          </RoleGuard>
        }
      />
      <Route
        path="/profile"
        element={
          <RoleGuard allow={["SOLDIER"]}>
            <UserProfilePage />
          </RoleGuard>
        }
      />
      <Route
        path="/training-history"
        element={
          <RoleGuard allow={["SOLDIER"]}>
            <UserTrainingHistoryPage />
          </RoleGuard>
        }
      />
      <Route
        path="/achievements"
        element={
          <RoleGuard allow={["SOLDIER"]}>
            <PersonalResultsPage />
          </RoleGuard>
        }
      />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default Router;
