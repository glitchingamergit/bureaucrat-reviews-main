import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import axios from 'axios';
import userApi from '../api/userApi';

const HomeScreen = ({ navigation }) => {
    const [bureaucrats, setBureaucrats] = useState([]);
	const hasAccess=(async () => {
		try{
			let token = await AsyncStorage.getItem("AccessToken");
			if(token==false){
				console.log(`No access token found.`);
				return false;
			}
			else {
				return true;
			}
		}
		catch(err){
			console.log(err);
		}	
	})();
	if(!hasAccess){
		navigation.replace("Login");		
	}
    useEffect(() => {
    	const fetchBureaucrats = async () => {
			try{
				const options = ['/bureaucrats'];
				const response = await userApi(options);
				if(response.status==200){
					const data = response.data;	
					setBureaucrats(data);
				}
				else{
					throw('Fetch bureaucrats error.');
				}
			}
			catch(err){
				console.log(err);
			}
		};
		fetchBureaucrats();
    },[]);

    return (
        <View>
            <FlatList
                data={bureaucrats}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
					<View>
                    <TouchableOpacity onPress={() => navigation.navigate('Bureaucrat', { id: item._id })}>
                        <Text>{item.name} - {item.department}</Text>
                    </TouchableOpacity>
					<Button title="Submit Review" onPress={() => navigation.navigate('Review', { bureaucratId: item._id })} />
					</View>
                )}
            />
        </View>
    );
};

export default HomeScreen;