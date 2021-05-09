const { response, request } = require('express');
const Prospecto = require('../models/prospecto');
const Server = require('../models/server');
const prospectosGet = async(req = request, res = response) => {
    const query = { estado: true };
    const [total, prospectos] = await Promise.all([
        Prospecto.countDocuments(query),
        Prospecto.find(query)
    ]);
    res.json({
        total,
        prospectos
    });
};

const prospectoGetbyId = async(req = request, res = response) => {
    const { id } = req.params;
    const prospectodb = await Prospecto.findById(id);
    res.json(prospectodb);
};

const prospectosPost = async(req = request, res = response) => {
    const nombreA = new Server();
    const archivosName = nombreA.obtenerNombreArchivos();
    for (let i = 0; i < archivosName.length; i++) {
        req.body.archivos[i] = archivosName[i];
        console.log(req.body.archivos[i]);
    }
    const prospecto = new Prospecto(req.body);
    await prospecto.save();
    res.json({
        msg: 'Prospecto Capturado Correctamente'
    });
};

const prospectoPut = async(req, res = respones) => {
    const { id, observaciones, estatus } = req.body;
    const prospectodb = await Prospecto.findByIdAndUpdate(id, { observaciones, estatus });
    console.log(prospectodb);
    res.json({
        msg: 'Prospecto Evaluado Correctamente',
        prospectodb
    });
};

module.exports = {
    prospectosGet,
    prospectoGetbyId,
    prospectosPost,
    prospectoPut
};