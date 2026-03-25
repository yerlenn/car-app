import { Tabs } from "expo-router";
import { Colors } from "../../constants";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        headerStyle: { backgroundColor: Colors.surface },
        headerTitleStyle: { fontWeight: "600" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarLabel: "Home",
        }}
      />
    </Tabs>
  );
}
