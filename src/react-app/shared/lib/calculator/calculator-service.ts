import Decimal from "decimal.js";

export type Operation = "add" | "subtract" | "multiply" | "divide" | "power";

export const CalculatorService = {
  add: (a: Decimal, b: Decimal): Decimal => a.plus(b),
  subtract: (a: Decimal, b: Decimal): Decimal => a.minus(b),
  multiply: (a: Decimal, b: Decimal): Decimal => a.times(b),
  divide: (a: Decimal, b: Decimal): Decimal => {
    if (b.isZero()) {
      throw new Error("Division by zero");
    }
    return a.dividedBy(b);
  },
  power: (a: Decimal, b: Decimal): Decimal => a.pow(b),
};

export const calculate = (a: string, b: string, operation: Operation): string => {
  const numA = new Decimal(a);
  const numB = new Decimal(b);
  const result = CalculatorService[operation](numA, numB);
  return result.toString();
};
