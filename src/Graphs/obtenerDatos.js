import getData from "../components/getData";

const obtenerDatos = () => {
    const numTachas = 21;
    let labels = [];
    let temps = [];
    let hums = [];
    let acels = [];

    const randomColor = () => {
    return Math.floor(Math.random()*16777215).toString(16);
    }

    labels.push(getData('M_Temperatura', 1)[0]);

    ['M_Temperatura', 'M_Humedad', 'M_Aceleracion'].forEach((param) => {

        for (let m = 1; m <= numTachas; m++) {
            if (param === 'M_Temperatura') {
                temps.push({ 
                    data : getData(param, m)[1],
                    label : `Tacha ${m}`,
                    borderColor : '#' + randomColor(),
                    backgorundColor : '#' + randomColor()
                });
            }
            if (param === 'M_Humedad') {
                hums.push({ 
                    data : getData(param, m)[1],
                    label : `Tacha ${m}`,
                    borderColor : '#' + randomColor(),
                    backgorundColor : '#' + randomColor()
                });
            }
            if (param === 'M_Aceleracion') {
                acels.push({ 
                    data : getData(param, m)[1],
                    label : `Tacha ${m}`,
                    borderColor : '#' + randomColor(),
                    backgorundColor : '#' + randomColor()
                });
            }
        }
    })

    return [labels[0], temps, hums, acels];

}

export default obtenerDatos;