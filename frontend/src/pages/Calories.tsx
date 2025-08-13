import { useState } from 'react';
import axios from 'axios';
import FormInput from '../components/FormInput';
import ThemeToggle from '../components/ThemeToggle';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

interface Meal {
  dishName: string;
  servings: number;
  caloriesPerServing: number | string;
  totalCalories: number;
  date: string;
  dataSource: string;
}

export default function Calories() {
  const [form, setForm] = useState({ dishName: '', servings: '' });
  const [result, setResult] = useState<Meal | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [previousMeals, setPreviousMeals] = useState<Meal[]>([]);
  const navigate = useNavigate();

  const addMeal = (meal: Meal) => {
    setPreviousMeals((prev) => [...prev, meal]);
  };

  const clearMeals = () => {
    setPreviousMeals([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Please login');
      const res = await axios.post('http://localhost:8000/get-calories', {
        dish_name: form.dishName,
        servings: parseFloat(form.servings),
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const newMeal = {
        dishName: res.data.dish_name,
        servings: res.data.servings,
        caloriesPerServing: res.data.calories_per_serving || 'N/A',
        totalCalories: res.data.total_calories,
        date: new Date().toISOString(),
        dataSource: res.data.source || 'Unknown',
      };
      if (result) {
        addMeal(result);
      }
      setResult(newMeal);
      setForm({ dishName: '', servings: '' });
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-50 dark:bg-gray-900 relative p-4 sm:p-6 lg:p-8">
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
      </div>
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary dark:text-purple-200">Get Calories</h2>
        <form onSubmit={handleSubmit}>
          <FormInput label="Dish Name" type="text" value={form.dishName} onChange={(e) => setForm({ ...form, dishName: e.target.value })} />
          <FormInput label="Servings" type="number" value={form.servings} onChange={(e) => setForm({ ...form, servings: e.target.value })} />
          <Button type="submit" className="w-full mt-4" disabled={loading}>
            {loading ? <div className="loader"></div> : 'Calculate'}
          </Button>
        </form>
        {error && <p className="text-error mt-4 text-center">{error}</p>}
        {result && (
          <div className="mt-6 text-center bg-purple-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-primary dark:text-purple-200">Current Meal</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-primary dark:text-purple-200">
              <span><strong>Dish:</strong> {result.dishName}</span>
              <span><strong>Servings:</strong> {result.servings}</span>
              <span><strong>Calories per Serving:</strong> {result.caloriesPerServing} kcal</span>
              <span><strong>Total Calories:</strong> {result.totalCalories} kcal</span>
              <span><strong>Date:</strong> {new Date(result.date).toLocaleDateString()}</span>
              <span><strong>Source:</strong> {result.dataSource}</span>
            </div>
          </div>
        )}
        {previousMeals.length > 0 && (
          <div className="mt-6 text-center bg-purple-50 dark:bg-gray-700 p-4 rounded-lg max-h-[100px] overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#8B5CF6 transparent' }}>
            <h3 className="text-lg font-semibold mb-2 text-primary dark:text-purple-200">Previous Meals</h3>
            <ul className="space-y-4">
              {previousMeals.map((meal, index) => (
                <li key={index} className="grid grid-cols-2 gap-2 text-sm text-primary dark:text-purple-200">
                  <span><strong>Dish:</strong> {meal.dishName}</span>
                  <span><strong>Servings:</strong> {meal.servings}</span>
                  <span><strong>Calories per Serving:</strong> {meal.caloriesPerServing} kcal</span>
                  <span><strong>Total Calories:</strong> {meal.totalCalories} kcal</span>
                  <span><strong>Date:</strong> {new Date(meal.date).toLocaleDateString()}</span>
                  <span><strong>Source:</strong> {meal.dataSource}</span>
                </li>
              ))}
            </ul>
            <Button variant="link" onClick={clearMeals} className="mt-4 text-error">
              Clear History
            </Button>
          </div>
        )}
        <Button variant="link" onClick={() => { localStorage.removeItem('token'); navigate('/'); }} className="mt-4">
          Logout
        </Button>
      </div>
    </div>
  );
}