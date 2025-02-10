import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router"; // Replace "some-module" with the correct module name
import { useEffect, useState} from "react";
import { goalData, readDocFromDB } from "@/Firebase/firestoreHelper";

export default function GoalDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [goal, setGoal] = useState<goalData | null>(null);

    useEffect(() => {
        async function getData() {
            try {
                const data = await readDocFromDB(id, 'goals') as goalData
                if (data !== null) {
                    setGoal(data)
                }
            }
            catch (e) {
                console.error('Error getting document:', e)
            }
        }
        getData();
    }, []);

    return (
        <View>
            <Text>Details of {goal?.text}</Text>
        </View>
    )
} 