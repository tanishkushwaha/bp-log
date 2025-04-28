import useFetchBPData from "@/hooks/useFetchBPData";
import { render } from "@testing-library/react-native";
import ReadingsScreen from "@/app/(root)/(tabs)/readings";

describe("ReadingsScreen", () => {
  test("shows spinner and hides ReadingList while the data is being fetched", () => {
    (useFetchBPData as jest.Mock).mockReturnValue({ loading: true });

    const { queryByTestId } = render(<ReadingsScreen />);

    expect(queryByTestId("spinner"));
    expect(queryByTestId("reading-list")).toBeNull();
  });

  test("hides spinner and shows ReadingList after the data is fetched", () => {
    (useFetchBPData as jest.Mock).mockReturnValue({ loading: false });

    const { queryByTestId } = render(<ReadingsScreen />);

    expect(queryByTestId("spinner")).toBeNull();
    expect(queryByTestId("reading-list"));
  });
});
