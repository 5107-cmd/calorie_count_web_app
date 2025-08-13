import { useState } from "react";

export default function Dashboard() {
  const [calories, setCalories] = useState<number[]>([]);
  const [input, setInput] = useState("");

  const handleAdd = () => {
    const value = parseInt(input);
    if (!isNaN(value)) {
      setCalories([...calories, value]);
      setInput("");
    }
  };

  const totalCalories = calories.reduce((sum, c) => sum + c, 0);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          placeholder="Enter calories"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="p-2 border rounded flex-1"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>
      <ul className="mb-4">
        {calories.map((cal, index) => (
          <li key={index} className="p-2 bg-white rounded shadow mb-2">
            {cal} kcal
          </li>
        ))}
      </ul>
      <div className="text-lg font-bold">
        Total: {totalCalories} kcal
      </div>
    </div>
  );
}
