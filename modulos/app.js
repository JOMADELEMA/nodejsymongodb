
//variable para cargar los metodos de datos.js, mejor cargarlo sobre una constante
const datos = require('./datos');

//ya se puede hacer llamada al metodo exportado por datos.js
datos.log("Hola Mundo");

console.log(module);
/*console.log(global.test);

//mala practica usar variables globales
console.log(module);*/