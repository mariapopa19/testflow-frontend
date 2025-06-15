import './assets/styles/App.css';
import SignIn from './pages/Authentication/SignIn';
import { Route, Routes } from 'react-router';
import SignUp from './pages/Authentication/SignUp';
import Endpoints from './pages/Endpoints/Endpoints';
import AppLayout from './layout/AppLayout';
import PrivateRoutes from './components/routes/PrivateRoute';
import AddEndpoint from './pages/Endpoints/AddEndpoint';
import EditEndpointForm from './components/Endpoints/EditEndpointForm';
import Reports from './pages/Reports/Reports';
import TestRuns from './pages/TestRuns/TestRuns';

function App() {
  return (
    <Routes>
      {/*decomment this when you want to add security to your routes */}
      <Route element={<PrivateRoutes />}>
        <Route element={<AppLayout />}>
          <Route path="/endpoints" element={<Endpoints />} />
          <Route path="/add-endpoint-form" element={<AddEndpoint />} />
          <Route path="/endpoints/edit/:id" element={<EditEndpointForm  />} />
           {/* Ambele rute încarcă acum componenta `Reports` */}
          <Route path="/reports" element={<Reports />} />
          <Route path="/reports/:id" element={<Reports />} /> 
          <Route path="/test-runs" element={<TestRuns />} /> 
        </Route>
      </Route>
      <Route path="/" element={<SignIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
