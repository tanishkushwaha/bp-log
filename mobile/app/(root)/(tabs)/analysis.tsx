import { useBPData } from "@/contexts/BPDataContext";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/ThemeContext";
import { scale } from "@/utils/functions";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import SummaryCard from "@/components/SummaryCard/SummaryCard";

export default function AnalysisScreen() {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const { data } = useBPData();
  const { theme } = useTheme();

  // TODO: Extract this fetching logic into a custom hook
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       setLoading(true);
  //       const res = await fetch(
  //         "https://6818d93818c2e2b716c3.fra.appwrite.run/analysis",
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             bpData: data,
  //           }),
  //         }
  //       );

  //       const aiResponse = await res.json();
  //       setLoading(false);

  //       if (aiResponse.success) setSummary(aiResponse.summary);
  //       else setSummary("Unable to fetch summary.");
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   })();
  // }, [data]);

  return (
    <View
      style={[styles.container, { backgroundColor: colors[theme].primary }]}
    >
      <SummaryCard
        title='BP Summary'
        subtitle='May 6'
        insightPoints={[
          "This is a point",
          "This is another point",
          "This is yet another point",
        ]}
        tipPoints={[
          "This is a point",
          "This is another point",
          "This is yet another point",
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: scale(16),
  },
});
