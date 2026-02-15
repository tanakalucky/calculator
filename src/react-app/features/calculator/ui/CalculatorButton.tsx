import { cn } from "@/shared/lib";
import type { ButtonVariant } from "../model/types";

type CalculatorButtonProps = {
  label: string;
  onClick: () => void;
  variant?: ButtonVariant;
  className?: string;
};

export function CalculatorButton({
  label,
  onClick,
  variant = "default",
  className,
}: CalculatorButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-center rounded-lg font-medium text-lg transition-colors",
        "active:scale-95 transition-transform",
        {
          "bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100":
            variant === "default",
          "bg-orange-500 hover:bg-orange-600 text-white dark:bg-orange-600 dark:hover:bg-orange-700":
            variant === "operator",
          "bg-green-500 hover:bg-green-600 text-white dark:bg-green-600 dark:hover:bg-green-700":
            variant === "equals",
          "bg-red-500 hover:bg-red-600 text-white dark:bg-red-600 dark:hover:bg-red-700":
            variant === "clear",
        },
        className,
      )}
    >
      {label}
    </button>
  );
}
