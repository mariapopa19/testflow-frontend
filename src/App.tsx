import './assets/styles/App.css';
import SignIn from './pages/Authentication/SignIn';
import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/Authentication/SignUp';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
