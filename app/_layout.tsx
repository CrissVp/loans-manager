import { Colors } from "@/constants/colors";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <Stack screenOptions={{
      navigationBarColor: Colors.darkGray,
      statusBarBackgroundColor: Colors.darkGray
    }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      <Stack.Screen name="loan-details/[id]" options={{
        headerShown: true,
        headerStyle: {
          backgroundColor:
            Colors.darkGray
        },
        headerTintColor: Colors.white,
        title: 'Loan Details'
      }} />
      {/* <StatusBar style="dark" /> */}
    </Stack>
  );
}
