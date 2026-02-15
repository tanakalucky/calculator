import { describe, it, expect } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { useCalculator } from "../useCalculator";

// テスト用コンポーネント
function TestCalculator() {
  const calc = useCalculator();

  return (
    <div>
      <div data-testid="display">{calc.display}</div>
      <div data-testid="error">{calc.error || "null"}</div>
      <button data-testid="btn-0" onClick={() => calc.inputDigit("0")}>
        0
      </button>
      <button data-testid="btn-1" onClick={() => calc.inputDigit("1")}>
        1
      </button>
      <button data-testid="btn-2" onClick={() => calc.inputDigit("2")}>
        2
      </button>
      <button data-testid="btn-3" onClick={() => calc.inputDigit("3")}>
        3
      </button>
      <button data-testid="btn-4" onClick={() => calc.inputDigit("4")}>
        4
      </button>
      <button data-testid="btn-5" onClick={() => calc.inputDigit("5")}>
        5
      </button>
      <button data-testid="btn-6" onClick={() => calc.inputDigit("6")}>
        6
      </button>
      <button data-testid="btn-7" onClick={() => calc.inputDigit("7")}>
        7
      </button>
      <button data-testid="btn-8" onClick={() => calc.inputDigit("8")}>
        8
      </button>
      <button data-testid="btn-9" onClick={() => calc.inputDigit("9")}>
        9
      </button>
      <button data-testid="btn-decimal" onClick={() => calc.inputDecimal()}>
        .
      </button>
      <button data-testid="btn-add" onClick={() => calc.performOperation("add")}>
        +
      </button>
      <button data-testid="btn-subtract" onClick={() => calc.performOperation("subtract")}>
        -
      </button>
      <button data-testid="btn-multiply" onClick={() => calc.performOperation("multiply")}>
        ×
      </button>
      <button data-testid="btn-divide" onClick={() => calc.performOperation("divide")}>
        ÷
      </button>
      <button data-testid="btn-power" onClick={() => calc.performOperation("power")}>
        ^
      </button>
      <button data-testid="btn-equals" onClick={() => calc.performEquals()}>
        =
      </button>
      <button data-testid="btn-clear" onClick={() => calc.clear()}>
        C
      </button>
      <button data-testid="btn-toggle-sign" onClick={() => calc.toggleSign()}>
        +/-
      </button>
    </div>
  );
}

describe("useCalculator", () => {
  describe("初期状態", () => {
    it("初期表示は0である", async () => {
      await render(<TestCalculator />);
      const display = page.getByTestId("display");
      await expect.element(display).toHaveTextContent("0");
      const error = page.getByTestId("error");
      await expect.element(error).toHaveTextContent("null");
    });
  });

  describe("数値入力", () => {
    it("1桁の数字を入力できる", async () => {
      await render(<TestCalculator />);
      const display = page.getByTestId("display");
      await expect.element(display).toHaveTextContent("0");

      const btn5 = page.getByTestId("btn-5");
      await btn5.click();

      await expect.element(display).toHaveTextContent("5");
    });

    it("複数桁の数字を入力できる", async () => {
      await render(<TestCalculator />);
      const display = page.getByTestId("display");

      await page.getByTestId("btn-1").click();
      await page.getByTestId("btn-2").click();
      await page.getByTestId("btn-3").click();

      await expect.element(display).toHaveTextContent("123");
    });

    it("0で始まる入力は0を置き換える", async () => {
      await render(<TestCalculator />);
      const display = page.getByTestId("display");

      await page.getByTestId("btn-5").click();

      await expect.element(display).toHaveTextContent("5");
    });
  });

  describe("小数点入力", () => {
    it("小数点を入力できる", async () => {
      await render(<TestCalculator />);
      const display = page.getByTestId("display");

      await page.getByTestId("btn-1").click();
      await page.getByTestId("btn-decimal").click();
      await page.getByTestId("btn-5").click();

      await expect.element(display).toHaveTextContent("1.5");
    });

    it("小数点は1つのみ入力可能", async () => {
      await render(<TestCalculator />);
      const display = page.getByTestId("display");

      await page.getByTestId("btn-1").click();
      await page.getByTestId("btn-decimal").click();
      await page.getByTestId("btn-decimal").click();
      await page.getByTestId("btn-5").click();

      await expect.element(display).toHaveTextContent("1.5");
    });

    it("0の状態で小数点を入力すると0.になる", async () => {
      await render(<TestCalculator />);
      const display = page.getByTestId("display");

      await page.getByTestId("btn-decimal").click();

      await expect.element(display).toHaveTextContent("0.");
    });
  });

  describe("加算", () => {
    it("1 + 2 = 3", async () => {
      await render(<TestCalculator />);
      const display = page.getByTestId("display");

      await page.getByTestId("btn-1").click();
      await page.getByTestId("btn-add").click();
      await page.getByTestId("btn-2").click();
      await page.getByTestId("btn-equals").click();

      await expect.element(display).toHaveTextContent("3");
    });

    it("小数点の加算: 0.1 + 0.2 = 0.3", async () => {
      await render(<TestCalculator />);
      const display = page.getByTestId("display");

      await page.getByTestId("btn-0").click();
      await page.getByTestId("btn-decimal").click();
      await page.getByTestId("btn-1").click();
      await page.getByTestId("btn-add").click();
      await page.getByTestId("btn-0").click();
      await page.getByTestId("btn-decimal").click();
      await page.getByTestId("btn-2").click();
      await page.getByTestId("btn-equals").click();

      await expect.element(display).toHaveTextContent("0.3");
    });
  });

  describe("減算", () => {
    it("10 - 3 = 7", async () => {
      await render(<TestCalculator />);
      const display = page.getByTestId("display");

      await page.getByTestId("btn-1").click();
      await page.getByTestId("btn-0").click();
      await page.getByTestId("btn-subtract").click();
      await page.getByTestId("btn-3").click();
      await page.getByTestId("btn-equals").click();

      await expect.element(display).toHaveTextContent("7");
    });
  });

  describe("乗算", () => {
    it("4 × 6 = 24", async () => {
      await render(<TestCalculator />);
      const display = page.getByTestId("display");

      await page.getByTestId("btn-4").click();
      await page.getByTestId("btn-multiply").click();
      await page.getByTestId("btn-6").click();
      await page.getByTestId("btn-equals").click();

      await expect.element(display).toHaveTextContent("24");
    });
  });

  describe("除算", () => {
    it("15 ÷ 4 = 3.75", async () => {
      await render(<TestCalculator />);
      const display = page.getByTestId("display");

      await page.getByTestId("btn-1").click();
      await page.getByTestId("btn-5").click();
      await page.getByTestId("btn-divide").click();
      await page.getByTestId("btn-4").click();
      await page.getByTestId("btn-equals").click();

      await expect.element(display).toHaveTextContent("3.75");
    });

    it("ゼロ除算でエラーを表示", async () => {
      await render(<TestCalculator />);
      const error = page.getByTestId("error");

      await page.getByTestId("btn-1").click();
      await page.getByTestId("btn-divide").click();
      await page.getByTestId("btn-0").click();
      await page.getByTestId("btn-equals").click();

      await expect.element(error).toHaveTextContent("Division by zero");
    });
  });

  describe("累乗", () => {
    it("2 ^ 10 = 1024", async () => {
      await render(<TestCalculator />);
      const display = page.getByTestId("display");

      await page.getByTestId("btn-2").click();
      await page.getByTestId("btn-power").click();
      await page.getByTestId("btn-1").click();
      await page.getByTestId("btn-0").click();
      await page.getByTestId("btn-equals").click();

      await expect.element(display).toHaveTextContent("1024");
    });
  });

  describe("連続演算", () => {
    it("2 + 3 + 4 = 9", async () => {
      await render(<TestCalculator />);
      const display = page.getByTestId("display");

      await page.getByTestId("btn-2").click();
      await page.getByTestId("btn-add").click();
      await page.getByTestId("btn-3").click();
      await page.getByTestId("btn-add").click();
      await expect.element(display).toHaveTextContent("5");
      await page.getByTestId("btn-4").click();
      await page.getByTestId("btn-equals").click();

      await expect.element(display).toHaveTextContent("9");
    });
  });

  describe("クリア", () => {
    it("クリアで初期状態に戻る", async () => {
      await render(<TestCalculator />);
      const display = page.getByTestId("display");
      const error = page.getByTestId("error");

      await page.getByTestId("btn-1").click();
      await page.getByTestId("btn-2").click();
      await page.getByTestId("btn-3").click();
      await page.getByTestId("btn-clear").click();

      await expect.element(display).toHaveTextContent("0");
      await expect.element(error).toHaveTextContent("null");
    });
  });

  describe("符号反転", () => {
    it("正の数を負の数に変換", async () => {
      await render(<TestCalculator />);
      const display = page.getByTestId("display");

      await page.getByTestId("btn-5").click();
      await page.getByTestId("btn-toggle-sign").click();

      await expect.element(display).toHaveTextContent("-5");
    });

    it("負の数を正の数に変換", async () => {
      await render(<TestCalculator />);
      const display = page.getByTestId("display");

      await page.getByTestId("btn-5").click();
      await page.getByTestId("btn-toggle-sign").click();
      await page.getByTestId("btn-toggle-sign").click();

      await expect.element(display).toHaveTextContent("5");
    });
  });

  describe("エラー処理", () => {
    it("エラー後に数字を入力すると自動的にクリアされる", async () => {
      await render(<TestCalculator />);
      const display = page.getByTestId("display");
      const error = page.getByTestId("error");

      await page.getByTestId("btn-1").click();
      await page.getByTestId("btn-divide").click();
      await page.getByTestId("btn-0").click();
      await page.getByTestId("btn-equals").click();
      await expect.element(error).toHaveTextContent("Division by zero");

      await page.getByTestId("btn-5").click();

      await expect.element(display).toHaveTextContent("5");
      await expect.element(error).toHaveTextContent("null");
    });
  });
});
