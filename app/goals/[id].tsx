import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router"; // Replace "some-module" with the correct module name

export default function GoalDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    return (
        <View>
            <Text>Goal Details</Text>
        </View>
    )
} 