import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Text, TouchableHighlight, View } from 'react-native';
import { Colors } from '@/constants/colors';
import { useState } from 'react';

interface Props {
  value: Date;
  onChange: (date: Date) => void;
}

export default function DatePicker({ value, onChange }: Props) {
  const [shown, setShown] = useState(false);
  const [label, setLabel] = useState('Select Date');

  const handleChangeDate = (event: DateTimePickerEvent, date?: Date) => {
    const { type } = event;

    if (type === 'dismissed') {
      setShown(false);
      return;
    }

    if (date) {
      setLabel(date.toLocaleString([], { dateStyle: 'short' }));
      onChange(date);
    }

    setShown(false);
  };

  return (
    <View>
      <TouchableHighlight style={{ borderRadius: 5 }} onPress={() => setShown(true)}>
        <Text
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            color: Colors.white,
            borderColor: Colors.darkBlue100,
          }}
        >
          {label}
        </Text>
      </TouchableHighlight>
      {shown && <DateTimePicker value={value} onChange={handleChangeDate} />}
    </View>
  );
}
