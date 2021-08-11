/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-elements';
import WPSOffice from 'react-native-wps-office';
import Clipboard from '@react-native-clipboard/clipboard';
const pdf2base64 = require('pdf-to-base64');
import ImgToBase64 from 'react-native-image-base64';
import RNFS, { readFile } from 'fs';
const axios = require('axios').default;

const InsertScreen = ({ route, navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [buttonName, setButtonName] = useState('Register Sign');
    const [docURI, setDocURI] = useState(route.params.docURI);

    const [isSNCopy, setIsSNCopy] = useState('  copy ');
    const [isIDCopy, setIsIDCopy] = useState('  copy ');

    const [registMessCol, setRegistMessCol] = useState('transparent');
    const [mess, setMess] = useState('Berhasil!');

    const [isRegisterCompleted, setIsRegisterCompleted] = useState(false);

    console.log(route.params);

    const registerSignHandler = () => {
        if (isRegisterCompleted) {
            navigation.navigate('SignAuthScreen')
        } else {
            setIsLoading(true);
            let signDate = new Date();
            console.log(signDate);

            let pdfToUpload = {
                uri: `file://${route.params.docURI}`,
                type: 'application/pdf',
                name: `${route.params.docID}.pdf`,
            };

            console.log(pdfToUpload);

            const form = new FormData();

            let signData = {
                username: route.params.username,
                SN: route.params.SN,
                tglPembuatan: signDate,
                IDDok: route.params.docID,
                namaDok: route.params.namaDok,
                jenisDok: route.params.jnsDok,
            };

            form.append('signData', JSON.stringify(signData));
            form.append('document', pdfToUpload);

            console.log(form._parts);

            fetch('https://api-skripsi-digital-signature.herokuapp.com/sign-register', {
                method: 'POST',
                body: form,
                header: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.registeredSign) {
                        setButtonName('Selesai');
                        setIsLoading(false);
                        setRegistMessCol('green');
                        setIsRegisterCompleted(true);

                    } else {
                        setButtonName('Buat Ulang');
                        setIsLoading(false);
                        setMess('Gagal, silahkan buat tanda tangan ulang!')
                        setRegistMessCol('red');
                        setIsRegisterCompleted(true);
                    }

                })
                .catch((error) => {
                    console.log(error);
                });
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
                docURI,
                'application/pdf',
                wpsOptions
            )
                .then(res => console.log(res))
                .catch(err => console.log(err));

        }
        catch (e) {
            console.log(e);
        }
    }
    return (
        <View>
            <View style={{ backgroundColor: '#99cfe0', marginHorizontal: 30, marginTop: 30, padding: 10, elevation: 5 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Silahkan tempel tanda tangan beserta SN ke dokumen yang telah diupload!</Text>
            </View>
            <View style={{ backgroundColor: 'white', marginHorizontal: 30, marginTop: 20, padding: 10, borderRadius: 5 }}>
                <View style={{ alignItems: 'center', height: 50, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 16 }}>Sign SN : {route.params.SN}</Text>
                    <Button
                        onPress={() => {
                            Clipboard.setString(route.params.SN);
                            setIsSNCopy('copied');
                        }}
                        title={isSNCopy}
                    />
                </View>
                <View style={{ alignItems: 'center', height: 50, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 16, marginTop: 7 }}>ID Dok. : {route.params.docID}</Text>
                    <Button
                        onPress={() => {
                            Clipboard.setString(route.params.docID);
                            setIsIDCopy('copied');
                        }}
                        style={{ marginTop: 10 }}
                        title={isIDCopy}
                    />
                </View>
            </View>
            <TouchableOpacity onPress={openPDFHandler}>
                <View style={{ justifyContent: 'space-between', alignSelf: 'center', paddingVertical: 2, paddingHorizontal: 5, alignItems: 'center', flexDirection: 'row', width: '83%', height: 80, backgroundColor: 'white', marginTop: 20, borderRadius: 10, elevation: 5 }}>
                    <View>
                        <Image style={{ height: 60, width: 60 }} source={require('../assets/doc-icon.png')} />
                    </View>
                    <Text style={{ marginRight: 30 }}>{route.params.docTitle}</Text>

                    <TouchableOpacity onPress={() => {
                        console.log('File batal diupload')
                    }}>
                        <View style={{ marginRight: 5 }}>
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

                <Text style={{ alignSelf: 'center', marginTop: 25, fontSize: 17, color: registMessCol }}>{mess}</Text>
            </View>
        </View>
    );
};

export default InsertScreen;