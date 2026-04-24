import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import BureaucratScreen from './screens/BureaucratScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ReviewScreen from './screens/ReviewScreen';

const App = () => {
	const Stack = createNativeStackNavigator();
	
    return (
    	<NavigationContainer>
			<Stack.Navigator initialRouteName="Login">
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="Bureaucrat" component={BureaucratScreen} />
				<Stack.Screen name="Login" component={LoginScreen} />
				<Stack.Screen name="Register" component={RegisterScreen} />
				<Stack.Screen name="Review" component={ReviewScreen} />
			</Stack.Navigator>
		</NavigationContainer>
    );
}

export default App;