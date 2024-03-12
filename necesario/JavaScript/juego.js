/* 
* 2C = DOS DE CORAZONES
* 2D = DOS DE DIAMANTES 
* 2T = DOS DE TREBOL 
* 2P = DOS DE PICAS 
*/


let baraja            = [];



const tipos      = ['C','D','T','P']; //Tipos de carta
const especiales = ['A','J','Q','K']; //Tipos de carta


const crearBaraja = () =>{
    
    //Llena el arreglo de baraja con los nueros del 2 al 10 y los diferentes tipos de carta(c,d,h,s) ejemlo: (2C,3D,4T)
    for (let i = 2; i<= 10; i++) {
       for (let tipo of  tipos) {
        baraja.push(i+tipo)
       }
    }
    //Llena el arreglo de baraja con las cartas especiales (A,J,Q,K) y los diferentes tipos de carta(C,D,T,P) (AC,JC,QC,KC)
    for (let tipo of tipos) {
        for (let esp of especiales) {
            baraja.push(esp+tipo)
        }
    }

    
    baraja = _.shuffle (baraja); //Funcion que sirve para barajar apartir de la libreria Underscore.js
    return baraja;
};

crearBaraja();