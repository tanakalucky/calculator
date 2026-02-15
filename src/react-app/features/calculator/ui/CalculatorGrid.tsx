import { useEffect } from "react";
import { CalculatorButton } from "./CalculatorButton";
import { CalculatorDisplay } from "./CalculatorDisplay";
import { useCalculator } from "../model/useCalculator";

export function CalculatorGrid() {
  const {
    display,
    error,
    inputDigit,
    inputDecimal,
    performOperation,
    performEquals,
    clear,
    toggleSign,
  } = useCalculator();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // 数字キー (0-9)
      if (event.key >= "0" && event.key <= "9") {
        event.preventDefault();
        inputDigit(event.key);
        return;
      }

      // 演算子キー
      switch (event.key) {
        case "+":
          event.preventDefault();
          performOperation("add");
          break;
        case "-":
          event.preventDefault();
          performOperation("subtract");
          break;
        case "*":
          event.preventDefault();
          performOperation("multiply");
          break;
        case "/":
          event.preventDefault();
          performOperation("divide");
          break;
        case "^":
          event.preventDefault();
          performOperation("power");
          break;
        case ".":
          event.preventDefault();
          inputDecimal();
          break;
        case "Enter":
        case "=":
          event.preventDefault();
          performEquals();
          break;
        case "Escape":
          event.preventDefault();
          clear();
          break;
        case "Backspace":
          event.preventDefault();
          // 最後の1文字を削除する機能は未実装なので、クリアする
          clear();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputDigit, inputDecimal, performOperation, performEquals, clear]);

  return (
    <div className="w-full max-w-md mx-auto p-4 space-y-4">
      <CalculatorDisplay value={display} error={error} />

      <div className="grid grid-cols-4 gap-3">
        {/* 1行目: C, +/-, x^y, ÷ */}
        <CalculatorButton label="C" onClick={clear} variant="clear" className="h-16" />
        <CalculatorButton label="+/-" onClick={toggleSign} variant="default" className="h-16" />
        <CalculatorButton
          label="x^y"
          onClick={() => performOperation("power")}
          variant="operator"
          className="h-16"
        />
        <CalculatorButton
          label="÷"
          onClick={() => performOperation("divide")}
          variant="operator"
          className="h-16"
        />

        {/* 2行目: 7, 8, 9, × */}
        <CalculatorButton label="7" onClick={() => inputDigit("7")} className="h-16" />
        <CalculatorButton label="8" onClick={() => inputDigit("8")} className="h-16" />
        <CalculatorButton label="9" onClick={() => inputDigit("9")} className="h-16" />
        <CalculatorButton
          label="×"
          onClick={() => performOperation("multiply")}
          variant="operator"
          className="h-16"
        />

        {/* 3行目: 4, 5, 6, − */}
        <CalculatorButton label="4" onClick={() => inputDigit("4")} className="h-16" />
        <CalculatorButton label="5" onClick={() => inputDigit("5")} className="h-16" />
        <CalculatorButton label="6" onClick={() => inputDigit("6")} className="h-16" />
        <CalculatorButton
          label="−"
          onClick={() => performOperation("subtract")}
          variant="operator"
          className="h-16"
        />

        {/* 4行目: 1, 2, 3, + */}
        <CalculatorButton label="1" onClick={() => inputDigit("1")} className="h-16" />
        <CalculatorButton label="2" onClick={() => inputDigit("2")} className="h-16" />
        <CalculatorButton label="3" onClick={() => inputDigit("3")} className="h-16" />
        <CalculatorButton
          label="+"
          onClick={() => performOperation("add")}
          variant="operator"
          className="h-16"
        />

        {/* 5行目: 0 (2列分), ., = */}
        <CalculatorButton label="0" onClick={() => inputDigit("0")} className="h-16 col-span-2" />
        <CalculatorButton label="." onClick={inputDecimal} className="h-16" />
        <CalculatorButton label="=" onClick={performEquals} variant="equals" className="h-16" />
      </div>
    </div>
  );
}
