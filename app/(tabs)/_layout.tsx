import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { Tabs } from "expo-router";

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: Colors.yellow,
            headerStyle: {
                backgroundColor: Colors.darkGray,
            },
            headerShadowVisible: false,
            headerTintColor: Colors.white,
            tabBarStyle: {
                borderTopColor: Colors.gray,
                backgroundColor: Colors.darkGray,
            },
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <MaterialIcons name="home" color={color} size={26} />
                }}
            />
            <Tabs.Screen
                name="expenses"
                options={{
                    title: 'Expenses',
                    tabBarIcon: ({ color }) => <MaterialIcons name="attach-money" color={color} size={26} />
                }}
            />
            <Tabs.Screen
                name="loans"
                options={{
                    title: 'Loans',
                    tabBarIcon: ({ color }) => <MaterialIcons name="attach-money" color={color} size={26} />
                }}
            />
        </Tabs>
    )
}