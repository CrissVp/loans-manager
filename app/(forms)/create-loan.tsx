import { KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

import { Colors } from "@/constants/colors";
import DatePicker from "@/components/DatePicker";
import useLoans from "@/hooks/useLoans";

export default function CreateLoan() {
    const { addLoan } = useLoans();
    const { navigate } = useRouter()

    const [title, setTitle] = useState('');
    const [total, setTotal] = useState('');
    const [interest, setInterest] = useState('');
    const [description, setDescription] = useState('');
    const [endDate, setEndDate] = useState(new Date());

    const handleSubmit = async () => {
        try {
            const addedLoan = await addLoan({ title, total: Number(total), interest: Number(interest), description, endDate });
            console.log({ addedLoan });
            navigate('/(tabs)/loans');
        } catch (error) {
            console.log({ error });
        }
    };

    return (
        <KeyboardAvoidingView keyboardVerticalOffset={0} behavior="padding" style={{ flex: 1, backgroundColor: Colors.darkGray }} >
            <ScrollView contentContainerStyle={{ gap: 20, padding: 20, backgroundColor: Colors.darkGray }}>
                <View style={{ gap: 5, }}>
                    <Text style={{ color: Colors.white, fontWeight: 300 }}>Client Name</Text>
                    <TextInput onChangeText={(text) => setTitle(text)} style={{ color: Colors.white, padding: 10, borderWidth: 1, borderColor: Colors.lightGray, borderRadius: 5 }}></TextInput>
                </View>
                <View style={{ gap: 5, }}>
                    <Text style={{ color: Colors.white, fontWeight: 300 }}>Amount</Text>
                    <TextInput onChangeText={(text) => setTotal(text)} style={{ color: Colors.white, padding: 10, borderWidth: 1, borderColor: Colors.lightGray, borderRadius: 5 }}></TextInput>
                </View>
                <View style={{ gap: 5, }}>
                    <Text style={{ color: Colors.white, fontWeight: 300 }}>Interest</Text>
                    <TextInput onChangeText={(text) => setInterest(text)} style={{ color: Colors.white, padding: 10, borderWidth: 1, borderColor: Colors.lightGray, borderRadius: 5 }}></TextInput>
                </View>
                <View style={{ gap: 5, }}>
                    <Text style={{ color: Colors.white, fontWeight: 300 }}>Description</Text>
                    <TextInput onChangeText={(text) => setDescription(text)} multiline style={{
                        color: Colors.white, textAlignVertical: 'top', padding: 10, borderWidth: 1, borderColor: Colors.lightGray, borderRadius: 5, minHeight: 100
                    }}></TextInput>
                </View>
                <View style={{ gap: 5, }}>
                    <Text style={{ color: Colors.white, fontWeight: 300 }}>End Date</Text>
                    <DatePicker date={endDate} setDate={setEndDate} />
                </View>
                <TouchableOpacity
                    onPress={handleSubmit}
                    style={{ paddingBlock: 15, backgroundColor: Colors.lightGray, borderRadius: 5, alignItems: 'center' }}
                >
                    <Text style={{ color: Colors.yellow, fontWeight: 500, fontSize: 18 }}>Create Loan</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}