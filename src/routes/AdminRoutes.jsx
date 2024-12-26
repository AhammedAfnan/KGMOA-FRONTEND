import { Routes, Route } from 'react-router-dom';
import AdminLogin from '../pages/admin/AdminLogin';
import Dashboard from '../pages/admin/Dashboard';
import Password from '../pages/admin/Password';
import AddNewsPage from '../pages/admin/News';
import PrivateRoute from '../components/PrivateRoute';


export default function AdminRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute role="admin">
            <Dashboard />
          </PrivateRoute>
        }
      />
      
      <Route path="/login" element={<AdminLogin />} />
      
      <Route
        path="/password"
        element={
          <PrivateRoute role="admin">
            <Password />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/news"
        element={
          <PrivateRoute role="admin">
            <AddNewsPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
