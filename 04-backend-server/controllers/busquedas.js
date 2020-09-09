const { response } = require('express')
const Usuario = require('../models/usuario')
const Hospitales = require('../models/hospital')
const Medicos = require('../models/medico')



const getTodo = async (req, res = response) => {
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');


    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Hospitales.find({ nombre: regex }),
        Medicos.find({ nombre: regex })
    ])
    res.json({
        ok: true,
        usuarios,
        hospitales,
        medicos
    })
}


const getDocumentosColeccion = async (req, res = response) => {
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');
    let data=[];

    switch (tabla) {
        case 'medicos':
            data= await Medicos.find({ nombre: regex })
            .populate('usuario','nombre img')
            .populate('hospital','nombre img');
            break;
        case 'hospitales':
            data= await Hospitales.find({ nombre: regex })
            .populate('Usuario','nombre img')
            break;
        case 'usuarios':
            data= await Usuario.find({ nombre: regex });

            break;
        default:
            res.status(400).json({
                ok: false,
                msg: 'la tabla tiene que sder usuarios/medicos/hospitales'
            })
            break;
           
           
    }
        res.json({
            ok:true,
            resultados:data
        })

}


module.exports = {
    getTodo,
    getDocumentosColeccion
}