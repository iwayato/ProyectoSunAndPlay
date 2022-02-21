import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import firebaseConfig from './firebaseConfig';
import classes from './SetLuzCard.module.css';
import { Link } from "react-router-dom";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function DisplayAlert() {

    var newLine = "\r\n"
    var msg = "Los datos ingresados son incorrectos:"
    msg += newLine;
    msg += "-> Las ids ingresadas no son números válidos";
    msg += newLine;
    msg += "-> Los rangos no son correctos (deben ser de menor a mayor)";
    msg += newLine;
    msg += "-> No hay un color seleccionado o hay más de uno";
    alert(msg);
    
};

const checkForNums = (array, off, v, a, r, t) => {

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
            else if (isNaN(margen) || (rango_sup <= rango_inf || rango_inf > t || rango_sup > t || margen > t || rangos[0] === '')) {
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

const Submit = (l, off, v, a, r, t) => {

    if (checkForNums(l, off, v, a, r, t)) {

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
                    color : color,
                    status : "U"
                });
            }
            else {
                for (let i = 0; i <= margen; i++) {
                    ids.push(String(rango_inf + i));
                    set(ref(db, 'downlink/' + ids[i]), {
                        color : color,
                        status : "U"
                    });
                }
            }
        })
    }
    else{

        DisplayAlert();

    }
};

const SetLuzCard = (props) => {

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
        setVerde(false);
        setAmarillo(false);
        setRojo(false);
    }
    
    const setVerdeHandler = () => {
        setApagado(false);
        setVerde(!verde);     
        setAmarillo(false);
        setRojo(false);
    }
   
    const setAmarilloHandler = () => {
        setApagado(false);
        setVerde(false); 
        setAmarillo(!amarillo);  
        setRojo(false);
    }
    
    const setRojoHandler = () => {
        setApagado(false);
        setVerde(false);
        setAmarillo(false);
        setRojo(!rojo);
    }

    return(

        <div className={classes.SetLuzCard}>

            <br></br>

            <h2>Tachas Web</h2>

            <div className={classes.CambiarLuzTachas}>
                <nav
                    style={{
                        paddingBottom: "10px",
                        paddingTop: "10px"
                    }}
                >
                    <Link to="/graficos" style={{ textDecoration: 'none' }}>Gráficos</Link>
                </nav>
            </div>

            <div className={classes.CambiarLuzTachas}>

                <h4>Cambiar Luz Tachas</h4>

                <input
                    className={classes.Input}
                    placeholder='ej: 0-3 o 0,1,2,3 o 0-2,3' 
                    type='text' 
                    name='tachas_sel'
                    value={tachasList}
                    onChange={tachasListHandler}
                >       
                </input><br></br>

                <div className={classes.Labels}>
    
                    <label>
                        Apagado      
                    </label><br></br>
            
                    <label>
                        Verde
                    </label><br></br>

                    <label>
                        Amarillo
                    </label><br></br>

                    <label>
                        Rojo
                    </label><br></br>

                </div>

                <div className={classes.CheckBoxes}>

                    <input
                        type='radio'
                        name='color_tacha'
                        onChange={setApagadoHandler}
                    >
                    </input><br></br>

                    <input 
                        type='radio'
                        name='color_tacha'
                        onChange={setVerdeHandler}
                    >
                    </input><br></br>

                    <input 
                        type='radio' 
                        name='color_tacha'
                        onChange={setAmarilloHandler}
                    > 
                    </input><br></br>

                    <input 
                        type='radio'
                        name='color_tacha'
                        onChange={setRojoHandler}
                    >   
                    </input><br></br>     

                </div>

                <button
                    className={classes.Button} 
                    onClick={(e) => {
                        e.preventDefault();
                        Submit(tachasList, apagado, verde, amarillo, rojo, props.totalTachas)
                    }}
                >
                Enviar
                </button>

            </div>

            <div className={classes.Leyenda}>

                <h4 className={classes.h44}> Rangos temperatura</h4>
                <div className={classes.Container}>
                    <div className={classes.temperatura_baja}>0 - 60</div>
                    <div className={classes.temperatura_media}>61 - 80</div>
                    <div className={classes.temperatura_alta}>81 - 100</div>
                </div>

                <h4 className={classes.h44}>Rango vibraciones</h4>
                <div className={classes.Container}>
                    <div className={classes.vibraciones_baja}>0 - 6.0</div>
                    <div className={classes.vibraciones_media}>6.1 - 8.0</div>
                    <div className={classes.vibraciones_alta}>8.1 - 10.0</div>
                </div>

                <h4 className={classes.h44}>Rangos humedad</h4>
                <div className={classes.ContainerFinal}>
                    <div className={classes.humedad_baja}>0 - 60</div>
                    <div className={classes.humedad_media}>61 - 80</div>
                    <div className={classes.humedad_alta}>81 - 100</div>
                </div>

            </div>

        </div>

    );

};

export default SetLuzCard;