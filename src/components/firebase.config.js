import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCD9rV4Hnm74SMOCdyo5RnrwzYzf2h06nc",
    authDomain: "tachasweb.firebaseapp.com",
    projectId: "tachasweb",
    storageBucket: "tachasweb.appspot.com",
    messagingSenderId: "660257260088",
    appId: "1:660257260088:web:4f68f9d71bcf0a6fbedccd"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export default db;