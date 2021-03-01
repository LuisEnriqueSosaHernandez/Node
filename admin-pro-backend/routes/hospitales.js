/*Ruta
/api/hospitales
*/



const { Router } = require('express')
const { check } = require('express-validator')
const { validarJWT } = require('../middlewares/validar-jwt');
const { getHospitales, actualizarHospital, borrarHospital, crearHospital } = require('../controllers/hospitales');
const {validarCampos} = require('../middlewares/validar-campos');

const router = Router();

router.get('/',getHospitales);
router.post('/',
    [
            validarJWT,
            check('nombre','El nombre del hospital es necesario').not().isEmpty(),
            validarCampos
    ],
crearHospital);

router.put('/:id',
    [
        validarJWT,
        check('nombre','El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ],
    actualizarHospital);

router.delete('/:id',validarJWT, borrarHospital );


module.exports = router;
