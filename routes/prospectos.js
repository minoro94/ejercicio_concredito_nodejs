const { Router } = require('express');
const {
    prospectosGet,
    prospectosPost,
    prospectoPut
} = require('../controllers/prospectos.controller');

const router = Router();

router.post('/', prospectosPost);
router.get('/', prospectosGet);
router.put('/:id', prospectoPut);

module.exports = router;