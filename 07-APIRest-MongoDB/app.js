const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/demo',  {useUnifiedTopology: true, useNewUrlParser: true})
    .then(()=> console.log("conectado a MongoDB"))
    .catch(err => console.log("no se pudo conectar con MongoDB..."))

const app = express();

const port = process.env.PORT || 3000;
app.listen(3000, ()=>{
    console.log("Api RestFul. Ejecutandose...");
});