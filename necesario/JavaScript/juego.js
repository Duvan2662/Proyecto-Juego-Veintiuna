/* 
* 2C = DOS DE CORAZONES
* 2D = DOS DE DIAMANTES 
* 2T = DOS DE TREBOL 
* 2P = DOS DE PICAS 
*/


let baraja            = [];



const tipos      = ['C','D','T','P']; //Tipos de carta
const especiales = ['A','J','Q','K']; //Tipos de carta


//Crear baraja de cartas
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


//Tomar una nueva carta 
const tomarCarta = () =>{
    //Si se acaban las cartas en la baraja
    if(baraja.length === 0){
        throw 'No ahi cartas en la baraja'
    }


    const carta = baraja.pop();//Elimina el ultimo elemento de un array 
    return carta;//retorna la carta  
};


const valorCarta = (carta) => {

    let puntos = 0; //Valor en puntos de cada carta 
    
    //Necestio tomar el primer valor de la carta 2,3,4,5 o 10 entonces siempre va a ir desde la posicion 0 hasta la posicion final menos 1 para el 10 
    let valor = carta.substring(0,carta.length-1);

    //Mira si el valor es un numero
    if(isNaN(valor)){ 
        //Entra si NO es un numero el valor 
        if(valor == 'A'){
            puntos = 11;
        }else{
            puntos = 10;
        }

    }else{
        //Entra si ES un numero el valor 
        puntos = parseInt(valor,10); //Paso el valor a entero 
    }
    console.log(puntos);
    return puntos;
};

