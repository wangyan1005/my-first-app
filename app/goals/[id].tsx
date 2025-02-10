import { View, Text } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router"; 
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
            <Stack.Screen options={{headerTitle: goal? goal.text : ''}} />
            <Text>Details of {goal?.text} and id is {id}</Text>
        </View>
    )
} 