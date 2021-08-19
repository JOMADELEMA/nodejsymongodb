const jwt = require('jsonwebtoken');
require('dotenv').config();


let verificarToken = (req, res, next)=>{
    let token = req.get('autorization'); //el nombre del parametro puede ser el que querramos y va en el header
    jwt.verify(token, process.env.SEED, (err, decoded)=>{
      if (err ){
        return res.status(401).json({
          err
        })
      }
      req.usuario = decoded.usuario;
      next();
    })
  
  }

  module.exports = verificarToken;