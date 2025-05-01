import { StyleSheet, View, Text } from "react-native";
import { useTheme } from "@/theme/ThemeContext";
import { colors } from "@/theme/colors";
import { CartesianChart, Line, useChartPressState } from "victory-native";
import { useFont, Line as DrawLine } from "@shopify/react-native-skia";
import { SharedValue } from "react-native-reanimated";
import { BPDataType, useBPData } from "@/contexts/BPDataContext";
import { useMemo, useState } from "react";
import ComboBox from "@/components/ComboBox";

type ComboOptions = "last7Days" | "last14Days" | "last30Days" | "allTime";
type ComboItem = {
  label: string;
  value: ComboOptions;
};

export default function ChartsScreen() {
  const { theme } = useTheme();
  const { data } = useBPData();
  const font = useFont(require("@/assets/fonts/SpaceMono-Regular.ttf"));

  const [comboValue, setComboValue] = useState<ComboOptions>("allTime");

  const [comboItems, setComboItems] = useState<ComboItem[]>([
    { label: "Last 7 days", value: "last7Days" },
    { label: "Last 14 days", value: "last14Days" },
    { label: "Last 30 days", value: "last30Days" },
    { label: "All time", value: "allTime" },
  ]);

  // Filtered data based on combo box value
  const filteredData: BPDataType[] = useMemo(() => {
    if (comboValue === "allTime") return data;

    const now = new Date();

    const daysMap: Record<"last7Days" | "last14Days" | "last30Days", number> = {
      last7Days: 7,
      last14Days: 14,
      last30Days: 30,
    };

    const days = daysMap[comboValue];

    const daysAgo = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    return data.filter((item) => item.date >= daysAgo && item.date <= now);
  }, [data, comboValue]);

  const { state, isActive } = useChartPressState({
    x: "",
    y: {
      bp_sys: 0,
      bp_dia: 0,
    },
  });

  const styles = useMemo(
    () =>
      StyleSheet.create({
        screenContainer: {
          backgroundColor: colors[theme].primary,
          flex: 1,
          justifyContent: "center",
        },
        legend: {
          width: 196,
          padding: 16,
          backgroundColor: colors[theme].secondary,
          alignSelf: "center",
          alignItems: "center",
          gap: 16,
          borderRadius: 16,
        },
        itemContainer: {
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          gap: 16,
          width: 128,
        },
        lineSymbol: {
          width: 16,
          height: 1,
        },
        label: {
          color: colors[theme].text,
        },
      }),
    [theme]
  );

  return (
    <View style={styles.screenContainer}>
      <ComboBox
        value={comboValue}
        setValue={setComboValue}
        items={comboItems}
        setItems={setComboItems}
      />
      <View style={{ height: 240 }}>
        <CartesianChart
          chartPressState={state}
          padding={18}
          domainPadding={2}
          data={filteredData}
          xKey='id'
          yKeys={["bp_sys", "bp_dia"]}
          yAxis={[
            {
              font,
              tickCount: 4,
              labelColor: colors[theme].text,
              lineColor: colors[theme].text,
            },
          ]}
          domain={{ y: [40, 200] }}
        >
          {({ points }) => (
            <>
              <Line
                points={points.bp_sys}
                color={colors.indicator.deepOrange}
                strokeWidth={1}
                animate={{ type: "timing", duration: 300 }}
                curveType='natural'
              />
              <Line
                points={points.bp_dia}
                color={colors.indicator.green}
                strokeWidth={1}
                animate={{ type: "timing", duration: 300 }}
                curveType='natural'
              />

              {isActive ? (
                <>
                  <ToolTip x={state.x.position} />
                  <ToolTip x={state.x.position} />
                </>
              ) : null}
            </>
          )}
        </CartesianChart>
      </View>
      <View style={styles.legend}>
        <View style={styles.itemContainer}>
          <View
            style={[
              styles.lineSymbol,
              { backgroundColor: colors.indicator.deepOrange },
            ]}
          />
          <Text style={styles.label}>Systolic</Text>
        </View>
        <View style={styles.itemContainer}>
          <View
            style={[
              styles.lineSymbol,
              { backgroundColor: colors.indicator.green },
            ]}
          />
          <Text style={styles.label}>Diastolic</Text>
        </View>
      </View>
    </View>
  );
}

// Tooltip component that shows up when long pressed on the chart to read the points
function ToolTip({ x }: { x: SharedValue<number> }) {
  return (
    <DrawLine
      p1={{ x: x.value, y: 0 }}
      p2={{ x: x.value, y: 240 }} // Set chartHeight to your chart’s height
      color='white'
      strokeWidth={2}
      // strokeDash={[4, 4]} // Dotted line pattern: 4px line, 4px gap
    />
  );
}
