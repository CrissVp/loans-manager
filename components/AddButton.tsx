import { Colors } from "@/constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function AddButton() {
    const { navigate } = useRouter();

    return (
        <TouchableOpacity
            onPress={() => navigate('/create-loan')}
            style={{ padding: 12, backgroundColor: Colors.lightGray, borderRadius: 10, position: 'absolute', bottom: 20, right: 20 }}
        >
            <MaterialIcons name="add" size={38} color={Colors.yellow} />
        </TouchableOpacity>
    )
}