import { describe, it, expect } from "vitest";
import Decimal from "decimal.js";
import { CalculatorService, calculate } from "../calculator-service";

describe("CalculatorService", () => {
  describe("add", () => {
    it("正しく加算を実行する", () => {
      const result = CalculatorService.add(new Decimal("1"), new Decimal("2"));
      expect(result.toString()).toBe("3");
    });

    it("小数点演算の精度を保証する (0.1 + 0.2 = 0.3)", () => {
      const result = CalculatorService.add(new Decimal("0.1"), new Decimal("0.2"));
      expect(result.toString()).toBe("0.3");
    });

    it("負の数の加算を処理する", () => {
      const result = CalculatorService.add(new Decimal("-5"), new Decimal("3"));
      expect(result.toString()).toBe("-2");
    });
  });

  describe("subtract", () => {
    it("正しく減算を実行する", () => {
      const result = CalculatorService.subtract(new Decimal("10"), new Decimal("3"));
      expect(result.toString()).toBe("7");
    });

    it("小数点演算の精度を保証する (0.3 - 0.1 = 0.2)", () => {
      const result = CalculatorService.subtract(new Decimal("0.3"), new Decimal("0.1"));
      expect(result.toString()).toBe("0.2");
    });
  });

  describe("multiply", () => {
    it("正しく乗算を実行する", () => {
      const result = CalculatorService.multiply(new Decimal("4"), new Decimal("6"));
      expect(result.toString()).toBe("24");
    });

    it("小数点演算の精度を保証する", () => {
      const result = CalculatorService.multiply(new Decimal("0.1"), new Decimal("0.2"));
      expect(result.toString()).toBe("0.02");
    });
  });

  describe("divide", () => {
    it("正しく除算を実行する", () => {
      const result = CalculatorService.divide(new Decimal("15"), new Decimal("4"));
      expect(result.toString()).toBe("3.75");
    });

    it("ゼロ除算でエラーをスローする", () => {
      expect(() => {
        CalculatorService.divide(new Decimal("1"), new Decimal("0"));
      }).toThrow("Division by zero");
    });
  });

  describe("power", () => {
    it("正しく累乗を計算する", () => {
      const result = CalculatorService.power(new Decimal("2"), new Decimal("10"));
      expect(result.toString()).toBe("1024");
    });

    it("小数点の累乗を計算する", () => {
      const result = CalculatorService.power(new Decimal("2"), new Decimal("0.5"));
      expect(result.toFixed(10)).toBe(Math.sqrt(2).toFixed(10));
    });
  });
});

describe("calculate", () => {
  it("文字列入力で加算を実行する", () => {
    expect(calculate("1", "2", "add")).toBe("3");
  });

  it("文字列入力で減算を実行する", () => {
    expect(calculate("10", "3", "subtract")).toBe("7");
  });

  it("文字列入力で乗算を実行する", () => {
    expect(calculate("4", "6", "multiply")).toBe("24");
  });

  it("文字列入力で除算を実行する", () => {
    expect(calculate("15", "4", "divide")).toBe("3.75");
  });

  it("文字列入力で累乗を計算する", () => {
    expect(calculate("2", "10", "power")).toBe("1024");
  });

  it("小数点文字列で精度を保証する", () => {
    expect(calculate("0.1", "0.2", "add")).toBe("0.3");
  });

  it("ゼロ除算でエラーをスローする", () => {
    expect(() => calculate("1", "0", "divide")).toThrow("Division by zero");
  });
});
