/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { TextInput, Text, View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import WPSOffice from 'react-native-wps-office';
import { Button } from 'react-native-elements';
const axios = require('axios').default;

const UnverifiedInform = () => {
    return (
        <View style={{ borderRadius: 10, padding: 10, backgroundColor: 'pink', width: '75%', marginTop: 20 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Tanda tangan palsu atau anda salah memasukan SN dan/atau ID Dok. </Text>
        </View>
    );
};

const VerifiedInform = ({ openDocFunc }) => {
    return (
        <>
            <View style={{ alignItems: 'center', borderTopLeftRadius: 10, borderTopRightRadius: 10, padding: 10, backgroundColor: 'springgreen', width: '90%', marginTop: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Tanda Tangan Asli dan Terdaftar</Text>
            </View>
            <View style={{ padding: 15, backgroundColor: 'white', width: '90%', marginTop: 2 }}>
                <Text style={{ fontWeight: 'bold' }}>Nama Penandatangan</Text>
                <Text style={{ fontSize: 17 }}>Dennis Jason</Text>
                <Text style={{ fontWeight: 'bold' }}>Username Penandatangan</Text>
                <Text style={{ fontSize: 17 }}>@djsn98</Text>
                <Text style={{ fontWeight: 'bold' }}>SN Tanda Tangan</Text>
                <Text style={{ fontSize: 17 }}>sj23h24in2k</Text>
                <Text style={{ fontWeight: 'bold' }}>Tgl Pembuatan TTD</Text>
                <Text style={{ fontSize: 17 }}>Sabtu, 10 Januari 2020</Text>
            </View>
            <View style={{ padding: 15, backgroundColor: 'white', width: '90%', marginTop: 2 }}>
                <Text style={{ fontWeight: 'bold' }}>Nama Dokumen</Text>
                <Text style={{ fontSize: 17 }}>Ijazah</Text>
                <Text style={{ fontWeight: 'bold' }}>ID Dokumen</Text>
                <Text style={{ fontSize: 17 }}>sj239n2j392j</Text>
            </View>
            <View style={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10, padding: 15, backgroundColor: 'white', width: '90%', marginTop: 2, marginBottom: 15 }}>
                <TouchableOpacity onPress={openDocFunc}>
                    <View style={{ paddingVertical: 2, paddingHorizontal: 5, alignItems: 'center', flexDirection: 'row', height: 80, backgroundColor: 'white', borderRadius: 10, elevation: 5 }}>
                        <View>
                            <Image style={{ height: 60, width: 60 }} source={require('../assets/doc-icon.png')} />
                        </View>
                        <Text style={{ marginLeft: 15 }}>example.pdf</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </>
    );
};

const VerifyScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [docURI, setDocURI] = useState('/data/user/0/com.skripsidigitalsignature/files/27c1fca6-15ab-4996-bd49-e9a9c823487a/276-690-7-PB.pdf');
    const [verifyState, setVerifyState] = useState('verified');

    const [serialNumber, setSerialNumber] = useState('');
    const [IDDokumen, setIDDokumen] = useState('');


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

    const verifyHandler = () => {
        axios.post('https://api-skripsi-digital-signature.herokuapp.com/verify', {
            serialNumber: serialNumber,
            IDDokumen: IDDokumen,
        }).then((response) => {
            console.log(response);
        }).catch((err) => {
            console.log(err);
        })

    };

    let VerifyInfo;
    if (verifyState == '') {
        VerifyInfo = null;
    } else if (verifyState == 'unverified') {
        VerifyInfo = <UnverifiedInform />;
    } else if (verifyState == 'verified') {
        VerifyInfo = <VerifiedInform openDocFunc={openPDFHandler} />;
    }
    return (
        <ScrollView>
            <View style={styles.screen}>
                <View style={styles.title}>
                    <Text style={styles.titleName}>Verify</Text>
                </View>
                <View style={styles.form}>
                    <View style={styles.inputs}>
                        <TextInput
                            onChangeText={(value) => {
                                setSerialNumber(value);
                                console.log(serialNumber)
                            }}
                            style={styles.input}
                            placeholder="Masukan Serial Number"
                        />
                        <TextInput
                            onChangeText={(value) => {
                                setIDDokumen(value);
                                console.log(IDDokumen);
                            }}
                            style={styles.input}
                            placeholder="Masukan ID Dokumen"
                        />
                    </View>
                    <View style={styles.buttons}>
                        <View>
                            <Button
                                title="Submit"
                                loading={isLoading}
                            />
                        </View>
                    </View>
                </View>
                {VerifyInfo}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 13,
    },
    titleName: {
        fontWeight: 'bold',
        fontSize: 30,
    },
    form: {
        alignItems: 'center',
        alignSelf: 'stretch',

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
        marginTop: 30,
        width: '90%',
    },
    or: {
        alignItems: 'center',
        marginVertical: 5,
    },
});

export default VerifyScreen;