interface FormInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput({ label, type, value, onChange }: FormInputProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1 text-primary dark:text-purple-200">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-purple-200 rounded bg-purple-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
        required
      />
    </div>
  );
}
