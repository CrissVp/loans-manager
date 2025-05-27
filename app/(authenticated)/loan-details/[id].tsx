import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';

import { getProfit, getSuggestedFee, getTimeframe, timestampToDate } from '@/utils/helperFunctions';
import { Colors } from '@/constants/colors';
import { Period } from '@/types';
import useLoan from '@/hooks/useLoan';

import ErrorScreen from '@/components/ErrorScreen';
import Payments from '@/components/Payments';
import Loader from '@/components/Loader';
import { useZustandLoan } from '@/hooks/useLoanStore';

export default function LoanDetails() {
  const { navigate } = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  // const {
  //   state: { data: loan, isLoading, error },
  // } = useLoan(id);
  const { loan } = useZustandLoan(id);

  const [periodType, setPeriodType] = useState<Period>(Period.Monthly);

  // if (isLoading) return <Loader />;
  if (!loan) return <ErrorScreen message={'Error getting loan data'} />;

  const timeFrame = getTimeframe(loan.startDate, loan.endDate);
  const profit = getProfit(loan.total, loan.interest, timeFrame.months);

  const suggestedFee = getSuggestedFee(loan.total + profit, timeFrame[periodType]);

  const amountPending = loan.payments.reduce(
    (acc, curr) => (acc -= curr.amount),
    loan.total + profit
  );

  const handleChangePeriodType = () => {
    const periods = Object.values(Period);
    const periodIndex = periods.findIndex((item) => item === periodType) + 1;

    if (periodIndex >= Object.values(Period).length) return setPeriodType(periods[0]);
    setPeriodType(periods[periodIndex]);
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 6,
        paddingInline: 15,
        backgroundColor: Colors.darkBlue800,
      }}
    >
      <View style={{ gap: 0, alignItems: 'center' }}>
        <Text style={{ color: Colors.white, fontSize: 20, fontWeight: 600 }}>{loan.title}</Text>
        <Text
          style={{
            color: Colors.gray,
            paddingInline: 40,
            textAlign: 'center',
          }}
        >
          {loan.description}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: Colors.darkBlue100,
          paddingBlock: 10,
          paddingInline: 20,
          borderRadius: 10,
          marginTop: 10,
          gap: 10,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ color: Colors.white, fontSize: 14, fontWeight: 300 }}>Pending</Text>
            <Text style={{ color: Colors.red, fontSize: 30, fontWeight: 800 }}>
              <Text style={{ fontSize: 20 }}>$</Text>
              {amountPending.toFixed(2)}
            </Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ color: Colors.white, fontSize: 12, fontWeight: 300 }}>
              Suggested {Object.entries(Period).filter(([_, value]) => value === periodType)[0][0]}{' '}
              Fee
            </Text>
            <View style={{ gap: 10, flexDirection: 'row' }}>
              <Text style={{ color: Colors.white, fontSize: 18, fontWeight: 800 }}>
                <Text style={{ fontSize: 14 }}>$</Text>
                {suggestedFee.toFixed(2)}
              </Text>
              <TouchableOpacity
                onPress={handleChangePeriodType}
                style={{ alignItems: 'center', justifyContent: 'center' }}
              >
                <MaterialIcons name='change-circle' size={22} color={Colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ color: Colors.white, fontSize: 14, fontWeight: 300 }}>Interest</Text>
            <Text style={{ color: Colors.white, fontSize: 16, fontWeight: 500 }}>
              {loan.interest}%
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ color: Colors.white, fontSize: 14, fontWeight: 300 }}>Profit</Text>
            <Text style={{ color: Colors.yellow, fontSize: 16, fontWeight: 500 }}>
              <Text style={{ fontSize: 14 }}>$</Text>
              {profit.toFixed(2)}
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ color: Colors.white, fontSize: 14, fontWeight: 300 }}>Total</Text>
            <Text style={{ color: Colors.green, fontSize: 16, fontWeight: 800 }}>
              <Text style={{ fontSize: 16 }}>$</Text>
              {loan.total}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ color: Colors.white, fontSize: 14, fontWeight: 300 }}>Start Date</Text>
            <Text style={{ color: Colors.white, fontSize: 16, fontWeight: 500 }}>
              {timestampToDate(loan.startDate)}
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ color: Colors.white, fontSize: 14, fontWeight: 300 }}>End Date</Text>
            <Text style={{ color: Colors.white, fontSize: 16, fontWeight: 500 }}>
              {timestampToDate(loan.endDate)}
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ color: Colors.white, fontSize: 14, fontWeight: 300 }}>Payments</Text>
            <Text style={{ color: Colors.lightBlue, fontSize: 16, fontWeight: 500 }}>
              {loan.payments.length}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, marginTop: 20 }}>
        <View
          style={{
            marginBottom: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontWeight: 600, fontSize: 20, color: Colors.white }}>Payments</Text>
          <TouchableOpacity
            onPress={() => navigate(`/(forms)/create-payment?id=${loan.id}`)}
            style={{
              gap: 4,
              paddingBlock: 2,
              paddingInline: 4,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: Colors.green,
              borderRadius: 5,
            }}
          >
            <MaterialIcons name='add' size={24} style={{ color: Colors.white }} line />
            {/* <Text style={{ fontWeight: 600, fontSize: 16, color: Colors.white }}>New</Text> */}
          </TouchableOpacity>
        </View>
        <Payments payments={loan.payments} />
      </View>
    </View>
  );
}
