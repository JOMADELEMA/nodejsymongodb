const express = require('express');
const ruta = express.Router();
const Joi = require("@hapi/joi"); //se utiliza para hacer validaciones

const usuarios = [
    { id: 1, nombre: "Jorge" },
    { id: 2, nombre: "Mario" },
    { id: 3, nombre: "Ana" },
  ];

ruta.get("/", (req, res) => {
    res.send(usuarios);
  });
  
ruta.get("/:year/:mes", (req, res) => {
    res.send(req.params);
  });
  
ruta.get("/:id", (req, res) => {
    let usuario = existeUsuario(req.params.id);
  
    if (!usuario) {
      res.status(404);
      res.send("El usuario no fue encontrado");
    } else {
      res.send("El usuario es: " + usuario.nombre);
    }
  });
  
  /* para solicitudes tipo query Genero=M
ruta.get("//:year/:mes",(req, res)=>{
      res.send(req.query);
  });*/
  
ruta.post("/", (req, res) => {
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
  
ruta.put("/:id", (req, res) => {
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
  
ruta.delete("/:id", (req, res)=>{
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

  module.exports = ruta;
  