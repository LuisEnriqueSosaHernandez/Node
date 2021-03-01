const Usuario = require('../models/usuario');
const bcrypt = require("bcryptjs")
const { response, request } = require('express');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res) => {
    const desde = Number(req.query.desde) || 0;
     /*const usuarios = await Usuario.find({}, 'nombre email role google')
        .skip(desde)
     .limit(5)
     const total =await Usuario.count();*/

    const [usuarios,total]=await Promise.all([
        Usuario.find({}, 'nombre email role google img')
            .skip(desde)
            .limit(5),
            Usuario.countDocuments()
    ])
    
    res.status(200).json({
        ok: true,
        usuarios,
        total
    });
}
const crearUsuario = async (req, res = response) => {
    const { email, password } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            })
        }
        const usuario = new Usuario(req.body);
        //Encriptar contrasenia
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        //Guardar usuario
        await usuario.save(res);
        //Generar el token JWT
        const token = await generarJWT(usuario.id)

        res.status(200).json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}


const actualizarUsuario = async (req, res = response) => {
    //TODO:Validar token y comprobar si el usuario es correcto
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            })
        }

        //Actualizaciones
        const { password, google, email, ...campos } = req.body;
        if (usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }
        }
        if(!usuarioDB.google){
            campos.email = email;
        }else if(usuarioDB.email!==email){
                return res.status(400).json({
                    ok: false,
                    msg: 'Usuarios de google no pueden cambiar su correo'
                })
        }
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });
        res.json({
            ok: true,
            usuario: usuarioActualizado
        })


        res.json({
            ok: true,
            uid
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const borrarUsuario = async (req, res) => {
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            })
        }
        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}
module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}