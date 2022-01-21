import './App.css';
import Map from './components/Map';
import { Component } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import firebaseConfig from './components/firebaseConfig';

const url = 'http://3.90.212.240:8080/api/devices/2cf7f1203230a466/queue';
const body = JSON.stringify({"deviceQueueItem": {"confirmed": true, "data": "Ag==", "devEUI": "2cf7f1203230a466", "fCnt": 0, "fPort": 3}});
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5X2lkIjoiNDExMzkxZDItMGY0ZC00MTAzLTkwZjAtNDE1NTQ0ZjA4YTljIiwiYXVkIjoiYXMiLCJpc3MiOiJhcyIsIm5iZiI6MTY0MjYxNjIwMCwic3ViIjoiYXBpX2tleSJ9._a7OBvSyrw0z-Gdo36W2SgjoVfe5syE2ZgKsl-13qes";

fetch(url, {
  method: 'POST',
  body: body,
  headers: {
      'Content-Type': 'application/json',
      'Grpc-Metadata-Authorization': 'Bearer ' + token,
  }
  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => console.log('Success:', response));     

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