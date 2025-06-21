import './assets/styles/App.css';
import SignIn from './pages/Authentication/SignIn';
import { Route, Routes, Navigate } from 'react-router';
import SignUp from './pages/Authentication/SignUp';
import Endpoints from './pages/Endpoints/Endpoints';
import AppLayout from './layout/AppLayout';
import PrivateRoutes from './components/routes/PrivateRoute';
import AddEndpoint from './pages/Endpoints/AddEndpoint';
import EditEndpointForm from './components/Endpoints/EditEndpointForm';
import Reports from './pages/Reports/Reports';
import TestRuns from './pages/TestRuns/TestRuns';
import Dashboard from './pages/Dashboard/Dashboard';
import FiveZeroZero from './pages/Error/FiveZeroZero';
import NotFound from './pages/Error/NotFound';
import Settings from './pages/Settings/Settings';

function App() {
  return (
    <Routes>
      {/*decomment this when you want to add security to your routes */}
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
          <Route path="/endpoints" element={<Endpoints />} />
          <Route path="/add-endpoint-form" element={<AddEndpoint />} />
          <Route path="/endpoints/edit/:id" element={<EditEndpointForm />} />
          {/* Ambele rute încarcă acum componenta `Reports` */}
          <Route path="/reports" element={<Reports />} />
          <Route path="/reports/:id" element={<Reports />} /> 
          <Route path="/test-runs" element={<TestRuns />} /> 
        </Route>
      </Route>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      {/* Error Pages */}
      <Route path="/500" element={<FiveZeroZero />} />
      <Route path="/404" element={<NotFound />} />

      {/* Catch-all route for paths that don't exist */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
