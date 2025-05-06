import { scale } from "@/utils/functions";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { View, Text, StyleSheet } from "react-native";

export default function Section({
  headingColor = "black",
  bulletTextColor = "black",
  bulletIconColor = "black",
  heading,
  points,
}: {
  headingColor?: string;
  bulletTextColor?: string;
  bulletIconColor?: string;
  heading: string;
  points: string[];
}) {
  return (
    <View style={styles.container}>
      <Text style={[styles.heading, { color: headingColor }]}>{heading}</Text>
      {points.map((point, index) => (
        <View key={index} style={styles.bulletContainer}>
          <FontAwesome name='circle' size={6} color={bulletIconColor} />
          <Text style={[styles.bulletText, { color: bulletTextColor }]}>
            {point}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: scale(8),
  },
  heading: {
    fontSize: scale(20),
    fontWeight: "bold",
  },
  bulletContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
  },
  bulletText: {
    fontSize: scale(16),
  },
});
