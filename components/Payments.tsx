import { ScrollView, Text, TouchableHighlight, View } from 'react-native';

import { timestampToDate } from '@/utils/helperFunctions';
import { Colors } from '@/constants/colors';
import { Payment } from '@/types';
import { MaterialIcons } from '@expo/vector-icons';

export default function Payments({ payments }: { payments: Payment[] }) {
  if (!payments || payments.length === 0)
    return (
      <View
        style={{
          paddingTop: 40,
          borderTopWidth: 1,
          alignItems: 'center',
          borderTopColor: Colors.darkBlue100,
        }}
      >
        <MaterialIcons name='info' size={36} color={Colors.white} />
        <Text
          style={{
            marginTop: 10,
            fontWeight: 300,
            textAlign: 'center',
            color: Colors.white,
          }}
        >
          There are no payments yet
        </Text>
      </View>
    );

  return (
    <ScrollView
      contentContainerStyle={{ paddingInline: 10 }}
      style={{ borderTopWidth: 1, borderTopColor: Colors.darkBlue100, paddingTop: 10 }}
    >
      {payments.map((payment) => (
        <TouchableHighlight
          key={payment.id}
          onLongPress={() => {}}
          underlayColor={Colors.darkBlue100}
        >
          <View
            style={{
              gap: 10,
              padding: 10,
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderColor: Colors.darkBlue100,
            }}
          >
            <View>
              <Text style={{ color: Colors.white, fontWeight: 500 }}>
                {payment.title}
              </Text>
              <Text
                style={{ color: Colors.gray, fontWeight: 400, fontSize: 12 }}
              >
                {timestampToDate(payment.date)}
              </Text>
            </View>
            <Text
              style={{ color: Colors.green, fontWeight: 500, fontSize: 18 }}
            >
              <Text style={{ fontSize: 14 }}>$</Text>
              {payment.amount}
            </Text>
          </View>
        </TouchableHighlight>
      ))}
    </ScrollView>
  );
}
