const debug = require('debug')('app:inicio');
//const dbDebug = require('debug')('app:database');
require('dotenv').config();

const express = require("express");
const config = require("config");
const app = express();
const Joi = require("@hapi/joi");
//const logger = require("./logger");
const morgan = require("morgan");


//se importa una funcion json
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

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

const usuarios = [
  { id: 1, nombre: "Jorge" },
  { id: 2, nombre: "Mario" },
  { id: 3, nombre: "Ana" },
];

app.get("/", (req, res) => {
  res.send("Hola mundo desde Express");
});

app.get("/api/usuarios", (req, res) => {
  res.send(usuarios);
});

app.get("/api/usuarios/:year/:mes", (req, res) => {
  res.send(req.params);
});

app.get("/api/usuarios/:id", (req, res) => {
  let usuario = existeUsuario(req.params.id);

  if (!usuario) {
    res.status(404);
    res.send("El usuario no fue encontrado");
  } else {
    res.send("El usuario es: " + usuario.nombre);
  }
});

/* para solicitudes tipo query Genero=M
app.get("/api/usuarios/:year/:mes",(req, res)=>{
    res.send(req.query);
});*/

app.post("/api/usuarios", (req, res) => {
  // const schema = Joi.object({
  //   nombre: Joi.string().min(3).required(),
  // });

  const { error, value } = validarUsuario(req.body.nombre);

  if (!error) {
    const usuario = {
      id: usuarios.length + 1,
      nombre: value.nombre,
    };
    usuarios.push(usuario);
    res.send(usuario);
  } else {
    const mensaje = error.details[0].message;
    res.status(400).send(mensaje);
  }
});

app.put("/api/usuarios/:id", (req, res) => {
  //encontrar si existe el objeto usuario
  //let usuario = usuarios.find(u => u.id === parseInt(req.params.id));

  let usuario = existeUsuario(req.params.id);
  if (!usuario) {
    res.status(404).send("El usuario no fue encontrado");
    return;
  }

  const { error, value } = validarUsuario(req.body.nombre);

  if (error) {
    const mensaje = error.details[0].message;
    res.status(400).send(mensaje);
    return;
  }
  usuario.nombre = value.nombre;
  res.send(usuario);
});

app.delete("/api/usuarios/:id", (req, res)=>{
  let usuario = existeUsuario(req.params.id);
  if (!usuario) {
    res.status(404).send("El usuario no fue encontrado");
    return;
  };

  const index = usuarios.indexOf(usuario);

  usuarios.splice(index, 1);
  res.send(usuarios);

});

// if (!req.body.nombre  || req.body.nombre.length <= 2){
//   //bad request
//   res.status(400).send("debe ingresar un nombre");
//   return;
// }
// const usuario = {
//   id: usuarios.length + 1,
//   nombre: req.body.nombre
// };
// usuarios.push(usuario);
// res.send(usuario);

function existeUsuario(id) {
  return usuarios.find((u) => u.id === parseInt(id));
}

function validarUsuario(nom) {
  const schema = Joi.object({
    nombre: Joi.string().min(3).required(),
  });

  return schema.validate({ nombre: nom });
}

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