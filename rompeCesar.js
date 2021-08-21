/* FUNCIONES DEL PROGRAMA*/


var mostFrecuent = [" ",
    "e","a","o","s",
    "r","n","i","d",
    "l","c","t","u",
    "m","p","b","g",
    "v","y","q","h",
    "f","z","j","ñ",
    "x","w","k"] //array ordenado de las letras mas frecuentes

var letrasElegidas = []
const originMF = mostFrecuent 
var frecuentesTXT = [] //obtiene las letras mas frecuetnes del texto codificado original
var intentos = 0
//funciones para el primer intento
//esta función obtiene la frecuencia de aparicion en el texto codificado original
function getFrecuencias(textoCodificado){
    var setWord = new Set(); //set que almacena los caracteres que aparecen
    var ocurrences = []; //set que almacena las ocurrencias de cada palabra
    var frecuencias = []
    let i = 0
    for (letra of textoCodificado){
        setWord.add(letra) //si ya existe en el set no se agrega
    }
    for (element of setWord){
        ocurrences.push((textoCodificado.match(new RegExp(element, "g")) || []).length);
        // busca las coincidencias de cada letra en el texto
    }
    for (element of setWord){
        frecuencias.push({letra:element,frecuencia:ocurrences[i++]})
        //fusiona el set y el array para obtener un array nuevo que tiene el caracter y la frecuencia de apraciión del mismo
    }

    frecuencias.sort(function (a, b) {
        if (a.frecuencia > b.frecuencia) {
          return -1;
        }
        if (a.frecuencia < b.frecuencia) {
          return 1;
        }
        return 0;
      });//ordena las frecuencias de mayor a menor
    console.log(frecuencias)
    return frecuencias
}

/*funcion usada solo en la primera vuelta para remplazar las letras mas frecuentes
en el texto codificado original con las mas frecuentes en el lenguaje*/
function remplaza(textoCodificado){
    frecuentesTXT = getFrecuencias(textoCodificado) 
    let i = 0
    while ( i < mostFrecuent.length && i < frecuentesTXT.length){
        textoCodificado = textoCodificado.replaceAll(frecuentesTXT[i].letra,mostFrecuent[i])
        i++
    }
    return textoCodificado;
}

//funciones para los siguientes intentos
function ajustaArray(array){ //empieza a variar la posicion del array para ajustar los remplazos
    var temp
    var controlador = intentos
    if((intentos%2)==0){ //si es par mueve desde el indice 1
        let i = 1
        while(i<array.length && i+1 < array.length){
            if (controlador%2 == 0){
                temp = array[i]
                array[i] = array[i+2]
                array[i+2] = temp
                i ++
                controlador ++
            }
            else{
                temp = array[i]
                array[i] = array[i+2]
                array[i+2] = temp
                i += 3
            }
        }
    }else{//si es impar mueve desde el indice 0
        let i = 0
        while(i<array.length && i+1 < array.length){
            temp = array[i]
            array[i] = array[i+1]
            array[i+1] = temp
            i += 2
        }
    }
    intentos++
    console.log("array alterado")
    return array
}

//compara con el array original de las mas frecuentes en el lenguaje con el de las elegidas para sacar un array nuevo de mas frecuentes que no incluya las letras correctas
function limpiaMostFrecuents(){
    var array = []
    for (elemento of mostFrecuent){
        if (!letrasElegidas.includes(elemento)){
            array.push(elemento)
        }
    }
    console.log("frecuencias alfabeto")
    console.log(array)
    array = ajustaArray(array)
    console.log(array)
    mostFrecuent = array
    return array
}

function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}

function limpiaFrecuencias(textoSemiDecodificado){
    var array = []
    var ocurrences = []
    var words = new Set()
    var i = 0
    for(letra of textoSemiDecodificado){
        if (!letrasElegidas.includes(letra)){
            words.add(letra)
        }
    }
    for(elemento of words){
        ocurrences.push((textoSemiDecodificado.match(new RegExp(element, "g")) || []).length);
    }
    for (element of words){
        array.push({letra:element,frecuencia:ocurrences[i++]})
        //fusiona el set y el array para obtener un array nuevo que tiene el caracter y la frecuencia de apraciión del mismo
    }
    array.sort(function (a, b) {
        if (a.frecuencia > b.frecuencia) {
          return -1;
        }
        if (a.frecuencia < b.frecuencia) {
          return 1;
        }
        return 0;
      });//ordena las frecuencias de mayor a menor
    console.log("mosFrecuentes")
    console.log(array)
    return array

 }

function reRemplaza (textoSemiDecodificado){
    const newfrecuentesTXT = limpiaFrecuencias(textoSemiDecodificado)
    const newFrecuent = limpiaMostFrecuents()
    var cambios = []
    let i = 0
    while ( i < newFrecuent.length && i < newfrecuentesTXT.length){
        cambios.push({original:newfrecuentesTXT[i].letra,nueva:newFrecuent[i]})
        i++
    }
    console.log(cambios)
    i = 0
    for (i=0;i<textoSemiDecodificado.length;i++){
        idx = findWithAttr(cambios,"original",textoSemiDecodificado[i])
        if(idx >= 0){ //o sea que la letra del texto esta en los cambios por hacer
            textoSemiDecodificado = setCharAt(textoSemiDecodificado,i,cambios[idx].nueva) 
        }
    }
    console.log(textoSemiDecodificado)
    return textoSemiDecodificado;
}

/* funciones para interactuar con html */

//obtiene los datos del texto codificado original y hace el primer intento con todas las posibilidades
function decodifica(){
    intentos = 1
    const textoCodificado = document.getElementById("InputTextoCodificado").value;
    const resultado = remplaza(textoCodificado)
    OutputResultado.value = resultado
}
//obtiene el resultado anterior y lo cambia segun los nuevos parametros
function reDecodifica(){
    const textoSemiDecodificado = document.getElementById("OutputResultado").value;
    const resultado = reRemplaza(textoSemiDecodificado)
    //OutputResultado.value = resultado
}

//obtiene las letras presionadas para conservar 
function getLetras(letra){
    let index
    if ((index = letrasElegidas.indexOf(letra))<0){ //i.e no contiene la letra
        letrasElegidas.push(letra) //lo mete al array
    }
    else{
        letrasElegidas.splice(index,1) // si existe lo saca del array
    }
    OutputToChange.value = letrasElegidas //pone el contenido del array en el cuadro
}

/*
un cuento es una narracion breve creada por uno o varios autores puede ser basada ya sea en hechos reales como ficticios cuya trama es protagonizada por un grupo reducido de personajes y con un argumento relativamente sencillo el cuento es compartido tanto por via oral como escrita aunque en un principio lo mas comun era por tradicion oral ademas puede dar cuenta de hechos reales o fantasticos pero siempre partiendo de la base de ser un acto de ficcion o mezcla de ficcion con hechos reales y personajes reales suele contener varios personajes que participan en una sola accion central y hay quienes opinan que un final impactante es requisito indispensable de este genero su objetivo es despertar una reaccion emocional impactante en el lector aunque puede ser escrito en verso total o parcialmente de forma general se da en prosa se realiza mediante la intervencion de un narrador y con preponderancia de la narracion sobre el monologo el dialogo o la descripcion el cuento dice julio cortazar como en el boxeo gana por knock out mientras que la novela gana por puntos el cuento recrea situaciones la novela recrea mundos y personajes su psicologia y sus caracteresbasicamente un cuento se caracteriza por su corta extension pues debe ser mas corto que una novela y ademas suele tener una estructura cerrada donde desarrolla una historia y solamente podra reconocerse un climax en la novela y aun en lo que se llama novela corta la trama desarrolla conflictos secundarios lo que generalmente no acontece con el cuento ya que este sobre todo debe ser conciso los limites entre un cuento y una novela corta son un tanto difusos una novela corta es una narracion en prosa de menor extension que una novela y menor desarrollo de los personajes y la trama aunque sin la economia de recursos narrativos propia del cuento
*/