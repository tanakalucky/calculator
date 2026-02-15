import { cn } from "@/shared/lib";

type CalculatorDisplayProps = {
  value: string;
  error: string | null;
};

export function CalculatorDisplay({ value, error }: CalculatorDisplayProps) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
      <div
        className={cn(
          "font-mono text-4xl text-right",
          error ? "text-red-500" : "text-gray-900 dark:text-gray-100",
        )}
      >
        {error || value}
      </div>
    </div>
  );
}
