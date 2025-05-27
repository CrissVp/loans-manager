import { ScrollView, Text, TouchableHighlight, View } from 'react-native';
import { useRouter } from 'expo-router';

import { timestampToDate } from '@/utils/helperFunctions';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import useLoans from '@/hooks/useLoans';

import ErrorScreen from '@/components/ErrorScreen';
import AddButton from '@/components/AddButton';
import Loader from '@/components/Loader';
import { useZustandLoans } from '@/hooks/useLoanStore';

export default function Loans() {
  const { loans } = useZustandLoans();
  const { navigate } = useRouter();

  if (loans.isLoading) return <Loader />;
  if (loans.error || !loans.data) return <ErrorScreen message={loans.error} />;

  return (
    <>
      <ScrollView
        style={{
          flex: 1,
          paddingInline: 15,
          backgroundColor: Colors.darkBlue800,
        }}
        contentContainerStyle={{
          paddingBottom: 60,
        }}
      >
        {loans.data.map((loan) => (
          <TouchableHighlight
            key={loan.id}
            underlayColor={Colors.darkBlue100}
            onPress={() =>
              navigate({
                pathname: '/loan-details/[id]',
                params: { id: loan.id },
              })
            }
          >
            <View
              style={{
                gap: 10,
                width: '100%',
                paddingBlock: 15,
                paddingInline: 10,
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor: Colors.darkBlue100,
              }}
            >
              <MaterialIcons color={Colors.yellow} name='pending-actions' size={26} />
              <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <Text style={{ color: Colors.white, fontSize: 16, fontWeight: 500 }}>
                  {loan.title}
                </Text>
                <Text style={{ color: Colors.lightGray, fontWeight: 500, fontSize: 13 }}>
                  {timestampToDate(loan.startDate)}
                </Text>
              </View>
              <View>
                <Text style={{ color: Colors.green, fontSize: 20, fontWeight: 500 }}>
                  <Text style={{ fontSize: 14 }}>$</Text>
                  {loan.total}
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        ))}
      </ScrollView>
      <AddButton />
    </>
  );
}
