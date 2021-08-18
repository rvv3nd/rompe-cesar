const mostFrecuent = [" ",
    "e","a","o","l",
    "s","n","d","r",
    "u","i","t","c",
    "p","m","y","q",
    "b","h","g","f",
]
//array de letras con frecuencia relativa mayor a 4

function getFrecuencias(textoCodificado){
    var setWord = new Set(); //set que almacena los caracteres qeu aparecen
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

    return frecuencias
}


function remplaza(textoCodificado){
    frecuencias = getFrecuencias(textoCodificado)
    var newString = ""
    let i = 0

    while ( i < mostFrecuent.length && i < frecuencias.length){
        textoCodificado = textoCodificado.replaceAll(frecuencias[i].letra,mostFrecuent[i])
        i++
    }
    alert(textoCodificado)

    console.groupEnd()
}


