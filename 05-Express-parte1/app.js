const express = require("express");
const app = express();

//se importa una funcion json
app.use(express.json());

const port = process.env.PORT || 3000;

const usuarios = [
  { id: 1, nombre: "Jorge" },
  { id: 2, nombre: "Mario" },
  { id: 3, nombre: "Ana" },
];

app.get("/", (req, res) => {
  res.send("Hola mundo desde Express");
});

app.get("/api/usuarios", (req, res) => {
  res.send(["grover", "luis", "ana"]);
});

app.get("/api/usuarios/:year/:mes", (req, res) => {
  res.send(req.params);
});

app.get("/api/usuarios/:id", (req, res)=>{
    let usuario = usuarios.find(u => u.id === parseInt(req.params.id));

    if (!usuario){
        res.status(404);
        res.send("El usuario no fue encontrado");
    }
    else {
        res.send("El usuario es: "+ usuario.nombre);
    }
});

/* para solicitudes tipo query Genero=M
app.get("/api/usuarios/:year/:mes",(req, res)=>{
    res.send(req.query);
});*/

app.post('/api/usuarios', (req, res)=>{
  if (!req.body.nombre  || req.body.nombre.length <= 2){
    //bad request
    res.status(400).send("debe ingresar un nombre");
    return;
  }
  const usuario = {
    id: usuarios.length + 1,
    nombre: req.body.nombre
  };
  usuarios.push(usuario);
  res.send(usuario);
});

app.listen(3000, () => {
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
