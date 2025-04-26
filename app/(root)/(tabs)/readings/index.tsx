import { BPDataType, useBPData } from "@/contexts/BPDataContext";
import { colors, IndicatorColor } from "@/theme/colors";
import { useTheme } from "@/theme/ThemeContext";
import { useCallback, useMemo, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useFocusEffect } from "expo-router";
import { getAllBPData } from "@/utils/storage";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableNativeFeedback,
  Pressable,
} from "react-native";
import { useRefreshKey } from "@/contexts/RefreshKeyContext";
import { getBpIndicatorColor } from "@/utils/functions";

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

  const renderItem = useCallback(
    ({ item }: { item: BPDataType }) => (
      <Pressable
        style={({ pressed }) => pressed && { opacity: 0.6 }}
        onPress={() => router.push(`/readings/${item.id}`)}
      >
        <Reading
          day={item.date.toLocaleDateString("en-GB", { weekday: "short" })}
          date={item.date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
          })}
          time={item.date.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
          bp={[item.bp_sys, item.bp_dia]}
          pr={item.pr}
        />
      </Pressable>
    ),
    []
  );

  const sortedDataByDate = useMemo(() => {
    return [...data].sort((a, b) => b.date.getTime() - a.date.getTime());
  }, [data]);

  return (
    <>
      <FlatList
        data={sortedDataByDate}
        keyExtractor={(item) => `${item.id}`}
        initialNumToRender={10}
        renderItem={renderItem}
        style={{
          backgroundColor: colors[theme].primary,
          paddingBottom: 86,
        }}
        contentContainerStyle={
          data.length === 0
            ? { flex: 1, justifyContent: "center" }
            : {
                paddingBottom: 90,
              }
        }
        ListEmptyComponent={
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <Ionicons
              name='document-text-outline'
              size={128}
              color={colors[theme].secondary}
            />
            <Text style={{ color: colors[theme].text }}>No Readings Yet</Text>
          </View>
        }
      />
      <TouchableNativeFeedback onPress={() => router.push("/readings/add")}>
        <View style={styles.addFloatingButton}>
          <MaterialIcons name='add' size={32} color={colors[theme].text} />
        </View>
      </TouchableNativeFeedback>
    </>
  );
}

type ReadingProps = {
  day: string;
  date: string;
  time: string;
  bp: [number, number];
  pr: number;
};

const Reading = ({ day, date, time, bp, pr }: ReadingProps) => {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          padding: 4,
          borderRadius: 5,
          borderBottomWidth: 1,
          borderColor: colors[theme].focus,
        },
        date: {
          flex: 2,
          alignItems: "flex-end",
        },
        ind: {
          backgroundColor: getBpIndicatorColor(bp[0], bp[1]),
          height: 50,
          width: 3,
          marginHorizontal: 10,
          borderRadius: 50,
        },
        bp: {
          flex: 4,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "baseline",
        },
        pr: {
          flex: 3,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "baseline",
        },
        dayText: {
          color: colors[theme].text,
          fontSize: 12,
        },
        dateText: {
          color: colors[theme].text,
          fontWeight: "bold",
        },
        timeText: {
          color: colors[theme].text,
          fontSize: 12,
        },
        bpText: {
          color: colors[theme].text,
          fontSize: 24,
        },
        bpUnitText: {
          color: colors[theme].text,
          fontSize: 12,
        },
        prText: {
          color: colors[theme].text,
          marginRight: 2,
        },
        prUnitText: {
          color: colors[theme].text,
          fontSize: 10,
        },
      }),
    [theme]
  );

  return (
    <View testID='reading-item' style={styles.container}>
      <View style={styles.date}>
        <Text style={styles.dayText}>{day}</Text>
        <Text style={styles.dateText}>{date}</Text>
        <Text style={styles.timeText}>{time}</Text>
      </View>
      <View style={styles.ind} />
      <View style={styles.bp}>
        <Text style={styles.bpText}>{`${bp[0]}/${bp[1]}`}</Text>
        <Text style={styles.bpUnitText}>mmHg</Text>
      </View>
      <View style={styles.pr}>
        <Text style={styles.prText}>{pr}</Text>
        <Text style={styles.prUnitText}>BPM</Text>
      </View>
    </View>
  );
};
