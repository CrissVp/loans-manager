import { DataContextProvider } from '@/contexts/dataContext';
import { Colors } from '@/constants/colors';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import useAuth from '@/hooks/useAuth';
import Loader from '@/components/Loader';

export default function AuthLayout() {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;
  if (!user) return null;

  return (
    <DataContextProvider>
      <View style={{ flex: 1, backgroundColor: Colors.darkBlue800 }}>
        <Stack>
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
      </View>
    </DataContextProvider>
  );
}
