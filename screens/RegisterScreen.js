/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Button } from 'react-native-elements';
const axios = require('axios').default;

const RegisterScreen = ({ route, navigation }) => {
    const [isLoading, setIsLoading] = useState(false);

    const [photo, setPhoto] = useState(require('../assets/upload-photo-icon.jpg'));
    const [nama, setNama] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [NIK, setNIK] = useState('');
    const [noTelp, setNoTelp] = useState('');
    const [password, setPassword] = useState('');
    const [PIN, setPIN] = useState('');

    const [isNamaFilled, setIsNamaFilled] = useState('transparent');
    const [isUsernameFilled, setIsUsernameFilled] = useState('transparent');
    const [isEmailFilled, setIsEmailFilled] = useState('transparent');
    const [isNIKFilled, setIsNIKFilled] = useState('transparent');
    const [isNoTelpFilled, setIsNoTelpFilled] = useState('transparent');
    const [isPasswordFilled, setIsPasswordFilled] = useState('transparent');
    const [isPINFilled, setIsPINFilled] = useState('transparent');
    const [isRegisterComplete, setIsRegisterComplete] = useState('transparent');


    const [isUsernameAlready, setIsUsernameAlready] = useState('Username harus diisi!');
    const [isNoTelpAlready, setIsNoTelpAlready] = useState('NIK harus diisi!');
    const [isNIKAlready, setIsNIKAlready] = useState('No. Telp harus diisi!');


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
        if (nama && username && password && email && NIK && noTelp && PIN) {
            setIsLoading(true);
            console.log(photo.uri);
            let userData = {
                nama: nama,
                username: username,
                password: password,
                email: email,
                NIK: NIK,
                noTelp: noTelp,
                PIN: PIN,
            };

            let photoProfile = {
                uri: photo.uri,
                type: `image/${photo.uri.substr(-3)}`,
                name: `${username}.${photo.uri.substr(-3)}`,
            };

            console.log(photoProfile);
            const form = new FormData();

            form.append('userData', JSON.stringify(userData));

            form.append('image', photoProfile);
            console.log(form._parts);

            fetch('https://api-skripsi-digital-signature.herokuapp.com/register', {
                method: 'POST',
                body: form,
                header: {
                    'Accept': 'application/json',
                    'Content-Type': `image/${photo.uri.substr(-3)}`,
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.register) {
                        console.log(`Registrasi Berhasil! ${data.register}`);
                        navigation.navigate('LoginScreen', { isRegisterComplete: data.register });
                    } else {
                        if (data.isNewUserAlready) {
                            if (data.isNewUserAlready.username) {
                                setIsUsernameAlready('Username tidak tersedia!');
                                setIsUsernameFilled('red');
                            }
                            if (data.isNewUserAlready.noTelp) {
                                setIsNoTelpAlready('No. Telp tidak tersedia!');
                                setIsNoTelpFilled('red');
                            }
                            if (data.isNewUserAlready.NIK) {
                                setIsNIKAlready('NIK tidak tersedia!');
                                setIsNIKFilled('red');
                            }
                            setIsRegisterComplete('red');
                        }
                    }
                    setIsLoading(false);
                })
                .catch((error) => {
                    setIsLoading(false);
                    console.log(error);
                });
        } else {
            console.log('lengkapi data');
        }
    };

    return (
        <View style={styles.screen}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.titleName}>Register</Text>
                </View>
                <View style={styles.body}>
                    <View style={{ height: 100, marginBottom: 10, }}>
                        <TouchableOpacity onPress={uploadPhoto}>
                            <Image style={{ height: 100, width: 80, }} source={photo} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputs}>
                        <TextInput
                            style={styles.input}
                            placeholder="Nama"
                            onChangeText={(value) => {
                                let cleanValue = value.trim();

                                if (cleanValue != '') {
                                    setIsNamaFilled('transparent');
                                    setNama(value);
                                } else {
                                    setIsNamaFilled('red');
                                }
                            }}
                        />
                        <Text style={{ marginHorizontal: 17, color: isNamaFilled }}>Nama harus diisi!</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Username"
                            onChangeText={(value) => {
                                let cleanValue = value.trim();

                                if (cleanValue != '') {
                                    setIsUsernameFilled('transparent');
                                    setUsername(value);
                                } else {
                                    setIsUsernameFilled('red');
                                }
                            }}
                        />
                        <Text style={{ marginHorizontal: 17, color: isUsernameFilled }}>{isUsernameAlready}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            onChangeText={(value) => {
                                let cleanValue = value.trim();

                                if (cleanValue != '') {
                                    setIsEmailFilled('transparent');
                                    setEmail(value);
                                } else {
                                    setIsEmailFilled('red');
                                }
                            }}
                        />
                        <Text style={{ marginHorizontal: 17, color: isEmailFilled }}>Email harus diisi!</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="NIK"
                            onChangeText={(value) => {
                                let cleanValue = value.trim();

                                if (cleanValue != '') {
                                    setIsNIKFilled('transparent');
                                    setNIK(value);
                                } else {
                                    setIsNIKFilled('red');
                                }
                            }}
                        />
                        <Text style={{ marginHorizontal: 17, color: isNIKFilled }}>{isNIKAlready}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="No. Telp"
                            onChangeText={(value) => {
                                let cleanValue = value.trim();

                                if (cleanValue != '') {
                                    setIsNoTelpFilled('transparent');
                                    setNoTelp(value);
                                } else {
                                    setIsNoTelpFilled('red');
                                }

                            }}
                        />
                        <Text style={{ marginHorizontal: 17, color: isNoTelpFilled }}>{isNoTelpAlready}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            onChangeText={(value) => {
                                let cleanValue = value.trim();

                                if (cleanValue != '') {
                                    setIsPasswordFilled('transparent');
                                    setPassword(value);
                                } else {
                                    setIsPasswordFilled('red');
                                }
                            }}
                        />
                        <Text style={{ marginHorizontal: 17, color: isPasswordFilled }}>Password harus diisi!</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="PIN"
                            onChangeText={(value) => {
                                let cleanValue = value.trim();

                                if (cleanValue != '') {
                                    setIsPINFilled('transparent');
                                    setPIN(value);
                                } else {
                                    setIsPINFilled('red');
                                }
                            }}
                        />
                        <Text style={{ marginHorizontal: 17, color: isPINFilled }}>PIN harus diisi!</Text>
                    </View>
                    <Text style={{ color: isRegisterComplete }}> Registrasi Gagal!</Text>
                    <View style={styles.buttons}>
                        <View>
                            <Button onPress={loginHandler} title="Login" />
                        </View>
                        <View style={styles.or}>
                            <Text>OR</Text>
                        </View>
                        <View>
                            <Button
                                onPress={registerHandler}
                                title="Register"
                                loading={isLoading}
                            />
                        </View>
                    </View>

                </View>
            </ScrollView>
        </View>

    );
};

const styles = StyleSheet.create({
    screen: {
        height: 'auto',
    },
    header: {
        alignItems: 'center',
        paddingTop: 35,
        height: 100,
        marginBottom: 10
    },
    titleName: {
        fontWeight: 'bold',
        fontSize: 30,
    },
    body: {
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 15,
        marginHorizontal: 17,
        marginTop: 7,
        // color: 'red',
    },
    inputs: {
        alignSelf: 'stretch',
        // flex: 0.9,
    },
    buttons: {
        marginTop: 30,
        marginBottom: 30,
        width: '90%',
        alignSelf: 'center',
        // flex: 0.30,
    },
    or: {
        alignItems: 'center',
        marginVertical: 5,
    },
});

export default RegisterScreen;
