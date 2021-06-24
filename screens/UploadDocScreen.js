/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFS, { readFile } from 'fs';
import WPSOffice from 'react-native-wps-office';
let uniqid = require('uniqid');


const UploadDocScreen = ({ route, navigation }) => {
    const [docURI, setDocURI] = useState('');
    const [isUploaded, setIsUploaded] = useState(false);
    const [docID, setDocID] = useState(uniqid());
    const [docTitle, setDocTitle] = useState('');

    const [namaDok, setNamaDok] = useState('');
    const [jnsDok, setJnsDok] = useState('');

    const [isDocUploaded, setIsDocUploaded] = useState('transparent');
    const [isDocNameFilled, setIsDocNameFilled] = useState('transparent');

    // console.log(route);
    // console.log(docID);

    const pdfPickerHandler = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
                copyTo: "documentDirectory"
                // readContent: true,
            });
            console.log(
                res.uri,
            );
            setDocURI(res.fileCopyUri);
            console.log(docURI);
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
    };

    const nextHandler = () => {
        if (namaDok != '' && docURI != '') {
            navigation.navigate('InsertScreen', {
                username: route.params.username,
                namaDok: namaDok,
                jnsDok: jnsDok,
                docID: docID,
                docURI: docURI,
                docTitle: docTitle,
                SN: route.params.SN,
                signPath: route.params.filePath,
            });
        }
        setIsDocUploaded('red');
    };

    return (
        <View style={styles.screen}>
            <View style={styles.title}>
                <Text style={styles.titleName}>Upload Document</Text>
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
                                    <View style={{ marginRight: 5 }}>
                                        <Image style={{ height: 60, width: 60, tintColor: 'gray' }} source={require('../assets/cancel-upload.png')} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    )
                    : (
                        <View style={{ alignItems: 'center', marginBottom: 25 }}>
                            <View style={styles.buttons}>
                                <Button onPress={pdfPickerHandler} title="+ Upload Doc" />
                            </View>
                            <Text style={{ color: isDocUploaded }}>Silahkan upload file anda!</Text>
                        </View>
                    )
                }

                <View style={{ width: '90%' }}>
                    <Text style={{ alignSelf: 'flex-start', marginBottom: 10, fontSize: 17 }}>ID : {docID}</Text>
                </View>
                <View style={styles.inputs}>
                    <TextInput
                        onChangeText={(value) => {
                            let cleanValue = value.trim();
                            if (cleanValue == '') {
                                setIsDocNameFilled('red');
                            } else {
                                setIsDocNameFilled('transparent');
                                setNamaDok(value);
                                console.log(namaDok);
                            }
                        }}
                        style={styles.input}
                        placeholder="Nama Dokumen"
                    />
                    <Text style={{ marginLeft: 20, color: isDocNameFilled }}>Nama dokumen harus diisi!</Text>
                    <TextInput
                        onChangeText={(value) => {
                            let cleanValue = value.trim();
                            setJnsDok(cleanValue);
                            console.log(jnsDok);
                        }}
                        style={[styles.input, { marginTop: 10 }]}
                        placeholder="Jenis Dokumen"
                    />
                </View>
                <View style={{ marginTop: 25, width: '90%' }}>
                    <View>
                        <Button onPress={nextHandler} title="Selanjutnya" />
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
        marginBottom: 10,
        width: 120,
    },
    or: {
        alignItems: 'center',
        marginVertical: 5,
    },
});

export default UploadDocScreen;