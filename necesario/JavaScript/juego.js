/* 
* 2C = DOS DE CORAZONES
* 2D = DOS DE DIAMANTES 
* 2T = DOS DE TREBOL 
* 2P = DOS DE PICAS 
*/


const modulo = ( ()=>{
    'use strict'

    let baraja          = [],
        puntosJugadores = [];



    const tipos      = ['C','D','T','P'], //Tipos de carta
          especiales = ['A','J','Q','K']; //Tipos de carta


    //Referencias del DOM
    const btnpedir          = document.querySelector('#btnPedir'),
          btndetener        = document.querySelector('#btnDetener'),
          btnuevo           = document.querySelector('#btnNuevo'),
          actualizarPuntos  = document.querySelectorAll('small'),
          divCartas         = document.querySelectorAll('.divCartas');



    //Funcion que inicia el juego 
    const crearJuego = (numeroJugadores = 2) => {
        baraja = crearBaraja();
        puntosJugadores = [];
        for (let i = 0; i < numeroJugadores; i++) {
            puntosJugadores.push(0); 
        }
        actualizarPuntos.forEach(ele => ele.innerText = 0);//Me permite inicialiar los puntajes en 0 de los jugadores y la computadora 
        divCartas.forEach(ele => ele.innerHTML ="" );//Me permite borrar las cartas del juego anterior
        btnpedir.disabled = false;//Desbloquea el boton pedir
        btndetener.disabled = false;//Desbloquea el boton detener
    }

    //Crear baraja de cartas
    const crearBaraja = () =>{
        baraja = [];//Vacia la baraja

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
        return _.shuffle (baraja); //Funcion que sirve para barajar apartir de la libreria Underscore.js
    };

    //Tomar una nueva carta 
    const tomarCarta = () =>{
        //Si se acaban las cartas en la baraja
        if(baraja.length === 0){
            throw 'No ahi cartas en la baraja'
        }
        return baraja.pop();//Retorna y elimina el ultimo elemento de un array
    };

    //Valor de cada carta 
    const valorCarta = (carta) => {
        let puntos = 0; //Valor en puntos de cada carta 
        let valor = carta.substring(0,carta.length-1);//Necestio tomar el primer valor de la carta 2,3,4,5 o 10 entonces siempre va a ir desde la posicion 0 hasta la posicion final menos 1 para el 10 

        if(isNaN(valor)){ //Mira si el valor es un numero
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

    //Funcion que me permite acumular los puntos de los jugadores y escribirli en el html
    //Turno: 0 = PrimerJugador, y el ultimo es el de la computadora 
    const acumularPuntos = (carta,turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta); //Se actualiza los puntos de los jugadores o la computadora dependiendo del turno 
        actualizarPuntos[turno].innerText = puntosJugadores[turno];//Se toma el small en la posicion del jugador o la computadore se actualiza en la vista 
        return puntosJugadores[turno];
    };

    //Logica para la creacion de la imagen en el HTML 
    const asignarImagenCarta = (carta,turno) => {
        const imagenCarta = document.createElement('img');//Crea un elemento img de HTML
        imagenCarta.classList.add('carta');//Se le asgina la clase de las cartas
        imagenCarta.src = `necesario/Cartas/${carta}.jpg`;//Se le asigna la imagen
        divCartas[turno].append(imagenCarta); 
    }

    //Funcion que me determina quien gana 
    const determinarGanador = (puntosComputadora,puntosMinimos)=> {
        //Atento funcion de Javascript que me permite enviar este collback(Funcion que se envia como argumento) despues de un determindado tiemp
        //En este caso 50 milsesimas de segundo
        setTimeout(() => {
            if(puntosComputadora === puntosMinimos){
                alert('NADIE GANA :(');
            }else if (puntosMinimos > 21) {
                alert('COMPUTADORA GANA');
            }else if (puntosComputadora > 21) {
                alert('JUGADOR GANA');
            } else {
                alert('COMPUTADORA GANA');
            }        
        }, 50);//Modificar tiempo a su gusto
    }

    //Turno de la computadora 
    const turnoComputadora = (puntosMinimos)=>{
        let puntosComputadora = 0;

        do {
            const carta = tomarCarta();
            puntosComputadora = acumularPuntos(carta,puntosJugadores.length-1);
            asignarImagenCarta(carta,puntosJugadores.length-1);
        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos<=21));//tiene que ser menor a los puntos del jugador Y (&&) puntos debe ser menor o igual a 21  

        determinarGanador(puntosComputadora,puntosMinimos);
    }

    //Eventos

    //Evento de pedir
    btnpedir.addEventListener('click', () => {

        const carta = tomarCarta();
        const puntosJugador = acumularPuntos(carta,0);
        asignarImagenCarta(carta,0);
        
        if(puntosJugador > 21){
            btnpedir.disabled = true;//bloque el boton pedir
            btndetener.disabled = true;//bloque el boton detener
            turnoComputadora(puntosJugador);//Funcion para que juege la computadora 
        }else if(puntosJugador === 21){
            btnpedir.disabled = true;//bloque el boton pedir
            btndetener.disabled = true;//bloque el boton detener
            turnoComputadora(puntosJugador);//Funcion para que juege la computadora 
        }
        
    })

    //Evento de detener
    btndetener.addEventListener('click', ()=> {
        btnpedir.disabled = true;//bloque el boton pedir
        btndetener.disabled = true;//bloque el boton detener
        turnoComputadora (puntosJugadores[0]);//Funcion para que juege la computadora 
    })

    //Evento nuevo juego 
    btnuevo.addEventListener('click', ()=>{
        console.clear
        crearJuego();
    })

    //Retorno de la funcion
    return {
        nuevoJuego : crearJuego
    };
})();






