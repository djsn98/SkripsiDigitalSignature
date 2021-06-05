/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';


const RegisterScreen = () => {
    const [photo, setPhoto] = useState(require('../assets/upload-photo-icon.jpg'));

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
                console.log('test');
            }
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
                    <TextInput style={styles.input} placeholder="Password" />
                </View>
                <View style={styles.buttons}>
                    <View>
                        <Button title="Login" />
                    </View>
                    <View style={styles.or}>
                        <Text>OR</Text>
                    </View>
                    <View>
                        <Button title="Register" />
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
