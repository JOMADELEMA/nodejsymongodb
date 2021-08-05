//serie fibonacci
//1 1 2 3 5 8 13 21 34 55 89 ...

const fs = require('fs');

let fibo1 = 1;
let fibo2 = 1;
let serie = '';

serie += fibo1 +"\t";

for(let i=2; i<=7; i++){
    serie += fibo2 + "\t";
    fibo2 = fibo1 + fibo2;
    fibo1 = fibo2 - fibo1;
};

//instalar nodemon con: npm install -g nodemon

//a continuación se generará código para guardar el resultado en un archivo
fs.writeFile('fibonacci.txt', serie, (err)=>{
    if (err) throw err;
    console.log('Archivo creado con exito!');
});