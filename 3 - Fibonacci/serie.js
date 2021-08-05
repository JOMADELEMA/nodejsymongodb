//serie fibonacci
//1 1 2 3 5 8 13 21 34 55 89 ...

const fs = require('fs');

let crearSerie = (cantidad) => {

    return new Promise((resolve, reject)=> {
        let fibo1 = 1;
        let fibo2 = 1;
        let serie = '';
        
        serie += fibo1 +"\t";
        
        for(let i=2; i<=cantidad; i++){
            serie += fibo2 + "\t";
            fibo2 = fibo1 + fibo2;
            fibo1 = fibo2 - fibo1;
        };
        
        //instalar nodemon con: npm install -g nodemon
        
        //a continuación se generará código para guardar el resultado en un archivo
        fs.writeFile('fibonacci.txt', serie, (err)=>{
            if (err)
                reject("Error al crear el archivo");
            else 
                resolve("Archivo creado con exito!");
        });  
    });
};

module.exports = {
    crearSerie
};