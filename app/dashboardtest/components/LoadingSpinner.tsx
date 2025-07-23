interface LoadingSpinnerProps {
  title?: string;
  subtitle?: string;
}

export default function LoadingSpinner({
  title = "Loading...",
  subtitle = "Please wait while we prepare your workspace.",
}: LoadingSpinnerProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#272727]">
      <div className="flex flex-col items-center">
        <svg
          className="animate-spin h-12 w-12 text-[#fe2858] mb-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          />
        </svg>
        <h2 className="text-2xl font-bold text-[#fe2858] mb-2">{title}</h2>
        <p className="text-gray-300">{subtitle}</p>
      </div>
    </div>
  );
}
