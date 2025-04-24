import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { Colors } from '@/constants/colors';
import { useRouter } from 'expo-router';
import { z } from 'zod';

import useAuth from '@/hooks/useAuth';

const schema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(6, 'Password must have at least 5 characters'),
});

export default function SignIn() {
  const { replace } = useRouter();
  const { signIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    await signIn(data.email, data.password);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Sign In</Text>
        <Text style={styles.heading}>To Your Account</Text>
      </View>
      <View style={styles.form}>
        <Controller
          name='email'
          control={control}
          render={({ field: { onChange, value } }) => (
            <View>
              <Text style={styles.label}>Email</Text>
              <TextInput value={value} onChangeText={onChange} style={styles.input}></TextInput>
              {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
            </View>
          )}
        />
        <Controller
          name='password'
          control={control}
          render={({ field: { onChange, value } }) => (
            <View>
              <Text style={styles.label}>Password</Text>
              <TextInput
                secureTextEntry
                value={value}
                style={styles.input}
                onChangeText={onChange}
              ></TextInput>
              {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
            </View>
          )}
        />
        <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
          {/* {isLoading && <ActivityIndicator color={Colors.lightGray} />} */}
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => replace('/sign-up')}>
          <Text style={styles.footerButton}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    marginTop: 4,
    fontSize: 12,
    color: Colors.red,
    fontStyle: 'italic',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: Colors.darkBlue100,
  },
  header: {
    flex: 1,
    paddingInline: 40,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 26,
    fontWeight: 600,
    color: Colors.yellow,
  },
  form: {
    gap: 20,
    padding: 40,
    width: '100%',
    height: '70%',
    paddingTop: 60,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: Colors.darkBlue800,
  },
  input: {
    fontSize: 16,
    borderBottomWidth: 0.4,
    color: Colors.lightGray,
    borderColor: Colors.lightGray,
    backgroundColor: Colors.darkBlue800,
  },
  label: {
    fontSize: 14,
    fontWeight: 600,
    color: Colors.white,
  },
  button: {
    gap: 10,
    marginTop: 40,
    borderWidth: 0.4,
    paddingBlock: 12,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.lightGray,
    backgroundColor: Colors.yellow,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 600,
    color: Colors.darkBlue800,
  },
  footer: {
    paddingBottom: 30,
    paddingInline: 40,
    alignItems: 'flex-end',
    backgroundColor: Colors.darkBlue800,
  },
  footerText: {
    fontSize: 14,
    color: Colors.lightGray,
  },
  footerButton: {
    fontSize: 16,
    fontWeight: 500,
    color: Colors.white,
  },
});
