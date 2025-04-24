import { Colors } from '@/constants/colors';
import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function PublicLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.darkBlue800 }}>
      <Stack>
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen
          name='sign-in'
          options={{
            headerShown: false,
            statusBarStyle: 'light',
            statusBarBackgroundColor: Colors.darkBlue100,
          }}
        />
        <Stack.Screen
          name='sign-up'
          options={{
            headerShown: false,
            statusBarStyle: 'light',
            statusBarBackgroundColor: Colors.darkBlue100,
          }}
        />
      </Stack>
    </View>
  );
}
