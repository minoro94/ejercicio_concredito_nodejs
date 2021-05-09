const Prospecto = require('../models/prospecto');

const existeProspectoporId = async(id = '') => {
    const existeProspecto = await Prospecto.findById(id);
    if (!existeProspecto) {
        throw new Error(`El id del prospecto no existe: ${id}`);
    }
};

module.exports = {
    existeProspectoporId
};