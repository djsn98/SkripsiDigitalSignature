/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFS, { readFile } from 'fs';
import WPSOffice from 'react-native-wps-office';
let uniqid = require('uniqid');


const SendForm = () => {
    const [docURI, setDocURI] = useState('');
    const [isUploaded, setIsUploaded] = useState(false);
    const [docID, setDocID] = useState(uniqid());
    const [docTitle, setDocTitle] = useState('');


    const pdfPickerHandler = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
                copyTo: "documentDirectory",
                // readContent: true,
            });
            console.log(
                res.uri,
            );
            setDocURI(res.fileCopyUri);
            setDocTitle(res.name);
            setIsUploaded(true);

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
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
        <View style={styles.screen}>
            <View style={styles.title}>
                <Text style={styles.titleName}>Send Document</Text>
            </View>
            <View style={styles.form}>
                {isUploaded
                    ? (
                        <TouchableOpacity onPress={() => openPDFHandler()}>
                            <View style={{ paddingVertical: 2, paddingHorizontal: 5, alignItems: 'center', flexDirection: 'row', width: '90%', height: 80, backgroundColor: 'white', marginBottom: 20, borderRadius: 10, elevation: 5 }}>
                                <View>
                                    <Image style={{ height: 60, width: 60 }} source={require('../assets/doc-icon.png')} />
                                </View>
                                <Text style={{ marginLeft: 15 }}>{docTitle}</Text>
                                <TouchableOpacity onPress={() => {
                                    setDocURI('');
                                    setIsUploaded(false)
                                    console.log('File batal diupload');
                                }}>
                                    <View style={{ marginLeft: 70, marginRight: 5 }}>
                                        <Image style={{ height: 60, width: 60, tintColor: 'gray' }} source={require('../assets/cancel-upload.png')} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    )
                    : (
                        <View style={styles.buttons}>
                            <View>
                                <Button onPress={pdfPickerHandler} title="+ Upload Doc" />
                            </View>
                        </View>
                    )
                }

                <View style={styles.inputs}>
                    <TextInput style={styles.input} placeholder="Username Penerima" />
                </View>
                <View style={{ width: '90%' }}>
                    <View>
                        <Button title="Kirim" />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    title: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleName: {
        fontWeight: 'bold',
        fontSize: 30,
    },
    form: {
        alignItems: 'center',
        alignSelf: 'stretch',
        flex: 0.7,
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 15,
        justifyContent: 'space-evenly',
        marginHorizontal: 17,
    },
    inputs: {
        alignSelf: 'stretch',
        height: 120,
        justifyContent: 'space-between',
    },
    buttons: {
        marginTop: 10,
        marginBottom: 50,
        width: 120,
    },
    or: {
        alignItems: 'center',
        marginVertical: 5,
    },
});

export default SendForm;