import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AdminContext } from "../contexts/AdminContext";
import LoadingSpinner from "../components/partials/loading-spinner/LoadingSpinner";

export default function PrivateAdminGuard({ children }) {
  const { admin, loading } = useContext(AdminContext);
  const location = useLocation();
  
  if (loading) {
    return <LoadingSpinner />; // or loader/spinner
  }

  if (!admin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
