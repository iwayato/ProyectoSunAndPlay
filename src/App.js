import './App.css';
import Map from './components/Map';
import useSwr from "swr";

const fetcher = (...args) => fetch(...args).then(response => response.json());

function App() {

  const url = 'https://tachasweb-default-rtdb.firebaseio.com/data.json?print=pretty';
  const { data, error } = useSwr(url, { fetcher });
  const infoTachas = data && !error ? data.slice(0, 3) : [];

  return(
    <Map infoTachas={infoTachas}>
    </Map>
  );

}

export default App;