import { View, Text, StyleSheet, Image } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router"; 
import { useEffect, useState} from "react";
import { goalData, readDocFromDB, updateDB } from "@/Firebase/firestoreHelper";
import PressableButton from "@/components/PressableButton";
import Ionicons from '@expo/vector-icons/Ionicons';
import GoalUsers from "@/components/GoalUsers";
import { storage } from "@/Firebase/firebaseSetup";
import { ref } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";

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
                    if (data.imageUri) {
                        const imageRef = ref(storage, data.imageUri)
                        const url = await getDownloadURL(imageRef)
                        data.imageUri = url
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
            {goal?.imageUri && (
                <Image source={{ uri: goal.imageUri }} style={{ width: 100, height: 100 }} />
            )}
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