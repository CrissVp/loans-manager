import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Text, TouchableHighlight, View } from "react-native";
import { Colors } from '@/constants/colors';
import { useState } from 'react';

interface Props {
    date: Date;
    setDate: React.Dispatch<React.SetStateAction<Date>>
}

export default function DatePicker({ date, setDate }: Props) {
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
            setDate(date);
        };

        setShown(false);
    };

    return (
        <View>
            <TouchableHighlight style={{ borderRadius: 5 }} onPress={() => setShown(true)}>
                <Text style={{ color: Colors.white, padding: 10, borderWidth: 1, borderColor: Colors.lightGray, borderRadius: 5 }}>
                    {label}
                </Text>
            </TouchableHighlight>
            {shown && (
                <DateTimePicker value={date} onChange={handleChangeDate} />
            )}
        </View>
    )
}