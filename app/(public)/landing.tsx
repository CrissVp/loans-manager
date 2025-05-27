import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

export default function Landing() {
  const { navigate } = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen
        name='landing'
        options={{
          headerShown: false,
          statusBarStyle: 'light',
          statusBarBackgroundColor: Colors.darkBlue800,
        }}
      />
      <View style={styles.logoContainer}>
        <Ionicons name='logo-react' size={64} color={Colors.lightBlue} />
        <Text style={styles.logoText}>LOANS MANAGER</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Text style={styles.heading}>Welcome Back</Text>
        <TouchableHighlight
          style={styles.button}
          underlayColor={Colors.white}
          onPress={() => navigate('/sign-in')}
        >
          <Text style={styles.buttonText}>SIGN IN</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => navigate('/sign-up')}
          underlayColor={Colors.darkBlue800}
          style={[styles.button, styles.buttonSecondary]}
        >
          <Text style={[styles.buttonText, styles.buttonTextSecondary]}>SIGN UP</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: Colors.darkBlue800,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 16,
    marginTop: 6,
    color: Colors.white,
  },
  buttonsContainer: {
    flex: 1,
    gap: 20,
  },
  heading: {
    fontSize: 28,
    marginBottom: 20,
    color: Colors.white,
    textAlign: 'center',
  },
  button: {
    borderWidth: 1,
    paddingBlock: 12,
    borderRadius: 999,
    alignItems: 'center',
    borderColor: Colors.white,
  },
  buttonSecondary: {
    backgroundColor: Colors.white,
    borderColor: Colors.darkBlue800,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 600,
    color: Colors.white,
  },
  buttonTextSecondary: {
    color: Colors.darkBlue800,
  },
});
