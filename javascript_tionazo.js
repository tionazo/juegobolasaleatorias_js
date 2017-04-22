//Creamos constantes para el tiempo que tardan en aparecer las bolas y el tamaño minimo y máximo de estas así como
//el número de pelotas creadas y el número de pelotas eliminadas.
const MILISEGUNDOS = 50;
const TAM_MIN_BOLA = 20;
const TAM_MAX_BOLA = 60;
var pelotasCreadas = 0;
var pelotasEliminadas = 0;
var pelotasPerdidas = 0;
var puntos = 0;
var idBola = 0;
var tablero;
var anchotablero;
var altotablero;

//Creamos una funcion que nos indica el tamaño por defecto del tablero para poder cambiar sus valores
function valores() {
    tablero = document.getElementById("tablero");
    anchotablero = tablero.offsetWidth;
    altotablero = tablero.offsetHeight;
    var valor_alto = document.getElementById("alto").value = altotablero;
    var valor_ancho = document.getElementById("ancho").value = anchotablero;
}

//Funcion que nos devuleve un numero aleatorio entre el mínimo y el máximo para el tamaño de cada bola
function tamañoAleatorio() {
    return Math.floor(Math.random() * (TAM_MAX_BOLA - TAM_MIN_BOLA + 1)) + parseInt(20)
}

//función que nos devuelve un aleatorio dentro del tablero conociendo el ancho
function posicionAleatoriaX() {
    //var tablero = document.getElementById("tablero");
    //var anchotablero = tablero.offsetWidth-64;
    return Math.floor(Math.random() * (anchotablero+1)) + parseInt(0);
}

//función que nos devuelve un aleatorio dentro del tablero conociendo el alto
function posicionAleatoriaY() {
    //var tablero = document.getElementById("tablero");
    //var altotablero = tablero.offsetHeight-64;
    return Math.floor(Math.random() * (altotablero+1)) + parseInt(0);
}

//funcion que crea las bolas
function crearBolas() {
    //var tablero = document.getElementById("tablero"); 
    var posicionx = posicionAleatoriaX(); 
    var posiciony = posicionAleatoriaY();
    var capa = document.createElement("div");
    var tamano = tamañoAleatorio();
    capa.setAttribute("class","bola");
    
    // establecemos la dirección de la bola en el momento de su creación
    direccion = Math.floor(Math.random()*8+0);
    capa.className += " " + direccion;
    
    // le damos un id a cada bola
    capa.setAttribute("id", idBola++);
    
    capa.addEventListener("click",eliminarBola,false); //addEventListener genera un this al objeto del escuchador

    capa.style.width = tamano + "px";
    capa.style.height = tamano + "px";
    
    capa.style.marginLeft = posicionx + "px";
    capa.style.marginTop = posiciony + "px";
    
    capa.style.backgroundColor = colorAleatorio();

    tablero.appendChild(capa);
    
    pelotasCreadas++;
    contarPelotasCreadas();
}

//función que nos permite cambiar el tamaño del tablero
function cambiarTamanoTablero() {
    anchotablero = parseInt(document.getElementById("ancho").value);
    altotablero = parseInt(document.getElementById("alto").value);
    //var tablero = document.getElementById("tablero");
    tablero.style.width = anchotablero + "px";
    tablero.style.height = altotablero + "px";    
}

//funcion que nos devuelve un color aleatorio con el codigo rgb
function colorAleatorio() {
    var r = Math.floor(Math.random()*256);          
    var g = Math.floor(Math.random()*256);          
    var b = Math.floor(Math.random()*256);          
    var rgb = 'rgb(' + r + ',' + g + ',' + b + ')';
    return rgb;
}

//funcion que elimina las bolas al pinchar sobre ellas
function eliminarBola() {
    //var tablero = document.getElementById("tablero");
    //var bola = document.getElementsByClassName("bola");

    puntos += 61 - parseInt(this.offsetWidth);
    
    //console.log(this.offsetWidth + " : " + puntos );
    tablero.removeChild(this);
    pelotasEliminadas++;
    contarPelotasEliminadas();
}

//funcion que elimina las bolas que se pierden
function perderBola( bola ) {
    //var tablero = document.getElementById("tablero");
    //var bola = document.getElementsByClassName("bola");

    puntos -= Math.floor((61 - parseInt(bola.offsetWidth)) / 4);
    
    //console.log(bola.offsetWidth + " : " + puntos );
    tablero.removeChild(bola);
    pelotasPerdidas++;
    contarPelotasPerdidas();
}


//funcion que va mostrando las pelotas creadas
function contarPelotasCreadas() {
    document.getElementById("numCreadas").innerHTML = pelotasCreadas;
}

//funcion que va contando las pelotas que se van eliminando
function contarPelotasEliminadas() {
    document.getElementById("numEliminadas").innerHTML = pelotasEliminadas;
    document.getElementById("numPuntos").innerHTML = puntos;
}

//funcion que va contando las pelotas que se van eliminando
function contarPelotasPerdidas() {
    document.getElementById("numPerdidas").innerHTML = pelotasPerdidas;
    document.getElementById("numPuntos").innerHTML = puntos;
}

//funcion que mueve una bola a la derecha
function moverDerecha(miBola) {
        var wMiBola = parseInt(miBola.style.width.substring(0, miBola.style.width.length - 2));
        var xMiBola = parseInt(miBola.style.marginLeft.substring(0, miBola.style.marginLeft.length - 2));
        miBola.style.marginLeft = xMiBola + 5 + 'px';
        
        //var tablero = document.getElementById("tablero");
        var wtablero = tablero.clientWidth;

        if( xMiBola + wMiBola > wtablero ) {
            /*
            tablero.removeChild(miBola);
            pelotasPerdidas++;
            contarPelotasEliminadas();
            */
            perderBola(miBola);
        }
}

//funcion que mueve una bola a la izquierda
function moverIzquierda(miBola) {
        var xMiBola = parseInt(miBola.style.marginLeft.substring(0, miBola.style.marginLeft.length - 2));
        miBola.style.marginLeft = xMiBola - 5 + 'px';

        if( xMiBola < 0 ) {
            var padre = miBola.parentNode;
            padre.removeChild(miBola);
            pelotasPerdidas++;
            contarPelotasPerdidas();
        }
}

//funcion que mueve una bola arriba
function moverArriba(miBola) {
        var yMiBola = parseInt(miBola.style.marginTop.substring(0, miBola.style.marginTop.length - 2));
        miBola.style.marginTop = yMiBola - 5 + 'px';
        
        if( yMiBola < 0 ) {
            //console.log("Saliendo");
            var padre = miBola.parentNode;
            padre.removeChild(miBola);
            pelotasPerdidas++;
            contarPelotasPerdidas();
        }
}

//funcion que mueve una bola abajo
function moverAbajo(miBola) {
    
        var hMiBola = parseInt(miBola.style.height.substring(0, miBola.style.height.length - 2));
        var yMiBola = parseInt(miBola.style.marginTop.substring(0, miBola.style.marginTop.length - 2));
        miBola.style.marginTop = yMiBola + 5 + 'px';

        //var tablero = document.getElementById("tablero");
        var htablero = tablero.clientHeight;
        
        if( yMiBola + hMiBola > htablero ) {
            //console.log("Saliendo");
            var padre = miBola.parentNode;
            padre.removeChild(miBola);
            pelotasPerdidas++;
            contarPelotasPerdidas();
        }
}

/*

//funcion que decide el siguiente movimento de forma aleatoria
function movimentoAleatorio_old() {

    var todasBolas = document.getElementsByClassName("bola");
    var miBola = todasBolas[Math.floor(Math.random() * todasBolas.length)];
    
    for (var i = 0; i < todasBolas.length; i++) 
    {
        var proximoMovimiento = Math.floor(Math.random() * 4);
        //console.log(proximoMovimiento);
        direccion = todasBolas[i].classList[1];
        switch (direccion) {
            case 0: 
                // arriba
                // ejecuta varias veces el mismo movimiento para que parezca que se está moviendo un rato en la misma dirección
                moverArriba(miBola);
                moverArriba(miBola);
                moverArriba(miBola);
                moverArriba(miBola);
                break;
            case 1: 
                // derecha
                moverDerecha(miBola);
                moverDerecha(miBola);
                moverDerecha(miBola);
                moverDerecha(miBola);
                break;
            case 2: 
                // abajo
                moverAbajo(miBola);
                moverAbajo(miBola);
                moverAbajo(miBola);
                moverAbajo(miBola);
                break;
            case 3: 
                // izquierda
                moverIzquierda(miBola);
                moverIzquierda(miBola);
                moverIzquierda(miBola);
                moverIzquierda(miBola);
                break;
        }
    }
}

*/

//funcion que decide el siguiente movimento de forma aleatoria
function movimentoAleatorio() {

    var todasBolas = document.getElementsByClassName("bola");

    for (var i = 0; i < todasBolas.length; i++) 
    {
        miBola = todasBolas[i];

        switch( miBola.classList[1] ) {
            case "0": 
                moverArriba(miBola);
                break;
            case "1": 
                // derecha
                moverDerecha(miBola);
                break;
            case "2": 
                // abajo
                moverAbajo(miBola);
                break;
            case "3": 
                // izquierda
                moverIzquierda(miBola);
                break;
            case "4": 
                // arriba + derecha
                moverArriba(miBola);
                moverDerecha(miBola);
                break;
            case "5": 
                // abajo + derecha
                moverAbajo(miBola);
                moverDerecha(miBola);
                break;
            case "6": 
                // abajo + izquierda
                moverAbajo(miBola);
                moverIzquierda(miBola);
                break;
            case "7": 
                // arriba + izquierda
                moverArriba(miBola);
                moverIzquierda(miBola);
                break;
        }
    }
}


function destruyeTodasBolas() {
    var todasBolas = document.getElementsByClassName("bola");
    for (var i = 0; i < todasBolas.length; i++) {
        var miBola = todasBolas[i];
        //var tablero = document.getElementById("tablero");
        tablero.removeChild(miBola);
        pelotasPerdidas++;
        contarPelotasPerdidas();
    }
}
    
    
    
//Cargamos las funciones el iniciar la web
window.onload = function () {
    valores();
    crearBolas();
    setInterval(crearBolas,MILISEGUNDOS*10);
    setInterval(movimentoAleatorio, MILISEGUNDOS);

    //setInterval(moverIzquierda, MILISEGUNDOS/2);
    //setInterval(moverDerecha, MILISEGUNDOS/2);
    //setInterval(moverAbajo, MILISEGUNDOS);
    //setInterval(moverArriba, MILISEGUNDOS/2);
}

