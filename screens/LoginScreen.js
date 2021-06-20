/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const axios = require('axios').default;

const LoginScreen = ({ route, navigation }) => {
    const [auth, setAuth] = useState(false);
    const [usernameOrNoTelp, setUsernameOrNoTelp] = useState('');
    const [password, setPassword] = useState('');
    // const [navigate] = useState(navigation.navigate);
    const [isRegisterComplete, setIsRegisterComplete] = useState('transparent');





    useEffect(() => {
        console.log(auth);
        console.log("useEffect");
        if (auth) {
            route.params = false;
            setIsRegisterComplete('transparent');
            navigation.navigate('TabStack');
        }
        setAuth(false);

        if (route.params) {
            if (route.params.isRegisterComplete) {
                setIsRegisterComplete('green');
            }

        }
    }, [auth, navigation, route]);

    const loginHandler = () => {
        // navigation.navigate('TabStack');
        axios.post('https://api-skripsi-digital-signature.herokuapp.com/login', {
            usernameOrNoTelp: usernameOrNoTelp,
            password: password,
        }).then((response) => {
            console.log(response.data);
            setAuth(response.data.auth);
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <View style={styles.screen}>
            <View style={styles.title}>
                <Text style={styles.titleName}>Digital Signature</Text>
            </View>
            <View style={styles.form}>
                <View style={styles.inputs}>
                    <TextInput
                        onChangeText={(value) => {
                            setUsernameOrNoTelp(value);
                            console.log(value);
                        }}
                        style={styles.input} placeholder="Username/No.Telp" />
                    <TextInput
                        onChangeText={(value) => {
                            setPassword(value);
                            console.log(value);
                        }}
                        style={styles.input} placeholder="Password" />
                </View>
                <View style={styles.buttons}>
                    <View>
                        <Button onPress={loginHandler} title="Login" />
                    </View>
                    <View style={styles.or}>
                        <Text>OR</Text>
                    </View>
                    <View>
                        <Button onPress={() => navigation.navigate('RegisterScreen')} title="Register" />
                    </View>
                </View>
                <Text style={{ color: isRegisterComplete, marginTop: 25, fontSize: 16 }}>Regsitrasi Berhasil, Silahkan login...</Text>
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
        flex: 0.3,
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
        marginTop: 30,
        width: '90%',
    },
    or: {
        alignItems: 'center',
        marginVertical: 5
    },
});

export default LoginScreen;
