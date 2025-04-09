import './assets/styles/App.css';
import SignIn from './pages/Authentication/SignIn';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
}

export default App;
