/* eslint-disable prettier/prettier */
import React, { useState, useContext } from 'react';
import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons//FontAwesome';
import { SendDataProvider, SendDataContext } from '../data_provider/SendDataProvider';
import { io } from "socket.io-client";

const SendCard = (item, navigation) => {

    return (
        <TouchableOpacity onPress={() => navigation.navigate('ReceiveDocScreen', { data: item })}>
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

const DataProvidedSendScreen = ({ route, navigation }) => {
    const [sendData, setSendData] = useContext(SendDataContext);
    const [socketOnOff, setSocketOnOff] = useState(route.params.socketState);


    if (route.params.socketState !== undefined && socketOnOff === false) {
        setSocketOnOff(route.params.socketState)
    }

    let username = route.params.username;

    let socket;


    if (socketOnOff) {
        socket = io("https://api-skripsi-digital-signature.herokuapp.com");

        socket.on('user_connected', (message) => {
            console.log(message);
            setSendData(message.data.reverse());

            // socket.emit('before_disconnect', user)
        });

        socket.on(`doc_send_to_${username}`, (message) => {
            console.log(message);
            // console.log(message[0].docs);
            setSendData(message.reverse());

            // socket.emit('before_disconnect', user)
        });

        socket.on('before_disconnect', (message) => {
            console.log(message);
            let disconnected = socket.disconnect();
            console.log(disconnected);
        });

        socket.on('disconnect', (reason) => {
            console.log(reason);
            if (reason === "ping timeout") {
                socket.connect();
            }
        });

        socket.emit('user_connected', username);
    }





    // if (!socket) {
    //     socket = io.connect("https://api-skripsi-digital-signature.herokuapp.com");
    // }


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
            <View style={{ marginTop: 530, position: 'absolute', elevation: 5, paddingRight: 5, justifyContent: 'center', alignItems: 'center', marginLeft: 275, borderRadius: 50, backgroundColor: '#2196F3', width: 72, height: 72 }}>
                <TouchableOpacity
                    onPress={() => {
                        socket.emit('before_disconnect', username);
                        navigation.navigate('SendForm', { username: route.params.username })
                    }}>
                    <FontAwesome name="send" size={30} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const SendScreen = ({ route, navigation }) => {
    return (
        <SendDataProvider>
            <DataProvidedSendScreen navigation={navigation} route={route} />
        </SendDataProvider>
    );
};

export default SendScreen;