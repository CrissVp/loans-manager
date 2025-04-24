import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useLocalSearchParams, useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { z } from 'zod';

import { Colors } from '@/constants/colors';
import useLoan from '@/hooks/useLoan';

import DatePicker from '@/components/DatePicker';

const schema = z.object({
  date: z.date(),
  title: z.string().min(1, 'Title is required'),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Amount must be a positive number',
  }),
});

export default function CreatePayment() {
  const { back } = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addPayment } = useLoan(id, { allowRefetch: false });

  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      amount: '',
      date: new Date(),
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setIsLoading(true);
    const addedPayment = await addPayment({ ...data, amount: Number(data.amount) });

    setIsLoading(false);
    back();
  };

  return (
    <View style={styles.container}>
      <Controller
        name='title'
        control={control}
        render={({ field: { onChange, value } }) => (
          <View>
            <Text style={styles.label}>Title</Text>
            <TextInput value={value} onChangeText={onChange} style={styles.input}></TextInput>
            {errors.title && <Text style={styles.error}>{errors.title.message}</Text>}
          </View>
        )}
      />
      <Controller
        name='amount'
        control={control}
        render={({ field: { onChange, value } }) => (
          <View>
            <Text style={styles.label}>Amount</Text>
            <TextInput
              value={value}
              style={styles.input}
              keyboardType='numeric'
              onChangeText={onChange}
            ></TextInput>
            {errors.amount && <Text style={styles.error}>{errors.amount.message}</Text>}
          </View>
        )}
      />
      <Controller
        name='date'
        control={control}
        render={({ field: { onChange, value } }) => (
          <View>
            <Text style={styles.label}>Date</Text>
            <DatePicker value={value} onChange={onChange} />
            {errors.date && <Text style={styles.error}>{errors.date.message}</Text>}
          </View>
        )}
      />
      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
        <Text style={styles.buttonText}>Create Payment</Text>
        {isLoading && <ActivityIndicator color={Colors.lightGray} />}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    padding: 20,
    paddingTop: 20,
    backgroundColor: Colors.darkBlue800,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    color: Colors.white,
    borderColor: Colors.darkBlue100,
  },
  label: {
    marginBottom: 8,
    fontWeight: 300,
    color: Colors.white,
  },
  button: {
    gap: 10,
    borderRadius: 5,
    paddingBlock: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.darkBlue100,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 500,
    color: Colors.yellow,
  },
  error: {
    marginTop: 4,
    fontSize: 12,
    color: Colors.red,
    fontStyle: 'italic',
  },
});
