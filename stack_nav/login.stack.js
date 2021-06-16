/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import TabStack from './tab.stack';

const Stack = createStackNavigator();

const LoginStack = () => {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="TabStack" component={TabStack} />
        </Stack.Navigator>
    );
}

export default LoginStack;