import { useState, useCallback } from "react";
import { calculate } from "@/shared/lib/calculator";
import type { Operation } from "@/shared/lib/calculator";
import type { CalculatorState } from "./types";

const MAX_DISPLAY_DIGITS = 16;

const OPERATION_SYMBOLS: Record<Operation, string> = {
  add: "+",
  subtract: "−",
  multiply: "×",
  divide: "÷",
  power: "^",
};

export const useCalculator = () => {
  const [state, setState] = useState<CalculatorState>({
    display: "0",
    previousValue: null,
    operation: null,
    waitingForOperand: false,
    error: null,
    expression: "",
  });

  const clear = useCallback(() => {
    setState({
      display: "0",
      previousValue: null,
      operation: null,
      waitingForOperand: false,
      error: null,
      expression: "",
    });
  }, []);

  const inputDigit = useCallback((digit: string) => {
    setState((prevState) => {
      // エラー状態の場合、クリアして新しい入力を開始
      if (prevState.error) {
        return {
          display: digit,
          previousValue: null,
          operation: null,
          waitingForOperand: false,
          error: null,
          expression: "",
        };
      }

      if (prevState.waitingForOperand) {
        return {
          ...prevState,
          display: digit,
          waitingForOperand: false,
          error: null,
          // =の後（previousValue === null）は式をクリア
          ...(prevState.previousValue === null && { expression: "" }),
        };
      }

      const currentDigits = prevState.display.replace(/[-.]/, "").length;
      if (currentDigits >= MAX_DISPLAY_DIGITS) {
        return prevState;
      }

      return {
        ...prevState,
        display: prevState.display === "0" ? digit : prevState.display + digit,
        error: null,
      };
    });
  }, []);

  const inputDecimal = useCallback(() => {
    setState((prevState) => {
      // エラー状態の場合、クリアして"0."を開始
      if (prevState.error) {
        return {
          display: "0.",
          previousValue: null,
          operation: null,
          waitingForOperand: false,
          error: null,
          expression: "",
        };
      }

      if (prevState.waitingForOperand) {
        return {
          ...prevState,
          display: "0.",
          waitingForOperand: false,
          error: null,
          // =の後（previousValue === null）は式をクリア
          ...(prevState.previousValue === null && { expression: "" }),
        };
      }

      if (!prevState.display.includes(".")) {
        return {
          ...prevState,
          display: prevState.display + ".",
          error: null,
        };
      }

      return prevState;
    });
  }, []);

  const performOperation = useCallback((nextOperation: Operation) => {
    setState((prevState) => {
      const inputValue = prevState.display;
      const symbol = OPERATION_SYMBOLS[nextOperation];

      // エラー状態の場合、クリアしてから操作を設定
      if (prevState.error) {
        return {
          display: inputValue,
          previousValue: inputValue,
          operation: nextOperation,
          waitingForOperand: true,
          error: null,
          expression: `${inputValue} ${symbol} `,
        };
      }

      if (prevState.previousValue === null) {
        return {
          ...prevState,
          previousValue: inputValue,
          operation: nextOperation,
          waitingForOperand: true,
          expression: `${inputValue} ${symbol} `,
        };
      }

      if (prevState.operation && !prevState.waitingForOperand) {
        try {
          const result = calculate(prevState.previousValue, inputValue, prevState.operation);
          return {
            display: result,
            previousValue: result,
            operation: nextOperation,
            waitingForOperand: true,
            error: null,
            expression: `${result} ${symbol} `,
          };
        } catch (error) {
          return {
            ...prevState,
            error: error instanceof Error ? error.message : "Error",
            waitingForOperand: true,
          };
        }
      }

      // 演算子変更（waitingForOperand中に別の演算子を押した場合）
      return {
        ...prevState,
        operation: nextOperation,
        waitingForOperand: true,
        expression: `${prevState.previousValue} ${symbol} `,
      };
    });
  }, []);

  const performEquals = useCallback(() => {
    setState((prevState) => {
      const inputValue = prevState.display;

      if (prevState.previousValue === null || prevState.operation === null) {
        return prevState;
      }

      // エラー状態の場合は何もしない
      if (prevState.error) {
        return prevState;
      }

      const symbol = OPERATION_SYMBOLS[prevState.operation];

      try {
        const result = calculate(prevState.previousValue, inputValue, prevState.operation);
        return {
          display: result,
          previousValue: null,
          operation: null,
          waitingForOperand: true,
          error: null,
          expression: `${prevState.previousValue} ${symbol} ${inputValue} =`,
        };
      } catch (error) {
        return {
          ...prevState,
          error: error instanceof Error ? error.message : "Error",
          waitingForOperand: true,
        };
      }
    });
  }, []);

  const toggleSign = useCallback(() => {
    setState((prevState) => {
      // エラー状態の場合は何もしない
      if (prevState.error) {
        return prevState;
      }

      const currentDisplay = prevState.display;

      // 既に負の数の場合、符号を削除
      if (currentDisplay.startsWith("-")) {
        return { ...prevState, display: currentDisplay.slice(1) };
      }

      // "0" の場合は変更しない
      if (currentDisplay === "0") {
        return prevState;
      }

      // 正の数に符号を追加
      return { ...prevState, display: "-" + currentDisplay };
    });
  }, []);

  return {
    display: state.display,
    error: state.error,
    expression: state.expression,
    inputDigit,
    inputDecimal,
    performOperation,
    performEquals,
    clear,
    toggleSign,
  };
};
