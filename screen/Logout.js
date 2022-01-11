import React from 'react';
import { View, Text } from 'react-native';
import firebase from '../firebaseConfig';

function Login() {

    function logoutFirebase() {
        firebase.auth().signOut().then(function() {
          alert('Deslogado com sucesso!');
        }).catch(function(error) {
          alert('Falha: ', error)
        })
    }

    logoutFirebase();

    return (
        <View>
            
        </View>
    )
}

export default Login
