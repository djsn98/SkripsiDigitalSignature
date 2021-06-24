/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignAuthScreen from '../screens/SignAuthScreen';
import SignPad from '../screens/SignPad';
import UploadDocScreen from '../screens/UploadDocScreen';
import InsertScreen from '../screens/InsertScreen';


const Stack = createStackNavigator();

const SignStack = ({ route }) => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Sign">
            <Stack.Screen
                name="SignAuthScreen"
                component={SignAuthScreen}
                initialParams={{ username: route.params.username, password: route.params.password }}
            />
            <Stack.Screen name="SignPad" component={SignPad} />
            <Stack.Screen name="UploadDocScreen" component={UploadDocScreen} />
            <Stack.Screen name="InsertScreen" component={InsertScreen} />
        </Stack.Navigator>
    );
}

export default SignStack;