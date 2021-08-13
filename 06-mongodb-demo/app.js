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
        nombre: "Javascript",
        autor: "JOMA",
        etiquetas: ["desarrollo web", "front end"],
        publicado: true
    });
    
    const resultado = await curso.save();
    console.log(resultado);
};

crearCurso();

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

async function listarCursosCondicion2(){
    //eq (equal, igual)
    //ne (not equal)
    //gt (greater than)
    //get (greater than or equal)
    //lt (less than)
    //lte (lest than or equal to=
    //in (si hay valores dentro de la consulta)
    //nin (not in)
    const cursos = await Curso
    .find({autor: "JOMA"}) 
    //.find({precio: {$gte:10, $lte:30}}) para encontrar rangos de precio entre 10 y 30
    //.find({precio: {$in: [10, 15, 25]}}) para encontrar precios en especifico pero varias opciones
    .limit(1) //limite de registros devueltos.
    .sort({autor: 1}) //1 orden ascendente -1 orden desc
    .select({nombre:1, etiquetas:1}); //devuelbe solo los datos solicitados del registro
    console.log(cursos);
};

async function listarCursosCondicion3(){

    //or y and
    const cursos = await Curso
    .find() 
    //.or([{autor: "JOMA"}, {publicado: true}]) //ejemplo de or
    //.and.or([{autor: "JOMA"}, {publicado: true}]) //ejemplo de and

    //expreciones regulares
    //.find({autor: /^JO/}) //para buscar con inicio JO
    //.find({autor: /MA$/}) //para buscar con final MA.
    .find({autor: /.^*O.*/})//cuando un campo tiene el contenido especifico
    .limit(1) //limite de registros devueltos.
    .sort({autor: 1}) //1 orden ascendente -1 orden desc
    .select({nombre:1, etiquetas:1}); //devuelbe solo los datos solicitados del registro
    console.log(cursos);
};

//Paginacion
const numeroPagina = 2;
const tamanoPagina = 10;

async function listarCursosPaginado(){
    const cursos = await Curso
    .find({autor: "JOMA"}) 
    .skip((numeroPagina-1) * tamanoPagina)
    .limit(1) //limite de registros devueltos.
    .sort({autor: 1}) //1 orden ascendente -1 orden desc
    .select({nombre:1, etiquetas:1}); //devuelbe solo los datos solicitados del registro
    console.log(cursos);
};



//listarCursos();  //listar todos los cursos
// listarCursosCondicion(); //listar cursos pero con condiciones de busqueda
// listarCursosCondicion2();
// listarCursosCondicion3();
//listarCursosPaginado();

// async function actualizarCurso(id){
//     const curso = await Curso.findById(id);
//     if(!curso) {
//         console.log("el curso no existe");
//     }
//     curso.publicado = false;
//     curso.autor = "JOMADELEMA"

//     // curso.set({
//     //     publicado: false, 
//     //     autor: "JOMADELEMA";
//     // })

//     const resultado = await curso.save();
//     console.log(resultado);
// };

// async function actualizarCurso(id){
//     const resultado = await Curso.update({_id: id},{
//         $set: {
//             autor: "JOMA", 
//             publicado: true
//         }
//     });
//     console.log(resultado);
// };

async function actualizarCurso(id){
    const resultado = await Curso.findByIdAndUpdate(id,{
        $set: {
            autor: "JOMA", 
            publicado: false
        }
    }, {new: true});
    console.log(resultado);
};

actualizarCurso("6115e7c11867a62f2072c7f0");