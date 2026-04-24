import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userApi from '../api/userApi';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('admin.user@gmail.com');
    const [password, setPassword] = useState('&32#fw{42e09');
    
	const loginHandler = () => {
		try {
			const options = ['/users/login', 'POST', {
				email:email,
				password:password
			}];
			userApi(options)
				.then(data=>{
						console.log(`received an access token: ${data}`);
						// Save token in async storage or context
						AsyncStorage.setItem('AccessToken', JSON.stringify(data));
                        // AsyncStorage.setItem("AccessToken", response.data.token);
						navigation.replace('Home');
					})
				.catch(err=>{
					console.log(`Login error: ${err}`);
				});
		} catch (error) {
				Alert.alert('Error', 'Error fetching user access token');
		}
	};

    return (
        <View>
            <Text>Email:</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Text>Password:</Text>
            <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Login" onPress={loginHandler} />
            <Button title="Register" onPress={() => navigation.navigate('Register')} />
        </View>
    );
};

export default LoginScreen;