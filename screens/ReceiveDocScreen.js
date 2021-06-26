/* eslint-disable prettier/prettier */
import React, { useState, useContext } from 'react';
import { Image, Text, View, TouchableOpacity, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import WPSOffice from 'react-native-wps-office';
import { SendDataProvider, SendDataContext } from '../data_provider/SendDataProvider';

const DocCard = (item) => {
    return (
        <TouchableOpacity>
            <View style={{ marginTop: 5, alignSelf: 'center', paddingVertical: 2, paddingHorizontal: 5, alignItems: 'center', flexDirection: 'row', width: 350, height: 80, backgroundColor: 'white', marginBottom: 1, borderRadius: 10, elevation: 5, justifyContent: 'space-between' }}>
                <View>
                    <Image style={{ height: 60, width: 60 }} source={require('../assets/doc-icon.png')} />
                </View>
                <Text style={{ marginRight: 100 }}>{item.name}</Text>
                <TouchableOpacity>
                    <View style={{ marginRight: 5 }}>
                        <Image style={{ height: 60, width: 60, tintColor: 'gray' }} source={require('../assets/cancel-upload.png')} />
                    </View>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

const DataProvidedRecieveDocScreen = ({ navigation }) => {
    const [sendData, setSendData] = useContext(SendDataContext);
    console.log(sendData[0].docs)
    const [docURI, setDocURI] = useState('/data/user/0/com.skripsidigitalsignature/files/27c1fca6-15ab-4996-bd49-e9a9c823487a/276-690-7-PB.pdf');

    const openPDFHandler = () => {
        const wpsOptions = {
            "OpenMode": "ReadOnly",
            "ClearTrace": true
        };

        try {
            console.log(docURI);
            WPSOffice.open(
                docURI,   //or: /storage/emulated/0/Android/data/com.your.package/files/test.pdf
                'application/pdf',
                wpsOptions
            )
                .then(res => console.log(res))
                .catch(err => console.log(err));

        }
        catch (e) {
            console.log(e);
        }

        // RNFS.readFile(res.uri, 'base64')
        //     .then((data) => {
        //         console.log(data);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    };

    return (
        <View>
            <View style={{ elevation: 5, paddingVertical: 7, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white' }}>
                <TouchableOpacity onPress={() => navigation.navigate('SendScreen')}>
                    <Ionicons name="arrow-back" size={40} color="gray" />
                </TouchableOpacity>
                <Image style={{ marginLeft: 5, width: 43, height: 43, borderRadius: 50 }} source={require('../assets/photo-profile-example.jpg')} />
                <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 16, marginLeft: 15 }}>Dennis Jason</Text>
            </View>
            <FlatList
                data={sendData[0].docs}
                renderItem={({ item }) => DocCard(item)}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const RecieveDocScreen = ({ navigation }) => {
    return (
        <SendDataProvider>
            <DataProvidedRecieveDocScreen navigation={navigation} />
        </SendDataProvider>
    )
};

export default RecieveDocScreen;
