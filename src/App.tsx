import './assets/styles/App.css';
import SignIn from './pages/Authentication/SignIn';
import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/Authentication/SignUp';
import Endpoints from './pages/Endpoints/Endpoints';
import AppLayout from './layout/AppLayout';
import PrivateRoutes from './components/routes/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route element={<AppLayout />}>
          <Route path="/endpoints" element={<Endpoints />} />
        </Route>
      </Route>
      <Route path="/" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
