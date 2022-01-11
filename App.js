import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import Tabs from './navigation/Tabs'
import firebase from './firebaseConfig';
import Background from './assets/login_background.png'
import Cores from './constants/Cores'

export default function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedUser, setLoggedUser] = useState('');

  function registerFirebase() {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    })
  }

  function loginFirebase() {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    })
  }

  function logoutFirebase() {
    firebase.auth().signOut().then(function() {
      console.log('Deslogado com sucesso!');
    }).catch(function(error) {
      console.log('Falha: ', error)
    })
  }

  const actionLoginGoogle = async () => {
    if(!loggedUser) {
      const provider = new firebase.auth.GoogleAuthProvider()
      const result = await firebase.auth().signInWithPopup(provider);
        
      if(result.user) {
        const { uid, displayName, photoURL } = result.user;
    
        setUser({
          id: uid,
          avatar: photoURL,
          name: displayName
        })
      }
    }
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if(user) {
        setLoggedUser(user)
      } else {
        setLoggedUser(false)
      }
    })
  }, [])

  return (
    <>
      {!loggedUser &&
        <View style={styles.container}>
          <ImageBackground 
            source={Background} 
            resizeMode="cover" 
            style={styles.image}
          >
            <Image source={{uri: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2e5ddbc3-0cff-4d7a-8b3f-fcf7d31d44b8/de8gxq1-30fe66bd-f833-4429-9599-ab91dbd0a0c5.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzJlNWRkYmMzLTBjZmYtNGQ3YS04YjNmLWZjZjdkMzFkNDRiOFwvZGU4Z3hxMS0zMGZlNjZiZC1mODMzLTQ0MjktOTU5OS1hYjkxZGJkMGEwYzUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.GUsTSElwyqtHgCP8UxIF7V-vYgiz8xH7-ee86RLfqxc'}} style={styles.logo} />
            <Text style={styles.text}> Bem vindo ao Bakko! </Text>
            
            <TextInput 
              style={styles.input} 
              placeholder='Digite seu e-mail' 
              placeholderTextColor={Cores.white} 
              onChangeText={(inputEmail) => setEmail(inputEmail)} value={email} 
            />
            <TextInput 
              secureTextEntry={true} 
              style={styles.input} 
              placeholder='Digite sua senha' 
              placeholderTextColor={Cores.white} 
              onChangeText={(inputPassword) => setPassword(inputPassword)}  
              value={password} 
            />
            
            <TouchableOpacity 
              style={styles.primaryButton} 
              onPress={() => { loginFirebase() }} 
            >
              Entrar
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.secondaryButton} 
              onPress={() => { actionLoginGoogle() }} 
            >
              Entrar com Google
            </TouchableOpacity>
          </ImageBackground>
        </View>  
      }
      {loggedUser &&
        <NavigationContainer>
          <Tabs logout={logoutFirebase} />
        </NavigationContainer>
      }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Cores.white,
    fontSize: 19,
    marginBottom: 30
  },
  input: {
    width: '75%',
    height: 56,
    backgroundColor: '#0A0100',
    marginBottom: 15,
    borderRadius: 5,
    padding: 10,
    fontSize: 17,
    color: Cores.white,
    borderWidth: 2,
    borderColor: Cores.primary
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 30
  },
  primaryButton: {
    width: '75%',
    height: 50,
    borderRadius: 10,
    color: Cores.white,
    fontFamily: 'Arial',
    fontWeight: 600,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    backgroundColor: Cores.primary,
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 20,
    fontSize: 16
  },
  secondaryButton: {
    width: '75%',
    height: 50,
    borderRadius: 10,
    color: Cores.primary,
    fontFamily: 'Arial',
    fontWeight: 600,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    backgroundColor: Cores.white,
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 20,
    fontSize: 16
  }
});