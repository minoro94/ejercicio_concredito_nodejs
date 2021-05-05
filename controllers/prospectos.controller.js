const { response, request } = require('express');

const prospectosGet = (req = request, res = response) => {
    const { hola } = req.query;
    const { nombre, colonia, telefono } = req.body;
    res.json({
        nombre,
        colonia,
        telefono,
        hola
    });
};

const prospectosPost = (req, res = response) => {
    res.json({
        msg: 'Captura de prospecto'
    });
};

const prospectoPut = (req, res = respones) => {
    const id = req.params.id;
    res.json({
        msg: 'Evaluacion prospecto',
        id
    });
};

module.exports = {
    prospectosGet,
    prospectosPost,
    prospectoPut
};