import { Navigate, Outlet } from 'react-router-dom';
const PrivateRoutes: React.FC = () => {
  const isAuthenticated: boolean = !!sessionStorage.getItem('access_token');
  return (
    // the outlet renders the child routes
    // if the user is authenticated, otherwise redirect to the signin page
    isAuthenticated ? <Outlet /> : <Navigate to="/signin" />
  );
};

export default PrivateRoutes;
