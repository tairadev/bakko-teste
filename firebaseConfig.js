import { initializeApp } from 'firebase/app';
import { getAuth  } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCzeaO5aIfWeb8ViPubAQGJwpvP2qbLJJk",
    authDomain: "authentication-ecbe1.firebaseapp.com",
    projectId: "authentication-ecbe1",
    storageBucket: "authentication-ecbe1.appspot.com",
    messagingSenderId: "547229919756",
    appId: "1:547229919756:web:a406c7e4d1133044a4dc29",
    measurementId: "G-RQZ3TBRYS9"
};

const app = initializeApp(firebaseConfig);
export default getAuth(app);