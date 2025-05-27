import { DataContextProvider } from '@/contexts/dataContext';
import { Redirect, Stack } from 'expo-router';
import { View } from 'react-native';

import { Colors } from '@/constants/colors';
import Loader from '@/components/Loader';
import useAuth from '@/hooks/useAuth';

export default function AuthLayout() {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  if (!user) {
    return <Redirect href='/(public)/landing' />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.darkBlue800 }}>
      <DataContextProvider>
        <Stack
          screenOptions={{
            animation: 'fade',
            statusBarAnimation: 'fade',
            navigationBarColor: Colors.darkBlue800,
            statusBarBackgroundColor: Colors.darkBlue800,
          }}
        >
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
          <Stack.Screen
            name='loan-details/[id]'
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: Colors.darkBlue800,
              },
              headerTintColor: Colors.white,
              title: 'Loan Details',
            }}
          />
          <Stack.Screen
            name='(forms)/create-loan'
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: Colors.darkBlue800,
              },
              headerTintColor: Colors.white,
              title: 'Create Loan',
            }}
          />
          <Stack.Screen
            name='(forms)/create-payment'
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: Colors.darkBlue800,
              },
              headerTintColor: Colors.white,
              title: 'Create Payment',
            }}
          />
        </Stack>
      </DataContextProvider>
    </View>
  );
}
