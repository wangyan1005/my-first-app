import { writeToDB } from "@/Firebase/firestoreHelper";
import { useEffect, useState } from "react";
import { View, Text, FlatList } from 'react-native';
import { readAllFromDB } from "@/Firebase/firestoreHelper";

export interface User {
    id?: number;
    name?: string;
    location: {
        latitude: number;
        longitude: number;
    }
}

interface GoalUsersProps {
    goalId: string;
}

export default function GoalUsers({goalId}: GoalUsersProps) {
  const [users, setUsers] = useState<User[]>([]);


  useEffect(() => {
    async function getUsers() {
      try {
        const userFromDB = await readAllFromDB(`goals/${goalId}/users`);
        if (userFromDB) {
          setUsers(userFromDB); 
        } else {
          const response = await fetch('https://jsonplaceholder.typicode.com/users');
          if (!response.ok) {
            throw new Error(`Something went wrong with the ${response.status} status code`);
          }
          // extract the data if the response is ok
          const data = await response.json();
          setUsers(data);
            data.forEach((user: User) => {
              writeToDB(user, `goals/${goalId}/users`);
           });
          }}
        catch (error) {
          console.error(error);
        }
      }
    getUsers();
  }, []);

  return (
    <View>
      <FlatList 
        data={users}
        renderItem={({item}) =>
          <Text>{item.name}</Text>
      }
      />  
    </View>
    
  );
    
}


