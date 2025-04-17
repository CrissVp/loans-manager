import { Colors } from "@/constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function ErrorScreen({ message }: { message?: string }) {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.darkBlue800, justifyContent: 'center', alignItems: 'center' }}>
            <MaterialIcons name="error" size={64} color={Colors.white} style={{ marginBottom: 20 }} />
            {message && <Text style={{ paddingInline: 20, fontWeight: 600, fontSize: 18, color: Colors.gray, textAlign: 'center' }}>{message}</Text>}
            <Text style={{ paddingInline: 20, fontWeight: 600, fontSize: 18, color: Colors.gray, textAlign: 'center' }}>Try again later!</Text>
        </View>
    )
}