var url = 'http://jomadelema.com/datos'


function dato(mensaje){
    //envíe HTTP reuqest
    console.log(mensaje);
}

//estos se vuelven publicos, si no está en export, es una función o dato privado. 
module.exports.log = dato;

//module.exports.url = url;



