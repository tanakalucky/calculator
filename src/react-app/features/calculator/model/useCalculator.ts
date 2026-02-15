import { useState, useCallback } from "react";
import { calculate } from "@/shared/lib/calculator";
import type { CalculatorState, Operation } from "./types";

export const useCalculator = () => {
  const [state, setState] = useState<CalculatorState>({
    display: "0",
    previousValue: null,
    operation: null,
    waitingForOperand: false,
    error: null,
  });

  const clear = useCallback(() => {
    setState({
      display: "0",
      previousValue: null,
      operation: null,
      waitingForOperand: false,
      error: null,
    });
  }, []);

  const inputDigit = useCallback(
    (digit: string) => {
      // エラー状態の場合、クリアして新しい入力を開始
      if (state.error) {
        setState({
          display: digit,
          previousValue: null,
          operation: null,
          waitingForOperand: false,
          error: null,
        });
        return;
      }

      if (state.waitingForOperand) {
        setState({
          ...state,
          display: digit,
          waitingForOperand: false,
          error: null,
        });
      } else {
        setState({
          ...state,
          display: state.display === "0" ? digit : state.display + digit,
          error: null,
        });
      }
    },
    [state],
  );

  const inputDecimal = useCallback(() => {
    // エラー状態の場合、クリアして"0."を開始
    if (state.error) {
      setState({
        display: "0.",
        previousValue: null,
        operation: null,
        waitingForOperand: false,
        error: null,
      });
      return;
    }

    if (state.waitingForOperand) {
      setState({
        ...state,
        display: "0.",
        waitingForOperand: false,
        error: null,
      });
    } else if (!state.display.includes(".")) {
      setState({
        ...state,
        display: state.display + ".",
        error: null,
      });
    }
  }, [state]);

  const performOperation = useCallback(
    (nextOperation: Operation) => {
      const inputValue = state.display;

      // エラー状態の場合、クリアしてから操作を設定
      if (state.error) {
        setState({
          display: inputValue,
          previousValue: inputValue,
          operation: nextOperation,
          waitingForOperand: true,
          error: null,
        });
        return;
      }

      if (state.previousValue === null) {
        setState({
          ...state,
          previousValue: inputValue,
          operation: nextOperation,
          waitingForOperand: true,
        });
      } else if (state.operation && !state.waitingForOperand) {
        try {
          const result = calculate(state.previousValue, inputValue, state.operation);
          setState({
            display: result,
            previousValue: result,
            operation: nextOperation,
            waitingForOperand: true,
            error: null,
          });
        } catch (error) {
          setState({
            ...state,
            error: error instanceof Error ? error.message : "Error",
            waitingForOperand: true,
          });
        }
      } else {
        setState({
          ...state,
          operation: nextOperation,
          waitingForOperand: true,
        });
      }
    },
    [state],
  );

  const performEquals = useCallback(() => {
    const inputValue = state.display;

    if (state.previousValue === null || state.operation === null) {
      return;
    }

    // エラー状態の場合は何もしない
    if (state.error) {
      return;
    }

    try {
      const result = calculate(state.previousValue, inputValue, state.operation);
      setState({
        display: result,
        previousValue: null,
        operation: null,
        waitingForOperand: true,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        error: error instanceof Error ? error.message : "Error",
        waitingForOperand: true,
      });
    }
  }, [state]);

  const toggleSign = useCallback(() => {
    // エラー状態の場合は何もしない
    if (state.error) {
      return;
    }

    const value = parseFloat(state.display);
    if (!Number.isNaN(value)) {
      setState({
        ...state,
        display: (value * -1).toString(),
      });
    }
  }, [state]);

  return {
    display: state.display,
    error: state.error,
    inputDigit,
    inputDecimal,
    performOperation,
    performEquals,
    clear,
    toggleSign,
  };
};
