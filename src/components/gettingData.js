import axios from 'axios';

const gettingData = (parametro, id) => {

    let dates = [];
    let values = [];

    axios.get(`https://tachas-web-api.herokuapp.com/data/${parametro}/${id}/false`).then((response) => {

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

export default gettingData;