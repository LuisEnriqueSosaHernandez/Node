/*Path: /api/login*/

const { Router } = require('express')
const { login, googleSingIn, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'Es obligatorio').not().isEmpty(),
    validarCampos
],
    login
)
router.post('/google', [

    check('token', 'Es token de google es obligatorio').not().isEmpty(),
    validarCampos
],
    googleSingIn
)

router.get('/renew',
    validarJWT,
    renewToken
)
module.exports = router