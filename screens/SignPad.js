/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, PermissionsAndroid } from 'react-native';
import Signature from 'react-native-signature-canvas';
import RNFS, { readFile } from 'fs';
import fetch_blob from 'react-native-fetch-blob';
import CameraRoll from '@react-native-community/cameraroll';

let uniqid = require('uniqid');
const axios = require('axios').default;


const SignPad = ({ route, navigation }) => {
    const [signature, setSign] = useState(null);


    const handleSignature = (signature) => {
        setSign(signature);

        let SN = uniqid();
        let base64Sign = signature.replace('data:image/png;base64,', '');

        console.log(SN);
        axios.post('https://api-skripsi-digital-signature.herokuapp.com/remove-background', {
            serialNumber: SN,
            sign: base64Sign,
        }).then((response) => {
            console.log(response.data);

            let saveData = async (data, SN) => {

                let base64SignRemoveBackground = data;


                const dirs = fetch_blob.fs.dirs;

                const file_name = `${base64SignRemoveBackground.serialNumber}.png`;
                const file_path = `${dirs.PictureDir}/sign/${file_name}`;
                console.log(file_path);

                RNFS.writeFile(file_path, base64SignRemoveBackground.sign, 'base64')
                    .then((success) => {
                        console.log('Write Success');
                        CameraRoll.save(file_path, "photo");
                        console.log('finish');
                        navigation.navigate('UploadDocScreen', { username: route.params.username, SN: SN, filePath: file_path });
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });

            };

            saveData(response.data, SN);


        }).catch((error) => {
            console.log(error);
        });
    };

    const handleEmpty = () => {
        console.log('Empty');
    };

    const style = `.m-signature-pad--footer
    .button {
      background-color: red;
      color: #FFF;
    }`;

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.preview}>
                {signature ? (
                    <Image
                        resizeMode={"contain"}
                        style={{ width: 335, height: 114 }}
                        source={{ uri: signature }}
                    />
                ) : null}
            </View>
            <Signature
                onOK={handleSignature}
                onEmpty={handleEmpty}
                descriptionText="Sign"
                clearText="Hapus"
                confirmText="Simpan"
                webStyle={style}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    preview: {
        width: 335,
        height: 114,
        backgroundColor: "#F8F8F8",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15
    },
    previewText: {
        color: '#FFF',
        fontSize: 14,
        height: 40,
        lineHeight: 40,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "#69B2FF",
        width: 120,
        textAlign: 'center',
        marginTop: 10,
    }
});

export default SignPad;