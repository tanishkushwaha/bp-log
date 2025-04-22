import { View } from "react-native";
import { useTheme } from "@/theme/ThemeContext";
import { colors } from "@/theme/colors";
import { mockBPData } from "@/mockData";
import { CartesianChart, Line, useChartPressState } from "victory-native";
import { Circle, useFont, Line as DrawLine } from "@shopify/react-native-skia";
import { SharedValue } from "react-native-reanimated";

export default function charts() {
  const { theme } = useTheme();
  const font = useFont(require("@/assets/fonts/SpaceMono-Regular.ttf"));

  const { state, isActive } = useChartPressState({
    x: "",
    y: {
      bp_sys: 0,
      bp_dia: 0,
    },
  });

  return (
    <View
      style={{
        backgroundColor: colors[theme].primary,
        flex: 1,
        justifyContent: "center",
      }}
    >
      <View style={{ height: 240 }}>
        <CartesianChart
          chartPressState={state}
          padding={18}
          domainPadding={2}
          data={mockBPData}
          xKey='date'
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
                color={colors.indicator.orange}
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
