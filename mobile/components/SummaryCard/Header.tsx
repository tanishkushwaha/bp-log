import { scale } from "@/utils/functions";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { View, Text, StyleSheet } from "react-native";

export default function Header({
  title,
  titleColor = "black",
  subtitle,
  subtitleColor = "black",
}: {
  title: string;
  titleColor?: string;
  subtitle: string;
  subtitleColor?: string;
}) {
  return (
    <View style={styles.container}>
      <FontAwesome6 name='heart-pulse' size={48} color='#D92940' />
      <View>
        <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: subtitleColor }]}>
          {subtitle}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: scale(16),
  },
  title: {
    fontSize: scale(24),
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: scale(20),
  },
});
