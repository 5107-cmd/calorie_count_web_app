import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import { Button } from '../components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-50 dark:bg-gray-900 relative p-4 sm:p-6 lg:p-8">
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
      </div>
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-primary dark:text-purple-200">Meal Calorie Count Generator</h1>
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <Button variant="default">
          <Link to="/register" className="w-full sm:w-32 text-center">Register</Link>
        </Button>
        <Button variant="secondary">
          <Link to="/login" className="w-full sm:w-32 text-center">Login</Link>
        </Button>
        <Button variant="outline">
          <Link to="/calories" className="w-full sm:w-32 text-center">Get Calories</Link>
        </Button>
      </div>
    </div>
  );
}
