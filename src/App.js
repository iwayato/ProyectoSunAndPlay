import './App.css';
import Map from './components/Map';
import React, { useState } from 'react';
//import useSwr from "swr";
//import { useEffect, useRef } from 'react';

{/* 
const [infoTachas, setinfoTachas] = useState([]);
const fetcher = (...args) => fetch(...args).then(response => response.json());
const { data, error } = useSwr(url, { fetcher });
setinfoTachas([data && !error ? data.slice(0, 100) : []])
*/}

function App() {

  const [infoTachas, setinfoTachas] = useState([]);
  const url = 'https://tachasweb-default-rtdb.firebaseio.com/data.json?print=pretty';

  async function retrieveData(){
      const response = await fetch(url);
      const data = await response.json();
      setinfoTachas([data]);
  }

  retrieveData();

  setInterval(retrieveData, 5000);

  return(
    <Map infoTachas={infoTachas}></Map>
  );

}

export default App;