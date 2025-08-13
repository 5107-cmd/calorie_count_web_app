import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FormInput from '../components/FormInput';
import ThemeToggle from '../components/ThemeToggle';
import { Button } from '../components/ui/button';

export default function Register() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:8000/auth/register', {
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        password: form.password,
      });
      setSuccess('Registered! Go to login.');
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed');
      setSuccess('');
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
        <h2 className="text-2xl font-bold mb-6 text-center text-primary dark:text-purple-200">Register</h2>
        <form onSubmit={handleSubmit}>
          <FormInput label="First Name" type="text" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
          <FormInput label="Last Name" type="text" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
          <FormInput label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <FormInput label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <Button type="submit" className="w-full mt-4" disabled={loading}>
            {loading ? <div className="loader"></div> : 'Register'}
          </Button>
        </form>
        {error && <p className="text-error mt-4 text-center">{error}</p>}
        {success && <p className="text-success mt-4 text-center">{success}</p>}
        <p className="mt-4 text-center">
          Have an account? <Link to="/login" className="text-primary hover:underline dark:text-purple-400">Login</Link>
        </p>
      </div>
    </div>
  );
}
