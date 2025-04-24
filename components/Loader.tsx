import { ActivityIndicator, View } from 'react-native';
import { Colors } from '@/constants/colors';

export default function Loader() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.darkBlue800,
      }}
    >
      <ActivityIndicator size={64} color={Colors.green} />
    </View>
  );
}
