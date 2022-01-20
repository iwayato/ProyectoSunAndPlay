import './App.css';
import Map from './components/Map';
import { Component } from 'react';
//import { useEffect, useState, useRef } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import firebaseConfig from './components/firebaseConfig';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data : []
    }
  };

  componentDidMount() {

    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const dbRef = ref(db, 'data/');

    //onValue se actualiza cada vez que algun dato cambia en la base de datos de RealTime Database
    onValue(dbRef, (snapshot) => {
      let newData = [];
      snapshot.forEach(data => {
        const dataVal = data.val()
        newData.push({
          id: dataVal.id,
          temperatura: dataVal.Temperatura,
          humedad: dataVal.Humedad,
          acelerometro: dataVal.Aceleracion,
          latitud: dataVal.location.latitude,
          longitud: dataVal.location.longitude,
          luz: dataVal.luz})});
      this.setState({ data: newData })
    })

  }

  render(){
      return(
        //infoTachas debe contener una lista con los objetos que corresponden a los datos de cada tacha
        <Map infoTachas={this.state.data}></Map>
      );
  }
}

export default App;