import { MaterialIcons } from '@expo/vector-icons';
import { TouchableHighlight } from 'react-native';
import { Colors } from '@/constants/colors';
import { useRouter } from 'expo-router';

export default function AddButton() {
  const { navigate } = useRouter();

  return (
    <TouchableHighlight
      onPress={() => navigate('/create-loan')}
      underlayColor={Colors.darkBlue100}
      style={{
        padding: 8,
        backgroundColor: Colors.green,
        borderRadius: '50%',
        position: 'absolute',
        bottom: 20,
        right: 20,
      }}
    >
      <MaterialIcons name='add' size={36} color={Colors.white} />
    </TouchableHighlight>
  );
}
