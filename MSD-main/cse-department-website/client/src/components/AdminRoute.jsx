// Admin route guard.
// IMPORTANT: this only hides pages in the UI. Real security is enforced
// on the server by the "protect" middleware in Express.
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const token = localStorage.getItem("adminToken");
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}
