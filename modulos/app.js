
//variable para cargar los metodos de datos.js, mejor cargarlo sobre una constante
const datos = require('./datos');

//ya se puede hacer llamada al metodo exportado por datos.js
datos.log("Hola Mundo");

console.log("-------------")

console.log(module);
/*console.log(global.test);

//mala practica usar variables globales
console.log(module);*/

//muestra el nombre del archivo ejecutado desde la raiz
console.log(__filename);

//muestra la ruta del archivo ejecutado desde la raiz
console.log(__dirname);


console.log("-------------")

//
const path = require('path');

//el método parse retorna como objeto 
const objPath = path.parse(__filename);
console.log(objPath);

//más información de path en la documentación oficial de node
console.log(objPath.name);

console.log("-------------")


//modulo OS
const os = require('os');

var memoriaLibre = os.freemem();
var memoriaTotal = os.totalmem();

console.log("Memoria Libre: " + memoriaLibre);
console.log("Memoria Total: " + memoriaTotal);

console.log("-------------")

//modulo filesystem
const fs = require('fs');

const archivos = fs.readdirSync("./");
console.log(archivos);


fs.readdir('./', function(err, files){
    if(err){
        console.log("Error", err);
    }
    else console.log('resultado', files);
});