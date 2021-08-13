const express = require("express");
const ruta = express.Router();
const Joi = require("joi");

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

let Usuario = require("../models/usuario_model");

ruta.get("/", (req, res) => {
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
  const { error, value } = schema.validate(
    { nombre: body.nombre },
    { email: body.email }
  );
  if (!error) {
    let resultado = crearUsuario(body);

    resultado
      .then((user) => {
        res.json({
          valor: user,
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

ruta.put("/:email", (req, res) => {
  let resultado = actualizarUsuario(req.params.email, req.body);
  const { error, value } = schema.validate({ nombre: req.body.nombre });
  if (!error) {
    resultado
      .then((valor) => {
        res.json({
          valor: valor,
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

ruta.delete("/:email", (req, res) => {
  let resultado = desactivarUsuario(req.params.email);
  resultado
    .then((valor) => {
      res.json({
        valor: valor,
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
    password: body.password,
  });

  return await usuario.save();
}

async function listarUsuariosActivos() {
  let usuarios = await Usuario.find({ estado: true });
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
  console.log(email);
  let usuario = await Usuario.findOneAndUpdate(
    { email },
    {
      $set: {
        estado: false,
      },
    },
    { new: true }
  );
  console.log(Usuario);
  return usuario;
}

module.exports = ruta;
