/* eslint-disable prettier/prettier */
import React, { useState, useContext } from 'react';
import { Image, Text, View, TouchableOpacity, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import WPSOffice from 'react-native-wps-office';
import { SendDataProvider, SendDataContext } from '../data_provider/SendDataProvider';
import { ExternalDirectoryPath, downloadFile } from 'fs';

const DocCard = (item) => {

    const openPDFHandler = () => {
        console.log(item);
        const downloadDest = `${ExternalDirectoryPath}/${item.name}`;
        const fileOptions = {
            fromUrl: item.uri,
            toFile: downloadDest,
            background: true,
        };

        const wpsOptions = {
            "OpenMode": "ReadOnly",
            "ClearTrace": true
        };

        try {
            const ret = downloadFile(fileOptions);
            // console.log(ret)
            ret.promise.then(res => {
                console.log('file://' + downloadDest);
                console.log(res);
                WPSOffice.open(
                    downloadDest,   //or: /storage/emulated/0/Android/data/com.your.package/files/test.pdf
                    'application/pdf',
                    wpsOptions
                )
                    .then(res => console.log(res))
                    .catch(err => console.log(err))
            }).catch(err => {
                console.log('err', err);
            });
        }
        catch (e) {
            console.log(e);
        }
    };
    return (
        <TouchableOpacity onPress={openPDFHandler}>
            <View style={{ marginTop: 5, alignSelf: 'center', paddingVertical: 2, paddingHorizontal: 5, alignItems: 'center', flexDirection: 'row', width: 350, height: 80, backgroundColor: 'white', marginBottom: 1, borderRadius: 10, elevation: 5, justifyContent: 'space-between' }}>
                <View>
                    <Image style={{ height: 60, width: 60 }} source={require('../assets/doc-icon.png')} />
                </View>
                <Text style={{ marginRight: 40 }}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    )
}


const DataProvidedRecieveDocScreen = ({ route, navigation }) => {
    const [data, setData] = useState(route.params.data);
    let dataDocs = data.docs.pop()

    let count = 1;
    return (
        <View>
            <View style={{ elevation: 5, paddingVertical: 7, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white' }}>
                <TouchableOpacity onPress={() => navigation.navigate('SendScreen')}>
                    <Ionicons name="arrow-back" size={40} color="gray" />
                </TouchableOpacity>
                <Image style={{ marginLeft: 5, width: 43, height: 43, borderRadius: 50 }} source={{ uri: data.photo }} />
                <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 16, marginLeft: 15 }}>{data.name}</Text>
            </View>
            <FlatList
                data={data.docs}
                renderItem={({ item }) => DocCard(item)}
                keyExtractor={(item) => {
                    item.id = count;
                    count++
                    return item.id
                }}
            />
        </View>
    );
};

const ReceiveDocScreen = ({ route, navigation }) => {
    console.log(route);
    console.log(route.params.data);
    return (

        <SendDataProvider>
            <DataProvidedRecieveDocScreen navigation={navigation} route={route} />
            {/* <Text>Hallo</Text> */}
        </SendDataProvider>
    )
};

export default ReceiveDocScreen;
