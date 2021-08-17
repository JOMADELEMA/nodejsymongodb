const usuarios = require("./routes/usuarios");
const cursos = require("./routes/cursos");
const auth = require("./routes/auth");
const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
require('dotenv').config();


mongoose.connect(process.env.HOST,  {useUnifiedTopology: true, useNewUrlParser: true})
    .then(()=> console.log("conectado a MongoDB"))
    .catch(err => console.log("no se pudo conectar con MongoDB..."))

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/usuarios', usuarios)
app.use('/api/cursos', cursos);
app.use('/api/auth', auth);

// console.log(process.env.NODE_ENV);
// console.log(process.env.PORT);
// console.log(process.env.SEED);
// console.log(process.env.expiration);

const port = process.env.PORT || 3000;
app.listen(3000, ()=>{
    console.log("Api RestFul. Ejecutandose...");
});


///para crear indices en mongodb
//en shell
/*
db.usuarios.createIndex({"email":1});

db //selecciona la base de datos actual
usuarios //la colección a crear indice
createIndex (ps crea el indice duhh!)
parametros email es el que se creara como indice y el :1 que será en orden ascendente
-1 es descendente
*/