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
      locations : []
    }
  };

  componentDidMount() {

    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const dbRef = ref(db, 'data/');
    const dbloc = ref(db, 'locations/');
    
    onValue(dbloc, (snapshot) => {
      let loc =[];
      snapshot.forEach(data => {
        const dataVal = data.val()
        loc.push({
          latitud: dataVal.latitud,
          longitud: dataVal.longitud})});
      this.setState({ locations: loc })
    });

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
          luz: dataVal.luz})});
      this.setState({ data: newData })
    });

  }

  render(){
      return(
        //infoTachas debe contener una lista con los objetos que corresponden a los datos de cada tacha
        <Map infoTachas={this.state.data} locations={this.state.locations}></Map>
      );
  }
}

export default App;