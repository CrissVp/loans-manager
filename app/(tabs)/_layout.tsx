import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { Tabs } from "expo-router";

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: Colors.green,
            tabBarInactiveTintColor: Colors.lightGray,
            headerStyle: {
                backgroundColor: Colors.darkBlue800,
                borderColor: Colors.darkBlue100,
                borderBottomWidth: 1
            },
            headerShadowVisible: false,
            headerTintColor: Colors.white,
            tabBarStyle: {
                borderTopWidth: 1,
                borderColor: Colors.darkBlue100,
                backgroundColor: Colors.darkBlue800,
            },
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <MaterialIcons name="home" color={color} size={24} />
                }}
            />
            <Tabs.Screen
                name="expenses"
                options={{
                    title: 'Expenses',
                    tabBarIcon: ({ color }) => <MaterialIcons name="attach-money" color={color} size={24} />
                }}
            />
            <Tabs.Screen
                name="loans"
                options={{
                    title: 'Loans',
                    tabBarIcon: ({ color }) => <MaterialIcons name="attach-money" color={color} size={24} />
                }}
            />
        </Tabs>
    )
}