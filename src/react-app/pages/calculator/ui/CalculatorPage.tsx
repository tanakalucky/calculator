import { CalculatorGrid } from "@/features/calculator";

export function CalculatorPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
          電卓
        </h1>
        <CalculatorGrid />
      </div>
    </div>
  );
}
