import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";

import { addLoanPayment } from "@/services/loans";
import { Colors } from "@/constants/colors";

export default function CreatePayment() {
    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState(0);
    const { id } = useLocalSearchParams<{ id: string }>();

    const handleSubmit = async () => {
        const addedPayment = await addLoanPayment(id, { amount, title });
        console.log({ addedPayment });
    };

    return (
        <View style={{ gap: 20, padding: 20, paddingTop: 40, flex: 1, backgroundColor: Colors.darkGray }}>
            <View style={{ gap: 5 }}>
                <Text style={{ color: Colors.white, fontWeight: 300 }}>Title</Text>
                <TextInput onChangeText={(text) => setTitle(text)} style={{ color: Colors.white, padding: 10, borderWidth: 1, borderColor: Colors.lightGray, borderRadius: 5 }}></TextInput>
            </View>
            <View style={{ gap: 5 }}>
                <Text style={{ color: Colors.white, fontWeight: 300 }}>Amount</Text>
                <TextInput onChangeText={(text) => setAmount(Number(text))} style={{ color: Colors.white, padding: 10, borderWidth: 1, borderColor: Colors.lightGray, borderRadius: 5 }}></TextInput>
            </View>
            <TouchableOpacity
                onPress={handleSubmit}
                style={{ paddingBlock: 15, backgroundColor: Colors.lightGray, borderRadius: 5, alignItems: 'center' }}
            >
                <Text style={{ color: Colors.yellow, fontWeight: 500, fontSize: 18 }}>Create Payment</Text>
            </TouchableOpacity>
        </View >
    )
}