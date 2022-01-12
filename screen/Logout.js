import React from 'react';
import { View, Text } from 'react-native';
import authentication from '../firebaseConfig';
import { signOut } from 'firebase/auth';

function Logout() {

  const logoutUser = () => {
    signOut(authentication)
    .then((res) => {
    })
    .catch((err) => {
      console.log(err)
    })
  }

  logoutUser();

  return (
    <View>
      <Text>Teste 123</Text>
    </View>
  )
}

export default Logout
