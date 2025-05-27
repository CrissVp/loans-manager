import { AuthContextProvider } from '@/contexts/authContext';
import { Stack, usePathname } from 'expo-router';
import { Colors } from '@/constants/colors';
import { View } from 'react-native';


export default function RootLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.darkBlue800 }}>
      <AuthContextProvider>
        <Stack
          screenOptions={{
            animation: 'fade',
            statusBarAnimation: 'fade',
            navigationBarColor: Colors.darkBlue800,
            statusBarBackgroundColor: Colors.darkBlue800,
          }}
        >
          <Stack.Screen name='(public)' options={{ headerShown: false }} />
          <Stack.Screen name='(authenticated)' options={{ headerShown: false }} />
        </Stack>
      </AuthContextProvider>
    </View>
  );
}
