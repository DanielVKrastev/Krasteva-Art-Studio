import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/sidebar/Sidebar";
import AdminProvider from "../../providers/AdminProvider";
import PrivateAdminGuard from "../../guards/PrivateAdminGuard";

export default function AdminLayout() {
  return (
    <AdminProvider>
      <PrivateAdminGuard>
        <div className="admin-wrapper min-h-screen flex flex-col">

          <Sidebar />

          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
        </PrivateAdminGuard>
        </AdminProvider>
  );
}