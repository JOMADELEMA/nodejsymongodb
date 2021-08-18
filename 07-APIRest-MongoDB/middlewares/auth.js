const jwt = require('jsonwebtoken');
require('dotenv').config();


let verificarToken = (req, res, next)=>{
    let token = req.get('autorization');
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