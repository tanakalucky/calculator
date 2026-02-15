import { cn } from "@/shared/lib";

type CalculatorDisplayProps = {
  value: string;
  error: string | null;
};

const MAX_FONT_SIZE_LENGTH = 10;
const MID_FONT_SIZE_LENGTH = 16;

function getDisplayFontSize(text: string): string {
  if (text.length <= MAX_FONT_SIZE_LENGTH) {
    return "text-4xl";
  }
  if (text.length <= MID_FONT_SIZE_LENGTH) {
    return "text-2xl";
  }
  return "text-xl";
}

export function CalculatorDisplay({ value, error }: CalculatorDisplayProps) {
  const displayText = error ?? value;

  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 overflow-hidden">
      <div
        className={cn(
          "font-mono text-right truncate",
          getDisplayFontSize(displayText),
          error ? "text-red-500" : "text-gray-900 dark:text-gray-100",
        )}
      >
        {displayText}
      </div>
    </div>
  );
}
