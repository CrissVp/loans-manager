import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";

import { getTimeframe, timestampToDate } from "@/utils/helperFunctions";
import { Colors } from "@/constants/colors";
import { Period } from "@/types";
import useLoan from "@/hooks/useLoan";

import ErrorScreen from "@/components/ErrorScreen";
import Payments from "@/components/Payments";
import Loader from "@/components/Loader";

export default function LoanDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { data: loan, isLoading, error } = useLoan(id);
    const { navigate } = useRouter();

    const [periodType, setPeriodType] = useState<Period>(Period.Monthly);

    if (isLoading) return <Loader />;
    if (error || !loan) return <ErrorScreen message={error} />

    const timeFrame = getTimeframe(loan.startDate, loan.endDate);
    console.log({timeFrame})
    const suggestedFee = (loan.total / timeFrame[periodType]) * (loan.interest / 100 + 1);
    const amountPending = loan.payments.reduce((acc, curr) => acc -= curr.amount, loan.total);

    const handleChangePeriodType = () => {
        const periods = Object.values(Period);
        const periodIndex = periods.findIndex((item) => item === periodType) + 1;

        if (periodIndex >= Object.values(Period).length) return setPeriodType(periods[0]);
        setPeriodType(periods[periodIndex]);
    };

    return (
        <View style={{ flex: 1, gap: 10, backgroundColor: Colors.darkGray, padding: 15 }}>
            <View style={{ gap: 10, marginTop: 10, alignItems: 'center' }}>
                <Text style={{ color: Colors.white, fontSize: 20, fontWeight: 600 }}>{loan.title}</Text>
                <Text style={{ color: Colors.gray, paddingInline: 40, textAlign: 'center' }}>{loan.description}</Text>
            </View>
            <View style={{ gap: 60, flexDirection: "row", justifyContent: 'space-between' }}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{ color: Colors.white, fontSize: 14, fontWeight: 300 }}>Interest</Text>
                    <Text style={{ color: Colors.white, fontSize: 18, fontWeight: 500 }}>{loan.interest}%</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{ color: Colors.white, fontSize: 14, fontWeight: 300 }}>Profit</Text>
                    <Text style={{ color: Colors.yellow, fontSize: 18, fontWeight: 500 }}>
                        <Text style={{ fontSize: 14 }}>$</Text>
                        {suggestedFee.toFixed(2)}
                    </Text>
                </View>
            </View>
            <View style={{ gap: 60, flexDirection: "row", justifyContent: 'space-between' }}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{ color: Colors.white, fontSize: 14, fontWeight: 300 }}>Start Date</Text>
                    <Text style={{ color: Colors.white, fontSize: 18, fontWeight: 500 }}>{timestampToDate(loan.startDate)}</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{ color: Colors.white, fontSize: 14, fontWeight: 300 }}>End Date</Text>
                    <Text style={{ color: Colors.white, fontSize: 18, fontWeight: 500 }}>{timestampToDate(loan.endDate)}</Text>
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
            <View style={{ alignItems: 'center' }}>
                <Text style={{ color: Colors.white, fontSize: 16, fontWeight: 300 }}>
                    Suggested {Object.entries(Period).filter(([_, value]) => value === periodType)[0][0]} Fee
                </Text>
                <View style={{ gap: 10, flexDirection: 'row' }}>
                    <Text style={{ color: Colors.white, fontSize: 22, fontWeight: 800 }}>
                        <Text style={{ fontSize: 16 }}>$</Text>
                        {suggestedFee.toFixed(2)}
                    </Text>
                    <TouchableOpacity onPress={handleChangePeriodType} style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <MaterialIcons name="change-circle" size={26} color={Colors.white} />
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <View style={{ marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontWeight: 600, fontSize: 16, color: Colors.white }}>Payments</Text>
                    <TouchableOpacity onPress={() => navigate(`/(forms)/create-payment?id=${loan.id}`)} style={{ gap: 4, paddingBlock: 4, paddingInline: 12, flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.lightGreen, borderRadius: 5 }}>
                        <MaterialIcons name="add" size={20} style={{ color: Colors.white }} line />
                        <Text style={{ fontWeight: 600, fontSize: 16, color: Colors.white }}>New</Text>
                    </TouchableOpacity>
                </View>
                <Payments payments={loan.payments} />
            </View>
        </View>
    )
}