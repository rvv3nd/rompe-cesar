const mostFrecuent = [" ",
    "e","a","o","s",
    "r","n","i","d",
    "l","c","t","u",
    "m","p","b","g",
    "v","y","q","h",
    "f","z","j","ñ",
    "x","w","k"]

var letrasACambiar = []

//array de letras con frecuencia relativa mayor a 4

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

//funcion usada solo en la primera vuelta
function remplaza(textoCodificado){
    frecuencias = getFrecuencias(textoCodificado)
    let i = 0
    while ( i < mostFrecuent.length && i < frecuencias.length){
        textoCodificado = textoCodificado.replaceAll(frecuencias[i].letra,mostFrecuent[i])
        i++
    }
    return textoCodificado;
}

//funcion usada para los siguientes intentos
function remplazaAgain(textoCodificado){
    const toUse = getMostFrecuentFromNotKepped();  
    var resultado
    let i = 0
    while ( i < toUse.length && i < frecuencias.length){
        textoCodificado = textoCodificado.replaceAll(frecuencias[i].letra,toUse[i])
        i++
    }
    return 
}

function getMostFrecuentFromNotKepped(){
    const setFrecuentes = new Set(mostFrecuent);
    const setElegidas = new Set(letrasACambiar);
    const setToUse = setFrecuentes.difference(setElegidas);
    var arrayOrdenado = []
    for(element of mostFrecuent){
        if(setToUse.has(element)){
            arrayOrdenado.push(element)
        }
    }
    return arrayOrdenado
}

//obtiene los datos del html y hace el primer intento con todas las posibilidades
function getTextFromHTML(){
    const textoCodificado = document.getElementById("InputTextoCodificado").value;
    const resultado = remplaza(textoCodificado)
    OutputResultado.value = resultado
}

//obtiene los datos para seguir intentando decodificar

function getTextAgain(){
    const textoCodificado = document.getElementById("OutputResultado").value;
    const resultado = remplazaAgain(textoCodificado)
    OutputResultado.value = resultado
}

function getLetras(letra){
    let index
    if ((index = letrasACambiar.indexOf(letra))<0){ //i.e no contiene la letra
        letrasACambiar.push(letra)
    }
    else{
        letrasACambiar.splice(index,1) // si existe lo saca del array
    }
    OutputToChange.value = letrasACambiar
}

/*
un cuento es una narracion breve creada por uno o varios autores puede ser basada ya sea en hechos reales como ficticios cuya trama es protagonizada por un grupo reducido de personajes y con un argumento relativamente sencillo el cuento es compartido tanto por via oral como escrita aunque en un principio lo mas comun era por tradicion oral ademas puede dar cuenta de hechos reales o fantasticos pero siempre partiendo de la base de ser un acto de ficcion o mezcla de ficcion con hechos reales y personajes reales suele contener varios personajes que participan en una sola accion central y hay quienes opinan que un final impactante es requisito indispensable de este genero su objetivo es despertar una reaccion emocional impactante en el lector aunque puede ser escrito en verso total o parcialmente de forma general se da en prosa se realiza mediante la intervencion de un narrador y con preponderancia de la narracion sobre el monologo el dialogo o la descripcion el cuento dice julio cortazar como en el boxeo gana por knock out mientras que la novela gana por puntos el cuento recrea situaciones la novela recrea mundos y personajes su psicologia y sus caracteresbasicamente un cuento se caracteriza por su corta extension pues debe ser mas corto que una novela y ademas suele tener una estructura cerrada donde desarrolla una historia y solamente podra reconocerse un climax en la novela y aun en lo que se llama novela corta la trama desarrolla conflictos secundarios lo que generalmente no acontece con el cuento ya que este sobre todo debe ser conciso los limites entre un cuento y una novela corta son un tanto difusos una novela corta es una narracion en prosa de menor extension que una novela y menor desarrollo de los personajes y la trama aunque sin la economia de recursos narrativos propia del cuento
*/