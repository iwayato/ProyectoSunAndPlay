import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import firebaseConfig from './firebaseConfig';

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const checkForNums = (array, off, v, a, r) => {

    let m0 = !off && !v && !a && r;
    let m1 = !off && !v && a && !r;
    let m2 = !off && v && !a && !r;
    let m3 = off && !v && !a && !r;

    if (array[0] === undefined || array[0] === '' || array[0] === ',') {
        return false;
    }

    else if (!(m0 || m1 || m2 || m3)) {
        return false;
    }

    else {

        let flag = true;

        array[0].split(',').forEach(item => {

            let ids = [];  
            let rangos = item.split('-')   
            let rango_inf = Number(rangos[0]);
            let rango_sup = Number(rangos[1]);
            let margen = rango_sup - rango_inf;

            if (rangos.length === 1) {
                ids.push(rangos[0]);
                if (!((typeof(Number(ids[0])) === 'number') && (!isNaN(Number(ids[0]))))) {
                    flag = false;
                }
            }
            else if (isNaN(margen) || (rango_sup <= rango_inf)) {
                flag = false;
            }
            else {
                for (let i = 0; i <= margen; i++) {
                    ids.push(String(rango_inf + i));
                    if (!((typeof(Number(ids[i])) === 'number') && (!isNaN(Number(ids[i]))))) {
                        flag = false;
                    }            
                }
            }
        })

        return flag;
    }

};

const Submit = (l, off, v, a, r) => {

    if (checkForNums(l, off, v, a, r)) {

        console.log('check exitoso');

        let color = "";

        if (off) {
            color = "0";
        }
        else if (v) {
            color = "G";
        }
        else if (a) {
            color = "Y";
        }
        else{
            color = "R";
        }

        l[0].split(',').forEach(id => {

            let rangos = id.split('-')   
            let rango_inf = Number(rangos[0]);
            let rango_sup = Number(rangos[1]);
            let margen = rango_sup - rango_inf;
            let ids = [];  

            if (rangos.length === 1) {
                set(ref(db, 'downlink/' + rangos[0]), {
                    color : color
                });
            }
            else {
                for (let i = 0; i <= margen; i++) {
                    ids.push(String(rango_inf + i));
                    set(ref(db, 'downlink/' + ids[i]), {
                        color : color
                    });
                }
            }
        })

    }
    else{
        alert('Los datos ingresados son incorrectos:' + '\r\n' + '-> Las ids ingresadas no son números válidos' + '\r\n' + '-> Los rangos no son correctos (deben ser de menor a mayor)' + '\r\n' + '-> No hay un color seleccionado o hay más de uno');
    }
};

const SetLuzCard = () => {

    const [tachasList, settachasList] = useState('');
    const [apagado, setApagado] = useState(false);
    const [verde, setVerde] = useState(false);
    const [amarillo, setAmarillo] = useState(false);
    const [rojo, setRojo] = useState(false);

    const tachasListHandler = (event) => {
        settachasList([event.target.value]);
    }

    const setApagadoHandler = () => {
        setApagado(!apagado);
    }
    
    const setVerdeHandler = () => {
        setVerde(!verde);
    }
   
    const setAmarilloHandler = () => {
        setAmarillo(!amarillo);
    }
    
    const setRojoHandler = () => {
        setRojo(!rojo);
    }

    return(

        <div>

            <input
                placeholder='Selecciona tachas' 
                type='text' 
                name='tachas_sel'
                value={tachasList}
                onChange={tachasListHandler}
            >       
            </input><br></br>

            <label>
                Apagado
                <input
                    type='checkbox'
                    name='apagado'
                    onChange={setApagadoHandler}
                >
                </input>
            </label><br></br>

            <label>
                Verde
                <input 
                    type='checkbox'
                    name='color_verde'
                    onChange={setVerdeHandler}
                >
                </input>
            </label><br></br>

            <label>
                Amarillo
                <input 
                    type='checkbox' 
                    name='color_amarillo'
                    onChange={setAmarilloHandler}
                > 
                </input>
            </label><br></br>

            <label>
                Rojo
                <input 
                    type='checkbox' 
                    name='color_rojo'
                    onChange={setRojoHandler}
                >   
                </input>
            </label><br></br>

            <button onClick={(e) => {
                e.preventDefault()
                Submit(tachasList, apagado, verde, amarillo, rojo)
            }}>Enviar</button>

        </div>

    );

};

export default SetLuzCard;