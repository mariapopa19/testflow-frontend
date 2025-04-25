import './assets/styles/App.css';
import SignIn from './pages/Authentication/SignIn';
import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/Authentication/SignUp';
import Endpoints from './pages/Endpoints/Endpoints';
import AppLayout from './layout/AppLayout';
import PrivateRoutes from './components/routes/PrivateRoute';
import AddEndpoint from './pages/Endpoints/AddEndpoint';
import EditEndpointForm from './components/Endpoints/EditEndpointForm';

function App() {
  return (
    <Routes>
      {/*decomment this when you want to add security to your routes */}
      <Route element={<PrivateRoutes />}>
        <Route element={<AppLayout />}>
          <Route path="/endpoints" element={<Endpoints />} />
          <Route path="/add-endpoint-form" element={<AddEndpoint />} />
          <Route path="/endpoints/edit/:id" element={<EditEndpointForm  />} />
        </Route>
      </Route>
      <Route path="/" element={<SignIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
