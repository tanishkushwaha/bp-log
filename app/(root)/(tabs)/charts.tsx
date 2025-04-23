import { StyleSheet, View, Text } from "react-native";
import { useTheme } from "@/theme/ThemeContext";
import { colors } from "@/theme/colors";
import { CartesianChart, Line, useChartPressState } from "victory-native";
import { useFont, Line as DrawLine } from "@shopify/react-native-skia";
import { SharedValue } from "react-native-reanimated";
import { useBPData } from "@/contexts/BPDataContext";
import { useMemo } from "react";

export default function charts() {
  const { theme } = useTheme();
  const { data } = useBPData();
  const font = useFont(require("@/assets/fonts/SpaceMono-Regular.ttf"));

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
    []
  );

  // TODO: Add time range picker for the charts

  return (
    <View style={styles.screenContainer}>
      <View style={{ height: 240 }}>
        <CartesianChart
          chartPressState={state}
          padding={18}
          domainPadding={2}
          data={data}
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
