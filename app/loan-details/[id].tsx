import { Colors } from "@/constants/colors";
import { loans } from "@/data";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";

export default function LoanDetails() {
    const { id } = useLocalSearchParams();
    const loan = loans.find((l) => l.id === id);

    if (!loan) return null;

    const monthlyCuote = (loan.total * (loan.interest + 1)) / loan.months;

    const amountPending = loan.payments.reduce((acc, curr) => {
        if (curr.status === "active") acc += curr.amount;
        return acc;
    }, 0);

    return (
        <View style={{ flex: 1, gap: 20, backgroundColor: Colors.darkGray, padding: 15 }}>
            <View style={{ gap: 10, marginTop: 10, alignItems: 'center' }}>
                <Text style={{ color: Colors.white, fontSize: 20, fontWeight: 600 }}>{loan.title}</Text>
                <Text style={{ color: Colors.gray, paddingInline: 40, textAlign: 'center' }}>{loan.description}</Text>
            </View>
            <View style={{ gap: 60, flexDirection: "row", justifyContent: 'space-between' }}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{ color: Colors.white, fontSize: 14, fontWeight: 300 }}>Interest</Text>
                    <Text style={{ color: Colors.white, fontSize: 20, fontWeight: 500 }}>{loan.interest * 100}%</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{ color: Colors.white, fontSize: 14, fontWeight: 300 }}>Monthly Cuote</Text>
                    <Text style={{ color: Colors.white, fontSize: 20, fontWeight: 500 }}>${monthlyCuote.toFixed(2)}</Text>
                </View>
            </View>
            <View style={{ gap: 60, flexDirection: "row", justifyContent: 'space-between' }}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{ color: Colors.white, fontSize: 14, fontWeight: 300 }}>Pending</Text>
                    <Text style={{ color: Colors.red, fontSize: 22, fontWeight: 800 }}>
                        <Text style={{ fontSize: 16 }}>$</Text>
                        {amountPending}
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{ color: Colors.white, fontSize: 16, fontWeight: 300 }}>Total</Text>
                    <Text style={{ color: Colors.lightGreen, fontSize: 22, fontWeight: 800 }}>
                        <Text style={{ fontSize: 16 }}>$</Text>
                        {loan.total}
                    </Text>
                </View>
            </View>
            <ScrollView
                contentContainerStyle={{ padding: 20, gap: 20 }}
                style={{ borderTopWidth: 1, borderTopColor: Colors.lightGray }}
            >
                {loan.payments.map((payment, index) => (
                    <View key={payment.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View>
                            <Text style={{ color: Colors.white, fontWeight: 500 }}>Month {index + 1}</Text>
                            <Text style={{ color: Colors.gray, fontWeight: 400, fontSize: 12 }}>{payment.status}</Text>
                        </View>
                        <Text style={{ color: Colors.lightGreen, fontWeight: 500 }}>
                            <Text style={{ fontSize: 16 }}>$</Text>
                            {payment.amount}
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}