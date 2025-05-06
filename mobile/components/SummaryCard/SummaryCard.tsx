import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/ThemeContext";
import { scale } from "@/utils/functions";
import { View, StyleSheet } from "react-native";
import Section from "./Section";
import Header from "./Header";

export default function SummaryCard({
  title,
  subtitle,
  insightPoints,
  tipPoints,
}: {
  title: string;
  subtitle: string;
  insightPoints: string[];
  tipPoints: string[];
}) {
  const { theme } = useTheme();
  const themeColors = colors[theme];

  return (
    <View
      style={[staticStyles.container, { backgroundColor: themeColors.focus }]}
    >
      <Header
        title={title}
        subtitle={subtitle}
        titleColor={themeColors.text}
        subtitleColor={themeColors.text}
      />
      <View style={staticStyles.body}>
        <Section
          heading='Insights'
          headingColor={themeColors.text}
          points={insightPoints}
          bulletTextColor={themeColors.text}
          bulletIconColor={themeColors.text}
        />
        <Section
          heading='Tips'
          headingColor={themeColors.text}
          points={tipPoints}
          bulletTextColor={themeColors.text}
          bulletIconColor={themeColors.text}
        />
      </View>
    </View>
  );
}

const staticStyles = StyleSheet.create({
  container: {
    borderRadius: scale(36),
    padding: scale(32),
    gap: scale(16),
  },
  body: {
    gap: scale(24),
  },
});
