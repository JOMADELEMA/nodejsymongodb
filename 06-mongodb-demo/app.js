const mongoose = require("mongoose");

//para iniciar servicio de mongoDB utilizar en cmd (no powershell)
//desde la ruta program files/server/5.0/bin> mongod --dbpath F:\data\mongodb5\db

//antes mongoose.connect('mongodb://localhost/demo')

mongoose.connect('mongodb://localhost:27017/demo',  {useUnifiedTopology: true, useNewUrlParser: true})
    .then(()=> console.log("conectado a MongoDB"))
    .catch(err => console.log("no se pudo conectar con MongoDB..."))

const cursoSchema = new mongoose.Schema({
    nombre: String, 
    autor: String,
    etiquetas: [String],
    fecha: {type: Date, default: Date.now},
    publicado: Boolean
});

//clase -> ojbetos instanciacion
//el modelo es un objeto de un esquema una instanciacion

const Curso = mongoose.model("Curso", cursoSchema);

async function crearCurso() {
    const curso = new Curso({
        nombre: "Node JS desde cero",
        autor: "JOMA",
        etiquetas: ["desarrollo web", "back end"],
        publicado: true
    });
    
    const resultado = await curso.save();
    console.log(resultado);
};

//crearCurso();

async function listarCursos(){
    const cursos = await Curso.find();
    console.log(cursos);
};

async function listarCursosCondicion(){
    const cursos = await Curso
    .find({autor: "JOMA"}) 
    .limit(1) //limite de registros devueltos.
    .sort({autor: 1}) //1 orden ascendente -1 orden desc
    .select({nombre:1, etiquetas:1}); //devuelbe solo los datos solicitados del registro
    console.log(cursos);
};


//listarCursos();
listarCursosCondicion();
