import { Text, ScrollView, View } from 'react-native';

const Expenses = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#121212', padding: 20 }}>
      <Text style={{ color: '#fff', fontSize: 24, marginBottom: 20 }}>Expenses</Text>
    </ScrollView>
  );
};

export default Expenses;
