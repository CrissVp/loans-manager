import { Text, View } from "react-native";
import { Link } from "expo-router";

import { timestampToDate } from "@/utils/helperFunctions";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import useLoans from "@/hooks/useLoans";

import ErrorScreen from "@/components/ErrorScreen";
import AddButton from "@/components/AddButton";
import Loader from "@/components/Loader";

export default function Loans() {
    const { loans } = useLoans();

    if (loans.isLoading) return <Loader />
    if (loans.error || !loans.data) return <ErrorScreen message={loans.error} />

    return (
        <View style={{ flex: 1, gap: 10, padding: 15, backgroundColor: Colors.darkGray }}>
            {loans.data.map((loan) => (
                <Link key={loan.id} href={{ pathname: '/loan-details/[id]', params: { id: loan.id } }}>
                    <View style={{ width: '100%', gap: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.lightGray, borderRadius: 6, padding: 10 }}>
                        <MaterialIcons color={Colors.yellow} name="pending-actions" size={26} />
                        <View style={{ flex: 1, justifyContent: 'space-between' }}>
                            <Text style={{ color: Colors.white, fontSize: 18 }}>{loan.title}</Text>
                            <Text style={{ color: Colors.gray, fontSize: 12 }}>{timestampToDate(loan.startDate)}</Text>
                        </View>
                        <View>
                            <Text style={{ color: Colors.lightGreen, fontSize: 20 }}>
                                <Text style={{ fontSize: 14 }}>$</Text>
                                {loan.total}
                            </Text>
                        </View>
                    </View>
                </Link>
            ))}
            <AddButton />
        </View>
    )
}