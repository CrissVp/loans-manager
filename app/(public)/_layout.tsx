import Loader from '@/components/Loader';
import { Colors } from '@/constants/colors';
import { Redirect, Slot, Stack } from 'expo-router';
import { View } from 'react-native';
import useAuth from '@/hooks/useAuth';

export default function PublicLayout() {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  if (user) {
    return <Redirect href='/(authenticated)/(tabs)' />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.darkBlue800 }}>
      <Stack
        screenOptions={{
          statusBarAnimation: 'fade',
          navigationBarColor: Colors.darkBlue800,
          statusBarBackgroundColor: Colors.darkBlue800,
        }}
      />
    </View>
  );
}
