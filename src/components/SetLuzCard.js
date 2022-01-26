import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import firebaseConfig from './firebaseConfig';

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const checkForNums = (array) => {

    if (array[0] === undefined || array[0] === '') {
        console.log('primer filtro')
        return false;
    }

    else {

        console.log('Segundo filtro')

        let flag = false;

        array[0].split(',').forEach(item => {
            if (typeof(Number(item)) === 'number' && !isNaN(Number(item))) {
                console.log('if segundo filtro')
                flag = true;
            }
        })

        return flag;
    }

};

const Submit = (l, off, v, a, r) => {

    if (checkForNums(l)) {

        console.log('check for nums correcto')

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
            set(ref(db, 'downlink/' + id), {
                color : color
            });
        }) 
    }
    else{
        console.log('else alerta')
        alert('Debe ingresar la ID de al menos una tacha');
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