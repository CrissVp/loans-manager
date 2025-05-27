import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { useState } from 'react';

import useYearStatistics from '@/hooks/useYearStatistics';
import LinearChart from '@/components/LinearChart';

export default function YearStatistics() {
  const [year, setYear] = useState(new Date().getFullYear());
  const { revenue, loansCreated } = useYearStatistics(year);

  const handlePreviousYear = () => {
    setYear((prevYear) => prevYear - 1);
  };

  const handleNextYear = () => {
    setYear((prevYear) => prevYear + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateNavigation}>
        <TouchableHighlight
          onPress={handlePreviousYear}
          style={styles.navigationButton}
          underlayColor={Colors.lightGray}
        >
          <MaterialIcons name='chevron-left' size={32} color={Colors.white} />
        </TouchableHighlight>
        <View style={styles.navigationTitle}>
          <Text style={styles.navigationTitleText}>Jan {year}</Text>
          <View style={styles.separator} />
          <Text style={styles.navigationTitleText}>Dec {year}</Text>
        </View>
        <TouchableHighlight
          onPress={handleNextYear}
          style={styles.navigationButton}
          underlayColor={Colors.lightGray}
        >
          <MaterialIcons name='chevron-right' size={32} color={Colors.white} />
        </TouchableHighlight>
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Revenue</Text>
        <LinearChart data={revenue} style='currency' />
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Loans Created</Text>
        <LinearChart data={loansCreated} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.darkBlue100,
  },
  chartContainer: {
    marginTop: 10,
    paddingBlock: 0,
    borderRadius: 10,
    borderWidth: 0.6,
    // paddingInline: 4,
    borderColor: Colors.lightGray,
    backgroundColor: Colors.darkBlue400,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
    marginBlock: 10,
    textAlign: 'center',
  },
  dateNavigation: {
    gap: 30,
    paddingBlock: 4,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
  navigationButton: {
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigationTitle: {
    gap: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
  navigationTitleText: {
    fontSize: 14,
    color: Colors.white,
    fontWeight: 'bold',
  },
  separator: {
    width: 16,
    height: 1,
    backgroundColor: Colors.white,
  },
});
