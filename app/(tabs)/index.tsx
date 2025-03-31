import { colors, IndicatorColor } from "@/theme/colors";
import { useTheme } from "@/theme/ThemeContext";
import { useMemo } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";

export default function Readings() {
  const { theme } = useTheme();

  return (
    <ScrollView style={{ backgroundColor: colors[theme].primary }}>
      <Reading
        day={"Mon"}
        date={"Mar 31"}
        time={"9:29 AM"}
        bp={[120, 90]}
        pr={70}
      />
      <Reading
        day={"Mon"}
        date={"Mar 31"}
        time={"9:29 AM"}
        bp={[120, 90]}
        pr={70}
      />
      <Reading
        day={"Mon"}
        date={"Mar 31"}
        time={"9:29 AM"}
        bp={[120, 90]}
        pr={70}
      />
      <Reading
        day={"Mon"}
        date={"Mar 31"}
        time={"9:29 AM"}
        bp={[120, 90]}
        pr={70}
      />
      <Reading
        day={"Mon"}
        date={"Mar 31"}
        time={"9:29 AM"}
        bp={[120, 90]}
        pr={70}
      />
      <Reading
        day={"Mon"}
        date={"Mar 31"}
        time={"9:29 AM"}
        bp={[120, 90]}
        pr={70}
      />
      <Reading
        day={"Mon"}
        date={"Mar 31"}
        time={"9:29 AM"}
        bp={[120, 90]}
        pr={70}
      />
      <Reading
        day={"Mon"}
        date={"Mar 31"}
        time={"9:29 AM"}
        bp={[120, 90]}
        pr={70}
      />
      <Reading
        day={"Mon"}
        date={"Mar 31"}
        time={"9:29 AM"}
        bp={[120, 90]}
        pr={70}
      />
      <Reading
        day={"Mon"}
        date={"Mar 31"}
        time={"9:29 AM"}
        bp={[120, 90]}
        pr={70}
      />
      <Reading
        day={"Mon"}
        date={"Mar 31"}
        time={"9:29 AM"}
        bp={[120, 90]}
        pr={70}
      />
    </ScrollView>
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

  // BP indicator color based on BP
  const getBpColor = (sys: number, dia: number): IndicatorColor => {
    if (sys <= 120 && dia <= 80) {
      return colors.indicator.green; // Normal
    } else if (sys < 130 && dia < 80) {
      return colors.indicator.yellow; // Elevated
    } else if (sys < 140 && dia < 90) {
      return colors.indicator.orange; // Hypertension Stage 1
    } else if (sys <= 180 && dia <= 120) {
      return colors.indicator.deepOrange; // Hypertension Stage 2
    } else {
      return colors.indicator.red; // Hypertensive Crisis
    }
  };

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
          backgroundColor: getBpColor(bp[0], bp[1]),
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
    <View style={styles.container}>
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
