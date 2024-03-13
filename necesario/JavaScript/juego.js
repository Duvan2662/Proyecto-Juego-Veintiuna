/* 
* 2C = DOS DE CORAZONES
* 2D = DOS DE DIAMANTES 
* 2T = DOS DE TREBOL 
* 2P = DOS DE PICAS 
*/


( ()=>{
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
          barajaJugador     = document.querySelector('#jugador-cartas'),
          barajaComputadora = document.querySelector('#computadora-cartas');




    const crearJuego = (numeroJugadores = 2) => {
        baraja = crearBaraja();
        for (let i = 0; i < numeroJugadores; i++) {
            puntosJugadores.push(0); 
        }
        console.log({puntosJugadores});
    }      
    //Crear baraja de cartas
    const crearBaraja = () =>{
        baraja = [];
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



    //Turno de la computadora 
    const turnoComputadora = (puntosMinimos)=>{
        do {
            const carta = tomarCarta();
            puntosComputadora = puntosComputadora + valorCarta(carta);
            actualizarPuntos[1].innerText = puntosComputadora;//Se toma el small en su posicion 1 que es el small de la computadora  y se coloca el puntaje de la computadora 
            
            
            //Logica para la creacion de la imagen en el HTML 
            const imagenCarta = document.createElement('img');//Crea un elemento img de HTML
            imagenCarta.classList.add('carta');//Se le asgina la clase de las cartas
            imagenCarta.src = `necesario/Cartas/${carta}.jpg`;//Se le asigna la imagen 
            barajaComputadora.append(imagenCarta);//Se coloca al final del elemento

            if(puntosMinimos > 21){//Si lo puntos del jugador son mayor a 21 entonces la computadora gana con cualquier carta 
                break; //Se sale del ciclo 
            }

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos<=21));//tiene que ser menor a los puntos del jugador Y (&&) puntos debe ser menor o igual a 21  


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




    //Eventos


    //Evento de pedir
    btnpedir.addEventListener('click', () => {

        const carta = tomarCarta();

        puntosJugador = puntosJugador + valorCarta(carta);
        actualizarPuntos[0].innerText = puntosJugador;//Se toma el small en su posicion 0 que es el small del jugador y se coloca el puntaje del jugador 
        
        
        //Logica para la creacion de la imagen en el HTML 
        const imagenCarta = document.createElement('img');//Crea un elemento img de HTML
        imagenCarta.classList.add('carta');//Se le asgina la clase de las cartas
        imagenCarta.src = `necesario/Cartas/${carta}.jpg`;//Se le asigna la imagen 
        barajaJugador.append(imagenCarta);//Se coloca al final del elemento


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
        turnoComputadora (puntosJugador);//Funcion para que juege la computadora 
    })

    //Evento nuevo juego 
    btnuevo.addEventListener('click', ()=>{
        btnpedir.disabled = false;//Desbloquea el boton pedir
        btndetener.disabled = false;//Desbloquea el boton detener
        actualizarPuntos[0].innerText = 0;//Resetea el valor
        actualizarPuntos[1].innerText = 0;//Resetea el valor
        crearJuego();
        barajaJugador.innerHTML = '';//Quita las cartas del jugador
        barajaComputadora.innerHTML = '';//Quita las cartas de la computadora
    })



})();






