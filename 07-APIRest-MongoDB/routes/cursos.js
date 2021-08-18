const express = require('express');
const Curso = require('../models/curso_model');
const usuario_model = require('../models/usuario_model');
const ruta = express.Router();
const verificarToken = require('../middlewares/auth');

ruta.get('/', verificarToken, (req, res)=>{

    /*res.json({
        usuario: req.usuario
    })*/

    let resultado = listarCursosActivos();
    resultado.then((cursos) => {
        res.json(cursos);
    })
    .catch(err => {
        res.json(err);
    })
});

ruta.post('/', verificarToken, (req,res)=>{
    let resultado = crearCurso(req);

    resultado.then(curso =>{
        res.json({
            curso
        })
    })
    .catch(err =>{
        res.status(400).json({
            err
        })
    });
});

async function crearCurso(req){
    let curso = new Curso({
        titulo: req.body.titulo,
        autor: req.usuario._id,
        descripcion: req.body.descripcion
});
    return await curso.save();
}

ruta.put('/:id', verificarToken, (req, res)=>{
    console.log(req.params.id);
    let resultado = actualizarCurso(req.params.id, req.body);
    console.log(req.params.id);
    resultado.then(curso => {
        res.json(curso)
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

async function actualizarCurso(id, body){
    let curso = await Curso.findByIdAndUpdate(id,{
        $set: {
            titulo: body.titulo,
            descripcion: body.descripcion
        }
    }, {new: true});
    return curso;
}

ruta.delete("/:id", verificarToken, (req, res)=>{
    let curso = desactivarCurso(req.params.id);
    curso.then(curso => {
        res.json(curso)
    })
    .catch(err => {
        res.json(err)
    });
});

async function desactivarCurso(id) {
    let curso = await Curso.findByIdAndUpdate(
      id,
      {
        $set: {
          estado: false,
        },
      },
      { new: true }
    );
    return curso;
  }

  async function listarCursosActivos() {
    let cursos = await Curso.find({ estado: true });
    return cursos;
  }

module.exports = ruta;