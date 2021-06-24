/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { TextInput, Text, View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import WPSOffice from 'react-native-wps-office';
import { Button } from 'react-native-elements';
var dateFormat = require("dateformat");
const axios = require('axios').default;

const UnverifiedInform = () => {
    return (
        <View style={{ borderRadius: 10, padding: 10, backgroundColor: 'pink', width: '75%', marginTop: 20 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Tanda tangan palsu atau anda salah memasukan SN dan/atau ID Dok. </Text>
        </View>
    );
};

const VerifiedInform = ({ openDocFunc, dataVerifikasi }) => {
    return (
        <>
            <View style={{ alignItems: 'center', borderTopLeftRadius: 10, borderTopRightRadius: 10, padding: 10, backgroundColor: 'springgreen', width: '90%', marginTop: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Tanda Tangan Asli dan Terdaftar</Text>
            </View>
            <View style={{ padding: 15, backgroundColor: 'white', width: '90%', marginTop: 2 }}>
                <View>
                    <Text style={{ fontWeight: 'bold' }}>Nama Penandatangan</Text>
                    <Text style={{ fontSize: 17 }}>{dataVerifikasi.Nama}</Text>
                </View>
                <View style={{ marginTop: 5 }}>
                    <Text style={{ fontWeight: 'bold' }}>Username Penandatangan</Text>
                    <Text style={{ fontSize: 17 }}>{dataVerifikasi.Username}</Text>
                </View>
                <View style={{ marginTop: 5 }}>
                    <Text style={{ fontWeight: 'bold' }}>SN Tanda Tangan</Text>
                    <Text style={{ fontSize: 17 }}>{dataVerifikasi.Serial_Number}</Text>
                </View>
                <View style={{ marginTop: 5 }}>
                    <Text style={{ fontWeight: 'bold' }}>Tgl Pembuatan TTD</Text>
                    <Text style={{ fontSize: 17 }}>{dataVerifikasi.Tgl_Pembuatan}</Text>
                </View>
            </View>
            <View style={{ padding: 15, backgroundColor: 'white', width: '90%', marginTop: 2 }}>
                <View style={{ marginTop: 5 }}>
                    <Text style={{ fontWeight: 'bold' }}>Nama Dokumen</Text>
                    <Text style={{ fontSize: 17 }}>{dataVerifikasi.Nama_Dok}</Text>
                </View>
                <View style={{ marginTop: 5 }}>
                    <Text style={{ fontWeight: 'bold' }}>ID Dokumen</Text>
                    <Text style={{ fontSize: 17 }}>{dataVerifikasi.ID_Dok}</Text>
                </View>
            </View>
            <View style={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10, padding: 15, backgroundColor: 'white', width: '90%', marginTop: 2, marginBottom: 15 }}>
                <TouchableOpacity onPress={openDocFunc}>
                    <View style={{ paddingVertical: 2, paddingHorizontal: 5, alignItems: 'center', flexDirection: 'row', height: 80, backgroundColor: 'white', borderRadius: 10, elevation: 5 }}>
                        <View>
                            <Image style={{ height: 60, width: 60 }} source={require('../assets/doc-icon.png')} />
                        </View>
                        <Text style={{ marginLeft: 15 }}>{dataVerifikasi.Nama_Dok}.pdf</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </>
    );
};

const VerifyScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [docURI, setDocURI] = useState('/data/user/0/com.skripsidigitalsignature/files/27c1fca6-15ab-4996-bd49-e9a9c823487a/276-690-7-PB.pdf');
    const [verifyState, setVerifyState] = useState('');

    const [serialNumber, setSerialNumber] = useState('');
    const [IDDokumen, setIDDokumen] = useState('');

    const [dataVerifikasi, setDataVerifikasi] = useState({});


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
        setIsLoading(true);
        axios.post('https://api-skripsi-digital-signature.herokuapp.com/verify', {
            serialNumber: serialNumber,
            IDDokumen: IDDokumen,
        }).then((response) => {
            setIsLoading(false);
            console.log(response.data);

            if (response.data.length == 0) {
                console.log('unverified');
                setVerifyState('unverified');
            } else {
                // console.log(response.data[0].Tgl_Pembuatan);
                console.log('verified');

                // var now = new Date();

                dateFormat.i18n = {
                    dayNames: [
                        "Ming",
                        "Sen",
                        "Sel",
                        "Rab",
                        "Kam",
                        "Jum",
                        "Sab",
                        "Minggu",
                        "Senin",
                        "Selasa",
                        "Rabu",
                        "Kamis",
                        "Jumat",
                        "Sabtu",
                    ],
                    monthNames: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "Mei",
                        "Jun",
                        "Jul",
                        "Agu",
                        "Sep",
                        "Okt",
                        "Nov",
                        "Des",
                        "Januari",
                        "Februari",
                        "Maret",
                        "April",
                        "Mei",
                        "Juni",
                        "Juli",
                        "Agustus",
                        "September",
                        "Oktober",
                        "November",
                        "Desember",
                    ],
                    timeNames: ["a", "p", "am", "pm", "A", "P", "AM", "PM"],
                };

                let konversiTanggal = dateFormat(response.data[0].Tgl_Pembuatan.slice(0, 23), "dddd, d mmmm yyyy");

                console.log(konversiTanggal);

                setDataVerifikasi({
                    Nama: response.data[0].Nama,
                    Username: response.data[0].Username,
                    Serial_Number: response.data[0].Serial_Number,
                    Nama_Dok: response.data[0].Nama_Dok,
                    ID_Dok: '3k7z1kq61u7qh',
                    Tgl_Pembuatan: konversiTanggal,
                });
                setVerifyState('verified');
            }
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
        VerifyInfo = <VerifiedInform openDocFunc={openPDFHandler} dataVerifikasi={dataVerifikasi} />;
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
                                onPress={verifyHandler}
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