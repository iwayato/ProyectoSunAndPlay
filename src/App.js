import './App.css';
import Map from './components/Map'

//Imports para utilizar RealTime DataBase
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, get, child } from "firebase/database";

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

const dbRef = ref(getDatabase());
get(child(dbRef, `tachas/${1}`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

//Parametros : id, temp, hum, acel, luz, lat, lng
/*function writeData(id, temp, hum, acel, luz, lat, lng){

  //No olvidar incluir set en los imports

  set(ref(db, 'tachas/' + id), {
    temperatura: temp,
    humedad: hum,
    aceleracion: acel,
    luz: luz,
    latitud: lat,
    longitud: lng
  });

}*/

function App() {

  return(
    <Map></Map>
  );

}

export default App;