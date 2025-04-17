import { Colors } from "@/constants/colors";
import { ActivityIndicator, View } from "react-native";

export default function Loader() {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.darkBlue800, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={64} color={Colors.green} />
        </View>
    )
}