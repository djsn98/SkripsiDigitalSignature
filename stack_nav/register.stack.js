/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import RegisterScreen from '../screens/RegisterScreen';
import TabStack from './tab.stack';

const Stack = createStackNavigator();

const RegisterStack = () => {
    return (
        <Stack.Navigator initialRouteName="Register">
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="TabStack" component={TabStack} />
        </Stack.Navigator>
    );
}

export default RegisterStack;