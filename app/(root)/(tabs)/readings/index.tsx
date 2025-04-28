import { useBPData } from "@/contexts/BPDataContext";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/ThemeContext";
import { useMemo } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useRefreshKey } from "@/contexts/RefreshKeyContext";
import ReadingList from "@/components/ReadingList";
import FloatingAddButton from "@/components/FloatingAddButton";
import useFetchBPData from "@/hooks/useFetchBPData";

export default function ReadingsScreen() {
  const { theme } = useTheme();
  const { data } = useBPData();
  const { refreshKey } = useRefreshKey();
  const { loading } = useFetchBPData(refreshKey);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        spinnerContainer: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors[theme].primary,
        },
      }),
    [theme]
  );

  const sortedDataByDate = useMemo(() => {
    return [...data].sort((a, b) => b.date.getTime() - a.date.getTime());
  }, [data]);

  return (
    <>
      {loading ? (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size='large' color={colors[theme].focus} />
        </View>
      ) : (
        <ReadingList data={sortedDataByDate} />
      )}
      <FloatingAddButton />
    </>
  );
}
