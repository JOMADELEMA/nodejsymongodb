
//variable para cargar los metodos de datos.js, mejor cargarlo sobre una constante
const datos = require('./datos');

//ya se puede hacer llamada al metodo exportado por datos.js
datos.log("Hola Mundo");

console.log(module);
/*console.log(global.test);

//mala practica usar variables globales
console.log(module);*/

//muestra el nombre del archivo ejecutado desde la raiz
console.log(__filename);

//muestra la ruta del archivo ejecutado desde la raiz
console.log(__dirname);