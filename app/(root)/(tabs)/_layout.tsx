import React from "react";
import { Tabs } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { View, StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/ThemeContext";
import { BPDataProvider } from "@/contexts/BPDataContext";
import ThreeDotMenu from "@/components/ThreeDotMenu";
import { RefreshKeyProvider } from "@/contexts/RefreshKeyContext";

export default function TabsLayoutWrapper() {
  return (
    <BPDataProvider>
      <RefreshKeyProvider>
        <TabsLayout />
      </RefreshKeyProvider>
    </BPDataProvider>
  );
}

function TabsLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarLabelStyle: { color: colors[theme].text },
        tabBarStyle: {
          backgroundColor: colors[theme].secondary,
          borderTopWidth: 0,
        },
        headerStyle: {
          backgroundColor: colors[theme].primary,
        },
        headerTitleStyle: {
          color: colors[theme].text,
        },
        headerRight: () => <ThreeDotMenu />,
      }}
    >
      <Tabs.Screen
        name='readings'
        options={{
          title: "Readings",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='clipboard-text' />
          ),
        }}
      />

      <Tabs.Screen
        name='charts'
        options={{
          title: "Charts",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='chart-timeline-variant' />
          ),
        }}
      />
      <Tabs.Screen
        name='analysis'
        options={{
          title: "Analysis",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='flask-empty-outline' />
          ),
        }}
      />
    </Tabs>
  );
}

function TabBarIcon({ focused, name }: any) {
  const { theme } = useTheme();

  if (focused)
    return (
      <View
        style={[styles.iconContainer, { backgroundColor: colors[theme].focus }]}
      >
        <MaterialCommunityIcons
          name={name}
          size={18}
          color={colors[theme].text}
        />
      </View>
    );
  return (
    <MaterialCommunityIcons name={name} size={18} color={colors[theme].text} />
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    borderRadius: 50,
    width: 50,
    padding: 4,
    alignItems: "center",
  },
});
