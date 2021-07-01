/* eslint-disable prettier/prettier */
import color from 'color';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
let uniqid = require('uniqid');
const axios = require('axios').default;


const LoginScreen = ({ route, navigation }) => {
    const [isLoading, setIsLoading] = useState(false);

    const [auth, setAuth] = useState(false);
    const [usernameOrNoTelp, setUsernameOrNoTelp] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [navigate] = useState(navigation.navigate);
    const [isRegisterComplete, setIsRegisterComplete] = useState('transparent');
    const [loginState, setLoginState] = useState('transparent');
    const [loginMessage, setLoginMessage] = useState('');




    useEffect(() => {

        console.log(auth);

        console.log("useEffect");
        if (auth) {
            setLoginState('transparent')
            route.params = false;
            setIsRegisterComplete('transparent');
            console.log(username);
            setAuth(false);
            setIsLoading(false);
            navigation.navigate('TabStack', { username: usernameOrNoTelp, password: password });
        }



        if (route.params) {
            if (route.params.isRegisterComplete) {
                setIsRegisterComplete('green');
            }

        }
    }, [auth, navigation, route, username, password]);

    const loginHandler = () => {
        setIsLoading(true)

        if (usernameOrNoTelp === '' || password === '') {
            setLoginMessage('Silahkan Masukan Username/No.Telp dan/atau Password!')
            setLoginState('red');
            setIsLoading(false);
        } else {
            console.log(uniqid());
            // navigation.navigate('TabStack');
            axios.post('https://api-skripsi-digital-signature.herokuapp.com/login', {
                usernameOrNoTelp: usernameOrNoTelp,
                password: password,
            }).then((response) => {
                console.log(response.data);
                // setUsername(response.data.data[0].Username);
                setAuth(response.data.auth);
                setLoginMessage('Username/No.Telp atau Password Salah!')
                setLoginState('red');
                setIsLoading(false)
                console.log(auth);
                // while (auth == false) {
                //     console.log(auth);
                // }
            }).catch((error) => {
                console.log(error);
            });
        }
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
                <Text style={{ marginTop: 10, color: loginState }}>{loginMessage}</Text>
                <View style={styles.buttons}>
                    <View>
                        <Button
                            onPress={loginHandler}
                            title="Login"
                            loading={isLoading}
                        />
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
