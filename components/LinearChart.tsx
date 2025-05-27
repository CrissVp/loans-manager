import { LineChart, lineDataItem } from 'react-native-gifted-charts';
import { Dimensions, Text, View } from 'react-native';
import { Colors } from '@/constants/colors';

interface ChartProps {
  data: number[];
  style?: 'currency' | 'number';
}

const width = Dimensions.get('screen').width;

export default function LinearChart({ data, style = 'number' }: ChartProps) {
  const maxValue = Math.max(...data);
  const maxValueChart = maxValue * 1.2; // Increase max value by 10% for better visualization

  const chartData: lineDataItem[] = data.map((item, index) => ({
    value: item,
    hideDataPoint: true,
    label: new Date(2025, index, 1).toLocaleDateString(['en'], { month: 'short' }),
    labelTextStyle: { color: Colors.lightGray, fontSize: 8, textTransform: 'capitalize' },
  }));

  const yAxisLabelTexts = Array.from({ length: 6 }, (_, i) => {
    const val = (maxValueChart / 5) * i;
    return `${style === 'currency' ? '$' : ''}${val.toFixed(0)}`;
  });

  return (
    <LineChart
      isAnimated
      areaChart
      thickness={2}
      height={150}
      data={chartData}
      noOfSections={5}
      width={width - 60}
      animateOnDataChange
      maxValue={maxValueChart}
      renderDataPointsAfterAnimationEnds={true}
      color={Colors.green}
      animationDuration={300}
      onDataChangeAnimationDuration={300}
      animateTogether={true}
      yAxisLabelWidth={-2}
      yAxisTextStyle={{ color: '#07BAD1', fontSize: 10 }}
      yAxisLabelTexts={yAxisLabelTexts}
      startFillColor={'rgb(84,219,234)'}
      endFillColor={'rgb(84,219,234)'}
      startOpacity={0.4}
      endOpacity={0.1}
      hideOrigin
      showVerticalLines
      verticalLinesColor={'rgba(118, 134, 165, 0.2)'}
      rulesColor={'rgba(118, 134, 165, 0.2)'}
      initialSpacing={12}
      endSpacing={0}
      yAxisThickness={0}
      yAxisColor={Colors.lightGray}
      xAxisColor={Colors.lightGray}
      adjustToWidth={true}
      pointerConfig={{
        pointerStripHeight: 160,
        pointerStripColor: Colors.white,
        pointerStripWidth: 1,
        pointerColor: Colors.white,
        radius: 6,
        pointerLabelWidth: 100,
        pointerLabelHeight: 40,
        autoAdjustPointerLabelPosition: true,
        pointerLabelComponent: (items: lineDataItem[]) => {
          return (
            <View
              style={{
                height: 60,
                width: 100,
                justifyContent: 'center',
              }}
            >
              <View
                style={{
                  paddingHorizontal: 14,
                  paddingVertical: 6,
                  borderRadius: 16,
                  backgroundColor: Colors.darkBlue100,
                }}
              >
                <Text style={{ fontWeight: 'bold', textAlign: 'center', color: Colors.white }}>
                  {items[0]?.value !== undefined ? '$' + items[0].value.toFixed(0) : ''}
                </Text>
              </View>
            </View>
          );
        },
      }}
    />
  );
}
