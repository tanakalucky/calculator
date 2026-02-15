export type Operation = "add" | "subtract" | "multiply" | "divide" | "power";

export type CalculatorState = {
  display: string;
  previousValue: string | null;
  operation: Operation | null;
  waitingForOperand: boolean;
  error: string | null;
};

export type ButtonVariant = "default" | "operator" | "equals" | "clear";
