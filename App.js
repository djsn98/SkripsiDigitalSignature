/* eslint-disable prettier/prettier */
import React, { Component, useState } from 'react';
import { View, Image, Button, Platform } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import 'react-native-gesture-handler';

import Ionicons from 'react-native-vector-icons/Ionicons';

// import TabStack from './stack_nav/tab.stack';
import Router from './stack_nav/router'
import { launchImageLibrary } from 'react-native-image-picker';

// const SERVER_URL = 'http://localhost:3000';

const createFormData = (photo, body = {}) => {
  const data = new FormData();

  // console.log(photo.assets[0].fileName)
  data.append('photo', {
    name: photo.assets[0].fileName,
    type: photo.assets[0].type,
    uri: Platform.OS === 'ios' ? photo.assets[0].uri.replace('file://', '') : photo.assets[0].uri,
  });



  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};

const App = () => {
  const [photo, setPhoto] = useState(null);

  const handleChoosePhoto = () => {
    launchImageLibrary({ noData: true }, (response) => {
      // console.log(response);
      if (response) {
        setPhoto(response);
        console.log(photo);
      }
    });
  };

  const handleUploadPhoto = () => {
    let url = `https://api-skripsi-digital-signature.herokuapp.com/api/upload`;
    console.log(url);
    console.log(photo);
    console.log(createFormData(photo, { userId: '123' })._parts);
    fetch(url, {
      method: 'POST',
      body: createFormData(photo, { userId: '123' }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('response', response);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
  return (
    // <LoginScreen />
    // <RegisterScreen />
    // <Router />
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {photo && (
        <>
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 300, height: 300 }}
          />
          <Button title="Upload Photo" onPress={handleUploadPhoto} />
        </>
      )}
      <Button title="Choose Photo" onPress={handleChoosePhoto} />
    </View>
  );
}

export default App;