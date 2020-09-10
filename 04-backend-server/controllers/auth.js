const { response } = require('express')
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
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
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario o password incorrectos'
            })
        }

        //Generar token

        const token = await generarJWT(usuarioDB.id);


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

const googleSingIn = async (req, res = response) => {
    const googleToken = req.body.token;
    try {
        const { name, email, picture } = await googleVerify(googleToken);
        const usuarioDB=await Usuario.findOne({email});
        let usuario;
        if(!usuarioDB){
            usuario=new Usuario({
                nombre:name,
                email,
                password:'1234',
                img:picture,
                google:true
            })
        }else{
            usuario=usuarioDB;
            usuario.google=true
        }
        //Guardar en BD
        await usuario.save();
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
           token
        })
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token no es correcto'
        })
    }

}

module.exports = {
    login,
    googleSingIn
}