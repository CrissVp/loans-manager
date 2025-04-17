import { DataContextProvider } from "@/contexts/dataContext";
import { Colors } from "@/constants/colors";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <DataContextProvider>
      <View style={{ flex: 1, backgroundColor: Colors.darkBlue800 }}>
        <Stack screenOptions={{
          navigationBarColor: Colors.darkBlue800,
          statusBarBackgroundColor: Colors.darkBlue800
        }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" options={{ headerShown: false }} />
          <Stack.Screen name="loan-details/[id]" options={{
            headerShown: true,
            headerStyle: {
              backgroundColor:
                Colors.darkBlue800
            },
            headerTintColor: Colors.white,
            title: 'Loan Details'
          }} />
          <Stack.Screen name="(forms)/create-loan" options={{
            headerShown: true,
            headerStyle: {
              backgroundColor:
                Colors.darkBlue800
            },
            headerTintColor: Colors.white,
            title: 'Create Loan'
          }} />
          <Stack.Screen name="(forms)/create-payment" options={{
            headerShown: true,
            headerStyle: {
              backgroundColor:
                Colors.darkBlue800
            },
            headerTintColor: Colors.white,
            title: 'Create Payment'
          }} />
        </Stack>
      </View >
    </DataContextProvider>
  );
}
