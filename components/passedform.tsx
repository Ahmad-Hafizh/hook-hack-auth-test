import { useState } from "react";

interface PassedFormProps {
  onPass: (status: boolean) => void;
}

const PassedForm = ({ onPass }: PassedFormProps) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const password = "samurai";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === password) {
      onPass(true);
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
      <div className="relative w-full flex items-center">
        <input
          type={showPassword ? "text" : "password"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter password"
          className="border rounded px-3 py-2 w-full"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500 px-2 py-1"
          tabIndex={-1}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
      {error && <div className="text-red-500">{error}</div>}
    </form>
  );
};

export default PassedForm;