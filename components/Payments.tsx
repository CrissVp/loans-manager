import { ScrollView, Text, View } from "react-native";

import { timestampToDate } from "@/utils/helperFunctions";
import { Colors } from "@/constants/colors";
import { Payment } from "@/types";

export default function Payments({ payments }: { payments: Payment[] }) {
    if (!payments || payments.length === 0) return (
        <View style={{ borderTopColor: Colors.lightGray, borderTopWidth: 1 }}>
            <Text style={{ marginTop: 20, fontWeight: 300, textAlign: 'center', color: Colors.white }}>There are no payments yet</Text>
        </View>
    )

    return (
        <ScrollView
            contentContainerStyle={{ padding: 20, gap: 20 }}
            style={{ borderTopWidth: 1, borderTopColor: Colors.lightGray }}
        >
            {payments.map((payment) => (
                <View key={payment.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View>
                        <Text style={{ color: Colors.white, fontWeight: 500 }}>{payment.title}</Text>
                        <Text style={{ color: Colors.gray, fontWeight: 400, fontSize: 12 }}>{timestampToDate(payment.date)}</Text>
                    </View>
                    <Text style={{ color: Colors.lightGreen, fontWeight: 500 }}>
                        <Text style={{ fontSize: 16 }}>$</Text>
                        {payment.amount}
                    </Text>
                </View>
            ))}
        </ScrollView>
    )
}