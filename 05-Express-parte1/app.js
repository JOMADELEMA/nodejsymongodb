const debug = require('debug')('app:inicio');
//const dbDebug = require('debug')('app:database');
require('dotenv').config();

const express = require("express");
const config = require("config");
const app = express();

//const logger = require("./logger");
const morgan = require("morgan");

const usuarios = require("./routes/usuarios");


//se importa una funcion json
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use("/api/usuarios", usuarios);

let port = process.env.PORT || 3000;

//configuración de entornos
console.log('Aplicación: ' + config.get('nombre'));
console.log('BD Server: ' + config.get('configDB.host'));

//uso de middleware de terceros - Morgan
if(app.get('env') === 'development'){
  app.use(morgan('tiny'));
  //console.log("Morgan habilitado");
  debug("Morgan está habilitado.");
}

debug("Conectando con la base de datos...");
//console.log(process.env);


//app.use(logger);

// app.use(function(req, res, next){
//   console.log("Autenticando");
//   next();
// });



app.get("/", (req, res) => {
  res.send("Hola mundo desde Express");
});


app.listen(port, () => {
  console.log("escuchando en el puerto " + port + " ...");
});

/*req y res*/
//buscar en documentacion de express

//app.get//petición
//app.post(); //envio de datos
//app.put(); //actualización
//app.delete(); //eliminacion

//variables de entorno
/*
variable global que se pueda utilizar en la aplicación

usar variable de entorno para el puerto en caso el puerto necesite ser cambiado

*/

/*PARAMETROS DE LAS RUTAS
los parametros ayudan para hacer operaciones y obtener datos de ese parametro

req.params.id 

para mostrar todos los parametros
req.params

si son varios es /:param1/:param2 ....
*/

/*manejo de solicitudes HTTP GET



*/


/*EJEMPLO DE FUNCIONES MIDDLEWARE

app.use(functtion(req, res, next){
  console.log("logging....");
  next();
})

app.use(function(req, res, next){
  console.log("Autenticando....");
  next();
})

.
.
.


usualmente se utilizan en otro archivo.

*/


//EXPRESS URLENCODED
/*
permite trabajar query strings



*/