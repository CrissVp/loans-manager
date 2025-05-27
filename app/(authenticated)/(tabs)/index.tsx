import { ScrollView, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

import GeneralResume from '@/components/GeneralResume';
import YearStatistics from '@/components/YearStatistics';

export default function Index() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <GeneralResume />
      <YearStatistics />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBlue800,
  },
  contentContainer: {
    gap: 30,
    flexGrow: 1,
  },
});
