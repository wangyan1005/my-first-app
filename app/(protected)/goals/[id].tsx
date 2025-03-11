import { View, Text, StyleSheet } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router"; 
import { useEffect, useState} from "react";
import { goalData, readDocFromDB, updateDB } from "@/Firebase/firestoreHelper";
import PressableButton from "@/components/PressableButton";
import Ionicons from '@expo/vector-icons/Ionicons';
import GoalUsers from "@/components/GoalUsers";

export default function GoalDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [goal, setGoal] = useState<goalData | null>(null);
    const [warning, setWarning] = useState<boolean>(false);

    function handlePress() {
        setWarning(true)
        updateDB(id, {warning: true}, 'goals')
    }

    useEffect(() => {
        async function getData() {
            try {
                const data = await readDocFromDB(id, 'goals') as goalData
                if (data !== null) {
                    if (data?.warning) {
                        setWarning(true)
                    }
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
            <Stack.Screen options={{headerTitle: goal ? (warning ? 'warning' : goal.text) : '', 
                headerRight: () => (
                 <PressableButton 
                    pressedInHandler={handlePress}
                    pressedHandler={handlePress}
                    pressedStyle={styles.pressed}
                    componentStyle={styles.defaultStyle} 
                    >
                    <Ionicons name="warning-outline" size={24} color="white" />
                </PressableButton>
                ),
             }} />
            <Text style={warning && styles.warning}>You are seeing the 
                details of the goal with text: {goal?.text} and id: {id}</Text>
            <GoalUsers goalId={id} /> 
        </View>
    )
} 

const styles = StyleSheet.create({
    warning: {
        color: 'red',
    }, 
    pressed: {
        opacity: 0.5,
        backgroundColor: 'lightsteelblue',
    },
    defaultStyle: {
        backgroundColor: 'cornflowerblue',

    },
})