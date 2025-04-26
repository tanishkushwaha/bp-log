import { colors } from "@/theme/colors";
import { generateMockBPData, getBpIndicatorColor } from "@/utils/functions";

describe("generateMockBPData", () => {
  test("returns array of specified length", () => {
    const data = generateMockBPData(5);

    expect(data).toHaveLength(5);
  });

  test("entries have expected value ranges", () => {
    const data = generateMockBPData(1);
    const entry = data[0];

    expect(entry.bp_sys).toBeGreaterThanOrEqual(100);
    expect(entry.bp_sys).toBeLessThan(140);

    expect(entry.bp_dia).toBeGreaterThanOrEqual(60);
    expect(entry.bp_dia).toBeLessThan(80);

    expect(entry.pr).toBeGreaterThanOrEqual(60);
    expect(entry.pr).toBeLessThan(100);
  });
});

describe("getBpIndicatorColor", () => {
  test("returns expected color", () => {
    // Normal
    expect(getBpIndicatorColor(112, 62)).toBe(colors.indicator.green);
    expect(getBpIndicatorColor(106, 60)).toBe(colors.indicator.green);

    // Elevated
    expect(getBpIndicatorColor(125, 75)).toBe(colors.indicator.yellow);
    expect(getBpIndicatorColor(120, 78)).toBe(colors.indicator.yellow);

    // Hypertension stage 1
    expect(getBpIndicatorColor(135, 85)).toBe(colors.indicator.orange);
    expect(getBpIndicatorColor(130, 82)).toBe(colors.indicator.orange);

    // Hypertension stage 2
    expect(getBpIndicatorColor(150, 95)).toBe(colors.indicator.deepOrange);
    expect(getBpIndicatorColor(145, 90)).toBe(colors.indicator.deepOrange);

    // Hypertensive crisis
    expect(getBpIndicatorColor(180, 110)).toBe(colors.indicator.red);
    expect(getBpIndicatorColor(190, 110)).toBe(colors.indicator.red);
  });
});
