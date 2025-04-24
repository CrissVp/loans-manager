import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import useAuth from '@/hooks/useAuth';

export default function Account() {
  const { user, logOut } = useAuth();
  console.log({ user });

  if (!user) return;

  return (
    <View style={styles.container}>
      <View style={styles.dataField}>
        <MaterialIcons name='person' size={30} color={Colors.lightGray} />
        <View>
          <Text style={styles.textHeading}>Name</Text>
          <Text style={styles.textValue}>{user.displayName || user.uid}</Text>
        </View>
      </View>
      <View style={styles.dataField}>
        <MaterialIcons name='email' size={30} color={Colors.lightGray} />
        <View>
          <Text style={styles.textHeading}>Email</Text>
          <Text style={styles.textValue}>{user.email}</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity onPress={() => logOut()} style={styles.button}>
          <MaterialIcons name='logout' size={24} color={Colors.darkBlue800} />
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    padding: 20,
    backgroundColor: Colors.darkBlue800,
  },
  dataField: {
    gap: 10,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.darkBlue100,
  },
  textHeading: {
    fontSize: 12,
    fontWeight: 400,
    color: Colors.lightGray,
  },
  textValue: {
    fontSize: 16,
    fontWeight: 400,
    color: Colors.white,
  },
  button: {
    gap: 10,
    paddingBlock: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 600,
    color: Colors.darkBlue800,
  },
});
