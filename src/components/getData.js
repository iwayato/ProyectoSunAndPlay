import axios from 'axios';

const getData = (parametro, id) => {

    let dates = [];
    let values = [];

    axios.get(`http://localhost:3001/data/${parametro}/${id}`).then((response) => {

        let data  = response.data.data[0];

        for (var key in data) {
            if (data.hasOwnProperty(key)){
                if (key !== 'id') {
                    dates.push(key);
                    values.push(data[key]);
                }
            }
        }

    });

    return [dates, values];
}

export default getData;