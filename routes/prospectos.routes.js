const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { existeProspectoporId } = require('../helpers/db-validators');
const {
    prospectosGet,
    prospectoGetbyId,
    prospectosPost,
    prospectoPut
} = require('../controllers/prospectos.controller');


const router = Router();

router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('primerapellido', 'El primer apellido es obligatorio').not().isEmpty(),
        check('calle', 'La calle es obligatoria').not().isEmpty(),
        check('numero', 'El numero es obligatorio').not().isEmpty(),
        check('colonia', 'La colonia es obligatoria').not().isEmpty(),
        check('codigopostal', 'El codigo postal es obligatorio').not().isEmpty(),
        check('telefono', ' El telefono es obligatorio').not().isEmpty(),
        check('rfc', 'El RFC es obligatorio').not().isEmpty(),
        validarCampos
    ],
    prospectosPost);

router.get('/', prospectosGet);

router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeProspectoporId),
    validarCampos
], prospectoGetbyId);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeProspectoporId),
    validarCampos
], prospectoPut);

module.exports = router;