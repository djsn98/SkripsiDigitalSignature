/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFS, { readFile } from 'fs';
import WPSOffice from 'react-native-wps-office';
import { io } from "socket.io-client";
let uniqid = require('uniqid');


const SendForm = ({ route }) => {
    const [docURI, setDocURI] = useState('');
    const [isUploaded, setIsUploaded] = useState(false);
    const [docID, setDocID] = useState(uniqid());
    const [docTitle, setDocTitle] = useState('');
    const [username, setUsername] = useState('');

    const [messageColor, setMessageColor] = useState('transparent');
    const [message, setMessage] = useState('Username harus diisi!');

    const socket = io("https://api-skripsi-digital-signature.herokuapp.com");

    let user = route.params.username;

    socket.on('user_connected', (message) => {
        console.log(message);

        // socket.emit('before_disconnect', user)
    });

    socket.on(`doc_send_to_${user}`, (message) => {
        console.log(message);
        console.log('doc recieved!');

        setMessage(message);
        setMessageColor('red');
        // socket.emit()
    });

    socket.emit('user_connected', user);



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

    const sendFile = () => {
        //test socket.io berhasil
        //kirim pdf ke server
        if (docURI != '' && username != '') {
            let saveNameAs = `${username}-${uniqid()}.pdf`

            let pdfToUpload = {
                uri: `file://${docURI}`,
                type: 'application/pdf',
                name: saveNameAs,
            };

            console.log(pdfToUpload);

            const form = new FormData();

            form.append('username', username);
            form.append('doc', pdfToUpload);

            console.log(form._parts);

            fetch('https://api-skripsi-digital-signature.herokuapp.com/send-file', {
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

                    if (data.alreadyUser === true) {
                        console.log('Pengiriman file berhasil!');
                        // setMessage('Pengiriman file berhasil!');
                        // setMessageColor('green');



                        let data = {
                            sender: user,
                            messages: {
                                receiver: username,
                                name: null,
                                photo: null,
                                docs: [
                                    {
                                        name: docTitle,
                                        uri: `https://api-skripsi-digital-signature.herokuapp.com/signed_files/${saveNameAs}`
                                    },
                                ]
                            }
                        };

                        // socket.on('before_disconnect', (message) => {
                        //     console.log(message);
                        //     let disconnected = socket.disconnect();
                        //     console.log(disconnected);
                        // });


                        socket.emit('doc_send', data);


                        // socket.on('doc_received', (data) => {
                        //     console.log(data);
                        //     // let disconnected = socket.disconnect();
                        //     // console.log(disconnected);
                        // });


                    } else {
                        setMessage('Pengguna tidak terdaftar!');
                        setMessageColor('red');
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            console.log('silahkan upload!');
        }
    };

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
                    <TextInput
                        onChangeText={(value) => {
                            let cleanValue = value.trim();

                            if (cleanValue != '') {
                                setMessageColor('transparent');
                                setUsername(value);
                                console.log(username);
                            } else {
                                setMessageColor('red');
                            }
                        }}
                        style={styles.input}
                        placeholder="Username Penerima"
                    />
                    <Text style={{ marginHorizontal: 20, marginTop: 10, color: messageColor }}>{message}</Text>
                </View>
                <View style={{ width: '90%' }}>
                    <View>
                        <Button onPress={sendFile} title="Kirim" />
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