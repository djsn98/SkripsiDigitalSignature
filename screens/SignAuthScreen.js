/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

const axios = require('axios').default;

const SignAuthScreen = ({ route, navigation }) => {
    // console.log(route);
    const [isLoading, setIsLoading] = useState(false);
    const [PIN, setPIN] = useState('');

    const authHandler = () => {
        setIsLoading(true)
        console.log(route.params.username);
        console.log(route.params.password);


        axios.post('https://api-skripsi-digital-signature.herokuapp.com/sign-auth', {
            usernameOrNoTelp: route.params.username,
            password: route.params.password,
            PIN: PIN,
        }).then((response) => {
            console.log(response.data);
            if (response.data.auth) {
                setIsLoading(false)
                navigation.navigate('SignPad', { username: route.params.username });
            } else {
                console.log('Sign auth gagal!');
                setIsLoading(false)
            }
        }).catch((err) => {
            console.log(err);
        });
    };

    return (
        <View style={styles.screen}>
            <View style={styles.title}>
                <Text style={styles.titleName}>Sign Auth</Text>
            </View>
            <View style={styles.form}>
                <View style={styles.inputs}>
                    <TextInput
                        onChangeText={(value) => {
                            setPIN(value);
                            console.log(PIN);
                        }}
                        style={styles.input}
                        placeholder="Masukan PIN" />

                </View>
                <View style={styles.buttons}>
                    <View>
                        <Button
                            onPress={authHandler}
                            loading={isLoading}
                            title="Submit"
                        />
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
        marginVertical: 5,
    },
});

export default SignAuthScreen;
