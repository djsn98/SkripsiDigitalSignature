/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SendScreen from '../screens/SendScreen';
import SendForm from '../screens/SendForm';
import ReceiveDocScreen from '../screens/ReceiveDocScreen';

const Stack = createStackNavigator();

const SendStack = ({ route }) => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Send">
            <Stack.Screen
                name="SendScreen"
                component={SendScreen}
                initialParams={{ username: route.params.username, socketState: true }}
            />
            <Stack.Screen name="SendForm" component={SendForm} />
            <Stack.Screen name="ReceiveDocScreen" component={ReceiveDocScreen} />
        </Stack.Navigator>
    );
}

export default SendStack;