import type { Operation } from "@/shared/lib/calculator";

export type CalculatorState = {
  display: string;
  previousValue: string | null;
  operation: Operation | null;
  waitingForOperand: boolean;
  error: string | null;
  expression: string;
};

export type ButtonVariant = "default" | "operator" | "equals" | "clear";
