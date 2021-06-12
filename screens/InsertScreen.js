/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-elements';
import WPSOffice from 'react-native-wps-office';

const InsertScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [buttonName, setButtonName] = useState('Register Sign');
    const [docURI, setDocURI] = useState('/data/user/0/com.skripsidigitalsignature/files/27c1fca6-15ab-4996-bd49-e9a9c823487a/276-690-7-PB.pdf');

    const registerSignHandler = () => {
        if (buttonName === 'Register Sign') {
            setIsLoading(true);

            setTimeout(() => {
                setButtonName('selesai');
                setIsLoading(false);
            }, 10000);
        }
    };

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
    }
    return (
        <View>
            <View style={{ backgroundColor: '#99cfe0', marginHorizontal: 30, marginTop: 30, padding: 10, elevation: 5 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Silahkan tempel tanda tangan beserta SN ke dokumen yang telah diupload!</Text>
            </View>
            <View style={{ backgroundColor: 'white', marginHorizontal: 30, marginTop: 20, padding: 10, borderRadius: 5 }}>
                <Text style={{ fontSize: 16 }}>Sign SN : 123456789</Text>
            </View>
            <TouchableOpacity onPress={openPDFHandler}>
                <View style={{ alignSelf: 'center', paddingVertical: 2, paddingHorizontal: 5, alignItems: 'center', flexDirection: 'row', width: '83%', height: 80, backgroundColor: 'white', marginTop: 20, borderRadius: 10, elevation: 5 }}>
                    <View>
                        <Image style={{ height: 60, width: 60 }} source={require('../assets/doc-icon.png')} />
                    </View>
                    <Text style={{ marginLeft: 15 }}>example.pdf</Text>
                    <TouchableOpacity onPress={() => {
                        // setDocURI('');
                        // setIsUploaded(false)
                        console.log('File batal diupload')
                    }}>
                        <View style={{ marginLeft: 70, marginRight: 5 }}>
                            <Image style={{ height: 60, width: 60, tintColor: 'gray' }} source={require('../assets/cancel-upload.png')} />
                        </View>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
            <View style={{ marginTop: 50, width: '83%', alignSelf: 'center' }}>
                <Button
                    onPress={registerSignHandler}
                    title={buttonName}
                    loading={isLoading}
                />
            </View>
        </View>
    );
};

export default InsertScreen;