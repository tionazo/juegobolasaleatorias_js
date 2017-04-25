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
var arrayBolas = new Array();

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

    return Math.floor(Math.random() * (anchotablero-64)) + parseInt(0);
}

//función que nos devuelve un aleatorio dentro del tablero conociendo el alto
function posicionAleatoriaY() {

    return Math.floor(Math.random() * (altotablero-64)) + parseInt(0);
}

//funcion que crea las bolas
function crearBolas() {
    var tamano = tamañoAleatorio();
    var posicionx = posicionAleatoriaX(); 
    var posiciony = posicionAleatoriaY();
    var miBola = document.createElement("div");
    miBola.setAttribute("class","bola");
    
    // establecemos la dirección de la bola en el momento de su creación
    direccion = Math.floor(Math.random()*8+0);
    miBola.className += " " + direccion;
    
    // le damos un id a cada bola
    miBola.setAttribute("id", idBola++);
    
    miBola.addEventListener("click",eliminarBola,false); //addEventListener genera un this al objeto del escuchador

    miBola.style.width = tamano + "px";
    miBola.style.height = tamano + "px";
    
    miBola.style.marginLeft = posicionx + "px";
    miBola.style.marginTop = posiciony + "px";
    
    miBola.style.backgroundColor = colorAleatorio();

    tablero.appendChild(miBola);
    
    arrayBolas.push(miBola);
    
    pelotasCreadas++;
    contarPelotasCreadas();
}

//función que nos permite cambiar el tamaño del tablero
function cambiarTamanoTablero() {
    anchotablero = parseInt(document.getElementById("ancho").value);
    altotablero = parseInt(document.getElementById("alto").value);
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
    puntos += 61 - parseInt(this.offsetWidth);
    tablero.removeChild(this);
    pelotasEliminadas++;
    contarPelotasEliminadas();
}

//funcion que elimina las bolas que se pierden
function perderBola( bola ) {
    

    puntos -= Math.floor((61 - parseInt(bola.offsetWidth)) / 4);
    
    var i = arrayBolas.indexOf(bola);
    if( arrayBolas[i] != -1)
        arrayBolas.splice(i, 1);
    
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
        
        var wtablero = tablero.clientWidth;

        if( xMiBola + wMiBola > wtablero ) {
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

        var htablero = tablero.clientHeight;
        
        if( yMiBola + hMiBola > htablero ) {
            //console.log("Saliendo");
            var padre = miBola.parentNode;
            padre.removeChild(miBola);
            pelotasPerdidas++;
            contarPelotasPerdidas();
        }
}


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


function destruyeTodasBolas_orig() {
    paraCreacion();
    var todasBolas = document.getElementsByClassName("bola");
    console.log(todasBolas.length);
    for (var i = 0; i < todasBolas.length; i++) {
        var miBola = todasBolas[i];
        //var tablero = document.getElementById("tablero");
        tablero.removeChild(miBola);
        pelotasPerdidas++;
    }
    contarPelotasPerdidas();

    //arrancaCreacion();
}
    
function destruyeTodasBolas() {
    paraCreacion();
    
    console.log(arrayBolas.length);
    for (var i = 0; i < arrayBolas.length; i++) {
        var miBola = arrayBolas[i];
        //var tablero = document.getElementById("tablero");
        tablero.removeChild(miBola);
        pelotasPerdidas++;
    }
    arrayBolas.splice(0,arrayBolas.length);
    contarPelotasPerdidas();

    arrancaCreacion();
}
    
    
    
function paraMovimiento() {
    clearInterval(intervalMovimientoAleatorio);
    console.log(intervalMovimientoAleatorio);
    document.getElementById("paraMovimiento").disabled = true;
    document.getElementById("arrancaMovimiento").disabled = false;
}

function arrancaMovimiento() {
    intervalMovimientoAleatorio = setInterval(movimentoAleatorio, MILISEGUNDOS);
    console.log(intervalMovimientoAleatorio);
    document.getElementById("arrancaMovimiento").disabled = true;
    document.getElementById("paraMovimiento").disabled = false
}

function paraCreacion() {
    clearInterval(intervalCrearBolas);
    console.log(intervalCrearBolas);
    document.getElementById("paraCreacion").disabled = true;
    document.getElementById("arrancaCreacion").disabled = false; 
}

function arrancaCreacion() {
    intervalCrearBolas = setInterval(crearBolas,MILISEGUNDOS*10);
    console.log(intervalCrearBolas);
    document.getElementById("arrancaCreacion").disabled = true
    document.getElementById("paraCreacion").disabled = false;

}

   
//Cargamos las funciones el iniciar la web
window.onload = function () {
    valores();
    crearBolas();
    
    arrancaCreacion();
    arrancaMovimiento();
    
}
