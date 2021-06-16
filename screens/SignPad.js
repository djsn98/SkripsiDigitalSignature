/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, PermissionsAndroid } from 'react-native';
import Signature from 'react-native-signature-canvas';
import RNFS, { readFile } from 'fs';
import fetch_blob from 'react-native-fetch-blob';
import CameraRoll from '@react-native-community/cameraroll';
// import { RemoveBgResult, RemoveBgError, removeBackgroundFromImageBase64 } from "remove.bg";
let uniqid = require('uniqid');
const axios = require('axios').default;


const SignPad = () => {
    const [signature, setSign] = useState(null);

    const handleSignature = (signature) => {
        // console.log(signature);
        setSign(signature);
        // const path = RNFS.DocumentDirectoryPath + '/image.png';
        // console.log(path);
        let SN = uniqid();
        let base64Sign = signature.replace('data:image/png;base64,', '');


        axios.post('https://api-skripsi-digital-signature.herokuapp.com/remove-background', {
            serialNumber: SN,
            sign: base64Sign,
        }).then((response) => {
            console.log(response.data);

            let saveData = async (data) => {

                let base64SignRemoveBackground = data;

                try {
                    const granted = await PermissionsAndroid.requestMultiple([
                        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    ]);
                } catch (err) {
                    console.warn(err);
                }
                const readGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
                const writeGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
                if (!readGranted || !writeGranted) {
                    console.log('Read and write permissions have not been granted');
                    return;
                }

                // const fs = fetch_blob.fs;
                const dirs = fetch_blob.fs.dirs;
                //Tulis Ulang

                // let sign_id = uniqid();
                const file_name = `${base64SignRemoveBackground.serialNumber}.png`;
                const file_path = `${dirs.PictureDir}/sign/${file_name}`;
                console.log(file_path);

                RNFS.writeFile(file_path, base64SignRemoveBackground.sign, 'base64')
                    .then((success) => {
                        console.log('Write Success');
                        CameraRoll.save(file_path, "photo");
                        console.log('finish');
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });

            };

            saveData(response.data);

        }).catch((error) => {
            console.log(error);
        });

        // RNFS.readFile(path, 'base64')
        //     .then((data) => {
        //         console.log(data);
        //         setSign(`data:image/png;base64,${data}`);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });

        // RNFS.unlink(path)
        //     .then(() => {
        //         console.log('FILE DELETED');
        //     })
        //     // `unlink` will throw an error, if the item to unlink does not exist
        //     .catch((err) => {
        //         console.log(err.message);
        //     });
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
                clearText="Clear"
                confirmText="Save"
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