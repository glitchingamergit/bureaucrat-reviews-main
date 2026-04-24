import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const registerHandler = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        try {
            const { data } = await axios.post('http://localhost:5001/api/users', { name, email, password });
            // Save token in async storage or context
            navigation.navigate('Home');
        } catch (error) {
            Alert.alert('Error', 'Error registering user:\n'+error);
        }
    };

    return (
        <View>
            <Text>Name:</Text>
            <TextInput
                value={name}
                onChangeText={setName}
            />
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
            <Text>Confirm Password:</Text>
            <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            <Button title="Register" onPress={registerHandler} />
            <Button title="Login" onPress={() => navigation.navigate('Login')} />
        </View>
    );
};

export default RegisterScreen;