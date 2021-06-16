/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
const axios = require('axios').default;

const RegisterScreen = ({ navigation }) => {
    const [photo, setPhoto] = useState(require('../assets/upload-photo-icon.jpg'));
    // const [photoData, setPhotoData] = useState(null);

    const loginHandler = () => {
        navigation.navigate('LoginScreen');
    };

    const uploadPhoto = () => {
        let options = {
            noData: true,
        };

        launchImageLibrary(options, (response) => {
            console.log(response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
                return;
            }
            if (response.assets[0].uri) {
                setPhoto({ uri: response.assets[0].uri });
                // setPhotoData(response);
                console.log('test');
            }
        });
    };

    const registerHandler = () => {
        console.log(photo.uri);
        let photoProfile = {
            uri: photo.uri.replace('file://', ''),
            type: 'image/jpg',
            name: 'rn_image_picker_lib_temp_2b24058f-2110-4ce9-b3fc-5a7ab433f4f9.jpg',
        };

        const form = new FormData();

        form.append('image', photoProfile);

        axios.post('https://api-skripsi-digital-signature.herokuapp.com/register', {
            body: form,
            header: {
                'content-type': 'image/jpg',
            },
        }).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <Text style={styles.titleName}>Register</Text>
            </View>
            <View style={styles.body}>
                <View style={{ flex: 0.25, marginBottom: 10, }}>
                    <TouchableOpacity onPress={uploadPhoto}>
                        <Image style={{ height: 100, width: 80, }} source={photo} />
                    </TouchableOpacity>
                </View>
                <View style={styles.inputs}>
                    <TextInput style={styles.input} placeholder="Nama" />
                    <TextInput style={styles.input} placeholder="Username" />
                    <TextInput style={styles.input} placeholder="Password" />
                    <TextInput style={styles.input} placeholder="NIK" />
                    <TextInput style={styles.input} placeholder="No. Telp" />
                    <TextInput style={styles.input} placeholder="PIN" />
                </View>
                <View style={styles.buttons}>
                    <View>
                        <Button onPress={loginHandler} title="Login" />
                    </View>
                    <View style={styles.or}>
                        <Text>OR</Text>
                    </View>
                    <View>
                        <Button onPress={registerHandler} title="Register" />
                    </View>
                </View>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    header: {
        alignItems: 'center',
        paddingTop: 35,
        height: 100,
    },
    titleName: {
        fontWeight: 'bold',
        fontSize: 30,
    },
    body: {
        height: 607,
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 15,
        marginHorizontal: 17,
    },
    inputs: {
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        flex: 0.9,
    },
    buttons: {
        marginTop: 20,
        width: '90%',
        flex: 0.30,
    },
    or: {
        alignItems: 'center',
        marginVertical: 5,
    },
});

export default RegisterScreen;
