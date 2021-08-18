const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ruta = express.Router();
const Joi = require("joi");
let Usuario = require("../models/usuario_model");
require('dotenv').config();
const verificarToken = require('../middlewares/auth');

const schema = Joi.object({
  nombre: Joi.string().min(3).max(10).required(),

  /*    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
*/
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});



ruta.get("/", verificarToken, (req, res) => {
  let resultado = listarUsuariosActivos();
  resultado
    .then((usuarios) => {
      res.json(usuarios);
    })
    .catch((err) => {
      res.status(400).json({
        error: err,
      });
    });
});

ruta.post("/", (req, res) => {
  let body = req.body;

  Usuario.findOne({email: body.email}, (err, user)=>{
    if(err){
      return res.status(400).json({error: "server Error"});
    }
    if (user){
      return res.status(400).json({
        mensaje: "el usuario ya existe"
      })
    }
  })

  const { error, value } = schema.validate(
    { nombre: body.nombre },
    { email: body.email }
  );
  if (!error) {
    let resultado = crearUsuario(body);

    resultado
      .then((user) => {
        res.json({
          nombre:user.nombre,
          email: user.email
        });
      })
      .catch((err) => {
        res.status(400).json({
          error: err,
        });
      });
  } else {
    res.status(400).json({
      error: error,
    });
  }
});

ruta.put("/:email", verificarToken, (req, res) => {
  let resultado = actualizarUsuario(req.params.email, req.body);
  const { error, value } = schema.validate({ nombre: req.body.nombre });
  if (!error) {
    resultado
      .then((valor) => {
        res.json({
          nombre:valor.nombre,
          email:valor.email
        });
      })
      .catch((err) => {
        res.status(400).json({
          error: err,
        });
      });
  } else {
      res.status(400).json({
          error
      })
  }
});

ruta.delete("/:email",  verificarToken,(req, res) => {
  let resultado = desactivarUsuario(req.params.email);
  resultado
    .then((valor) => {
      res.json({
        nombre:valor.nombre,
        email:valor.email
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: err,
      });
    });
});

async function crearUsuario(body) {
  let usuario = new Usuario({
    email: body.email,
    nombre: body.nombre,
    password: bcrypt.hashSync(body.password, 10),
  });

  return await usuario.save();
}

async function listarUsuariosActivos() {
  let usuarios = await Usuario.find({ estado: true })
  .select({nombre:1, email:1});
  return usuarios;
}

async function actualizarUsuario(email, body) {
  let usuario = await Usuario.findOneAndUpdate(
    { email },
    {
      $set: {
        nombre: body.nombre,
        password: body.password,
      },
    },
    { new: true }
  );
  return usuario;
}

async function desactivarUsuario(email) {
  let usuario = await Usuario.findOneAndUpdate(
    { email },
    {
      $set: {
        estado: false,
      },
    },
    { new: true }
  );
  return usuario;
}

module.exports = ruta;
