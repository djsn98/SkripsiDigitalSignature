/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, View, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons//FontAwesome';

const SendScreen = () => {
    return (
        <View>
            {/* <View style={{ height: '86.8%', alignItems: 'center', justifyContent: 'center' }}>
                <Text>Tidak ada dokumen.</Text>
            </View> */}
            <View style={{ height: '86.8%' }}>
                <View style={{ elevation: 5, margin: 5, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 13, flexDirection: 'row', backgroundColor: 'white', alignItems: 'center' }}>
                    <View>
                        <Image style={{ width: 60, height: 60, borderRadius: 50 }} source={require('../assets/photo-profile-example.jpg')} />
                    </View>
                    <View style={{ marginLeft: 15 }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Dennis Jason</Text>
                        <Text>Example.pdf</Text>
                    </View>
                </View>
            </View>
            <View style={{ elevation: 5, paddingRight: 5, justifyContent: 'center', alignItems: 'center', marginRight: 15, borderRadius: 50, alignSelf: 'flex-end', backgroundColor: '#2196F3', width: 72, height: 72 }}>
                <FontAwesome name="send" size={30} color="white" />
            </View>
        </View>
    );
};

export default SendScreen;