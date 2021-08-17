const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ruta = express.Router();
let Usuario = require("../models/usuario_model");
const config = require('config');


ruta.post('/', (req, res)=> {
    Usuario.findOne({email: req.body.email})
    .then(datos => {
        if(datos){
            const passwordValido = bcrypt.compareSync(req.body.password, datos.password);
            if (!passwordValido)
            {
                res.status(400).json({
                    error: 'ok', 
                    mensaje: 'Usuario o contraseña incorrecta'    
                })
            }

            console.log(process.env.SEED);
            console.log(process.env.expiration);
            const jwToken = jwt.sign({_id: datos._id, 
                nombre: datos.nombre, 
                email: datos.email},
                process.env.SEED, 
                {expiresIn: process.env.expiration}
                );
            /*jwt.sign({_id: datos._id, 
                nombre: datos.nombre, 
                email: datos.email}, 'password');*/
            //res.send(jwToken);
            res.json({
                usuario: {
                    _id: datos._id,
                    nombre: datos.nombre,
                    correo: datos.email
                }, 
                jwToken
            })
        }
        else{
            res.status(400).json({
                error: 'ok',
                mensaje: 'Usuario o contraseña incorrecta'
            })
        }
    })
    .catch(err =>{
        res.status(400).json({
            error: 'ok',
            mensaje: "error en el servicio "+ err
        })
    })
})

module.exports = ruta;