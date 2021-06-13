/* eslint-disable prettier/prettier */
import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RecieveDocScreen = () => {

    return (
        <View>
            <View style={{ elevation: 5, paddingVertical: 7, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white' }}>
                <Ionicons name="arrow-back" size={40} color="gray" />
                <Image style={{ marginLeft: 5, width: 43, height: 43, borderRadius: 50 }} source={require('../assets/photo-profile-example.jpg')} />
                <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 16, marginLeft: 15 }}>Dennis Jason</Text>
            </View>
            <TouchableOpacity >
                <View style={{ alignSelf: 'center', paddingVertical: 2, paddingHorizontal: 5, alignItems: 'center', flexDirection: 'row', width: 350, height: 80, backgroundColor: 'white', marginBottom: 20, borderRadius: 10, elevation: 5, justifyContent: 'space-between' }}>
                    <View>
                        <Image style={{ height: 60, width: 60 }} source={require('../assets/doc-icon.png')} />
                    </View>
                    <Text style={{ marginRight: 100 }}>example.pdf</Text>
                    <TouchableOpacity>
                        <View style={{ marginRight: 5 }}>
                            <Image style={{ height: 60, width: 60, tintColor: 'gray' }} source={require('../assets/cancel-upload.png')} />
                        </View>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default RecieveDocScreen;
