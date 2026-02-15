import { useEffect } from "react";
import { CalculatorButton } from "./CalculatorButton";
import { CalculatorDisplay } from "./CalculatorDisplay";
import { useCalculator } from "../model/useCalculator";

export function CalculatorGrid() {
  const calc = useCalculator();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // 数字キー (0-9)
      if (event.key >= "0" && event.key <= "9") {
        event.preventDefault();
        calc.inputDigit(event.key);
        return;
      }

      // 演算子キー
      switch (event.key) {
        case "+":
          event.preventDefault();
          calc.performOperation("add");
          break;
        case "-":
          event.preventDefault();
          calc.performOperation("subtract");
          break;
        case "*":
          event.preventDefault();
          calc.performOperation("multiply");
          break;
        case "/":
          event.preventDefault();
          calc.performOperation("divide");
          break;
        case "^":
          event.preventDefault();
          calc.performOperation("power");
          break;
        case ".":
          event.preventDefault();
          calc.inputDecimal();
          break;
        case "Enter":
        case "=":
          event.preventDefault();
          calc.performEquals();
          break;
        case "Escape":
          event.preventDefault();
          calc.clear();
          break;
        case "Backspace":
          event.preventDefault();
          // 最後の1文字を削除する機能は未実装なので、クリアする
          calc.clear();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [calc]);

  return (
    <div className="w-full max-w-md mx-auto p-4 space-y-4">
      <CalculatorDisplay value={calc.display} error={calc.error} />

      <div className="grid grid-cols-4 gap-3">
        {/* 1行目: C, +/-, x^y, ÷ */}
        <CalculatorButton label="C" onClick={calc.clear} variant="clear" className="h-16" />
        <CalculatorButton
          label="+/-"
          onClick={calc.toggleSign}
          variant="default"
          className="h-16"
        />
        <CalculatorButton
          label="x^y"
          onClick={() => calc.performOperation("power")}
          variant="operator"
          className="h-16"
        />
        <CalculatorButton
          label="÷"
          onClick={() => calc.performOperation("divide")}
          variant="operator"
          className="h-16"
        />

        {/* 2行目: 7, 8, 9, × */}
        <CalculatorButton label="7" onClick={() => calc.inputDigit("7")} className="h-16" />
        <CalculatorButton label="8" onClick={() => calc.inputDigit("8")} className="h-16" />
        <CalculatorButton label="9" onClick={() => calc.inputDigit("9")} className="h-16" />
        <CalculatorButton
          label="×"
          onClick={() => calc.performOperation("multiply")}
          variant="operator"
          className="h-16"
        />

        {/* 3行目: 4, 5, 6, − */}
        <CalculatorButton label="4" onClick={() => calc.inputDigit("4")} className="h-16" />
        <CalculatorButton label="5" onClick={() => calc.inputDigit("5")} className="h-16" />
        <CalculatorButton label="6" onClick={() => calc.inputDigit("6")} className="h-16" />
        <CalculatorButton
          label="−"
          onClick={() => calc.performOperation("subtract")}
          variant="operator"
          className="h-16"
        />

        {/* 4行目: 1, 2, 3, + */}
        <CalculatorButton label="1" onClick={() => calc.inputDigit("1")} className="h-16" />
        <CalculatorButton label="2" onClick={() => calc.inputDigit("2")} className="h-16" />
        <CalculatorButton label="3" onClick={() => calc.inputDigit("3")} className="h-16" />
        <CalculatorButton
          label="+"
          onClick={() => calc.performOperation("add")}
          variant="operator"
          className="h-16"
        />

        {/* 5行目: 0 (2列分), ., = */}
        <CalculatorButton
          label="0"
          onClick={() => calc.inputDigit("0")}
          className="h-16 col-span-2"
        />
        <CalculatorButton label="." onClick={calc.inputDecimal} className="h-16" />
        <CalculatorButton
          label="="
          onClick={calc.performEquals}
          variant="equals"
          className="h-16"
        />
      </div>
    </div>
  );
}
