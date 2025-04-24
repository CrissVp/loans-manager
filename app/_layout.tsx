import { AuthContextProvider } from '@/contexts/authContext';
import { Colors } from '@/constants/colors';
import { View } from 'react-native';
import { Stack } from 'expo-router';

import AuthRedirector from '@/components/AuthRedirector';

export default function RootLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.darkBlue800 }}>
      <AuthContextProvider>
        <AuthRedirector>
          <Stack
            screenOptions={{
              statusBarAnimation: 'fade',
              navigationBarColor: Colors.darkBlue800,
              statusBarBackgroundColor: Colors.darkBlue800,
            }}
          >
            <Stack.Screen name='(public)' options={{ headerShown: false }} />
            <Stack.Screen name='(authenticated)' options={{ headerShown: false }} />
            <Stack.Screen name='+not-found' options={{ headerShown: false }} />
          </Stack>
        </AuthRedirector>
      </AuthContextProvider>
    </View>
  );
}
