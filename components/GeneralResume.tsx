import { PieChart, PieChartPro, pieDataItem } from 'react-native-gifted-charts';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { USDollar } from '@/utils/currency';
import { Colors } from '@/constants/colors';

import useGeneralResume from '@/hooks/useGeneralResume';

export default function GeneralResume() {
  const { totalInvested, totalPaid, totalPending, totalProfit, paidPercent } = useGeneralResume();
  // const [totalPaidFormatted, setTotalPaidFormatted] = useState(100);
  // const [totalPendingFormatted, setTotalPendingFormatted] = useState(100);

  // const [visible, setVisible] = useState(true);
  // const [data, setData] = useState<pieDataItem[]>([
  //   {
  //     value: 100,
  //     color: Colors.green,
  //     gradientCenterColor: '#0f8a55',
  //   },
  //   {
  //     value: 100,
  //     color: Colors.yellow,
  //     gradientCenterColor: '#e6b919',
  //   },
  // ]);

  // useEffect(() => {
  //   setTotalPaidFormatted(totalPaid);
  //   setTotalPendingFormatted(totalPending);
  // }, [totalPaid, totalPending]);

  console.log({ totalInvested, totalPaid, totalPending, totalProfit, paidPercent });

  const data: pieDataItem[] = [
    {
      value: totalPaid,
      color: Colors.green,
      gradientCenterColor: '#0f8a55',
    },
    {
      value: totalPending,
      color: Colors.yellow,
      gradientCenterColor: '#e6b919',
    },
  ];

  const toggleVisibility = () => {
    // setTotalPaidFormatted(Math.floor(Math.random() * 100));
    // setTotalPendingFormatted(Math.floor(Math.random() * 100));
    // setData([
    //   {
    //     value: Math.floor(Math.random() * 100),
    //     color: Colors.green,
    //     gradientCenterColor: '#0f8a55',
    //   },
    //   {
    //     value: Math.floor(Math.random() * 100),
    //     color: Colors.yellow,
    //     gradientCenterColor: '#e6b919',
    //   },
    // ]);
    // setVisible(!visible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>GeneralResume</Text>
      <View style={styles.totalDetails}>
        <View>
          <Text style={styles.totalDetailsLabel}>Total Invested</Text>
          <Text style={styles.totalDetailsText}>{USDollar.format(totalInvested)}</Text>
        </View>
        <View>
          <Text style={styles.totalDetailsLabel}>Total Profit</Text>
          <Text style={styles.totalDetailsText}>{USDollar.format(totalProfit)}</Text>
        </View>
        {/* <View>
          <TouchableHighlight
            onPress={toggleVisibility}
            style={{ padding: 10, backgroundColor: Colors.red, borderRadius: 5 }}
          >
            <Text style={{ color: Colors.white, fontWeight: 'bold' }}>TOGGLE VISIBILITY</Text>
          </TouchableHighlight>
        </View> */}
      </View>
      <View style={styles.chartContainer}>
        <View style={styles.chartStyle}>
          <PieChart
            donut
            data={data}
            showGradient
            radius={60}
            innerRadius={46}
            sectionAutoFocus
            innerCircleColor={Colors.darkBlue800}
            centerLabelComponent={() => {
              return (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>
                    {paidPercent.toFixed(1)}%
                  </Text>
                  <Text style={{ fontSize: 14, color: 'white' }}>Paid</Text>
                </View>
              );
            }}
          />
          {/* {visible && (
          )} */}
        </View>
        <View style={styles.chartLeyend}>
          <View style={styles.totalDetail}>
            <MaterialIcons name='circle' size={14} color={Colors.green} />
            <View>
              <Text style={styles.totalDetailsLabel}>Total Paid</Text>
              <Text style={styles.totalDetailsText}>{USDollar.format(totalPaid)}</Text>
            </View>
          </View>
          <View style={styles.totalDetail}>
            <MaterialIcons name='circle' size={14} color={Colors.yellow} />
            <View>
              <Text style={styles.totalDetailsLabel}>Total Pending</Text>
              <Text style={styles.totalDetailsText}>{USDollar.format(totalPending)}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 14,
    marginTop: 20,
    borderRadius: 10,
    paddingInline: 40,
    backgroundColor: Colors.darkBlue800,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.green,
  },
  totalDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 40,
  },
  totalDetailsLabel: {
    color: Colors.white,
    fontWeight: 300,
    fontSize: 14,
  },
  totalDetailsText: {
    fontSize: 16,
    fontWeight: 500,
    color: Colors.white,
    letterSpacing: 2,
  },
  totalDetail: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chartStyle: {
    flex: 1,
    height: 120,
  },
  chartLeyend: {
    flex: 1,
    gap: 10,
    marginLeft: 40,
    justifyContent: 'center',
  },
});
