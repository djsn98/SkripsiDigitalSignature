/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import * as React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';

import VerifyScreen from '../screens/VerifyScreen';
import SignStack from './sign.stack';
import SendStack from './send.stack';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const Tab = createBottomTabNavigator();

export default function TabStack({ navigation }) {
    const logoutHandler = () => {
        navigation.navigate('LoginScreen');
    };

    return (
        <View style={{ height: '100%' }}>
            <View style={{ height: 50, backgroundColor: '#2196F3', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingHorizontal: 5 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginRight: 51 }}>Digital Signature</Text>
                <TouchableOpacity onPress={logoutHandler}>
                    <Image source={require('../assets/logout-icon.png')} />
                </TouchableOpacity>
            </View>
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Sign') {
                        iconName = focused
                            ? 'signature'
                            : 'signature';
                    } else if (route.name === 'Verify') {
                        iconName = focused
                            ? 'checkmark-circle'
                            : 'checkmark-circle-outline';
                    } else if (route.name === 'Send') {
                        iconName = focused
                            ? 'md-send-sharp'
                            : 'md-send-outline';
                    }
                    if (iconName === 'signature') {
                        return <FontAwesome5 name={iconName} size={size} color={color} />;
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
                tabBarOptions={{
                    activeTintColor: '#2196F3',
                    inactiveTintColor: 'gray',
                }}
            >
                <Tab.Screen name="Sign" component={SignStack} />
                <Tab.Screen name="Verify" component={VerifyScreen} />
                <Tab.Screen name="Send" component={SendStack} />
            </Tab.Navigator>
        </View>
    );
}