import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import React, { useCallback, useMemo } from "react";
import { colors } from "@/theme/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BPDataType } from "@/contexts/BPDataContext";
import { router } from "expo-router";
import { useTheme } from "@/theme/ThemeContext";
import { getBpIndicatorColor } from "@/utils/functions";

export default function ReadingList({
  data,
  testId,
}: {
  data: BPDataType[];
  testId?: string;
}) {
  const { theme } = useTheme();

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

  return (
    <FlatList
      data={data}
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
          testID={testId}
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
