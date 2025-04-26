import { useBPData } from "@/contexts/BPDataContext";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/ThemeContext";
import { useCallback, useMemo, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useFocusEffect } from "expo-router";
import { getAllBPData } from "@/utils/storage";
import { View, StyleSheet, TouchableNativeFeedback } from "react-native";
import { useRefreshKey } from "@/contexts/RefreshKeyContext";
import ReadingList from "@/components/ReadingList";

export default function ReadingsScreen() {
  const { theme } = useTheme();
  const { data, clearData, setData } = useBPData();
  const [loading, setLoading] = useState(true);
  const { refreshKey } = useRefreshKey();

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      getAllBPData().then((data) => {
        setData(data);
        setLoading(false);
      });
    }, [refreshKey])
  );

  const styles = useMemo(
    () =>
      StyleSheet.create({
        addFloatingButton: {
          width: 64,
          height: 64,
          borderRadius: 32,
          backgroundColor: colors[theme].focus,
          position: "absolute",
          bottom: 16,
          right: 16,
          justifyContent: "center",
          alignItems: "center",
          elevation: 4,
        },
      }),
    [theme]
  );

  const sortedDataByDate = useMemo(() => {
    return [...data].sort((a, b) => b.date.getTime() - a.date.getTime());
  }, [data]);

  return (
    <>
      <ReadingList data={sortedDataByDate} />
      <TouchableNativeFeedback onPress={() => router.push("/readings/add")}>
        <View style={styles.addFloatingButton}>
          <MaterialIcons name='add' size={32} color={colors[theme].text} />
        </View>
      </TouchableNativeFeedback>
    </>
  );
}
