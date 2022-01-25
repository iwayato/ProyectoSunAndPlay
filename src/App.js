import './App.css';
import Map from './components/Map';
import { Component } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import firebaseConfig from './components/firebaseConfig';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data : [],
      locations : [],
      color : []
    }
  };

  componentDidMount() {

    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const dbRef = ref(db, 'data/');
    const dbloc = ref(db, 'locations/');
    const dbColor = ref(db, 'downlink/');

    //onValue se actualiza cada vez que algun dato cambia en la base de datos de RealTime Database

    //Para las posiciones de las tachas
    onValue(dbloc, (snapshot) => {
      let loc =[];
      snapshot.forEach(data => {
        const dataVal = data.val()
        loc.push({
          latitud: dataVal.latitud,
          longitud: dataVal.longitud})});
      this.setState({ locations: loc })
    });

    //Para los colores de las luces de las tachas
    onValue(dbColor, (snapshot) => {
      let colorList =[];
      snapshot.forEach(data => {
        const dataVal = data.val()
        let colorTacha = '';
        if (dataVal.color === "0") {
          colorTacha = 'gray';
        }
        else if (dataVal.color === "G") {
          colorTacha = 'green';
        }
        else if (dataVal.color === "Y") {
          colorTacha = 'yellow';
        }
        else if (dataVal.color === "R") {
          colorTacha = 'red';
        }
        colorList.push({
          color: colorTacha})});
      this.setState({ color: colorList })
    });

    //Para los datos de las tachas
    onValue(dbRef, (snapshot) => {
      let newData = [];
      snapshot.forEach(data => {
        const dataVal = data.val()
        newData.push({
          id: dataVal.id,
          temperatura: dataVal.Temperatura,
          humedad: dataVal.Humedad,
          acelerometro: dataVal.Aceleracion,
          luz: dataVal.luz})});
      this.setState({ data: newData })
    });
  }

  render(){
      return(
        <Map infoTachas={this.state.data} locations={this.state.locations} color={this.state.color}></Map>
      );
  }
}

export default App;