const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const usuarioSchema = mongoose.Schema({
    email: {
        type:String,
        required: true, 
        unique: true //para validar que sea correo unico
    },
    nombre: {
        type: String,
        required: true
    }, 
    password: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean, 
        default: true
    },
    imagen: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Usuario', usuarioSchema);