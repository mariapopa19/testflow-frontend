import { GoogleLogin } from '@react-oauth/google';
import { loginWithGoogle, registerWithGoogle } from '../../services/authService';

const GoogleAuth = () => {
  const handleLogin = async (token: string) => {
    try {
      const response = await loginWithGoogle(token);
      localStorage.setItem('access_token', response.token);
      alert(`Welcome back, ${response.name}`);
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  const handleRegister = async (token: string) => {
    try {
      const response = await registerWithGoogle(token);
      localStorage.setItem('access_token', response.token);
      alert(`Account created, welcome ${response.name}`);
    } catch (err) {
      console.error('Register failed', err);
    }
  };

  return (
    <div>
      <h3>Login with Google</h3>
      <GoogleLogin
        onSuccess={(cred) => cred.credential && handleLogin(cred.credential)}
        onError={() => console.log('Login failed')}
      />

      <h3>Create Account with Google</h3>
      <GoogleLogin
        onSuccess={(cred) => cred.credential && handleRegister(cred.credential)}
        onError={() => console.log('Register failed')}
      />
    </div>
  );
};

export default GoogleAuth;
