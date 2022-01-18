//Imports para utilizar RealTime DataBase
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCD9rV4Hnm74SMOCdyo5RnrwzYzf2h06nc",
    authDomain: "tachasweb.firebaseapp.com",
    projectId: "tachasweb",
    storageBucket: "tachasweb.appspot.com",
    messagingSenderId: "660257260088",
    appId: "1:660257260088:web:4f68f9d71bcf0a6fbedccd",
    databaseURL: "https://tachasweb-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

//Referencia a la tacha definida por id
const refTacha = ref(db, 'tachas/' + id);

onValue(refTacha, (snapshot) => {
    const dataTacha = snapshot.val();
    console.log(dataTacha);
})

