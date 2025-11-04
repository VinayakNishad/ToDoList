import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = () => {
  const { token } = useAuth();

  // If there's no token, redirect to the /login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If there is a token, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;