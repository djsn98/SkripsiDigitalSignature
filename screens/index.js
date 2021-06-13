/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import * as React from 'react';
import { Text, View } from 'react-native';

import SignAuthScreen from './SignAuthScreen';
// import SignPad from './SignPad';
import VerifyScreen from './VerifyScreen';
import SendScreen from './SendScreen';
import UploadDocScreen from './UploadDocScreen';
import InsertScreen from './InsertScreen';
import SendForm from './SendForm';
import RecieveDocScreen from './ReceiveDocScreen';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';



const Tab = createBottomTabNavigator();

export default function Router() {
    return (
        <View style={{ height: '100%' }}>
            <View style={{ height: 50, backgroundColor: '#2196F3', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Digital Signature</Text>
            </View>
            <NavigationContainer>
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
                    <Tab.Screen name="Sign" component={InsertScreen} />
                    <Tab.Screen name="Verify" component={VerifyScreen} />
                    <Tab.Screen name="Send" component={RecieveDocScreen} />
                </Tab.Navigator>
            </NavigationContainer>
        </View>
    );
}