const serie = require('./serie');


let argv = process.argv;
let valor = argv[2].split("=")[1];

let cantidad = valor;
console.log(valor);

serie.crearSerie(cantidad)
    .then(mensaje => console.log (mensaje))
    .catch(mensaje => console.log(mensaje));


    //para enviar parametros desde terminal "node app.js --variable=valor"
