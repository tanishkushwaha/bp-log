import React from "react";
import { Tabs } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { View, StyleSheet } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarLabelStyle: { color: "#black" } }}>
      <Tabs.Screen
        name='index'
        options={{
          title: "Readings",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='clipboard-text' />
          ),
        }}
      />

      <Tabs.Screen
        name='statistics'
        options={{
          title: "Statistics",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='chart-bar' />
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
    </Tabs>
  );
}

function TabBarIcon({ focused, name }: any) {
  if (focused)
    return (
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name={name} size={18} color='black' />
      </View>
    );
  return <MaterialCommunityIcons name={name} size={18} color='black' />;
}

const styles = StyleSheet.create({
  iconContainer: {
    borderRadius: 50,
    backgroundColor: "#bbb",
    width: 50,
    padding: 4,
    alignItems: "center",
  },
});
