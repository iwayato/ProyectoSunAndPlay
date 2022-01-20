import './App.css';
import Map from './components/Map';
import React from 'react';
//import { useEffect, useState, useRef } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import firebaseConfig from './components/firebaseConfig';

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRef = ref(db, 'data/');

function App() {

  onValue(dbRef, (snapshot) => {
    const data = snapshot.val();
  });

  console.log(data);

  return(
    //infoTachas debe contener una lista con los objetos que corresponden a los datos de cada tacha
    //<Map infoTachas={data}></Map>
    null
  );
}

export default App;