/* eslint-disable prettier/prettier */
import React, { useState, useContext } from 'react';
import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons//FontAwesome';
import { SendDataProvider, SendDataContext } from '../data_provider/SendDataProvider';

const SendCard = (item, navigation) => {

    return (
        <TouchableOpacity onPress={() => navigation.navigate('ReceiveDocScreen')}>
            <View style={{ elevation: 5, margin: 3, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 13, flexDirection: 'row', backgroundColor: 'white', alignItems: 'center' }}>
                <View>
                    <Image style={{ width: 60, height: 60, borderRadius: 50 }} source={{ uri: item.photo }} />
                </View>
                <View style={{ marginLeft: 15 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.name}</Text>
                    <Text>{item.docs[item.docs.length - 1].name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
};

const DataProvidedSendScreen = ({ navigation }) => {
    const [sendData, setSendData] = useContext(SendDataContext);
    return (
        <View>
            {/* <View style={{ height: '86.8%', alignItems: 'center', justifyContent: 'center' }}>
                <Text>Tidak ada dokumen.</Text>
            </View> */}
            <FlatList
                data={sendData}
                renderItem={({ item }) => SendCard(item, navigation)}
                keyExtractor={item => item.id}
            />
            <View style={{ marginTop: 550, position: 'absolute', elevation: 5, paddingRight: 5, justifyContent: 'center', alignItems: 'center', marginLeft: 275, borderRadius: 50, backgroundColor: '#2196F3', width: 72, height: 72 }}>
                <TouchableOpacity onPress={() => navigation.navigate('SendForm')}>
                    <FontAwesome name="send" size={30} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const SendScreen = ({ navigation }) => {
    return (
        <SendDataProvider>
            <DataProvidedSendScreen navigation={navigation} />
        </SendDataProvider>
    )
};

export default SendScreen;