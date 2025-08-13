import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import ThemeToggle from '../components/ThemeToggle';
import { Button } from '../components/ui/button';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/auth/login', form);
      localStorage.setItem('token', res.data.token);
      setError('');
      navigate('/calories');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50 dark:bg-gray-900 relative p-4 sm:p-6 lg:p-8">
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
      </div>
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary dark:text-purple-200">Login</h2>
        <form onSubmit={handleSubmit}>
          <FormInput label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <FormInput label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <Button type="submit" className="w-full mt-4" disabled={loading}>
            {loading ? <div className="loader"></div> : 'Login'}
          </Button>
        </form>
        {error && <p className="text-error mt-4 text-center">{error}</p>}
        <p className="mt-4 text-center">
          No account? <Link to="/register" className="text-primary hover:underline dark:text-purple-400">Register</Link>
        </p>
      </div>
    </div>
  );
}
