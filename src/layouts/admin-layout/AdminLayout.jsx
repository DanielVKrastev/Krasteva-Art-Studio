import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/sidebar/Sidebar";

export default function AdminLayout() {
  return (
    <div className="admin-wrapper min-h-screen flex flex-col">
      
      <Sidebar />

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}