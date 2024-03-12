/* 
* 2C = DOS DE CORAZONES
* 2D = DOS DE DIAMANTES 
* 2T = DOS DE TREBOL 
* 2P = DOS DE PICAS 
*/




let baraja            = [];
let puntosJugador     = 0;



const tipos      = ['C','D','T','P']; //Tipos de carta
const especiales = ['A','J','Q','K']; //Tipos de carta


//Referencias del DOM
const btnpedir          = document.querySelector('#btnPedir');
const actualizarPuntos  = document.querySelectorAll('small');
const barajaJugador     = document.querySelector('#jugador-cartas');



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



//Valor de cada carta 
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
    return puntos;
};



//Eventos


//Evento de pedir
btnpedir.addEventListener('click', () => {

    const carta = tomarCarta();

    puntosJugador = puntosJugador + valorCarta(carta);
    actualizarPuntos[0].innerText = puntosJugador;//Se toma el small en su posicion 0 que es el small del jugador y se coloca el puntaje del jugador 
    
    
    //Logica para la creacion de la imagen en el HTML 
    const imagenCarta = document.createElement('img');//Crea un elemento img de HTML
    imagenCarta.classList.add('carta');//Se le asgina la clase de las cartas
    console.log('estoy aqui')
    console.log({carta});
    imagenCarta.src = `necesario/Cartas/${carta}.jpg`;//Se le asigna la imagen 
    barajaJugador.append(imagenCarta);//Se coloca al final del elemento


    if(puntosJugador > 21){
        console.error('PERDISTE');
        btnpedir.disabled = true;//bloque el boton pedir
        btndetener.disabled = true;//bloque el boton detener
    }else if(puntosJugador === 21){
        console.warn('LLEGASTE A 21 GENIAL !!!!!!1');
        btnpedir.disabled = true;//bloque el boton pedir
        btndetener.disabled = true;//bloque el boton detener
    }
    
})


