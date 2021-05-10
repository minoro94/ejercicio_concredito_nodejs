const { Schema, model } = require('mongoose');
// Modelo para la DB de mongoose
const ProspectoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    primerapellido: {
        type: String,
        required: [true, 'El primer apellido es obligatorio']
    },
    segundoapellido: {
        type: String,
        required: false
    },
    calle: {
        type: String,
        required: [true, 'La calle es obligatoria']
    },
    numero: {
        type: Number,
        required: [true, 'El numero es obligatorio']
    },
    colonia: {
        type: String,
        required: [true, 'La colonia es obligatoria']
    },
    codigopostal: {
        type: Number,
        required: [true, 'El codigo postal es obligatorio']
    },
    telefono: {
        type: Number,
        required: [true, 'El telefono es obligatorio']
    },
    rfc: {
        type: String,
        required: [true, 'El rfc es oblgiatorio']
    },
    estatus: {
        type: String,
        default: 'ENVIADO'
    },
    estado: {
        type: Boolean,
        default: true
    },
    observaciones: {
        type: String,
        default: ""
    },
    archivos: {
        type: Array,
        default: ["1", "2"]
    }
});

module.exports = model('Prospecto', ProspectoSchema);