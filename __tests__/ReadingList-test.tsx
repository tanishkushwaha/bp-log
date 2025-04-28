import ReadingList from "@/components/ReadingList";
import { BPDataType } from "@/contexts/BPDataContext";
import { ThemeProvider } from "@/theme/ThemeContext";
import { render, within } from "@testing-library/react-native";
import { ReactNode } from "react";

describe("<ReadingList />", () => {
  test("shows correct blood pressure and pulse rate inside each reading", () => {
    const mockData: BPDataType[] = [
      { id: "0", date: new Date(), bp_sys: 120, bp_dia: 80, pr: 70 },
      { id: "1", date: new Date(), bp_sys: 130, bp_dia: 85, pr: 75 },
    ];

    const { getAllByTestId } = render(<ReadingList data={mockData} />);

    const items = getAllByTestId("reading-item");

    expect(items).toHaveLength(2);
    expect(within(items[0]).getByText("120/80"));
    expect(within(items[0]).getByText("70"));
    expect(within(items[1]).getByText("130/85"));
    expect(within(items[1]).getByText("75"));
  });

  test("renders correct text for empty list", () => {
    const { getByText } = render(<ReadingList data={[]} />);

    expect(getByText("No Readings Yet"));
  });
});
