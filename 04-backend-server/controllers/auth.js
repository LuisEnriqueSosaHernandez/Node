const { response } = require('express')
const Usuario = require('../models/usuario')
const bcrypt=require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        //Verificar email
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario o password incorrectos'
            })
        }
        //Verificar password
        const validPassword=bcrypt.compareSync(password,usuarioDB.password);
        if(!validPassword){
            return res.status(404).json({
                ok: false,
                msg: 'Usuario o password incorrectos'
            })
        }

        //Generar token

            const token=await generarJWT(usuarioDB.id);


        res.json({
            ok: true,
            token
        })
    } catch (error) {
        console.log(error);
        res.json.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

module.exports = {
    login
}